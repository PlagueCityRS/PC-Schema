import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Forum, ForumCategoryRepository } from '#/db/Exports.js';

@Entity({ repository: () => ForumCategoryRepository })
export class ForumCategory {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ type: 'string' })
    name!: string;

    @Property({ type: 'number' })
    sortOrder!: number;

    @OneToMany(() => Forum, (forum: Forum) => forum.category)
    forums = new Collection<Forum>(this);
}
