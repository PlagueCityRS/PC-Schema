import { Migration } from '@mikro-orm/migrations';

export class Migration20261016211328 extends Migration {

  override name = 'Migration20261016211328';

  override up(): void | Promise<void> {
    this.addSql(`create table \`offence_report\` (\`id\` integer not null primary key autoincrement, \`offence_id\` bigint null, \`offence_ip\` text null, \`datetime\` datetime not null default current_timestamp, \`reporter_id\` integer not null, \`offender_id\` integer not null, \`profile\` text not null, \`world\` integer not null, \`loc_x\` integer not null, \`loc_y\` integer not null, \`loc_z\` integer not null, \`reason\` integer not null, \`reviewed\` integer not null default false, \`reviewed_at\` datetime not null default current_timestamp, \`reviewed_by_id\` integer not null, constraint \`offence_report_offence_id_offence_ip_foreign\` foreign key (\`offence_id\`, \`offence_ip\`) references \`offence\` (\`id\`, \`ip\`) on update cascade on delete set null, constraint \`offence_report_reporter_id_foreign\` foreign key (\`reporter_id\`) references \`character\` (\`id\`), constraint \`offence_report_offender_id_foreign\` foreign key (\`offender_id\`) references \`character\` (\`id\`), constraint \`offence_report_reviewed_by_id_foreign\` foreign key (\`reviewed_by_id\`) references \`character\` (\`id\`));`);
    this.addSql(`create unique index \`offence_report_offence_id_offence_ip_unique\` on \`offence_report\` (\`offence_id\`, \`offence_ip\`);`);
    this.addSql(`create index \`offence_report_reporter_id_index\` on \`offence_report\` (\`reporter_id\`);`);
    this.addSql(`create index \`offence_report_offender_id_index\` on \`offence_report\` (\`offender_id\`);`);
    this.addSql(`create index \`offence_report_reviewed_by_id_index\` on \`offence_report\` (\`reviewed_by_id\`);`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`character__temp_alter\` (\`id\` integer not null primary key autoincrement, \`username\` text not null, \`password\` text not null, \`staffmodlevel\` integer not null default 0, \`password_updated\` datetime null, \`registration_ip\` text not null, \`registration_date\` datetime not null default current_timestamp, \`muted_until\` datetime null, \`banned_until\` datetime null, \`members\` datetime null, \`account_id\` integer not null, \`post_count\` integer not null default 0, \`forum_muted_until\` datetime null, \`signature\` text null, constraint \`character_account_id_foreign\` foreign key (\`account_id\`) references \`account\` (\`id\`));`);
    this.addSql(`insert into \`character__temp_alter\` select \`id\`, \`username\`, \`password\`, \`staffmodlevel\`, \`password_updated\`, \`registration_ip\`, \`registration_date\`, \`muted_until\`, \`banned_until\`, \`members\`, \`account_id\`, \`post_count\`, \`forum_muted_until\`, \`signature\` from \`character\`;`);
    this.addSql(`drop table \`character\`;`);
    this.addSql(`alter table \`character__temp_alter\` rename to \`character\`;`);
    this.addSql(`create unique index \`character_username_unique\` on \`character\` (\`username\`);`);
    this.addSql(`create index \`character_account_id_index\` on \`character\` (\`account_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum__temp_alter\` (\`id\` integer not null primary key autoincrement, \`code\` integer not null, \`name\` text not null, \`last_post_at\` datetime null, \`description\` text not null, \`icon\` text not null, \`sort_order\` integer not null default 0, \`category_id\` integer not null, \`forum_rules\` text null, constraint \`forum_category_id_foreign\` foreign key (\`category_id\`) references \`forum_category\` (\`id\`));`);
    this.addSql(`insert into \`forum__temp_alter\` select \`id\`, \`code\`, \`name\`, \`last_post_at\`, \`description\`, \`icon\`, \`sort_order\`, \`category_id\`, \`forum_rules\` from \`forum\`;`);
    this.addSql(`drop table \`forum\`;`);
    this.addSql(`alter table \`forum__temp_alter\` rename to \`forum\`;`);
    this.addSql(`create index \`forum_category_id_index\` on \`forum\` (\`category_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum_permission__temp_alter\` (\`id\` integer not null primary key autoincrement, \`forum_id\` integer not null, \`user_group_id\` integer null, \`is_public\` integer not null default false, \`can_view\` integer not null default true, \`can_create_thread\` integer not null default true, constraint \`forum_permission_forum_id_foreign\` foreign key (\`forum_id\`) references \`forum\` (\`id\`), constraint \`forum_permission_user_group_id_foreign\` foreign key (\`user_group_id\`) references \`forum_group\` (\`id\`) on delete set null);`);
    this.addSql(`insert into \`forum_permission__temp_alter\` select \`id\`, \`forum_id\`, \`user_group_id\`, \`is_public\`, \`can_view\`, \`can_create_thread\` from \`forum_permission\`;`);
    this.addSql(`drop table \`forum_permission\`;`);
    this.addSql(`alter table \`forum_permission__temp_alter\` rename to \`forum_permission\`;`);
    this.addSql(`create index \`forum_permission_forum_id_index\` on \`forum_permission\` (\`forum_id\`);`);
    this.addSql(`create index \`forum_permission_user_group_id_index\` on \`forum_permission\` (\`user_group_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum_thread__temp_alter\` (\`id\` integer not null primary key autoincrement, \`code\` integer not null, \`title\` text not null, \`last_post_at\` datetime not null, \`last_post_by_id\` integer not null, \`is_sticky\` integer not null default false, \`auto_hide\` integer not null default false, \`is_locked\` integer not null default false, \`is_escalated\` integer not null default false, \`escalated_at\` datetime null, \`escalated_by_id\` integer null, \`escalation_reason\` text null, \`is_moved\` integer not null default false, \`created_at\` datetime not null, \`last_bump_at\` datetime not null, \`bump_count\` integer not null default 0, \`moved_by_id\` integer null, \`moved_at\` datetime null, \`author_id\` integer not null, \`forum_id\` integer not null, \`is_hidden\` integer not null default 0, \`hidden_at\` datetime null, \`hidden_by_id\` integer null, \`dormant\` integer not null default false, constraint \`forum_thread_last_post_by_id_foreign\` foreign key (\`last_post_by_id\`) references \`character\` (\`id\`), constraint \`forum_thread_escalated_by_id_foreign\` foreign key (\`escalated_by_id\`) references \`character\` (\`id\`) on delete set null, constraint \`forum_thread_moved_by_id_foreign\` foreign key (\`moved_by_id\`) references \`character\` (\`id\`) on delete set null, constraint \`forum_thread_author_id_foreign\` foreign key (\`author_id\`) references \`character\` (\`id\`), constraint \`forum_thread_forum_id_foreign\` foreign key (\`forum_id\`) references \`forum\` (\`id\`), constraint \`forum_thread_hidden_by_id_foreign\` foreign key (\`hidden_by_id\`) references \`character\` (\`id\`) on delete set null);`);
    this.addSql(`insert into \`forum_thread__temp_alter\` select \`id\`, \`code\`, \`title\`, \`last_post_at\`, \`last_post_by_id\`, \`is_sticky\`, \`auto_hide\`, \`is_locked\`, \`is_escalated\`, \`escalated_at\`, \`escalated_by_id\`, \`escalation_reason\`, \`is_moved\`, \`created_at\`, \`last_bump_at\`, \`bump_count\`, \`moved_by_id\`, \`moved_at\`, \`author_id\`, \`forum_id\`, \`is_hidden\`, \`hidden_at\`, \`hidden_by_id\`, \`dormant\` from \`forum_thread\`;`);
    this.addSql(`drop table \`forum_thread\`;`);
    this.addSql(`alter table \`forum_thread__temp_alter\` rename to \`forum_thread\`;`);
    this.addSql(`create index \`forum_thread_last_post_by_id_index\` on \`forum_thread\` (\`last_post_by_id\`);`);
    this.addSql(`create index \`forum_thread_escalated_by_id_index\` on \`forum_thread\` (\`escalated_by_id\`);`);
    this.addSql(`create index \`forum_thread_moved_by_id_index\` on \`forum_thread\` (\`moved_by_id\`);`);
    this.addSql(`create index \`forum_thread_author_id_index\` on \`forum_thread\` (\`author_id\`);`);
    this.addSql(`create index \`forum_thread_forum_id_index\` on \`forum_thread\` (\`forum_id\`);`);
    this.addSql(`create index \`forum_thread_hidden_by_id_index\` on \`forum_thread\` (\`hidden_by_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum_post__temp_alter\` (\`id\` integer not null primary key autoincrement, \`code\` integer not null, \`author_id\` integer not null, \`content\` text not null, \`created_at\` datetime not null, \`last_edit_date\` datetime null, \`last_edit_by_id\` integer null, \`is_hidden\` integer not null default 0, \`hidden_at\` datetime null, \`hidden_by_id\` integer null, \`thread_id\` integer not null, \`post_decoration_class\` text null, \`display_string\` text null, constraint \`forum_post_author_id_foreign\` foreign key (\`author_id\`) references \`character\` (\`id\`), constraint \`forum_post_last_edit_by_id_foreign\` foreign key (\`last_edit_by_id\`) references \`character\` (\`id\`) on delete set null, constraint \`forum_post_hidden_by_id_foreign\` foreign key (\`hidden_by_id\`) references \`character\` (\`id\`) on delete set null, constraint \`forum_post_thread_id_foreign\` foreign key (\`thread_id\`) references \`forum_thread\` (\`id\`));`);
    this.addSql(`insert into \`forum_post__temp_alter\` select \`id\`, \`code\`, \`author_id\`, \`content\`, \`created_at\`, \`last_edit_date\`, \`last_edit_by_id\`, \`is_hidden\`, \`hidden_at\`, \`hidden_by_id\`, \`thread_id\`, \`post_decoration_class\`, \`display_string\` from \`forum_post\`;`);
    this.addSql(`drop table \`forum_post\`;`);
    this.addSql(`alter table \`forum_post__temp_alter\` rename to \`forum_post\`;`);
    this.addSql(`create index \`forum_post_author_id_index\` on \`forum_post\` (\`author_id\`);`);
    this.addSql(`create index \`forum_post_last_edit_by_id_index\` on \`forum_post\` (\`last_edit_by_id\`);`);
    this.addSql(`create index \`forum_post_hidden_by_id_index\` on \`forum_post\` (\`hidden_by_id\`);`);
    this.addSql(`create index \`forum_post_thread_id_index\` on \`forum_post\` (\`thread_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`offence__temp_alter\` (\`id\` bigint not null, \`ip\` text not null, \`module\` integer not null default 2, \`character_id\` integer not null, \`appeal_id\` integer null, \`appeal_offence_id\` bigint null, \`appeal_offence_ip\` text null, \`created_at\` datetime not null, \`created_by_id\` integer not null, \`date\` integer not null, \`type\` integer not null, \`status\` integer not null, \`blackmarks\` real not null, \`evidence\` text null, \`hide_evidence\` integer not null default false, \`penalty_type\` integer null, \`penalty_expires\` datetime null, \`expires\` datetime null, primary key (\`id\`, \`ip\`), constraint \`offence_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`), constraint \`offence_appeal_id_appeal_offence_id_appeal_offence_ip_foreign\` foreign key (\`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`) references \`offence_appeal\` (\`id\`, \`offence_id\`, \`offence_ip\`) on update cascade on delete set null, constraint \`offence_created_by_id_foreign\` foreign key (\`created_by_id\`) references \`character\` (\`id\`));`);
    this.addSql(`insert into \`offence__temp_alter\` select \`id\`, \`ip\`, \`module\`, \`character_id\`, \`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`, \`created_at\`, \`created_by_id\`, \`date\`, \`type\`, \`status\`, \`blackmarks\`, \`evidence\`, \`hide_evidence\`, \`penalty_type\`, \`penalty_expires\`, \`expires\` from \`offence\`;`);
    this.addSql(`drop table \`offence\`;`);
    this.addSql(`alter table \`offence__temp_alter\` rename to \`offence\`;`);
    this.addSql(`create unique index \`offence_id_unique\` on \`offence\` (\`id\`);`);
    this.addSql(`create index \`offence_character_id_index\` on \`offence\` (\`character_id\`);`);
    this.addSql(`create index \`offence_created_by_id_index\` on \`offence\` (\`created_by_id\`);`);
    this.addSql(`create index \`offence_appeal_id_appeal_offence_id_appeal_offence_ip_index\` on \`offence\` (\`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`offence_appeal__temp_alter\` (\`id\` integer not null, \`offence_id\` bigint not null, \`offence_ip\` text not null, \`status\` integer not null, \`appeal_text\` text not null, \`appeal_response\` text null, \`appeal_date\` datetime not null, primary key (\`id\`, \`offence_id\`, \`offence_ip\`), constraint \`offence_appeal_offence_id_offence_ip_foreign\` foreign key (\`offence_id\`, \`offence_ip\`) references \`offence\` (\`id\`, \`ip\`) on update cascade);`);
    this.addSql(`insert into \`offence_appeal__temp_alter\` select \`id\`, \`offence_id\`, \`offence_ip\`, \`status\`, \`appeal_text\`, \`appeal_response\`, \`appeal_date\` from \`offence_appeal\`;`);
    this.addSql(`drop table \`offence_appeal\`;`);
    this.addSql(`alter table \`offence_appeal__temp_alter\` rename to \`offence_appeal\`;`);
    this.addSql(`create unique index \`offence_appeal_id_unique\` on \`offence_appeal\` (\`id\`);`);
    this.addSql(`create index \`offence_appeal_offence_id_offence_ip_index\` on \`offence_appeal\` (\`offence_id\`, \`offence_ip\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`ticketing_thread__temp_alter\` (\`id\` integer not null primary key autoincrement, \`title\` text not null, \`account_id\` integer not null, \`message_count\` integer not null default 1, \`read_at\` datetime null, \`created_at\` datetime not null, \`created_by\` integer not null, \`updated_at\` datetime not null, \`updated_by\` integer not null, \`locked_at\` datetime null, \`locked_by\` integer null, \`hidden_at\` datetime null, \`hidden_by\` integer null, constraint \`ticketing_thread_account_id_foreign\` foreign key (\`account_id\`) references \`character\` (\`id\`), constraint \`ticketing_thread_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`), constraint \`ticketing_thread_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`), constraint \`ticketing_thread_locked_by_foreign\` foreign key (\`locked_by\`) references \`character\` (\`id\`) on delete set null, constraint \`ticketing_thread_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on delete set null);`);
    this.addSql(`insert into \`ticketing_thread__temp_alter\` select \`id\`, \`title\`, \`account_id\`, \`message_count\`, \`read_at\`, \`created_at\`, \`created_by\`, \`updated_at\`, \`updated_by\`, \`locked_at\`, \`locked_by\`, \`hidden_at\`, \`hidden_by\` from \`ticketing_thread\`;`);
    this.addSql(`drop table \`ticketing_thread\`;`);
    this.addSql(`alter table \`ticketing_thread__temp_alter\` rename to \`ticketing_thread\`;`);
    this.addSql(`create index \`ticketing_thread_account_id_index\` on \`ticketing_thread\` (\`account_id\`);`);
    this.addSql(`create index \`ticketing_thread_created_by_index\` on \`ticketing_thread\` (\`created_by\`);`);
    this.addSql(`create index \`ticketing_thread_updated_by_index\` on \`ticketing_thread\` (\`updated_by\`);`);
    this.addSql(`create index \`ticketing_thread_locked_by_index\` on \`ticketing_thread\` (\`locked_by\`);`);
    this.addSql(`create index \`ticketing_thread_hidden_by_index\` on \`ticketing_thread\` (\`hidden_by\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`ticketing_message__temp_alter\` (\`id\` integer not null primary key autoincrement, \`post_decoration_class\` text null, \`content\` text not null, \`created_at\` datetime not null, \`created_by\` integer not null, \`updated_at\` datetime not null, \`updated_by\` integer not null, \`hidden_at\` datetime null, \`hidden_by\` integer null, \`thread_id\` integer not null, constraint \`ticketing_message_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`), constraint \`ticketing_message_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`), constraint \`ticketing_message_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on delete set null, constraint \`ticketing_message_thread_id_foreign\` foreign key (\`thread_id\`) references \`ticketing_thread\` (\`id\`));`);
    this.addSql(`insert into \`ticketing_message__temp_alter\` select \`id\`, \`post_decoration_class\`, \`content\`, \`created_at\`, \`created_by\`, \`updated_at\`, \`updated_by\`, \`hidden_at\`, \`hidden_by\`, \`thread_id\` from \`ticketing_message\`;`);
    this.addSql(`drop table \`ticketing_message\`;`);
    this.addSql(`alter table \`ticketing_message__temp_alter\` rename to \`ticketing_message\`;`);
    this.addSql(`create index \`ticketing_message_created_by_index\` on \`ticketing_message\` (\`created_by\`);`);
    this.addSql(`create index \`ticketing_message_updated_by_index\` on \`ticketing_message\` (\`updated_by\`);`);
    this.addSql(`create index \`ticketing_message_hidden_by_index\` on \`ticketing_message\` (\`hidden_by\`);`);
    this.addSql(`create index \`ticketing_message_thread_id_index\` on \`ticketing_message\` (\`thread_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

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
    this.addSql(`drop table if exists \`offence_report\`;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`character__temp_alter\` (\`id\` integer not null primary key autoincrement, \`username\` TEXT not null, \`password\` TEXT not null, \`staffmodlevel\` INTEGER not null default 0, \`password_updated\` datetime null, \`registration_ip\` TEXT not null, \`registration_date\` datetime not null default current_timestamp, \`muted_until\` datetime null, \`banned_until\` datetime null, \`members\` datetime null, \`account_id\` INTEGER not null, \`post_count\` INTEGER not null default 0, \`forum_muted_until\` datetime null, \`signature\` TEXT null, constraint \`character_account_id_foreign\` foreign key (\`account_id\`) references \`account\` (\`id\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`character__temp_alter\` select \`id\`, \`username\`, \`password\`, \`staffmodlevel\`, \`password_updated\`, \`registration_ip\`, \`registration_date\`, \`muted_until\`, \`banned_until\`, \`members\`, \`account_id\`, \`post_count\`, \`forum_muted_until\`, \`signature\` from \`character\`;`);
    this.addSql(`drop table \`character\`;`);
    this.addSql(`alter table \`character__temp_alter\` rename to \`character\`;`);
    this.addSql(`create index \`character_account_id_index\` on \`character\` (\`account_id\`);`);
    this.addSql(`create unique index \`character_username_unique\` on \`character\` (\`username\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`character_login__temp_alter\` (\`character_id\` INTEGER not null primary key, \`profile\` TEXT not null, \`logged_in\` INTEGER not null, \`login_time\` datetime not null, \`logged_out\` INTEGER not null, \`logout_time\` datetime not null, constraint \`character_login_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade on delete cascade);`);
    this.addSql(`insert into \`character_login__temp_alter\` select \`character_id\`, \`profile\`, \`logged_in\`, \`login_time\`, \`logged_out\`, \`logout_time\` from \`character_login\`;`);
    this.addSql(`drop table \`character_login\`;`);
    this.addSql(`alter table \`character_login__temp_alter\` rename to \`character_login\`;`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum__temp_alter\` (\`id\` integer not null primary key autoincrement, \`code\` INTEGER not null, \`name\` TEXT not null, \`last_post_at\` datetime null, \`description\` TEXT not null, \`icon\` TEXT not null, \`sort_order\` INTEGER not null default 0, \`category_id\` INTEGER not null, \`forum_rules\` TEXT null, constraint \`forum_category_id_foreign\` foreign key (\`category_id\`) references \`forum_category\` (\`id\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`forum__temp_alter\` select \`id\`, \`code\`, \`name\`, \`last_post_at\`, \`description\`, \`icon\`, \`sort_order\`, \`category_id\`, \`forum_rules\` from \`forum\`;`);
    this.addSql(`drop table \`forum\`;`);
    this.addSql(`alter table \`forum__temp_alter\` rename to \`forum\`;`);
    this.addSql(`create index \`forum_category_id_index\` on \`forum\` (\`category_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum_group_characters__temp_alter\` (\`forum_group_id\` INTEGER not null primary key, \`character_id\` INTEGER not null primary key, primary key (\`forum_group_id\`, \`character_id\`), constraint \`forum_group_characters_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade on delete cascade, constraint \`forum_group_characters_forum_group_id_foreign\` foreign key (\`forum_group_id\`) references \`forum_group\` (\`id\`) on update cascade on delete cascade);`);
    this.addSql(`insert into \`forum_group_characters__temp_alter\` select \`forum_group_id\`, \`character_id\` from \`forum_group_characters\`;`);
    this.addSql(`drop table \`forum_group_characters\`;`);
    this.addSql(`alter table \`forum_group_characters__temp_alter\` rename to \`forum_group_characters\`;`);
    this.addSql(`create index \`forum_group_characters_character_id_index\` on \`forum_group_characters\` (\`character_id\`);`);
    this.addSql(`create index \`forum_group_characters_forum_group_id_index\` on \`forum_group_characters\` (\`forum_group_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum_permission__temp_alter\` (\`id\` integer not null primary key autoincrement, \`forum_id\` INTEGER not null, \`user_group_id\` INTEGER null, \`is_public\` INTEGER not null default false, \`can_view\` INTEGER not null default true, \`can_create_thread\` INTEGER not null default true, constraint \`forum_permission_user_group_id_foreign\` foreign key (\`user_group_id\`) references \`forum_group\` (\`id\`) on update cascade on delete set null, constraint \`forum_permission_forum_id_foreign\` foreign key (\`forum_id\`) references \`forum\` (\`id\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`forum_permission__temp_alter\` select \`id\`, \`forum_id\`, \`user_group_id\`, \`is_public\`, \`can_view\`, \`can_create_thread\` from \`forum_permission\`;`);
    this.addSql(`drop table \`forum_permission\`;`);
    this.addSql(`alter table \`forum_permission__temp_alter\` rename to \`forum_permission\`;`);
    this.addSql(`create index \`forum_permission_user_group_id_index\` on \`forum_permission\` (\`user_group_id\`);`);
    this.addSql(`create index \`forum_permission_forum_id_index\` on \`forum_permission\` (\`forum_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum_post__temp_alter\` (\`id\` integer not null primary key autoincrement, \`code\` INTEGER not null, \`author_id\` INTEGER not null, \`content\` TEXT not null, \`created_at\` datetime not null, \`last_edit_date\` datetime null, \`last_edit_by_id\` INTEGER null, \`is_hidden\` INTEGER not null default 0, \`hidden_at\` datetime null, \`hidden_by_id\` INTEGER null, \`thread_id\` INTEGER not null, \`post_decoration_class\` TEXT null, \`display_string\` TEXT null, constraint \`forum_post_thread_id_foreign\` foreign key (\`thread_id\`) references \`forum_thread\` (\`id\`) on update cascade on delete no action, constraint \`forum_post_hidden_by_id_foreign\` foreign key (\`hidden_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null, constraint \`forum_post_last_edit_by_id_foreign\` foreign key (\`last_edit_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null, constraint \`forum_post_author_id_foreign\` foreign key (\`author_id\`) references \`character\` (\`id\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`forum_post__temp_alter\` select \`id\`, \`code\`, \`author_id\`, \`content\`, \`created_at\`, \`last_edit_date\`, \`last_edit_by_id\`, \`is_hidden\`, \`hidden_at\`, \`hidden_by_id\`, \`thread_id\`, \`post_decoration_class\`, \`display_string\` from \`forum_post\`;`);
    this.addSql(`drop table \`forum_post\`;`);
    this.addSql(`alter table \`forum_post__temp_alter\` rename to \`forum_post\`;`);
    this.addSql(`create unique index \`forum_post_thread_id_code_unique\` on \`forum_post\` (\`thread_id\`, \`code\`);`);
    this.addSql(`create index \`forum_post_thread_id_index\` on \`forum_post\` (\`thread_id\`);`);
    this.addSql(`create index \`forum_post_hidden_by_id_index\` on \`forum_post\` (\`hidden_by_id\`);`);
    this.addSql(`create index \`forum_post_last_edit_by_id_index\` on \`forum_post\` (\`last_edit_by_id\`);`);
    this.addSql(`create index \`forum_post_author_id_index\` on \`forum_post\` (\`author_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum_post_highlighted_by__temp_alter\` (\`forum_post_id\` INTEGER not null primary key, \`character_id\` INTEGER not null primary key, primary key (\`forum_post_id\`, \`character_id\`), constraint \`forum_post_highlighted_by_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade on delete cascade, constraint \`forum_post_highlighted_by_forum_post_id_foreign\` foreign key (\`forum_post_id\`) references \`forum_post\` (\`id\`) on update cascade on delete cascade);`);
    this.addSql(`insert into \`forum_post_highlighted_by__temp_alter\` select \`forum_post_id\`, \`character_id\` from \`forum_post_highlighted_by\`;`);
    this.addSql(`drop table \`forum_post_highlighted_by\`;`);
    this.addSql(`alter table \`forum_post_highlighted_by__temp_alter\` rename to \`forum_post_highlighted_by\`;`);
    this.addSql(`create index \`forum_post_highlighted_by_character_id_index\` on \`forum_post_highlighted_by\` (\`character_id\`);`);
    this.addSql(`create index \`forum_post_highlighted_by_forum_post_id_index\` on \`forum_post_highlighted_by\` (\`forum_post_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`forum_thread__temp_alter\` (\`id\` integer not null primary key autoincrement, \`code\` INTEGER not null, \`title\` TEXT not null, \`last_post_at\` datetime not null, \`last_post_by_id\` INTEGER not null, \`is_sticky\` INTEGER not null default false, \`auto_hide\` INTEGER not null default false, \`is_locked\` INTEGER not null default false, \`is_escalated\` INTEGER not null default false, \`escalated_at\` datetime null, \`escalated_by_id\` INTEGER null, \`escalation_reason\` TEXT null, \`is_moved\` INTEGER not null default false, \`created_at\` datetime not null, \`last_bump_at\` datetime not null, \`bump_count\` INTEGER not null default 0, \`moved_by_id\` INTEGER null, \`moved_at\` datetime null, \`author_id\` INTEGER not null, \`forum_id\` INTEGER not null, \`is_hidden\` INTEGER not null default 0, \`hidden_at\` datetime null, \`hidden_by_id\` INTEGER null, \`dormant\` INTEGER not null default false, constraint \`forum_thread_hidden_by_id_foreign\` foreign key (\`hidden_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null, constraint \`forum_thread_forum_id_foreign\` foreign key (\`forum_id\`) references \`forum\` (\`id\`) on update cascade on delete no action, constraint \`forum_thread_author_id_foreign\` foreign key (\`author_id\`) references \`character\` (\`id\`) on update cascade on delete no action, constraint \`forum_thread_moved_by_id_foreign\` foreign key (\`moved_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null, constraint \`forum_thread_escalated_by_id_foreign\` foreign key (\`escalated_by_id\`) references \`character\` (\`id\`) on update cascade on delete set null, constraint \`forum_thread_last_post_by_id_foreign\` foreign key (\`last_post_by_id\`) references \`character\` (\`id\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`forum_thread__temp_alter\` select \`id\`, \`code\`, \`title\`, \`last_post_at\`, \`last_post_by_id\`, \`is_sticky\`, \`auto_hide\`, \`is_locked\`, \`is_escalated\`, \`escalated_at\`, \`escalated_by_id\`, \`escalation_reason\`, \`is_moved\`, \`created_at\`, \`last_bump_at\`, \`bump_count\`, \`moved_by_id\`, \`moved_at\`, \`author_id\`, \`forum_id\`, \`is_hidden\`, \`hidden_at\`, \`hidden_by_id\`, \`dormant\` from \`forum_thread\`;`);
    this.addSql(`drop table \`forum_thread\`;`);
    this.addSql(`alter table \`forum_thread__temp_alter\` rename to \`forum_thread\`;`);
    this.addSql(`create index \`forum_thread_hidden_by_id_index\` on \`forum_thread\` (\`hidden_by_id\`);`);
    this.addSql(`create index \`forum_thread_forum_id_index\` on \`forum_thread\` (\`forum_id\`);`);
    this.addSql(`create index \`forum_thread_author_id_index\` on \`forum_thread\` (\`author_id\`);`);
    this.addSql(`create index \`forum_thread_moved_by_id_index\` on \`forum_thread\` (\`moved_by_id\`);`);
    this.addSql(`create index \`forum_thread_escalated_by_id_index\` on \`forum_thread\` (\`escalated_by_id\`);`);
    this.addSql(`create index \`forum_thread_last_post_by_id_index\` on \`forum_thread\` (\`last_post_by_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`kbase_article__temp_alter\` (\`article_id\` INTEGER not null primary key, \`content\` longtext not null, constraint \`kbase_article_article_id_foreign\` foreign key (\`article_id\`) references \`kbase_item\` (\`id\`) on update cascade on delete cascade);`);
    this.addSql(`insert into \`kbase_article__temp_alter\` select \`article_id\`, \`content\` from \`kbase_article\`;`);
    this.addSql(`drop table \`kbase_article\`;`);
    this.addSql(`alter table \`kbase_article__temp_alter\` rename to \`kbase_article\`;`);
    this.addSql(`create index \`kbase_article_article_id_index\` on \`kbase_article\` (\`article_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`kbase_category__temp_alter\` (\`cat_id\` INTEGER not null primary key, \`auto_sort\` INTEGER not null default false, constraint \`kbase_category_cat_id_foreign\` foreign key (\`cat_id\`) references \`kbase_item\` (\`id\`) on update cascade on delete cascade);`);
    this.addSql(`insert into \`kbase_category__temp_alter\` select \`cat_id\`, \`auto_sort\` from \`kbase_category\`;`);
    this.addSql(`drop table \`kbase_category\`;`);
    this.addSql(`alter table \`kbase_category__temp_alter\` rename to \`kbase_category\`;`);
    this.addSql(`create index \`kbase_category_cat_id_index\` on \`kbase_category\` (\`cat_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`offence__temp_alter\` (\`id\` bigint not null primary key, \`ip\` TEXT not null primary key, \`module\` INTEGER not null default 2, \`character_id\` INTEGER not null, \`appeal_id\` INTEGER null, \`appeal_offence_id\` bigint null, \`appeal_offence_ip\` TEXT null, \`created_at\` datetime not null, \`created_by_id\` INTEGER not null, \`date\` INTEGER not null, \`type\` INTEGER not null, \`status\` INTEGER not null, \`report_id\` INTEGER null, \`blackmarks\` REAL not null, \`evidence\` TEXT null, \`hide_evidence\` INTEGER not null default false, \`penalty_type\` INTEGER null, \`penalty_expires\` datetime null, \`expires\` datetime null, primary key (\`id\`, \`ip\`), constraint \`offence_created_by_id_foreign\` foreign key (\`created_by_id\`) references \`character\` (\`id\`) on update cascade on delete no action, constraint \`offence_appeal_id_foreign\` foreign key (\`appeal_id\`) references \`offence_appeal\` (\`id\`) on update cascade on delete set null, constraint \`offence_appeal_offence_id_foreign\` foreign key (\`appeal_offence_id\`) references \`offence_appeal\` (\`offence_id\`) on update cascade on delete set null, constraint \`offence_appeal_offence_ip_foreign\` foreign key (\`appeal_offence_ip\`) references \`offence_appeal\` (\`offence_ip\`) on update cascade on delete set null, constraint \`offence_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`offence__temp_alter\` select \`id\`, \`ip\`, \`module\`, \`character_id\`, \`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`, \`created_at\`, \`created_by_id\`, \`date\`, \`type\`, \`status\`, null as \`report_id\`, \`blackmarks\`, \`evidence\`, \`hide_evidence\`, \`penalty_type\`, \`penalty_expires\`, \`expires\` from \`offence\`;`);
    this.addSql(`drop table \`offence\`;`);
    this.addSql(`alter table \`offence__temp_alter\` rename to \`offence\`;`);
    this.addSql(`create index \`offence_appeal_id_appeal_offence_id_appeal_offence_ip_index\` on \`offence\` (\`appeal_id\`, \`appeal_offence_id\`, \`appeal_offence_ip\`);`);
    this.addSql(`create index \`offence_created_by_id_index\` on \`offence\` (\`created_by_id\`);`);
    this.addSql(`create index \`offence_character_id_index\` on \`offence\` (\`character_id\`);`);
    this.addSql(`create unique index \`offence_id_unique\` on \`offence\` (\`id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`offence_appeal__temp_alter\` (\`id\` INTEGER not null primary key, \`offence_id\` bigint not null primary key, \`offence_ip\` TEXT not null primary key, \`status\` INTEGER not null, \`appeal_text\` TEXT not null, \`appeal_response\` TEXT null, \`appeal_date\` datetime not null, primary key (\`id\`, \`offence_id\`, \`offence_ip\`), constraint \`offence_appeal_offence_id_foreign\` foreign key (\`offence_id\`) references \`offence\` (\`id\`) on update cascade on delete no action, constraint \`offence_appeal_offence_ip_foreign\` foreign key (\`offence_ip\`) references \`offence\` (\`ip\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`offence_appeal__temp_alter\` select \`id\`, \`offence_id\`, \`offence_ip\`, \`status\`, \`appeal_text\`, \`appeal_response\`, \`appeal_date\` from \`offence_appeal\`;`);
    this.addSql(`drop table \`offence_appeal\`;`);
    this.addSql(`alter table \`offence_appeal__temp_alter\` rename to \`offence_appeal\`;`);
    this.addSql(`create index \`offence_appeal_offence_id_offence_ip_index\` on \`offence_appeal\` (\`offence_id\`, \`offence_ip\`);`);
    this.addSql(`create unique index \`offence_appeal_id_unique\` on \`offence_appeal\` (\`id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`ticketing_message__temp_alter\` (\`id\` integer not null primary key autoincrement, \`post_decoration_class\` TEXT null, \`content\` TEXT not null, \`created_at\` datetime not null, \`created_by\` INTEGER not null, \`updated_at\` datetime not null, \`updated_by\` INTEGER not null, \`hidden_at\` datetime null, \`hidden_by\` INTEGER null, \`thread_id\` INTEGER not null, constraint \`ticketing_message_thread_id_foreign\` foreign key (\`thread_id\`) references \`ticketing_thread\` (\`id\`) on update cascade on delete no action, constraint \`ticketing_message_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on update cascade on delete set null, constraint \`ticketing_message_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`) on update cascade on delete no action, constraint \`ticketing_message_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`ticketing_message__temp_alter\` select \`id\`, \`post_decoration_class\`, \`content\`, \`created_at\`, \`created_by\`, \`updated_at\`, \`updated_by\`, \`hidden_at\`, \`hidden_by\`, \`thread_id\` from \`ticketing_message\`;`);
    this.addSql(`drop table \`ticketing_message\`;`);
    this.addSql(`alter table \`ticketing_message__temp_alter\` rename to \`ticketing_message\`;`);
    this.addSql(`create index \`ticketing_message_thread_id_index\` on \`ticketing_message\` (\`thread_id\`);`);
    this.addSql(`create index \`ticketing_message_hidden_by_index\` on \`ticketing_message\` (\`hidden_by\`);`);
    this.addSql(`create index \`ticketing_message_updated_by_index\` on \`ticketing_message\` (\`updated_by\`);`);
    this.addSql(`create index \`ticketing_message_created_by_index\` on \`ticketing_message\` (\`created_by\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`ticketing_thread__temp_alter\` (\`id\` integer not null primary key autoincrement, \`title\` TEXT not null, \`account_id\` INTEGER not null, \`message_count\` INTEGER not null default 1, \`read_at\` datetime null, \`created_at\` datetime not null, \`created_by\` INTEGER not null, \`updated_at\` datetime not null, \`updated_by\` INTEGER not null, \`locked_at\` datetime null, \`locked_by\` INTEGER null, \`hidden_at\` datetime null, \`hidden_by\` INTEGER null, constraint \`ticketing_thread_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on update cascade on delete set null, constraint \`ticketing_thread_locked_by_foreign\` foreign key (\`locked_by\`) references \`character\` (\`id\`) on update cascade on delete set null, constraint \`ticketing_thread_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`) on update cascade on delete no action, constraint \`ticketing_thread_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`) on update cascade on delete no action, constraint \`ticketing_thread_account_id_foreign\` foreign key (\`account_id\`) references \`character\` (\`id\`) on update cascade on delete no action);`);
    this.addSql(`insert into \`ticketing_thread__temp_alter\` select \`id\`, \`title\`, \`account_id\`, \`message_count\`, \`read_at\`, \`created_at\`, \`created_by\`, \`updated_at\`, \`updated_by\`, \`locked_at\`, \`locked_by\`, \`hidden_at\`, \`hidden_by\` from \`ticketing_thread\`;`);
    this.addSql(`drop table \`ticketing_thread\`;`);
    this.addSql(`alter table \`ticketing_thread__temp_alter\` rename to \`ticketing_thread\`;`);
    this.addSql(`create index \`ticketing_thread_hidden_by_index\` on \`ticketing_thread\` (\`hidden_by\`);`);
    this.addSql(`create index \`ticketing_thread_locked_by_index\` on \`ticketing_thread\` (\`locked_by\`);`);
    this.addSql(`create index \`ticketing_thread_updated_by_index\` on \`ticketing_thread\` (\`updated_by\`);`);
    this.addSql(`create index \`ticketing_thread_created_by_index\` on \`ticketing_thread\` (\`created_by\`);`);
    this.addSql(`create index \`ticketing_thread_account_id_index\` on \`ticketing_thread\` (\`account_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

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
