import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

// id: Generated<number>;
// category: number;
// title: string;
// content: string;
// slug: string | null;
// created: Generated<string>;
// updated: Generated<string>;

@Entity()
export class NewsPost {
    @PrimaryKey({ unique: true, type: 'number', autoincrement: true })
    id!: number;

    @Property({ type: 'number' })
    category!: number;

    @Property({ type: 'string' })
    title!: string;

    @Property({ type: 'text', nullable: true })
    description?: string;

    @Property({ type: 'text' })
    content!: string;

    @Property({ type: 'string', nullable: true })
    slug?: string;

    @Property({ type: 'string', nullable: true })
    icon?: string;

    @Property({ type: 'datetime' })
    created!: Date;

    @Property({ type: 'datetime' })
    updated!: Date;
}
