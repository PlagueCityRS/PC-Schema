import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Offence, Character } from '../SchemaExports.js';
import { Opt, sql } from '@mikro-orm/core';

@Entity()
export class OffenceReport {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @OneToOne(() => Offence, { nullable: true })
    offence?: Offence;

    @Property({ type: 'datetime', defaultRaw: sql.now() })
    datetime?: Date & Opt;

    @Property({ type: 'boolean', default: false })
    pModMute: boolean = false;

    @ManyToOne(() => Character)
    reporter!: Character;

    @ManyToOne(() => Character)
    offender!: Character;

    @Property({ type: 'string' })
    profile!: string;

    @Property({ type: 'number' })
    world?: number;

    @Property({ type: 'number' })
    locX?: number;

    @Property({ type: 'number' })
    locY?: number;

    @Property({ type: 'number' })
    locZ?: number;

    // rule number
    @Property({ type: 'number' })
    reason?: number;

    @Property({ type: 'boolean', default: false })
    reviewed: boolean = false;

    @Property({ type: 'datetime', defaultRaw: sql.now() })
    reviewedAt?: Date & Opt;

    @ManyToOne(() => Character, { nullable: true })
    reviewedBy?: Character;

    @Property({ type: 'string' })
    reviewFeedback?: string;
}
