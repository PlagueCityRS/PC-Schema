import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/es';
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
