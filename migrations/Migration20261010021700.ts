import { Migration } from '@mikro-orm/migrations';

export class Migration20261010021700 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`account\` (\`id\` int unsigned not null auto_increment primary key, \`email\` varchar(255) null, \`oauth\` varchar(255) not null, \`created_at\` datetime not null default current_timestamp, \`last_login\` datetime null, \`character_limit\` int not null default 3) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`character\` (\`id\` int unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`password\` varchar(255) not null, \`staffmodlevel\` int not null default 0, \`password_updated\` datetime null, \`registration_ip\` varchar(255) not null, \`registration_date\` datetime not null default current_timestamp, \`muted_until\` datetime null, \`banned_until\` datetime null, \`members\` datetime null, \`account_id\` int unsigned not null, \`post_count\` int not null default 0, \`forum_muted_until\` datetime null, \`signature\` text null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`character\` add unique \`character_username_unique\`(\`username\`);`);
    this.addSql(`alter table \`character\` add index \`character_account_id_index\`(\`account_id\`);`);

    this.addSql(`create table \`character_login\` (\`character_id\` int unsigned not null, \`profile\` text not null, \`logged_in\` tinyint(1) not null, \`login_time\` datetime not null, \`logged_out\` tinyint(1) not null, \`logout_time\` datetime not null, primary key (\`character_id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`forum_category\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`sort_order\` int not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`forum\` (\`id\` int unsigned not null auto_increment primary key, \`code\` int not null, \`name\` varchar(255) not null, \`last_post_at\` datetime null, \`description\` text not null, \`icon\` varchar(255) not null, \`sort_order\` int not null default 0, \`category_id\` int unsigned not null, \`forum_rules\` text null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`forum\` add index \`forum_category_id_index\`(\`category_id\`);`);

    this.addSql(`create table \`forum_group\` (\`id\` int unsigned not null auto_increment primary key, \`sort_order\` int not null default 0, \`name\` varchar(255) not null, \`deletable\` tinyint(1) not null default true, \`post_decoration_class\` varchar(255) null, \`display_string\` varchar(255) null, \`permissions\` bigint not null default '0', \`max_title_chars\` int not null default 30, \`max_post_chars\` int not null default 2000) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`forum_group_characters\` (\`forum_group_id\` int unsigned not null, \`character_id\` int unsigned not null, primary key (\`forum_group_id\`, \`character_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`forum_group_characters\` add index \`forum_group_characters_forum_group_id_index\`(\`forum_group_id\`);`);
    this.addSql(`alter table \`forum_group_characters\` add index \`forum_group_characters_character_id_index\`(\`character_id\`);`);

    this.addSql(`create table \`forum_permission\` (\`id\` int unsigned not null auto_increment primary key, \`forum_id\` int unsigned not null, \`user_group_id\` int unsigned null, \`is_public\` tinyint(1) not null default false, \`can_view\` tinyint(1) not null default true, \`can_create_thread\` tinyint(1) not null default true) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`forum_permission\` add index \`forum_permission_forum_id_index\`(\`forum_id\`);`);
    this.addSql(`alter table \`forum_permission\` add index \`forum_permission_user_group_id_index\`(\`user_group_id\`);`);

    this.addSql(`create table \`forum_thread\` (\`id\` int unsigned not null auto_increment primary key, \`code\` int not null, \`title\` varchar(255) not null, \`last_post_at\` datetime not null, \`last_post_by_id\` int unsigned not null, \`is_sticky\` tinyint(1) not null default false, \`auto_hide\` tinyint(1) not null default false, \`is_locked\` tinyint(1) not null default false, \`is_escalated\` tinyint(1) not null default false, \`escalated_at\` datetime null, \`escalated_by_id\` int unsigned null, \`escalation_reason\` varchar(255) null, \`is_moved\` tinyint(1) not null default false, \`created_at\` datetime not null, \`last_bump_at\` datetime not null, \`bump_count\` int not null default 0, \`moved_by_id\` int unsigned null, \`moved_at\` datetime null, \`author_id\` int unsigned not null, \`forum_id\` int unsigned not null, \`is_hidden\` int not null default 0, \`hidden_at\` datetime null, \`hidden_by_id\` int unsigned null, \`dormant\` tinyint(1) not null default false) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`forum_thread\` add index \`forum_thread_last_post_by_id_index\`(\`last_post_by_id\`);`);
    this.addSql(`alter table \`forum_thread\` add index \`forum_thread_escalated_by_id_index\`(\`escalated_by_id\`);`);
    this.addSql(`alter table \`forum_thread\` add index \`forum_thread_moved_by_id_index\`(\`moved_by_id\`);`);
    this.addSql(`alter table \`forum_thread\` add index \`forum_thread_author_id_index\`(\`author_id\`);`);
    this.addSql(`alter table \`forum_thread\` add index \`forum_thread_forum_id_index\`(\`forum_id\`);`);
    this.addSql(`alter table \`forum_thread\` add index \`forum_thread_hidden_by_id_index\`(\`hidden_by_id\`);`);

    this.addSql(`create table \`forum_post\` (\`id\` int unsigned not null auto_increment primary key, \`code\` int not null, \`author_id\` int unsigned not null, \`content\` text not null, \`created_at\` datetime not null, \`last_edit_date\` datetime null, \`last_edit_by_id\` int unsigned null, \`is_hidden\` int not null default 0, \`hidden_at\` datetime null, \`hidden_by_id\` int unsigned null, \`thread_id\` int unsigned not null, \`post_decoration_class\` varchar(255) null, \`display_string\` varchar(255) null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`forum_post\` add index \`forum_post_author_id_index\`(\`author_id\`);`);
    this.addSql(`alter table \`forum_post\` add index \`forum_post_last_edit_by_id_index\`(\`last_edit_by_id\`);`);
    this.addSql(`alter table \`forum_post\` add index \`forum_post_hidden_by_id_index\`(\`hidden_by_id\`);`);
    this.addSql(`alter table \`forum_post\` add index \`forum_post_thread_id_index\`(\`thread_id\`);`);
    this.addSql(`alter table \`forum_post\` add unique \`forum_post_thread_id_code_unique\`(\`thread_id\`, \`code\`);`);

    this.addSql(`create table \`forum_post_highlighted_by\` (\`forum_post_id\` int unsigned not null, \`character_id\` int unsigned not null, primary key (\`forum_post_id\`, \`character_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`forum_post_highlighted_by\` add index \`forum_post_highlighted_by_forum_post_id_index\`(\`forum_post_id\`);`);
    this.addSql(`alter table \`forum_post_highlighted_by\` add index \`forum_post_highlighted_by_character_id_index\`(\`character_id\`);`);

    this.addSql(`create table \`kbase_item\` (\`id\` int unsigned not null auto_increment primary key, \`type\` tinyint not null, \`title\` varchar(255) not null, \`display_size\` tinyint null, \`display_image\` varchar(255) null, \`further_help\` longtext null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`kbase_category\` (\`cat_id\` int unsigned not null, \`auto_sort\` tinyint(1) not null default false, primary key (\`cat_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`kbase_category\` add index \`kbase_category_cat_id_index\`(\`cat_id\`);`);

    this.addSql(`create table \`kbase_article\` (\`article_id\` int unsigned not null, \`content\` longtext not null, primary key (\`article_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`kbase_article\` add index \`kbase_article_article_id_index\`(\`article_id\`);`);

    this.addSql(`create table \`kbase_relationship\` (\`child_id\` int unsigned not null, \`parent_id\` int unsigned not null, \`sort_pos\` int null, primary key (\`child_id\`, \`parent_id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`kbase_view\` (\`item_id\` int unsigned not null, \`referrer\` varchar(255) not null, \`views\` int not null default 1, primary key (\`item_id\`, \`referrer\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`newspost\` (\`id\` int unsigned not null auto_increment primary key, \`category\` int not null, \`title\` varchar(255) not null, \`description\` text null, \`content\` text not null, \`slug\` varchar(255) null, \`icon\` varchar(255) null, \`created\` datetime not null, \`updated\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`offence\` (\`id\` bigint unsigned not null, \`ip\` varchar(255) not null, \`module\` int not null default 2, \`character_id\` int unsigned not null, \`appeal_id\` int unsigned null, \`appeal_offence_id\` bigint unsigned null, \`appeal_offence_ip\` varchar(255) null, \`created_at\` datetime not null, \`created_by_id\` int unsigned not null, \`date\` int not null, \`type\` smallint not null, \`status\` smallint not null, \`report_id\` int null, \`blackmarks\` float not null, \`evidence\` text null, \`hide_evidence\` tinyint(1) not null default false, \`penalty_type\` tinyint null, \`penalty_expires\` datetime null, \`expires\` datetime null, primary key (\`id\`, \`ip\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`offence\` add unique \`offence_id_unique\`(\`id\`);`);
    this.addSql(`alter table \`offence\` add index \`offence_character_id_index\`(\`character_id\`);`);
    this.addSql(`alter table \`offence\` add index \`offence_created_by_id_index\`(\`created_by_id\`);`);
    this.addSql(`alter table \`offence\` add index \`offence_appeal_id_appeal_offence_id_appeal_offence_ip_index\`(\`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`);`);

    this.addSql(`create table \`offence_appeal\` (\`id\` int unsigned not null, \`offence_id\` bigint unsigned not null, \`offence_ip\` varchar(255) not null, \`status\` int not null, \`appeal_text\` text not null, \`appeal_response\` text null, \`appeal_date\` datetime not null, primary key (\`id\`, \`offence_id\`, \`offence_ip\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`offence_appeal\` add unique \`offence_appeal_id_unique\`(\`id\`);`);
    this.addSql(`alter table \`offence_appeal\` add index \`offence_appeal_offence_id_offence_ip_index\`(\`offence_id\`, \`offence_ip\`);`);

    this.addSql(`create table \`ticketing_thread\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(255) not null, \`account_id\` int unsigned not null, \`message_count\` int not null default 1, \`read_at\` datetime null, \`created_at\` datetime not null, \`created_by\` int unsigned not null, \`updated_at\` datetime not null, \`updated_by\` int unsigned not null, \`locked_at\` datetime null, \`locked_by\` int unsigned null, \`hidden_at\` datetime null, \`hidden_by\` int unsigned null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`ticketing_thread\` add index \`ticketing_thread_account_id_index\`(\`account_id\`);`);
    this.addSql(`alter table \`ticketing_thread\` add index \`ticketing_thread_created_by_index\`(\`created_by\`);`);
    this.addSql(`alter table \`ticketing_thread\` add index \`ticketing_thread_updated_by_index\`(\`updated_by\`);`);
    this.addSql(`alter table \`ticketing_thread\` add index \`ticketing_thread_locked_by_index\`(\`locked_by\`);`);
    this.addSql(`alter table \`ticketing_thread\` add index \`ticketing_thread_hidden_by_index\`(\`hidden_by\`);`);

    this.addSql(`create table \`ticketing_message\` (\`id\` int unsigned not null auto_increment primary key, \`post_decoration_class\` varchar(255) null, \`content\` text not null, \`created_at\` datetime not null, \`created_by\` int unsigned not null, \`updated_at\` datetime not null, \`updated_by\` int unsigned not null, \`hidden_at\` datetime null, \`hidden_by\` int unsigned null, \`thread_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`ticketing_message\` add index \`ticketing_message_created_by_index\`(\`created_by\`);`);
    this.addSql(`alter table \`ticketing_message\` add index \`ticketing_message_updated_by_index\`(\`updated_by\`);`);
    this.addSql(`alter table \`ticketing_message\` add index \`ticketing_message_hidden_by_index\`(\`hidden_by\`);`);
    this.addSql(`alter table \`ticketing_message\` add index \`ticketing_message_thread_id_index\`(\`thread_id\`);`);

    this.addSql(`alter table \`character\` add constraint \`character_account_id_foreign\` foreign key (\`account_id\`) references \`account\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`character_login\` add constraint \`character_login_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`forum\` add constraint \`forum_category_id_foreign\` foreign key (\`category_id\`) references \`forum_category\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`forum_group_characters\` add constraint \`forum_group_characters_forum_group_id_foreign\` foreign key (\`forum_group_id\`) references \`forum_group\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`forum_group_characters\` add constraint \`forum_group_characters_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`forum_permission\` add constraint \`forum_permission_forum_id_foreign\` foreign key (\`forum_id\`) references \`forum\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`forum_permission\` add constraint \`forum_permission_user_group_id_foreign\` foreign key (\`user_group_id\`) references \`forum_group\` (\`id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_last_post_by_id_foreign\` foreign key (\`last_post_by_id\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_escalated_by_id_foreign\` foreign key (\`escalated_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_moved_by_id_foreign\` foreign key (\`moved_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_author_id_foreign\` foreign key (\`author_id\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_forum_id_foreign\` foreign key (\`forum_id\`) references \`forum\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_hidden_by_id_foreign\` foreign key (\`hidden_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`forum_post\` add constraint \`forum_post_author_id_foreign\` foreign key (\`author_id\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`forum_post\` add constraint \`forum_post_last_edit_by_id_foreign\` foreign key (\`last_edit_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`forum_post\` add constraint \`forum_post_hidden_by_id_foreign\` foreign key (\`hidden_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`forum_post\` add constraint \`forum_post_thread_id_foreign\` foreign key (\`thread_id\`) references \`forum_thread\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`forum_post_highlighted_by\` add constraint \`forum_post_highlighted_by_forum_post_id_foreign\` foreign key (\`forum_post_id\`) references \`forum_post\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`forum_post_highlighted_by\` add constraint \`forum_post_highlighted_by_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`kbase_category\` add constraint \`kbase_category_cat_id_foreign\` foreign key (\`cat_id\`) references \`kbase_item\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`kbase_article\` add constraint \`kbase_article_article_id_foreign\` foreign key (\`article_id\`) references \`kbase_item\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`offence\` add constraint \`offence_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`offence\` add constraint \`offence_appeal_id_appeal_offence_id_appeal_offence_ip_foreign\` foreign key (\`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`) references \`offence_appeal\` (\`id\`, \`offence_id\`, \`offence_ip\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`offence\` add constraint \`offence_created_by_id_foreign\` foreign key (\`created_by_id\`) references \`character\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`offence_appeal\` add constraint \`offence_appeal_offence_id_offence_ip_foreign\` foreign key (\`offence_id\`, \`offence_ip\`) references \`offence\` (\`id\`, \`ip\`) on update cascade;`);

    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_account_id_foreign\` foreign key (\`account_id\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_locked_by_foreign\` foreign key (\`locked_by\`) references \`character\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_thread_id_foreign\` foreign key (\`thread_id\`) references \`ticketing_thread\` (\`id\`) on update cascade;`);
  }

}
