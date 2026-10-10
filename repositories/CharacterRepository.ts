import { EntityRepository } from '@mikro-orm/core';
import { Account, AccountRepository, Character, ForumGroup, ForumGroupRepository } from '#/db/Exports.js';

export class CharacterRepository extends EntityRepository<Character> {
    async getUserByUsername(username: string): Promise<Character | null> {
        return this.em.findOne(Character, { username });
    }

    async createCharacter(username: string, passwordHash: string, accountId: number, registrationIp: string): Promise<Character | null> {
        if (accountId < 0) return null;
        const accountRepo = this.em.getRepository(Account) as AccountRepository;
        const account = await accountRepo.findAccountByID(accountId);
        if (!account) return null;

        const isAtCharacterLimit = await accountRepo.isAtCharacterLimit(account.oauth);
        if (isAtCharacterLimit) return null;

        const forumGroupRepo = this.em.getRepository(ForumGroup) as ForumGroupRepository;
        const userGroup = await forumGroupRepo.getGroup('Users');
        if (!userGroup) return null;

        const character = this.em.create(Character, {
            username,
            account,
            password: passwordHash,
            registrationIp,
            forumGroups: [userGroup],
            postCount: 0,
            staffmodlevel: 0,
        });
        await this.em.persist(character).flush();
        return character;
    }

    async updatePassword(username: string, passwordHash: string): Promise<Character | null> {
        const character = await this.em.findOne(Character, { username });
        if (!character) return null;
        const now = new Date();
        character.passwordUpdated = now;
        character.password = passwordHash;
        await this.em.persist(character).flush();
        return character;
    }

    async setForumMuteDuration(username: string, durationMs: number): Promise<number> {
        const char = await this.em.findOne(Character, { username });
        if (!char) return 0;
        const now = new Date();
        char.forumMutedUntil = new Date(now.getTime() + durationMs);
        await this.em.persist(char).flush();
        return await this.isForumMuted(username);
    }

    async isForumMuted(username: string): Promise<number> {
        const char = await this.em.findOne(Character, { username });
        if (!char) return 0;
        if (!char.forumMutedUntil) {
            return 0;
        }
        const now = new Date();
        return char.forumMutedUntil.getTime() - now.getTime();
    }
}
