import { Migration } from '@mikro-orm/migrations';

export class Migration20261016211743 extends Migration {

  override name = 'Migration20261016211743';

  override up(): void | Promise<void> {
    this.addSql(`alter table \`offence_report\` drop foreign key \`offence_report_reviewed_by_id_foreign\`;`);

    this.addSql(`alter table \`offence_report\` modify \`reviewed_by_id\` int unsigned null;`);
    this.addSql(`alter table \`offence_report\` add constraint \`offence_report_reviewed_by_id_foreign\` foreign key (\`reviewed_by_id\`) references \`character\` (\`id\`) on delete set null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table \`offence_report\` drop foreign key \`offence_report_reviewed_by_id_foreign\`;`);

    this.addSql(`alter table \`offence_report\` modify \`reviewed_by_id\` int unsigned not null;`);
    this.addSql(`alter table \`offence_report\` add constraint \`offence_report_reviewed_by_id_foreign\` foreign key (\`reviewed_by_id\`) references \`character\` (\`id\`);`);
  }

}
