import { EntityRepository } from '@mikro-orm/mysql';
import { KbaseRelationship } from '#/db/Exports.js';

export class KbaseRelationshipRepository extends EntityRepository<KbaseRelationship> {
    async getBreadcrumbs(itemId: number) {
        return this.em.execute(
            `
        WITH RECURSIVE category_path AS (
          -- Find the root item
          SELECT p.child_id, p.parent_id, 0 AS level, pi.title, pi.type, p.sort_pos
          FROM kbase_relationship p
          INNER JOIN kbase_item pi ON p.parent_id = pi.id
          WHERE p.child_id = ?
          
          UNION ALL
          
          -- Recursively find all parents
          SELECT c.child_id, c.parent_id, cp.level + 1, i.title, i.type, c.sort_pos
          FROM kbase_relationship c
          INNER JOIN category_path cp ON c.child_id = cp.parent_id
          INNER JOIN kbase_item i ON c.parent_id = i.id
        )
        SELECT * FROM category_path;
        `,
            [itemId],
        );
    }
}
