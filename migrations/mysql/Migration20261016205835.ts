import { Migration } from '@mikro-orm/migrations';

export class Migration20261016205835 extends Migration {

  override name = 'Migration20261016205835';

  override up(): void | Promise<void> {
    this.addSql(`create table \`offence_report\` (\`id\` int unsigned not null auto_increment primary key, \`offence_id\` bigint unsigned null, \`offence_ip\` varchar(255) null, \`datetime\` datetime not null default current_timestamp, \`reporter_id\` int unsigned not null, \`offender_id\` int unsigned not null, \`profile\` varchar(255) not null, \`world\` int not null, \`loc_x\` int not null, \`loc_y\` int not null, \`loc_z\` int not null, \`reason\` int not null, \`reviewed\` tinyint(1) not null default false, \`reviewed_at\` datetime not null default current_timestamp, \`reviewed_by_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`offence_report\` add unique \`offence_report_offence_id_offence_ip_unique\` (\`offence_id\`, \`offence_ip\`);`);
    this.addSql(`alter table \`offence_report\` add index \`offence_report_reporter_id_index\` (\`reporter_id\`);`);
    this.addSql(`alter table \`offence_report\` add index \`offence_report_offender_id_index\` (\`offender_id\`);`);
    this.addSql(`alter table \`offence_report\` add index \`offence_report_reviewed_by_id_index\` (\`reviewed_by_id\`);`);

    this.addSql(`alter table \`character\` drop foreign key \`character_account_id_foreign\`;`);

    this.addSql(`alter table \`forum\` drop foreign key \`forum_category_id_foreign\`;`);

    this.addSql(`alter table \`forum_permission\` drop foreign key \`forum_permission_forum_id_foreign\`;`);
    this.addSql(`alter table \`forum_permission\` drop foreign key \`forum_permission_user_group_id_foreign\`;`);

    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_last_post_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_escalated_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_moved_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_author_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_forum_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_hidden_by_id_foreign\`;`);

    this.addSql(`alter table \`forum_post\` drop foreign key \`forum_post_author_id_foreign\`;`);
    this.addSql(`alter table \`forum_post\` drop foreign key \`forum_post_last_edit_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_post\` drop foreign key \`forum_post_hidden_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_post\` drop foreign key \`forum_post_thread_id_foreign\`;`);

