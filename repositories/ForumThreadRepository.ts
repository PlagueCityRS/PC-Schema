import { EntityRepository, LockMode } from '@mikro-orm/core';
import { ForumThread, Forum, ForumPost, Character, ForumPostRepository, getOrLoadCollectionItems } from '#/db/Exports.js';
import { MAX_THREADS_PER_FORUM } from '#/constants.js';

export class ForumThreadRepository extends EntityRepository<ForumThread> {
    async createThread(forum: Forum, author: Character, title: string): Promise<ForumThread> {
        return this.em.transactional(async (em) => {
            const now = new Date();
            await em.lock(forum, LockMode.PESSIMISTIC_WRITE);

            const visibleThreads = await em.find(
                ForumThread,
                { forum: forum.id, dormant: false },
                {
                    orderBy: { isSticky: 'DESC', lastBumpAt: 'DESC' },
                    limit: MAX_THREADS_PER_FORUM,
                },
            );

            let code = visibleThreads.length % 1000;
            if (visibleThreads.length >= MAX_THREADS_PER_FORUM) {
                const dormantThread = visibleThreads[visibleThreads.length - 1];
                dormantThread.dormant = true;
                await em.flush();
                code = dormantThread.code;
            }

            const thread = em.create(ForumThread, {
                code,
                title,
                forum,
                author,
                createdAt: now,
                lastPostAt: now,
                lastPostBy: author,
                lastBumpAt: now,
                isSticky: false,
                autoHide: false,
                isLocked: false,
                isEscalated: false,
                isMoved: false,
                isHidden: 0,
                bumpCount: 0,
                dormant: false,
            });
            forum.lastPostAt = now;
            await em.flush();
            return thread;
        });
    }

    async editThreadTitle(thread: ForumThread, title: string): Promise<void> {
        thread.title = title;
        await this.em.flush();
    }

    async toggleLock(thread: ForumThread): Promise<boolean> {
        thread.isLocked = !thread.isLocked;
        await this.em.flush();
        return thread.isLocked;
    }

    async toggleSticky(thread: ForumThread): Promise<boolean> {
        thread.isSticky = !thread.isSticky;
        await this.em.flush();
        return thread.isSticky;
    }

    async toggleAutoHide(thread: ForumThread): Promise<boolean> {
        //auto hide posts in this thread (auto soft-delete, isHidden=2)
        thread.autoHide = !thread.autoHide;
        await this.em.flush();
        return thread.autoHide;
    }

    async hideThread(thread: ForumThread, hide: number, char: Character): Promise<number> {
        thread.isHidden = hide;
        thread.hiddenAt = new Date();
        thread.hiddenBy = char;
        await this.em.flush();
        return thread.isHidden;
    }

    async bumpThread(thread: ForumThread): Promise<number> {
        thread.lastBumpAt = new Date();
        thread.bumpCount += 1;
        await this.em.flush();
        return thread.bumpCount;
    }

    async toggleEscalated(thread: ForumThread, char?: Character, reason?: string): Promise<boolean> {
        thread.isEscalated = !thread.isEscalated;
        if (thread.isEscalated) {
            thread.escalatedAt = new Date();
            thread.escalatedBy = char;
            thread.escalationReason = reason;
        } else {
            thread.escalatedAt = undefined;
            thread.escalatedBy = undefined;
            thread.escalationReason = undefined;
        }
        await this.em.flush();
        return thread.isEscalated;
    }

    async moveThread(oldThread: ForumThread, destForum: Forum, movedBy: Character): Promise<void> {
        const now = new Date();
        const newThread = await this.createThread(destForum, oldThread.author, oldThread.title);
        newThread.lastPostAt = oldThread.lastPostAt;
        newThread.lastPostBy = oldThread.lastPostBy;
        newThread.isSticky = oldThread.isSticky;
        newThread.autoHide = oldThread.autoHide;
        newThread.isLocked = oldThread.isLocked;
        newThread.isEscalated = oldThread.isEscalated;
        newThread.escalatedAt = oldThread.escalatedAt;
        newThread.escalatedBy = oldThread.escalatedBy;
        newThread.escalationReason = oldThread.escalationReason;
        newThread.createdAt = oldThread.createdAt;
        newThread.bumpCount = oldThread.bumpCount;
        newThread.lastBumpAt = now;
        newThread.isHidden = 0; //always unhide on move
        newThread.hiddenAt = oldThread.hiddenAt;
        newThread.hiddenBy = oldThread.hiddenBy;
        newThread.dormant = oldThread.dormant;

        const posts = await getOrLoadCollectionItems(oldThread.posts);
        for (const p of posts) {
            p.thread = newThread;
            newThread.posts.add(p);
        }

        const postRepo = this.em.getRepository(ForumPost) as ForumPostRepository;
        const newPost = await postRepo.createPost(
            oldThread,
            oldThread.author,
            `This thread has been moved to the ${destForum.name} forum<br><br><a href="/forums.ws?${destForum.code},${destForum.id},${newThread.code},${newThread.id}">Click here to view the thread</a>`,
        );
        oldThread.isMoved = true;
        oldThread.movedAt = now;
        oldThread.movedBy = movedBy;
        oldThread.isLocked = true;
        oldThread.posts.add(newPost);
        await this.em.flush();
    }
}
