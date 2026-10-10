import { EntityRepository } from '@mikro-orm/core';
import { Offence, Character } from '#/db/Exports.js';

export class OffenceRepository extends EntityRepository<Offence> {
    // @todo limit to 3 months if we want (it's auurrrthentic!)
    async getOffenceList(character: Character) {
        return this.find({ character }, { orderBy: { date: 'DESC' } });
    }

    async getOffence(id: number) {
        return this.findOne({ id }, { populate: ['character'] });
    }
}
