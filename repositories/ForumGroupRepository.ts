import { EntityRepository } from '@mikro-orm/core';
import { ForumGroup } from '#/db/Exports.js';

export class ForumGroupRepository extends EntityRepository<ForumGroup> {
    async createGroup(name: string, sortOrder: number): Promise<ForumGroup> {
        const group = new ForumGroup();
        group.name = name;
        group.sortOrder = sortOrder;
        const exists = await this.em.findOne(ForumGroup, { name });
        if (exists) return exists;
        this.em.persist(group);
        return group;
    }

    async getGroup(name: string): Promise<ForumGroup | null> {
        return this.em.findOne(ForumGroup, { name });
    }

    async editGroup(group: ForumGroup, name: string, postDecorationClass: string, sortOrder: number, displayString?: string): Promise<void> {
        group.name = name;
        group.postDecorationClass = postDecorationClass;
        group.sortOrder = sortOrder;
        group.displayString = displayString;
        this.em.persist(group);
    }

    async deleteGroup(group: ForumGroup): Promise<void> {
        this.em.remove(group);
    }

    getPublicGroup(): ForumGroup {
        // Public being not logged in - not the default user's group
        const group = new ForumGroup();
        group.name = 'Public';
        group.sortOrder = 0;
        group.permissions = 0n;
        return group;
    }
}
