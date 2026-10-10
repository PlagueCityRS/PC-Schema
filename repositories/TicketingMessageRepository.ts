import { EntityRepository, LockMode } from '@mikro-orm/core';
import { TicketingMessage, Character, TicketingThread } from '#/db/Exports.js';

export class TicketingMessageRepository extends EntityRepository<TicketingMessage> {
    async createMessage(thread: TicketingThread, character: Character, content: string) {
        return this.em.transactional(async (em) => {
            const now = new Date();
            await em.lock(thread, LockMode.PESSIMISTIC_WRITE);

            const message = new TicketingMessage();
            message.thread = thread;
            message.content = content;
            message.createdAt = now;
            message.createdBy = character;
            message.updatedAt = now;
            message.updatedBy = character;
            message.postDecorationClass = 'player';

            em.create(TicketingMessage, message);

            thread.updatedAt = now;
            thread.updatedBy = character;
            thread.messageCount++;
            delete thread.readAt;

            await em.flush();
        });
    }
}
