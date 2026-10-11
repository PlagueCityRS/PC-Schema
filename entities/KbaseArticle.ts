import { Entity, ManyToOne, Property } from '@mikro-orm/decorators/es';
import { KbaseItem } from '../SchemaExports.js';

@Entity()
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
