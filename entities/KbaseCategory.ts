import { Entity, ManyToOne, Property } from '@mikro-orm/decorators/es';
import { KbaseItem } from '../SchemaExports.js';

@Entity()
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
