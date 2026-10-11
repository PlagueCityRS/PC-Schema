import { Migration } from '@mikro-orm/migrations';

export class Migration20261011205300 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`account\` (\`id\` integer not null primary key autoincrement, \`email\` text null, \`oauth\` text not null, \`created_at\` datetime not null default current_timestamp, \`last_login\` datetime null, \`character_limit\` integer not null default 3);`);

    this.addSql(`create table \`character\` (\`id\` integer not null primary key autoincrement, \`username\` text not null, \`password\` text not null, \`staffmodlevel\` integer not null default 0, \`password_updated\` datetime null, \`registration_ip\` text not null, \`registration_date\` datetime not null default current_timestamp, \`muted_until\` datetime null, \`banned_until\` datetime null, \`members\` datetime null, \`account_id\` integer not null, \`post_count\` integer not null default 0, \`forum_muted_until\` datetime null, \`signature\` text null, constraint \`character_account_id_foreign\` foreign key(\`account_id\`) references \`account\`(\`id\`) on update cascade);`);
    this.addSql(`create unique index \`character_username_unique\` on \`character\` (\`username\`);`);
    this.addSql(`create index \`character_account_id_index\` on \`character\` (\`account_id\`);`);

    this.addSql(`create table \`character_login\` (\`character_id\` integer not null, \`profile\` text not null, \`logged_in\` integer not null, \`login_time\` datetime not null, \`logged_out\` integer not null, \`logout_time\` datetime not null, constraint \`character_login_character_id_foreign\` foreign key(\`character_id\`) references \`character\`(\`id\`) on delete cascade on update cascade, primary key (\`character_id\`));`);

    this.addSql(`create table \`forum_category\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`sort_order\` integer not null);`);

    this.addSql(`create table \`forum\` (\`id\` integer not null primary key autoincrement, \`code\` integer not null, \`name\` text not null, \`last_post_at\` datetime null, \`description\` text not null, \`icon\` text not null, \`sort_order\` integer not null default 0, \`category_id\` integer not null, \`forum_rules\` text null, constraint \`forum_category_id_foreign\` foreign key(\`category_id\`) references \`forum_category\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`forum_category_id_index\` on \`forum\` (\`category_id\`);`);

    this.addSql(`create table \`forum_group\` (\`id\` integer not null primary key autoincrement, \`sort_order\` integer not null default 0, \`name\` text not null, \`deletable\` integer not null default true, \`post_decoration_class\` text null, \`display_string\` text null, \`permissions\` bigint not null default '0', \`max_title_chars\` integer not null default 30, \`max_post_chars\` integer not null default 2000);`);

    this.addSql(`create table \`forum_group_characters\` (\`forum_group_id\` integer not null, \`character_id\` integer not null, constraint \`forum_group_characters_forum_group_id_foreign\` foreign key(\`forum_group_id\`) references \`forum_group\`(\`id\`) on delete cascade on update cascade, constraint \`forum_group_characters_character_id_foreign\` foreign key(\`character_id\`) references \`character\`(\`id\`) on delete cascade on update cascade, primary key (\`forum_group_id\`, \`character_id\`));`);
    this.addSql(`create index \`forum_group_characters_forum_group_id_index\` on \`forum_group_characters\` (\`forum_group_id\`);`);
    this.addSql(`create index \`forum_group_characters_character_id_index\` on \`forum_group_characters\` (\`character_id\`);`);

    this.addSql(`create table \`forum_permission\` (\`id\` integer not null primary key autoincrement, \`forum_id\` integer not null, \`user_group_id\` integer null, \`is_public\` integer not null default false, \`can_view\` integer not null default true, \`can_create_thread\` integer not null default true, constraint \`forum_permission_forum_id_foreign\` foreign key(\`forum_id\`) references \`forum\`(\`id\`) on update cascade, constraint \`forum_permission_user_group_id_foreign\` foreign key(\`user_group_id\`) references \`forum_group\`(\`id\`) on delete set null on update cascade);`);
    this.addSql(`create index \`forum_permission_forum_id_index\` on \`forum_permission\` (\`forum_id\`);`);
    this.addSql(`create index \`forum_permission_user_group_id_index\` on \`forum_permission\` (\`user_group_id\`);`);

    this.addSql(`create table \`forum_thread\` (\`id\` integer not null primary key autoincrement, \`code\` integer not null, \`title\` text not null, \`last_post_at\` datetime not null, \`last_post_by_id\` integer not null, \`is_sticky\` integer not null default false, \`auto_hide\` integer not null default false, \`is_locked\` integer not null default false, \`is_escalated\` integer not null default false, \`escalated_at\` datetime null, \`escalated_by_id\` integer null, \`escalation_reason\` text null, \`is_moved\` integer not null default false, \`created_at\` datetime not null, \`last_bump_at\` datetime not null, \`bump_count\` integer not null default 0, \`moved_by_id\` integer null, \`moved_at\` datetime null, \`author_id\` integer not null, \`forum_id\` integer not null, \`is_hidden\` integer not null default 0, \`hidden_at\` datetime null, \`hidden_by_id\` integer null, \`dormant\` integer not null default false, constraint \`forum_thread_last_post_by_id_foreign\` foreign key(\`last_post_by_id\`) references \`character\`(\`id\`) on update cascade, constraint \`forum_thread_escalated_by_id_foreign\` foreign key(\`escalated_by_id\`) references \`character\`(\`id\`) on delete set null on update cascade, constraint \`forum_thread_moved_by_id_foreign\` foreign key(\`moved_by_id\`) references \`character\`(\`id\`) on delete set null on update cascade, constraint \`forum_thread_author_id_foreign\` foreign key(\`author_id\`) references \`character\`(\`id\`) on update cascade, constraint \`forum_thread_forum_id_foreign\` foreign key(\`forum_id\`) references \`forum\`(\`id\`) on update cascade, constraint \`forum_thread_hidden_by_id_foreign\` foreign key(\`hidden_by_id\`) references \`character\`(\`id\`) on delete set null on update cascade);`);
    this.addSql(`create index \`forum_thread_last_post_by_id_index\` on \`forum_thread\` (\`last_post_by_id\`);`);
    this.addSql(`create index \`forum_thread_escalated_by_id_index\` on \`forum_thread\` (\`escalated_by_id\`);`);
    this.addSql(`create index \`forum_thread_moved_by_id_index\` on \`forum_thread\` (\`moved_by_id\`);`);
    this.addSql(`create index \`forum_thread_author_id_index\` on \`forum_thread\` (\`author_id\`);`);
    this.addSql(`create index \`forum_thread_forum_id_index\` on \`forum_thread\` (\`forum_id\`);`);
    this.addSql(`create index \`forum_thread_hidden_by_id_index\` on \`forum_thread\` (\`hidden_by_id\`);`);

    this.addSql(`create table \`forum_post\` (\`id\` integer not null primary key autoincrement, \`code\` integer not null, \`author_id\` integer not null, \`content\` text not null, \`created_at\` datetime not null, \`last_edit_date\` datetime null, \`last_edit_by_id\` integer null, \`is_hidden\` integer not null default 0, \`hidden_at\` datetime null, \`hidden_by_id\` integer null, \`thread_id\` integer not null, \`post_decoration_class\` text null, \`display_string\` text null, constraint \`forum_post_author_id_foreign\` foreign key(\`author_id\`) references \`character\`(\`id\`) on update cascade, constraint \`forum_post_last_edit_by_id_foreign\` foreign key(\`last_edit_by_id\`) references \`character\`(\`id\`) on delete set null on update cascade, constraint \`forum_post_hidden_by_id_foreign\` foreign key(\`hidden_by_id\`) references \`character\`(\`id\`) on delete set null on update cascade, constraint \`forum_post_thread_id_foreign\` foreign key(\`thread_id\`) references \`forum_thread\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`forum_post_author_id_index\` on \`forum_post\` (\`author_id\`);`);
    this.addSql(`create index \`forum_post_last_edit_by_id_index\` on \`forum_post\` (\`last_edit_by_id\`);`);
    this.addSql(`create index \`forum_post_hidden_by_id_index\` on \`forum_post\` (\`hidden_by_id\`);`);
    this.addSql(`create index \`forum_post_thread_id_index\` on \`forum_post\` (\`thread_id\`);`);
    this.addSql(`create unique index \`forum_post_thread_id_code_unique\` on \`forum_post\` (\`thread_id\`, \`code\`);`);

    this.addSql(`create table \`forum_post_highlighted_by\` (\`forum_post_id\` integer not null, \`character_id\` integer not null, constraint \`forum_post_highlighted_by_forum_post_id_foreign\` foreign key(\`forum_post_id\`) references \`forum_post\`(\`id\`) on delete cascade on update cascade, constraint \`forum_post_highlighted_by_character_id_foreign\` foreign key(\`character_id\`) references \`character\`(\`id\`) on delete cascade on update cascade, primary key (\`forum_post_id\`, \`character_id\`));`);
    this.addSql(`create index \`forum_post_highlighted_by_forum_post_id_index\` on \`forum_post_highlighted_by\` (\`forum_post_id\`);`);
    this.addSql(`create index \`forum_post_highlighted_by_character_id_index\` on \`forum_post_highlighted_by\` (\`character_id\`);`);

    this.addSql(`create table \`kbase_item\` (\`id\` integer not null primary key autoincrement, \`type\` tinyint not null, \`title\` text not null, \`display_size\` tinyint null, \`display_image\` text null, \`further_help\` longtext null);`);

    this.addSql(`create table \`kbase_category\` (\`cat_id\` integer not null, \`auto_sort\` integer not null default false, constraint \`kbase_category_cat_id_foreign\` foreign key(\`cat_id\`) references \`kbase_item\`(\`id\`) on delete cascade on update cascade, primary key (\`cat_id\`));`);
    this.addSql(`create index \`kbase_category_cat_id_index\` on \`kbase_category\` (\`cat_id\`);`);

    this.addSql(`create table \`kbase_article\` (\`article_id\` integer not null, \`content\` longtext not null, constraint \`kbase_article_article_id_foreign\` foreign key(\`article_id\`) references \`kbase_item\`(\`id\`) on delete cascade on update cascade, primary key (\`article_id\`));`);
    this.addSql(`create index \`kbase_article_article_id_index\` on \`kbase_article\` (\`article_id\`);`);

    this.addSql(`create table \`kbase_relationship\` (\`child_id\` integer not null, \`parent_id\` integer not null, \`sort_pos\` integer null, primary key (\`child_id\`, \`parent_id\`));`);

    this.addSql(`create table \`kbase_view\` (\`item_id\` integer not null, \`referrer\` text not null, \`views\` int not null default 1, primary key (\`item_id\`, \`referrer\`));`);

    this.addSql(`create table \`news_post\` (\`id\` integer not null primary key autoincrement, \`category\` integer not null, \`title\` text not null, \`description\` text null, \`content\` text not null, \`slug\` text null, \`icon\` text null, \`created\` datetime not null, \`updated\` datetime not null);`);

    this.addSql(`create table \`offence\` (\`id\` bigint not null, \`ip\` text not null, \`module\` integer not null default 2, \`character_id\` integer not null, \`appeal_id\` integer null, \`appeal_offence_id\` bigint null, \`appeal_offence_ip\` text null, \`created_at\` datetime not null, \`created_by_id\` integer not null, \`date\` integer not null, \`type\` integer not null, \`status\` integer not null, \`report_id\` integer null, \`blackmarks\` real not null, \`evidence\` text null, \`hide_evidence\` integer not null default false, \`penalty_type\` integer null, \`penalty_expires\` datetime null, \`expires\` datetime null, constraint \`offence_character_id_foreign\` foreign key(\`character_id\`) references \`character\`(\`id\`) on update cascade, constraint \`offence_appeal_id_appeal_offence_id_appeal_offence_ip_foreign\` foreign key(\`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`) references \`offence_appeal\`(\`id\`, \`offence_id\`, \`offence_ip\`) on delete set null on update cascade, constraint \`offence_created_by_id_foreign\` foreign key(\`created_by_id\`) references \`character\`(\`id\`) on update cascade, primary key (\`id\`, \`ip\`));`);
    this.addSql(`create unique index \`offence_id_unique\` on \`offence\` (\`id\`);`);
    this.addSql(`create index \`offence_character_id_index\` on \`offence\` (\`character_id\`);`);
    this.addSql(`create index \`offence_created_by_id_index\` on \`offence\` (\`created_by_id\`);`);
    this.addSql(`create index \`offence_appeal_id_appeal_offence_id_appeal_offence_ip_index\` on \`offence\` (\`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`);`);

    this.addSql(`create table \`offence_appeal\` (\`id\` integer not null, \`offence_id\` bigint not null, \`offence_ip\` text not null, \`status\` integer not null, \`appeal_text\` text not null, \`appeal_response\` text null, \`appeal_date\` datetime not null, constraint \`offence_appeal_offence_id_offence_ip_foreign\` foreign key(\`offence_id\`, \`offence_ip\`) references \`offence\`(\`id\`, \`ip\`) on update cascade, primary key (\`id\`, \`offence_id\`, \`offence_ip\`));`);
    this.addSql(`create unique index \`offence_appeal_id_unique\` on \`offence_appeal\` (\`id\`);`);
    this.addSql(`create index \`offence_appeal_offence_id_offence_ip_index\` on \`offence_appeal\` (\`offence_id\`, \`offence_ip\`);`);

    this.addSql(`create table \`ticketing_thread\` (\`id\` integer not null primary key autoincrement, \`title\` text not null, \`account_id\` integer not null, \`message_count\` integer not null default 1, \`read_at\` datetime null, \`created_at\` datetime not null, \`created_by\` integer not null, \`updated_at\` datetime not null, \`updated_by\` integer not null, \`locked_at\` datetime null, \`locked_by\` integer null, \`hidden_at\` datetime null, \`hidden_by\` integer null, constraint \`ticketing_thread_account_id_foreign\` foreign key(\`account_id\`) references \`character\`(\`id\`) on update cascade, constraint \`ticketing_thread_created_by_foreign\` foreign key(\`created_by\`) references \`character\`(\`id\`) on update cascade, constraint \`ticketing_thread_updated_by_foreign\` foreign key(\`updated_by\`) references \`character\`(\`id\`) on update cascade, constraint \`ticketing_thread_locked_by_foreign\` foreign key(\`locked_by\`) references \`character\`(\`id\`) on delete set null on update cascade, constraint \`ticketing_thread_hidden_by_foreign\` foreign key(\`hidden_by\`) references \`character\`(\`id\`) on delete set null on update cascade);`);
    this.addSql(`create index \`ticketing_thread_account_id_index\` on \`ticketing_thread\` (\`account_id\`);`);
    this.addSql(`create index \`ticketing_thread_created_by_index\` on \`ticketing_thread\` (\`created_by\`);`);
    this.addSql(`create index \`ticketing_thread_updated_by_index\` on \`ticketing_thread\` (\`updated_by\`);`);
    this.addSql(`create index \`ticketing_thread_locked_by_index\` on \`ticketing_thread\` (\`locked_by\`);`);
    this.addSql(`create index \`ticketing_thread_hidden_by_index\` on \`ticketing_thread\` (\`hidden_by\`);`);

    this.addSql(`create table \`ticketing_message\` (\`id\` integer not null primary key autoincrement, \`post_decoration_class\` text null, \`content\` text not null, \`created_at\` datetime not null, \`created_by\` integer not null, \`updated_at\` datetime not null, \`updated_by\` integer not null, \`hidden_at\` datetime null, \`hidden_by\` integer null, \`thread_id\` integer not null, constraint \`ticketing_message_created_by_foreign\` foreign key(\`created_by\`) references \`character\`(\`id\`) on update cascade, constraint \`ticketing_message_updated_by_foreign\` foreign key(\`updated_by\`) references \`character\`(\`id\`) on update cascade, constraint \`ticketing_message_hidden_by_foreign\` foreign key(\`hidden_by\`) references \`character\`(\`id\`) on delete set null on update cascade, constraint \`ticketing_message_thread_id_foreign\` foreign key(\`thread_id\`) references \`ticketing_thread\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`ticketing_message_created_by_index\` on \`ticketing_message\` (\`created_by\`);`);
    this.addSql(`create index \`ticketing_message_updated_by_index\` on \`ticketing_message\` (\`updated_by\`);`);
    this.addSql(`create index \`ticketing_message_hidden_by_index\` on \`ticketing_message\` (\`hidden_by\`);`);
    this.addSql(`create index \`ticketing_message_thread_id_index\` on \`ticketing_message\` (\`thread_id\`);`);
  }

}
