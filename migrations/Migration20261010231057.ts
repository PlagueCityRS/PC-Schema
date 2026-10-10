import { Migration } from '@mikro-orm/migrations';

export class Migration20261010231057 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`news_post\` (\`id\` int unsigned not null auto_increment primary key, \`category\` int not null, \`title\` varchar(255) not null, \`description\` text null, \`content\` text not null, \`slug\` varchar(255) null, \`icon\` varchar(255) null, \`created\` datetime not null, \`updated\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`drop table if exists \`newspost\`;`);

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
    this.addSql(`create table \`newspost\` (\`id\` int unsigned not null auto_increment primary key, \`category\` int not null, \`title\` varchar(255) not null, \`description\` text null default ('NULL'), \`content\` text not null, \`slug\` varchar(255) null default 'NULL', \`icon\` varchar(255) null default 'NULL', \`created\` datetime not null, \`updated\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`drop table if exists \`news_post\`;`);

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
