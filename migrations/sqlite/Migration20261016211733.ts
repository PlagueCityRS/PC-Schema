import { Migration } from '@mikro-orm/migrations';

export class Migration20261016211733 extends Migration {

  override name = 'Migration20261016211733';

  override up(): void | Promise<void> {
    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`offence_report__temp_alter\` (\`id\` integer not null primary key autoincrement, \`offence_id\` bigint null, \`offence_ip\` text null, \`datetime\` datetime not null default current_timestamp, \`reporter_id\` integer not null, \`offender_id\` integer not null, \`profile\` text not null, \`world\` integer not null, \`loc_x\` integer not null, \`loc_y\` integer not null, \`loc_z\` integer not null, \`reason\` integer not null, \`reviewed\` integer not null default false, \`reviewed_at\` datetime not null default current_timestamp, \`reviewed_by_id\` integer null, constraint \`offence_report_offence_id_offence_ip_foreign\` foreign key (\`offence_id\`, \`offence_ip\`) references \`offence\` (\`id\`, \`ip\`) on update cascade on delete set null, constraint \`offence_report_reporter_id_foreign\` foreign key (\`reporter_id\`) references \`character\` (\`id\`), constraint \`offence_report_offender_id_foreign\` foreign key (\`offender_id\`) references \`character\` (\`id\`), constraint \`offence_report_reviewed_by_id_foreign\` foreign key (\`reviewed_by_id\`) references \`character\` (\`id\`) on delete set null);`);
    this.addSql(`insert into \`offence_report__temp_alter\` select \`id\`, \`offence_id\`, \`offence_ip\`, \`datetime\`, \`reporter_id\`, \`offender_id\`, \`profile\`, \`world\`, \`loc_x\`, \`loc_y\`, \`loc_z\`, \`reason\`, \`reviewed\`, \`reviewed_at\`, \`reviewed_by_id\` from \`offence_report\`;`);
    this.addSql(`drop table \`offence_report\`;`);
    this.addSql(`alter table \`offence_report__temp_alter\` rename to \`offence_report\`;`);
    this.addSql(`create unique index \`offence_report_offence_id_offence_ip_unique\` on \`offence_report\` (\`offence_id\`, \`offence_ip\`);`);
    this.addSql(`create index \`offence_report_reporter_id_index\` on \`offence_report\` (\`reporter_id\`);`);
    this.addSql(`create index \`offence_report_offender_id_index\` on \`offence_report\` (\`offender_id\`);`);
    this.addSql(`create index \`offence_report_reviewed_by_id_index\` on \`offence_report\` (\`reviewed_by_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`offence_report__temp_alter\` (\`datetime\` datetime not null default current_timestamp, \`id\` integer not null primary key autoincrement, \`loc_x\` integer not null, \`loc_y\` integer not null, \`loc_z\` integer not null, \`offence_id\` bigint null, \`offence_ip\` text null, \`offender_id\` integer not null, \`profile\` text not null, \`reason\` integer not null, \`reporter_id\` integer not null, \`reviewed\` integer not null default false, \`reviewed_at\` datetime not null default current_timestamp, \`reviewed_by_id\` integer not null, \`world\` integer not null, constraint \`offence_report_offence_id_offence_ip_foreign\` foreign key (\`offence_id\`, \`offence_ip\`) references \`offence\` (\`id\`, \`ip\`) on update cascade on delete set null, constraint \`offence_report_offender_id_foreign\` foreign key (\`offender_id\`) references \`character\` (\`id\`), constraint \`offence_report_reporter_id_foreign\` foreign key (\`reporter_id\`) references \`character\` (\`id\`), constraint \`offence_report_reviewed_by_id_foreign\` foreign key (\`reviewed_by_id\`) references \`character\` (\`id\`));`);
    this.addSql(`insert into \`offence_report__temp_alter\` select \`datetime\`, \`id\`, \`loc_x\`, \`loc_y\`, \`loc_z\`, \`offence_id\`, \`offence_ip\`, \`offender_id\`, \`profile\`, \`reason\`, \`reporter_id\`, \`reviewed\`, \`reviewed_at\`, \`reviewed_by_id\`, \`world\` from \`offence_report\`;`);
    this.addSql(`drop table \`offence_report\`;`);
    this.addSql(`alter table \`offence_report__temp_alter\` rename to \`offence_report\`;`);
    this.addSql(`create unique index \`offence_report_offence_id_offence_ip_unique\` on \`offence_report\` (\`offence_id\`, \`offence_ip\`);`);
    this.addSql(`create index \`offence_report_offender_id_index\` on \`offence_report\` (\`offender_id\`);`);
    this.addSql(`create index \`offence_report_reporter_id_index\` on \`offence_report\` (\`reporter_id\`);`);
    this.addSql(`create index \`offence_report_reviewed_by_id_index\` on \`offence_report\` (\`reviewed_by_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);
  }

}
