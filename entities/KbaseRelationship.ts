import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class KbaseRelationship {
    @PrimaryKey({ primary: true, type: 'number' })
    child_id!: number;

    @PrimaryKey({ primary: true, type: 'number' })
    parent_id!: number;

    @Property({ type: 'number', nullable: true })
    sort_pos: number | null = null;

    // @ManyToOne(() => KbaseItem, { joinColumn: 'child_id' })
    // child!: KbaseItem;
    //
    // @ManyToOne(() => KbaseItem, { joinColumn: 'parent_id' })
    // parent!: KbaseItem;
}
