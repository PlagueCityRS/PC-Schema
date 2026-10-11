import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

@Entity()
export class KbaseItem {
    @PrimaryKey({ primary: true, unique: true, type: 'number', autoincrement: true })
    id!: number;

    @Property({ type: 'number', columnType: 'tinyint' })
    type!: number;

    @Property({ type: 'string', length: 255 })
    title!: string;

    @Property({ type: 'number', columnType: 'tinyint', nullable: true })
    display_size: number | null = null;

    @Property({ type: 'string', length: 255, nullable: true })
    display_image: string | null = null;

    @Property({ type: 'json', columnType: 'longtext', nullable: true })
    further_help: { mod: string; dest: string; text: string }[] | null = null;

    // @OneToOne(() => KbaseCategory, {
    //     joinColumn: 'id',
    //     referenceColumnName: 'cat_id',
    //     nullable: true,
    // })
    // category?: KbaseCategory;
    //
    // @OneToOne(() => KbaseArticle, {
    //     joinColumn: 'id',
    //     referenceColumnName: 'article_id',
    //     nullable: true,
    // })
    // article?: KbaseArticle;

    // @OneToMany(() => KbaseRelationship, (parent: KbaseRelationship) => parent.parent_id)
    // parentOf = new Collection<KbaseCategory>(this);
    //
    // @OneToMany(() => KbaseRelationship, (child: KbaseRelationship) => child.child_id)
    // childOf = new Collection<KbaseCategory>(this);

    // @OneToMany(() => KbaseView, (view: KbaseView) => view.item_id)
    // views = new Collection<KbaseView>(this);
}
