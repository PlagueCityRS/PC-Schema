import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany, Collection, Unique } from '@mikro-orm/core';
import { Character, ForumThread, ForumPostRepository } from '#/db/Exports.js';

@Unique({ properties: ['thread', 'code'] })
@Entity({ repository: () => ForumPostRepository })
export class ForumPost {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ type: 'number' })
    code!: number;

    @ManyToOne(() => Character)
    author!: Character;

    @Property({ type: 'text' })
    content!: string;

    @Property({ type: 'datetime' })
    createdAt!: Date;

    @Property({ nullable: true, type: 'datetime' })
    lastEditDate?: Date;

    @ManyToOne(() => Character, { nullable: true })
    lastEditBy?: Character;

    @Property({ default: 0, type: 'number' })
    isHidden: number = 0; //0 = visible, 1 = hidden, 2 = "deleted" (jmod viewable only)

    @Property({ nullable: true, type: 'datetime' })
    hiddenAt?: Date;

    @ManyToOne(() => Character, { nullable: true })
    hiddenBy?: Character;

    @ManyToOne(() => ForumThread)
    thread!: ForumThread;

    @ManyToMany(() => Character)
    highlightedBy = new Collection<Character>(this);

    // Copied from UserGroup at post creation
    @Property({ type: 'string', nullable: true })
    postDecorationClass?: string;

    // Copied from UserGroup at post creation
    @Property({ type: 'string', nullable: true })
    displayString?: string;
}
