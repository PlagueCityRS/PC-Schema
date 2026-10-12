import { Migration } from '@mikro-orm/migrations';

export class Migration20261010231057 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`account\` modify \`email\` varchar(255);`);

    this.addSql(`alter table \`character\` modify \`signature\` text;`);

    this.addSql(`alter table \`forum\` modify \`forum_rules\` text;`);

    this.addSql(`alter table \`forum_group\` modify \`post_decoration_class\` varchar(255), modify \`display_string\` varchar(255), modify \`permissions\` bigint not null default '0';`);

    this.addSql(`alter table \`forum_thread\` modify \`escalation_reason\` varchar(255);`);

    this.addSql(`alter table \`forum_post\` modify \`post_decoration_class\` varchar(255), modify \`display_string\` varchar(255);`);

    this.addSql(`alter table \`kbase_item\` modify \`display_image\` varchar(255);`);

    this.addSql(`alter table \`offence\` modify \`appeal_offence_ip\` varchar(255), modify \`evidence\` text;`);

    this.addSql(`alter table \`offence_appeal\` modify \`appeal_response\` text;`);

    this.addSql(`alter table \`ticketing_message\` modify \`post_decoration_class\` varchar(255);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`forum_thread\` modify \`escalation_reason\` varchar(255) default 'NULL';`);

    this.addSql(`alter table \`account\` modify \`email\` varchar(255) default 'NULL';`);

    this.addSql(`alter table \`forum_post\` modify \`post_decoration_class\` varchar(255) default 'NULL', modify \`display_string\` varchar(255) default 'NULL';`);

    this.addSql(`alter table \`forum\` modify \`forum_rules\` text default ('NULL');`);

    this.addSql(`alter table \`offence\` modify \`appeal_offence_ip\` varchar(255) default 'NULL', modify \`evidence\` text default ('NULL');`);

    this.addSql(`alter table \`forum_group\` modify \`post_decoration_class\` varchar(255) default 'NULL', modify \`display_string\` varchar(255) default 'NULL', modify \`permissions\` bigint not null default 0;`);

    this.addSql(`alter table \`offence_appeal\` modify \`appeal_response\` text default ('NULL');`);

    this.addSql(`alter table \`kbase_item\` modify \`display_image\` varchar(255) default 'NULL';`);

    this.addSql(`alter table \`character\` modify \`signature\` text default ('NULL');`);

    this.addSql(`alter table \`ticketing_message\` modify \`post_decoration_class\` varchar(255) default 'NULL';`);
  }

}
