import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/es';
import { Forum, ForumGroup } from '../SchemaExports.js';

@Entity()
export class ForumPermission {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @ManyToOne(() => Forum)
    forum!: Forum;

    // Nullable: when true, this permission applies to the public (not-logged-in) users
    @ManyToOne(() => ForumGroup, { nullable: true })
    userGroup?: ForumGroup;

    @Property({ default: false, type: 'boolean' })
    isPublic: boolean = false;

    @Property({ default: true, type: 'boolean' })
    canView: boolean = true;

    @Property({ default: true, type: 'boolean' })
    canCreateThread: boolean = true;
}
