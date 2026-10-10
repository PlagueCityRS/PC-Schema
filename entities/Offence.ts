import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { OffenceRepository, Character, OffenceAppeal } from '#/db/Exports.js';

// This is a mildly chonky table, a mid-chonk, lil chonker, just a lil mildly chonky guy
@Entity({ repository: () => OffenceRepository })
export class Offence {
    @PrimaryKey({ primary: true, unique: true, type: 'bigint' })
    id!: bigint;

    @Property({ type: 'int', default: 2 })
    module: number = 2;

    @ManyToOne(() => Character)
    character!: Character;

    @ManyToOne(() => OffenceAppeal, { nullable: true })
    appeal?: OffenceAppeal;

    @Property({ type: 'datetime' })
    createdAt!: Date;

    @ManyToOne(() => Character)
    createdBy!: Character;

    @Property({ type: 'int' })
    date!: number;

    @Property({ type: 'smallint' })
    type!: number;

    @Property({ type: 'smallint' })
    status!: number;

    @Property({ primary: true, type: 'string', length: 255 })
    ip!: string;

    @Property({ type: 'int', nullable: true })
    reportId?: number;

    @Property({ type: 'float' })
    blackmarks!: number;

    @Property({ type: 'text', nullable: true })
    evidence?: string;

    @Property({ type: 'boolean', default: false })
    hideEvidence: boolean = false;

    @Property({ type: 'tinyint', nullable: true })
    penaltyType?: number;

    @Property({ type: 'datetime', nullable: true })
    penaltyExpires?: Date;

    @Property({ type: 'datetime', nullable: true })
    expires?: Date;
}
