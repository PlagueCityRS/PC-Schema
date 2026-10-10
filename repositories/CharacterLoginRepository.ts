import { EntityRepository } from '@mikro-orm/core';
import { CharacterLogin } from '#/db/Exports.js';

export class CharacterLoginRepository extends EntityRepository<CharacterLogin> {
    async getPlayerCount(world: number): Promise<number> {
        if (world < 1) return 0;
        return this.em.count(CharacterLogin, { loggedIn: world }) ?? 0;
    }
}
