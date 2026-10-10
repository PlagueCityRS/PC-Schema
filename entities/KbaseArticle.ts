import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { KbaseItem } from '#/db/entities/KbaseItem.js';
import { KbaseArticleRepository } from '#/db/Exports.js';

@Entity({ repository: () => KbaseArticleRepository })
export class KbaseArticle {
    @Property({ type: 'string', columnType: 'longtext' })
    content!: string;

    @ManyToOne(() => KbaseItem, {
        joinColumn: 'article_id',
        referenceColumnName: 'id',
        unique: true,
        primary: true,
        eager: true,
    })
    kbaseItem!: KbaseItem;
}