    this.addSql(`alter table \`offence\` drop foreign key \`offence_character_id_foreign\`;`);
    this.addSql(`alter table \`offence\` drop foreign key \`offence_created_by_id_foreign\`;`);

    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_account_id_foreign\`;`);
    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_created_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_updated_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_locked_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_hidden_by_foreign\`;`);

    this.addSql(`alter table \`ticketing_message\` drop foreign key \`ticketing_message_created_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_message\` drop foreign key \`ticketing_message_updated_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_message\` drop foreign key \`ticketing_message_hidden_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_message\` drop foreign key \`ticketing_message_thread_id_foreign\`;`);

    this.addSql(`alter table \`character\` add constraint \`character_account_id_foreign\` foreign key (\`account_id\`) references \`account\` (\`id\`);`);

    this.addSql(`alter table \`forum\` add constraint \`forum_category_id_foreign\` foreign key (\`category_id\`) references \`forum_category\` (\`id\`);`);

    this.addSql(`alter table \`forum_permission\` add constraint \`forum_permission_forum_id_foreign\` foreign key (\`forum_id\`) references \`forum\` (\`id\`);`);
    this.addSql(`alter table \`forum_permission\` add constraint \`forum_permission_user_group_id_foreign\` foreign key (\`user_group_id\`) references \`forum_group\` (\`id\`) on delete set null;`);

    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_last_post_by_id_foreign\` foreign key (\`last_post_by_id\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_escalated_by_id_foreign\` foreign key (\`escalated_by_id\`) references \`character\` (\`id\`) on delete set null;`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_moved_by_id_foreign\` foreign key (\`moved_by_id\`) references \`character\` (\`id\`) on delete set null;`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_author_id_foreign\` foreign key (\`author_id\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_forum_id_foreign\` foreign key (\`forum_id\`) references \`forum\` (\`id\`);`);
    this.addSql(`alter table \`forum_thread\` add constraint \`forum_thread_hidden_by_id_foreign\` foreign key (\`hidden_by_id\`) references \`character\` (\`id\`) on delete set null;`);

    this.addSql(`alter table \`forum_post\` drop index \`forum_post_thread_id_code_unique\`;`);
    this.addSql(`alter table \`forum_post\` add constraint \`forum_post_author_id_foreign\` foreign key (\`author_id\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`forum_post\` add constraint \`forum_post_last_edit_by_id_foreign\` foreign key (\`last_edit_by_id\`) references \`character\` (\`id\`) on delete set null;`);
    this.addSql(`alter table \`forum_post\` add constraint \`forum_post_hidden_by_id_foreign\` foreign key (\`hidden_by_id\`) references \`character\` (\`id\`) on delete set null;`);
    this.addSql(`alter table \`forum_post\` add constraint \`forum_post_thread_id_foreign\` foreign key (\`thread_id\`) references \`forum_thread\` (\`id\`);`);

    this.addSql(`alter table \`offence\` drop column \`report_id\`;`);
    this.addSql(`alter table \`offence\` add constraint \`offence_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`offence\` add constraint \`offence_created_by_id_foreign\` foreign key (\`created_by_id\`) references \`character\` (\`id\`);`);

    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_account_id_foreign\` foreign key (\`account_id\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_locked_by_foreign\` foreign key (\`locked_by\`) references \`character\` (\`id\`) on delete set null;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on delete set null;`);

    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on delete set null;`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_thread_id_foreign\` foreign key (\`thread_id\`) references \`ticketing_thread\` (\`id\`);`);

    this.addSql(`alter table \`offence_report\` add constraint \`offence_report_offence_id_offence_ip_foreign\` foreign key (\`offence_id\`, \`offence_ip\`) references \`offence\` (\`id\`, \`ip\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`offence_report\` add constraint \`offence_report_reporter_id_foreign\` foreign key (\`reporter_id\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`offence_report\` add constraint \`offence_report_offender_id_foreign\` foreign key (\`offender_id\`) references \`character\` (\`id\`);`);
    this.addSql(`alter table \`offence_report\` add constraint \`offence_report_reviewed_by_id_foreign\` foreign key (\`reviewed_by_id\`) references \`character\` (\`id\`);`);
    
    this.addSql(`alter table \`offence_report\` drop foreign key \`offence_report_reviewed_by_id_foreign\`;`);

    this.addSql(`alter table \`offence_report\` modify \`reviewed_by_id\` int unsigned null;`);
    this.addSql(`alter table \`offence_report\` add constraint \`offence_report_reviewed_by_id_foreign\` foreign key (\`reviewed_by_id\`) references \`character\` (\`id\`) on delete set null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists \`offence_report\`;`);

    this.addSql(`alter table \`character\` drop foreign key \`character_account_id_foreign\`;`);

    this.addSql(`alter table \`forum\` drop foreign key \`forum_category_id_foreign\`;`);

    this.addSql(`alter table \`forum_permission\` drop foreign key \`forum_permission_forum_id_foreign\`;`);
    this.addSql(`alter table \`forum_permission\` drop foreign key \`forum_permission_user_group_id_foreign\`;`);

    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_last_post_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_escalated_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_moved_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_author_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_forum_id_foreign\`;`);
    this.addSql(`alter table \`forum_thread\` drop foreign key \`forum_thread_hidden_by_id_foreign\`;`);

    this.addSql(`alter table \`forum_post\` drop foreign key \`forum_post_author_id_foreign\`;`);
    this.addSql(`alter table \`forum_post\` drop foreign key \`forum_post_last_edit_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_post\` drop foreign key \`forum_post_hidden_by_id_foreign\`;`);
    this.addSql(`alter table \`forum_post\` drop foreign key \`forum_post_thread_id_foreign\`;`);

    this.addSql(`alter table \`offence\` drop foreign key \`offence_character_id_foreign\`;`);
    this.addSql(`alter table \`offence\` drop foreign key \`offence_created_by_id_foreign\`;`);

    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_account_id_foreign\`;`);
    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_created_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_updated_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_locked_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_thread\` drop foreign key \`ticketing_thread_hidden_by_foreign\`;`);

    this.addSql(`alter table \`ticketing_message\` drop foreign key \`ticketing_message_created_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_message\` drop foreign key \`ticketing_message_updated_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_message\` drop foreign key \`ticketing_message_hidden_by_foreign\`;`);
    this.addSql(`alter table \`ticketing_message\` drop foreign key \`ticketing_message_thread_id_foreign\`;`);

    this.addSql(`alter table \`character\` add constraint \`character_account_id_foreign\` foreign key (\`account_id\`) references \`account\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`forum\` add constraint \`forum_category_id_foreign\` foreign key (\`category_id\`) references \`forum_category\` (\`id\`) on update cascade;`);

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
    this.addSql(`alter table \`forum_post\` add unique \`forum_post_thread_id_code_unique\` (\`thread_id\`, \`code\`);`);

    this.addSql(`alter table \`offence\` add \`report_id\` int null;`);
    this.addSql(`alter table \`offence\` add constraint \`offence_character_id_foreign\` foreign key (\`character_id\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`offence\` add constraint \`offence_created_by_id_foreign\` foreign key (\`created_by_id\`) references \`character\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_account_id_foreign\` foreign key (\`account_id\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_locked_by_foreign\` foreign key (\`locked_by\`) references \`character\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`ticketing_thread\` add constraint \`ticketing_thread_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_created_by_foreign\` foreign key (\`created_by\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_updated_by_foreign\` foreign key (\`updated_by\`) references \`character\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_hidden_by_foreign\` foreign key (\`hidden_by\`) references \`character\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`ticketing_message\` add constraint \`ticketing_message_thread_id_foreign\` foreign key (\`thread_id\`) references \`ticketing_thread\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`offence_report\` drop foreign key \`offence_report_reviewed_by_id_foreign\`;`);

    this.addSql(`alter table \`offence_report\` modify \`reviewed_by_id\` int unsigned not null;`);
    this.addSql(`alter table \`offence_report\` add constraint \`offence_report_reviewed_by_id_foreign\` foreign key (\`reviewed_by_id\`) references \`character\` (\`id\`);`);
  }

}
