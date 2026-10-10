import { EntityRepository } from '@mikro-orm/core';
import { KbaseItem } from '#/db/Exports.js';

export class KbaseItemRepository extends EntityRepository<KbaseItem> {
    async getChildrenOf(cat_id: number) {
        return this.em.find(KbaseItem, {});
    }
}
