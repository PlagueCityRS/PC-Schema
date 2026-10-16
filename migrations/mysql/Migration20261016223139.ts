import { Migration } from '@mikro-orm/migrations';

export class Migration20261016223139 extends Migration {

  override name = 'Migration20261016223139';

  override up(): void | Promise<void> {
    this.addSql(`alter table \`account\` modify \`email\` varchar(255) null;`);

    this.addSql(`alter table \`character\` modify \`signature\` text null;`);

    this.addSql(`alter table \`forum\` modify \`forum_rules\` text null;`);

    this.addSql(`alter table \`forum_group\` modify \`display_string\` varchar(255) null;`);
    this.addSql(`alter table \`forum_group\` modify \`permissions\` bigint not null default '0';`);
    this.addSql(`alter table \`forum_group\` modify \`post_decoration_class\` varchar(255) null;`);

    this.addSql(`alter table \`forum_thread\` modify \`escalation_reason\` varchar(255) null;`);

    this.addSql(`alter table \`forum_post\` modify \`display_string\` varchar(255) null;`);
    this.addSql(`alter table \`forum_post\` modify \`post_decoration_class\` varchar(255) null;`);

    this.addSql(`alter table \`kbase_item\` modify \`display_image\` varchar(255) null;`);

    this.addSql(`alter table \`news_post\` modify \`description\` text null;`);
    this.addSql(`alter table \`news_post\` modify \`icon\` varchar(255) null;`);
    this.addSql(`alter table \`news_post\` modify \`slug\` varchar(255) null;`);

    this.addSql(`alter table \`offence\` modify \`appeal_offence_ip\` varchar(255) null;`);
    this.addSql(`alter table \`offence\` modify \`evidence\` text null;`);

    this.addSql(`alter table \`offence_appeal\` modify \`appeal_response\` text null;`);

    this.addSql(`alter table \`offence_report\` add \`review_feedback\` varchar(255) not null;`);
    this.addSql(`alter table \`offence_report\` modify \`offence_ip\` varchar(255) null;`);

    this.addSql(`alter table \`ticketing_message\` modify \`post_decoration_class\` varchar(255) null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table \`account\` modify \`email\` varchar(255) null default 'NULL';`);

    this.addSql(`alter table \`character\` modify \`signature\` text null default ('NULL');`);

    this.addSql(`alter table \`forum\` modify \`forum_rules\` text null default ('NULL');`);

    this.addSql(`alter table \`forum_group\` modify \`post_decoration_class\` varchar(255) null default 'NULL';`);
    this.addSql(`alter table \`forum_group\` modify \`display_string\` varchar(255) null default 'NULL';`);
    this.addSql(`alter table \`forum_group\` modify \`permissions\` bigint not null default 0;`);

    this.addSql(`alter table \`forum_post\` modify \`post_decoration_class\` varchar(255) null default 'NULL';`);
    this.addSql(`alter table \`forum_post\` modify \`display_string\` varchar(255) null default 'NULL';`);

    this.addSql(`alter table \`forum_thread\` modify \`escalation_reason\` varchar(255) null default 'NULL';`);

    this.addSql(`alter table \`kbase_item\` modify \`display_image\` varchar(255) null default 'NULL';`);

    this.addSql(`alter table \`news_post\` modify \`description\` text null default ('NULL');`);
    this.addSql(`alter table \`news_post\` modify \`slug\` varchar(255) null default 'NULL';`);
    this.addSql(`alter table \`news_post\` modify \`icon\` varchar(255) null default 'NULL';`);

    this.addSql(`alter table \`offence\` modify \`appeal_offence_ip\` varchar(255) null default 'NULL';`);
    this.addSql(`alter table \`offence\` modify \`evidence\` text null default ('NULL');`);

    this.addSql(`alter table \`offence_appeal\` modify \`appeal_response\` text null default ('NULL');`);

    this.addSql(`alter table \`offence_report\` drop column \`review_feedback\`;`);
    this.addSql(`alter table \`offence_report\` modify \`offence_ip\` varchar(255) null default 'NULL';`);

    this.addSql(`alter table \`ticketing_message\` modify \`post_decoration_class\` varchar(255) null default 'NULL';`);
  }

}
