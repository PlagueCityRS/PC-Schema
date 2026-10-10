import { Entity, PrimaryKey, Property, OneToOne, OneToMany, Collection, ManyToOne, sql, Opt, ManyToMany } from '@mikro-orm/core';
import { Offence, Account, CharacterLogin, ForumPost, ForumThread, ForumGroup } from '../SchemaExports.js';

@Entity()
export class Character {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ unique: true, type: 'string' })
    username!: string;

    @Property({ type: 'string' }) //password hash
    password!: string;

    @Property({ type: 'number', default: 0 })
    staffmodlevel: number = 0;

    @Property({ type: 'datetime', nullable: true })
    passwordUpdated?: Date;

    @Property({ type: 'string' })
    registrationIp?: string;

    @Property({ type: 'datetime', defaultRaw: sql.now() })
    registrationDate?: Date & Opt;

    @Property({ type: 'datetime', nullable: true })
    mutedUntil?: Date;

    @Property({ type: 'datetime', nullable: true })
    bannedUntil?: Date;

    @Property({ type: 'datetime', nullable: true })
    members?: Date;

    @OneToOne(() => CharacterLogin, (clogin: CharacterLogin) => clogin.character, { mappedBy: 'character' })
    clogin?: CharacterLogin;

    @OneToMany(() => Offence, (offence: Offence) => offence.character, { mappedBy: 'character' })
    offences = new Collection<Offence>(this);

    @ManyToOne(() => Account)
    account!: Account;

    /* Forum Related Properties */
    @Property({ default: 0, type: 'number' })
    postCount: number = 0;

    @Property({ nullable: true, type: 'datetime' })
    forumMutedUntil?: Date;

    @Property({ nullable: true, type: 'text' })
    signature?: string;

    @ManyToMany(() => ForumGroup, (group: ForumGroup) => group.characters, { mappedBy: 'characters' })
    forumGroups = new Collection<ForumGroup>(this);

    @OneToMany(() => ForumThread, (thread: ForumThread) => thread.author)
    threads = new Collection<ForumThread>(this);

    @OneToMany(() => ForumPost, (post: ForumPost) => post.author)
    posts = new Collection<ForumPost>(this);

    @ManyToMany(() => ForumPost, (post) => post.highlightedBy, { mappedBy: 'highlightedBy' })
    highlightedPosts = new Collection<ForumPost>(this);
    /* End Forum Related Properties */
}
