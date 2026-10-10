import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Forum } from '../SchemaExports.js';

@Entity()
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
