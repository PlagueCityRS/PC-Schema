import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { KbaseItem } from '#/db/entities/KbaseItem.js';
import { KbaseCategoryRepository } from '#/db/Exports.js';

@Entity({ repository: () => KbaseCategoryRepository })
export class KbaseCategory {
    @Property({ type: 'boolean' })
    auto_sort: boolean = false;

    @ManyToOne(() => KbaseItem, {
        joinColumn: 'cat_id',
        referenceColumnName: 'id',
        unique: true,
        primary: true,
        eager: true,
    })
    kbaseItem!: KbaseItem;
}
