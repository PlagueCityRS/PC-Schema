import { EntityRepository } from '@mikro-orm/core';
import { OffenceAppeal } from '#/db/Exports.js';

export class OffenceAppealRepository extends EntityRepository<OffenceAppeal> {
    async getAppealById(id: number): Promise<OffenceAppeal | null> {
        return this.findOne({ id });
    }
}
