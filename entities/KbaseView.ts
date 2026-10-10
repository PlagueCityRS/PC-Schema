import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { KbaseViewRepository } from '#/db/Exports.js';

@Entity({ repository: () => KbaseViewRepository })
export class KbaseView {
    @PrimaryKey({ primary: true, type: 'number' })
    item_id!: number;

    @PrimaryKey({ primary: true, type: 'string', length: 255 })
    referrer!: number;

    @Property({ type: 'number', columnType: 'int' })
    views: number = 1;

    // @ManyToOne(() => KbaseItem, { joinColumn: 'item_id' })
    // kbaseItem!: KbaseItem;
}
