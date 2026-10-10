import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Offence, OffenceAppealRepository } from '#/db/Exports.js';

@Entity({ repository: () => OffenceAppealRepository })
export class OffenceAppeal {
    @PrimaryKey({ unique: true, type: 'number' })
    id!: number;

    @ManyToOne(() => Offence, { primary: true })
    offence!: Offence;

    @Property({ type: 'int' })
    status!: number;

    @Property({ type: 'text' })
    appealText!: string;

    @Property({ type: 'text', nullable: true })
    appealResponse?: string;

    @Property({ type: 'datetime' })
    appealDate?: Date;
}
