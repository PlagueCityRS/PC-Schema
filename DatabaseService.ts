import { MikroORM } from '@mikro-orm/core';
import config from '#/db/MikroORM-Config.js';

export class DatabaseService {
    private static instance: DatabaseService;
    public orm!: MikroORM;

    private constructor() {}

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async init(): Promise<void> {
        this.orm = await MikroORM.init(config);
        await this.orm.migrator.up();
    }

    public async close(): Promise<void> {
        if (this.orm) {
            await this.orm.close();
        }
    }

    public getEntityManager() {
        return this.orm.em;
    }

    public fork() {
        return this.orm.em.fork();
    }
}

export const dbService = DatabaseService.getInstance();
