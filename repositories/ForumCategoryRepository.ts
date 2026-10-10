import { EntityRepository } from '@mikro-orm/core';
import { ForumCategory } from '#/db/Exports.js';

export class ForumCategoryRepository extends EntityRepository<ForumCategory> {
    async createCategory(name: string, sortOrder: number = 0): Promise<boolean> {
        const alreadyExists = await this.em.findOne(ForumCategory, { name: name });
        if (alreadyExists) {
            return false;
        }
        const category = new ForumCategory();
        category.name = name;
        category.sortOrder = sortOrder;
        await this.em.persist(category).flush();
        return true;
    }
}
