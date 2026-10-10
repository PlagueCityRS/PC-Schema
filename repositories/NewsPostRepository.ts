import { EntityRepository } from '@mikro-orm/core';
import { NewsPost } from '#/db/Exports.js';

export class NewsPostRepository extends EntityRepository<NewsPost> {
    getPrevNewsItemId(currentId: number) {
        return this.em.findOne(
            NewsPost,
            { id: { $gt: currentId } },
            {
                orderBy: { id: 'ASC' },
                fields: ['id'],
            },
        );
    }

    getNextNewsItemId(currentId: number) {
        return this.em.findOne(
            NewsPost,
            { id: { $lt: currentId } },
            {
                orderBy: { id: 'DESC' },
                fields: ['id'],
            },
        );
    }

    getNewsItem(id: number) {
        return this.em.findOne(NewsPost, { id });
    }

    getNewsList(page: number, limit: number, category: number = 0) {
        const where = category !== 0 ? { category } : {};
        return this.em.find(NewsPost, where, {
            limit,
            offset: (page - 1) * limit,
            orderBy: { created: 'DESC', id: 'DESC' },
        });
    }

    getNewsCount(category: number = 0) {
        const where = category !== 0 ? { category } : {};
        return this.em.count(NewsPost, where);
    }
}
