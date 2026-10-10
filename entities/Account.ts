import { Entity, PrimaryKey, Property, OneToMany, Collection, sql, Opt } from '@mikro-orm/core';
import { AccountRepository, Character } from '#/db/Exports.js';

@Entity({ repository: () => AccountRepository })
export class Account {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @Property({ type: 'string', nullable: true })
    email: string | null = null;

    @Property({ type: 'string' })
    oauth!: string;

    @Property({ type: 'datetime', defaultRaw: sql.now() })
    createdAt?: Date & Opt;

    //website login, not game login
    @Property({ nullable: true, type: 'datetime' })
    lastLogin?: Date;

    @OneToMany(() => Character, (character: Character) => character.account)
    characters = new Collection<Character>(this);

    @Property({ default: 3, type: 'number' })
    characterLimit: number = 3;
}
