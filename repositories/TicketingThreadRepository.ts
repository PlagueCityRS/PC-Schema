import { EntityRepository } from '@mikro-orm/core';
import { TicketingThread, TicketingMessage, Character } from '#/db/Exports.js';

export class TicketingThreadRepository extends EntityRepository<TicketingThread> {
    async createThread(title: string, recipient: Character, sender: Character, locked: boolean, hidden: boolean, content: string, postDecorationClass: 'player' | 'jmod') {
        return this.em.transactional(async (em) => {
            const now = new Date();

            const thread = new TicketingThread();
            thread.title = title;
            thread.account = recipient;
            thread.updatedAt = now;
            thread.updatedBy = sender;
            thread.createdAt = now;
            thread.createdBy = sender;

            if (locked) {
                thread.lockedAt = now;
                thread.lockedBy = sender;
            }

            if (hidden) {
                thread.hiddenAt = now;
                thread.hiddenBy = sender;
            }

            const createdThread = em.create(TicketingThread, thread);

            const message = new TicketingMessage();
            message.thread = createdThread;
            message.content = content;
            message.createdAt = now;
            message.createdBy = sender;
            message.postDecorationClass = postDecorationClass;
            message.updatedAt = now;
            message.updatedBy = sender;

            em.create(TicketingMessage, message);

            return createdThread;
        });
    }

    async markAsRead(thread: TicketingThread) {
        thread.readAt = new Date();

        await this.em.flush();
    }

    async getUserThreads(userId: number) {
        return (
            (await this.findAll({
                fields: ['id', 'title', 'readAt', 'messageCount', 'updatedBy', 'updatedAt'],
                where: {
                    account: userId,
                    hiddenAt: null,
                },
            })) || []
        );
    }

    async getThreadByIdWithPosts(threadId: number) {
        return (
            (await this.findOne(
                {
                    id: threadId,
                    hiddenAt: null,
                },
                {
                    fields: [
                        'id',
                        'title',
                        'updatedBy.id',
                        'hiddenAt',
                        'lockedAt',
                        'readAt',
                        'account.id',
                        'messages.id',
                        'messages.postDecorationClass',
                        'messages.createdAt',
                        'messages.content',
                        'messages.createdBy.username',
                    ],
                    populate: ['messages'],
                },
            )) || null
        );
    }

    async canReplyToThread(userId: number, threadId: number) {
        return (
            (await this.findOne({
                id: threadId,
                account: userId,
                lockedAt: null,
                hiddenAt: null,
                $not: { updatedBy: { id: userId } },
            })) || null
        );
    }

    async canDeleteThread(userId: number, threadId: number) {
        return (
            (await this.findOne({
                id: threadId,
                account: userId,
                hiddenAt: null,
            })) || null
        );
    }

    async getThread(userId: number, threadId: number) {
        return this.findOne({
            id: threadId,
            account: userId,
        });
    }
}
