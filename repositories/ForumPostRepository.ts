import { Collection, EntityRepository, LockMode } from '@mikro-orm/core';
import { ForumPost, ForumThread, Character, ForumGroup, getCollectionItems, getOrLoadCollectionItems } from '#/db/Exports.js';
import { POSTS_PER_PAGE } from '#/constants.js';

export class ForumPostRepository extends EntityRepository<ForumPost> {
    async createPost(thread: ForumThread, author: Character, content: string): Promise<ForumPost> {
        return this.em.transactional(async (em) => {
            const now = new Date();
            await em.lock(thread, LockMode.PESSIMISTIC_WRITE);

            const posts = await em.find(ForumPost, { thread: thread.id });

            // TODO: not sure if post code should be mod 1000 or not. At least when forums were shutdown in 2025 it was not.
            //const code = posts.length % 1000;
            const code = posts.length;

            const forumGroups = getCollectionItems<ForumGroup>(author.forumGroups).sort((a, b) => a.sortOrder - b.sortOrder);
            const forumGroup = forumGroups[forumGroups.length - 1];

            const newPost = em.create(ForumPost, {
                code,
                content,
                author,
                thread,
                postDecorationClass: forumGroup?.postDecorationClass,
                displayString: forumGroup?.displayString,
                createdAt: now,
                isHidden: thread.autoHide ? 2 : 0,
                hiddenAt: thread.autoHide ? now : undefined,
            });

            if (posts.length === 0) {
                thread.createdAt = now;
            }
            thread.posts.add(newPost);
            thread.lastBumpAt = now;
            thread.forum.lastPostAt = now;
            thread.lastPostAt = now;
            thread.lastPostBy = author;
            await em.flush();
            return newPost;
        });
    }

    async editPost(post: ForumPost, char: Character, content: string): Promise<ForumPost> {
        const now = new Date();
        post.content = content;
        post.lastEditDate = now;
        post.lastEditBy = char;
        await this.em.flush();
        return post;
    }

    async getPostsByThread(thread: ForumThread, offset: number): Promise<ForumPost[]> {
        return this.find(
            { thread: thread },
            {
                orderBy: { createdAt: 'ASC' },
                populate: ['author', 'author.forumGroups', 'hiddenBy', 'hiddenBy.forumGroups', 'lastEditBy', 'lastEditBy.forumGroups', 'highlightedBy', 'highlightedBy'],
                limit: POSTS_PER_PAGE,
                offset: offset,
            },
        );
    }

    async hidePost(post: ForumPost, char: Character, value: number): Promise<ForumPost> {
        post.isHidden = value;
        post.hiddenAt = value > 0 ? new Date() : undefined;
        post.hiddenBy = value > 0 ? char : undefined;
        await this.em.flush();
        return post;
    }

    async highlightPost(post: ForumPost, char: Character): Promise<ForumPost> {
        const highlightedByUsers = await post.highlightedBy.loadItems();
        const userHighlighted = highlightedByUsers.find((u) => u.id === char.id);

        if (userHighlighted) {
            post.highlightedBy.remove(userHighlighted);
        } else {
            post.highlightedBy.add(char);
        }
        await this.em.flush();
        return post;
    }
}
