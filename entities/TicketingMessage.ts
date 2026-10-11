import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Character, TicketingThread } from '../SchemaExports.js';

@Entity()
export class TicketingMessage {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ type: 'string', nullable: true })
    postDecorationClass?: string;

    @Property({ type: 'text' })
    content!: string;

    @Property({ type: 'datetime' })
    createdAt!: Date;

    @ManyToOne(() => Character, { name: 'created_by' })
    createdBy!: Character;

    @Property({ type: 'datetime' })
    updatedAt!: Date;

    @ManyToOne(() => Character, { name: 'updated_by' })
    updatedBy!: Character;

    @Property({ type: 'datetime', nullable: true })
    hiddenAt?: Date;

    @ManyToOne(() => Character, { nullable: true, name: 'hidden_by' })
    hiddenBy?: Character;

    @ManyToOne(() => TicketingThread, {
        joinColumn: 'thread_id',
        lazy: true,
    })
    thread!: TicketingThread;
}
