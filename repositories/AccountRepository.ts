import { EntityRepository } from '@mikro-orm/core';
import { Account, Character, ForumGroup, ForumGroupRepository } from '#/db/Exports.js';

export interface AccountCreatedResponse {
    account: Account;
    created?: boolean;
}

export class AccountRepository extends EntityRepository<Account> {
    async createAccount(oauth: string, email: string): Promise<AccountCreatedResponse> {
        const existing = await this.em.findOne(Account, { oauth });
        if (existing) return { account: existing };
        const now = new Date();
        const account = this.em.create(Account, {
            oauth,
            email,
            lastLogin: now,
            characterLimit: 3,
        });
        await this.em.persist(account).flush();
        return { account: account, created: true };
    }

    async refreshAccount(account: Account): Promise<Account | null> {
        const freshLookup = await this.em.findOne(Account, { id: account.id }, { populate: ['characters', 'characters.forumGroups'] });
        if (!freshLookup) return null;
        for (const char of await freshLookup.characters.loadItems()) {
            const forumGroups = await char.forumGroups.loadItems();
            if (char.staffmodlevel === 1 && !forumGroups.some((g) => g.id === 2)) {
                const forumGroupRepo = this.em.getRepository(ForumGroup) as ForumGroupRepository;
                const playerModGroup = await forumGroupRepo.findOne({ id: 2 });
                if (playerModGroup) {
                    char.forumGroups.add(playerModGroup);
                    await this.em.persist(char).flush();
                }
            } else if (char.staffmodlevel === 2 && !forumGroups.some((g) => g.id === 4)) {
                const forumGroupRepo = this.em.getRepository(ForumGroup) as ForumGroupRepository;
                const staffModGroup = await forumGroupRepo.findOne({ id: 4 });
                if (staffModGroup) {
                    char.forumGroups.add(staffModGroup);
                    await this.em.persist(char).flush();
                }
            } else if (char.staffmodlevel >= 3 && !forumGroups.some((g) => g.id === 5)) {
                const forumGroupRepo = this.em.getRepository(ForumGroup) as ForumGroupRepository;
                const adminGroup = await forumGroupRepo.findOne({ id: 5 });
                if (adminGroup) {
                    char.forumGroups.add(adminGroup);
                    await this.em.persist(char).flush();
                }
            }
        }
        return freshLookup;
    }

    async updateLastLogin(oauth: string): Promise<Account | null> {
        const account = await this.em.findOne(Account, { oauth });
        if (!account) return null;
        const now = new Date();
        account.lastLogin = now;
        await this.em.persist(account).flush();
        return account;
    }

    async getCharacters(accountId: number): Promise<Character[] | null> {
        const acc = await this.em.findOne(Account, { id: accountId }, { populate: ['characters'] });
        if (!acc) return null;
        const characters = await acc.characters.loadItems();
        if (characters.length < 1) return null;
        return characters;
    }

    async findAccountByID(accountId: number): Promise<Account | null> {
        return this.em.findOne(Account, { id: accountId });
    }

    async findByOauth(oauth: string): Promise<Account | null> {
        return this.em.findOne(Account, { oauth }, { populate: ['characters'] });
    }

    async isAtCharacterLimit(oauth: string): Promise<boolean> {
        const freshLookup = await this.findByOauth(oauth);
        if (!freshLookup) return true;
        const characterCount = await this.em.count(Character, { account: freshLookup });
        return freshLookup.characterLimit <= characterCount;
    }
}
