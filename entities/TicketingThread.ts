import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { TicketingThreadRepository } from '#/db/repositories/TicketingThreadRepository.js';
import { TicketingMessage } from '#/db/entities/TicketingMessage.js';
import { Character } from '#/db/Exports.js';

@Entity({ repository: () => TicketingThreadRepository })
export class TicketingThread {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ type: 'string' })
    title!: string;

    @ManyToOne(() => Character, {
        joinColumn: 'account_id',
    })
    account!: Character;

    @Property({ type: 'number', default: 1 })
    messageCount: number = 1;

    @Property({ type: 'datetime', nullable: true })
    readAt?: Date;

    @Property({ type: 'datetime' })
    createdAt!: Date;

    @ManyToOne(() => Character, { name: 'created_by' })
    createdBy!: Character;

    @Property({ type: 'datetime' })
    updatedAt!: Date;

    @ManyToOne(() => Character, { name: 'updated_by' })
    updatedBy!: Character;

    @Property({ type: 'datetime', nullable: true })
    lockedAt?: Date;

    @ManyToOne(() => Character, { nullable: true, name: 'locked_by' })
    lockedBy?: Character;

    @Property({ type: 'datetime', nullable: true })
    hiddenAt?: Date;

    @ManyToOne(() => Character, { nullable: true, name: 'hidden_by' })
    hiddenBy?: Character;

    @OneToMany(() => TicketingMessage, (message: TicketingMessage) => message.thread, { lazy: true })
    messages = new Collection<TicketingMessage>(this);
}
