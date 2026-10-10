import { Entity, Property, OneToOne } from '@mikro-orm/core';
import { CharacterLoginRepository, Character } from '#/db/Exports.js';

@Entity({ repository: () => CharacterLoginRepository })
export class CharacterLogin {
    @OneToOne(() => Character, { primary: true })
    character!: Character;

    @Property({ type: 'text' })
    profile!: String;

    @Property({ type: 'boolean' })
    loggedIn!: Boolean;

    @Property({ type: 'datetime' })
    loginTime?: Date = new Date();

    @Property({ type: 'boolean' })
    loggedOut!: Boolean;

    @Property({ type: 'datetime' })
    logoutTime?: Date = new Date();
}
