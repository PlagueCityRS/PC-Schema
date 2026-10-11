import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from '@mikro-orm/decorators/es';
import { Character, Forum, ForumPost } from '../SchemaExports.js';

@Entity()
export class ForumThread {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ type: 'number' })
    code!: number;

    @Property({ type: 'string' })
    title!: string;

    @Property({ type: 'datetime' })
    lastPostAt!: Date;

    @ManyToOne(() => Character)
    lastPostBy!: Character;

    @Property({ default: false, type: 'boolean' })
    isSticky: boolean = false;

    @Property({ default: false, type: 'boolean' })
    autoHide: boolean = false; //auto-delete new posts (jmod viewable only)

    @Property({ default: false, type: 'boolean' })
    isLocked: boolean = false;

    // Thread Escalation for jmod review
    @Property({ default: false, type: 'boolean' })
    isEscalated: boolean = false;

    @Property({ nullable: true, type: 'datetime' })
    escalatedAt?: Date;

    @ManyToOne(() => Character, { nullable: true })
    escalatedBy?: Character;

    @Property({ nullable: true, type: 'string' })
    escalationReason?: string;

    @Property({ default: false, type: 'boolean' })
    isMoved: boolean = false;

    @Property({ type: 'datetime' })
    createdAt!: Date;

    @Property({ type: 'datetime' })
    lastBumpAt!: Date;

    @Property({ default: 0, type: 'number' })
    bumpCount: number = 0;

    @ManyToOne(() => Character, { nullable: true })
    movedBy?: Character;

    @Property({ nullable: true, type: 'datetime' })
    movedAt?: Date;

    @ManyToOne(() => Character)
    author!: Character;

    @ManyToOne(() => Forum)
    forum!: Forum;

    @OneToMany(() => ForumPost, (post: ForumPost) => post.thread)
    posts = new Collection<ForumPost>(this);

    @Property({ default: 0, type: 'number' })
    isHidden: number = 0; //0 = visible, 1 = hidden, 2 = "deleted" (jmod viewable only)

    @Property({ nullable: true, type: 'datetime' })
    hiddenAt?: Date;

    @ManyToOne(() => Character, { nullable: true })
    hiddenBy?: Character;

    @Property({ default: false, type: 'boolean' })
    dormant: boolean = false;
}
