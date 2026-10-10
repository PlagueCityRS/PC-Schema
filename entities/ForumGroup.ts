import { Entity, PrimaryKey, Property, OneToMany, ManyToMany, Collection } from '@mikro-orm/core';
import { Character, ForumGroupRepository, ForumPermission } from '#/db/Exports.js';

@Entity({ repository: () => ForumGroupRepository })
export class ForumGroup {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ type: 'number', default: 0 })
    sortOrder: number = 0;

    @Property({ type: 'string' })
    name!: string;

    @Property({ type: 'boolean', default: true })
    deletable: boolean = true;

    // Copied to Post at post creation
    @Property({ type: 'string', nullable: true })
    postDecorationClass?: string;

    // Copied to Post at post creation
    // "Jagex Mod" and "Forum Mod"
    @Property({ type: 'string', nullable: true })
    displayString?: string;

    @Property({ type: 'bigint', default: '0' })
    permissions: bigint = 0n;

    @Property({ type: 'number', default: 30 })
    maxTitleChars: number = 30;

    @Property({ type: 'number', default: 2000 })
    maxPostChars: number = 2000;

    @ManyToMany(() => Character)
    characters = new Collection<Character>(this);

    @OneToMany(() => ForumPermission, (perm: ForumPermission) => perm.userGroup)
    forumPermissions = new Collection<ForumPermission>(this);
}
