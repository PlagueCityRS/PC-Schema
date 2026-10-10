import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { MariaDbDriver } from '@mikro-orm/mariadb';
import Environment from '#/util/Environment.js';
import {
    Forum,
    ForumCategory,
    ForumPermission,
    ForumPost,
    ForumThread,
    ForumGroup,
    NewsPost,
    Offence,
    OffenceAppeal,
    Account,
    Character,
    CharacterLogin,
    KbaseItem,
    KbaseCategory,
    KbaseArticle,
    KbaseRelationship,
    KbaseView,
    TicketingThread,
    TicketingMessage,
} from '#/db/Exports.js';

const mySql: boolean = Environment.DB_BACKEND === 'mysql';
const mariaDB: boolean = Environment.DB_BACKEND === 'mariadb';
const sqLite: boolean = !(mariaDB || mySql);
export const config: Options = {
    driver: mySql ? MySqlDriver : mariaDB ? MariaDbDriver : SqliteDriver,
    dbName: sqLite ? 'db.sqlite' : Environment.DB_NAME,
    host: sqLite ? undefined : Environment.DB_HOST,
    port: sqLite ? undefined : Environment.DB_PORT,
    user: sqLite ? undefined : Environment.DB_USER,
    password: sqLite ? undefined : Environment.DB_PASS,
    entities: [
        // @todo find a more automated way to do this
        Forum,
        ForumCategory,
        ForumPermission,
        ForumPost,
        ForumThread,
        ForumGroup,
        NewsPost,
        Offence,
        OffenceAppeal,
        Account,
        Character,
        CharacterLogin,
        KbaseItem,
        KbaseCategory,
        KbaseArticle,
        KbaseRelationship,
        KbaseView,
        TicketingThread,
        TicketingMessage,
    ],
    debug: Environment.DB_DEBUG || false,
    migrations: {
        path: 'src/db/migrations',
        pathTs: 'src/db/migrations',
        tableName: 'mikro_orm_migrations',
        transactional: true,
    },
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
    },
    timezone: 'Z',
};

export default config;
