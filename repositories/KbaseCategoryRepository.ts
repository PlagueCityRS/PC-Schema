import { EntityRepository } from '@mikro-orm/core';
import { KbaseCategory } from '#/db/Exports.js';

export class KbaseCategoryRepository extends EntityRepository<KbaseCategory> {
    async getCategory(id: number) {
        return this.em.findOne(KbaseCategory, { kbaseItem: id });
    }
}
