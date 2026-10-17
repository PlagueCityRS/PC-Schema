import { Migration } from '@mikro-orm/migrations';

export class Migration20261016223146 extends Migration {

  override name = 'Migration20261016223146';

  override up(): void | Promise<void> {
    this.addSql(`alter table \`offence_report\` add column \`review_feedback\` text not null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table \`offence_report\` drop column \`review_feedback\`;`);
  }

}
