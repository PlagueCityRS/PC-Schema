import { EntityRepository } from '@mikro-orm/mysql';
import { KbaseArticle } from '#/db/Exports.js';

export class KbaseArticleRepository extends EntityRepository<KbaseArticle> {
    async getArticle(id: number) {
        return this.em.findOne(KbaseArticle, { kbaseItem: id });
    }

    async findSiblings(sortPos: number, parentId: number) {
        return this.em.execute(
            `
        SELECT * FROM (
            SELECT i.id, i.title
            FROM kbase_relationship r
            INNER JOIN kbase_item i ON r.child_id = i.id
            WHERE r.parent_id = ?
                AND i.type = 1
            ORDER BY ABS(r.sort_pos - ?) ASC
            LIMIT 5
       ) as siblings
        `,
            [parentId, sortPos],
        );
    }
}
