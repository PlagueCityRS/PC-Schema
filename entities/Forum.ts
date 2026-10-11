import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany, ManyToOne } from '@mikro-orm/decorators/es';
import { ForumCategory, ForumThread, ForumPermission } from '../SchemaExports.js';

@Entity()
export class Forum {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ type: 'number' })
    code!: number;

    @Property({ type: 'string' })
    name!: string;

    @Property({ type: 'datetime', nullable: true })
    lastPostAt?: Date;

    @Property({ type: 'text' })
    description!: string;

    @Property({ type: 'string' })
    icon!: string;

    @Property({ default: 0, type: 'number' })
    sortOrder: number = 0;

    @ManyToOne(() => ForumCategory)
    category!: ForumCategory;

    @OneToMany(() => ForumThread, (thread: ForumThread) => thread.forum)
    threads = new Collection<ForumThread>(this);

    @OneToMany(() => ForumPermission, (perm: ForumPermission) => perm.forum)
    permissions = new Collection<ForumPermission>(this);

    // forum-specific rules
    @Property({ type: 'text', nullable: true })
    forumRules?: string;
}
