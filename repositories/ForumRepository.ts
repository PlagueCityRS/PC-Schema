import { EntityRepository, Transactional } from '@mikro-orm/core';
import { ForumCategory, Forum, ForumGroup, Character, ForumGroupRepository, getCollectionItems } from '#/db/Exports.js';

export interface ForumViewCategory {
    id: number;
    name: string;
    sortOrder: number;
    forums: ForumViewForum[];
}

export interface ForumViewForum {
    id: number;
    code: number;
    name: string;
    description: string;
    icon: string;
    sortOrder: number;
    threadCount: number;
    postCount: number;
    lastPostAt: Date | null;
}

export class ForumRepository extends EntityRepository<Forum> {
    @Transactional()
    async createForum(name: string, description: string, sortOrder: number, category: ForumCategory, icon: string): Promise<Forum> {
        const code = (await this.em.count(Forum, {})) % 1000;
        const forum = new Forum();
        forum.name = name;
        forum.description = description;
        forum.sortOrder = sortOrder;
        forum.category = category;
        forum.icon = icon;
        forum.code = code;
        await this.em.persist(forum).flush();
        return forum;
    }

    async getViewableForums(char: Character | null): Promise<Array<{ id: number; name: string }>> {
        const forumGroupRepo = this.em.getRepository(ForumGroup) as ForumGroupRepository;
        const userGroups = char ? getCollectionItems(char.forumGroups) : [forumGroupRepo.getPublicGroup()];
        const categories = (await this.getForumsForForumsView(userGroups)) as ForumViewCategory[];
        return categories.flatMap((category) => category.forums.map((forum) => ({ id: forum.id, name: forum.name })));
    }

    async getForumsForForumsView(userGroups: ForumGroup[]): Promise<ForumViewCategory[]> {
        const ids = userGroups && userGroups.length > 0 ? userGroups.map((g) => g.id) : [];

        const permissionCond = [];
        if (ids.length > 0) {
            permissionCond.push({ permissions: { userGroup: { $in: ids }, canView: true } });
        }
        permissionCond.push({ permissions: { isPublic: true, canView: true } });

        const forums = await this.em.find(
            Forum,
            { $or: permissionCond },
            {
                populate: ['category', 'threads', 'threads.posts'],
                orderBy: {
                    category: { sortOrder: 'ASC' },
                    sortOrder: 'ASC',
                },
            },
        );

        const categoriesById = new Map<number, ForumViewCategory>();

        for (const forum of forums) {
            const category = forum.category;
            if (!categoriesById.has(category.id)) {
                categoriesById.set(category.id, {
                    id: category.id,
                    name: category.name,
                    sortOrder: category.sortOrder,
                    forums: [],
                });
            }

            const threadCount = forum.threads.count();
            const postCount = forum.threads.getItems().reduce((sum, thread) => sum + thread.posts.count(), 0);
            const lastPostAt = forum.lastPostAt ? forum.lastPostAt : null;

            categoriesById.get(category.id)!.forums.push({
                id: forum.id,
                code: forum.code,
                name: forum.name,
                description: forum.description,
                icon: forum.icon,
                sortOrder: forum.sortOrder ?? 0,
                threadCount,
                postCount,
                lastPostAt,
            });
        }

        const categories = Array.from(categoriesById.values()).sort((a, b) => a.sortOrder - b.sortOrder);

        for (const category of categories) {
            category.forums.sort((a, b) => a.sortOrder - b.sortOrder);
        }

        return categories;
    }

    async userCanView(forum: Forum, userGroups?: ForumGroup[]): Promise<boolean> {
        let ids: number[] = [];
        if (!userGroups || userGroups.length === 0) {
            ids = [];
        } else {
            ids = userGroups.map((g: ForumGroup) => g && g.id);
        }

        const conds = [];
        if (ids.length > 0) {
            conds.push({ id: forum.id, permissions: { userGroup: { $in: ids }, canView: true } });
        }
        conds.push({ id: forum.id, permissions: { isPublic: true, canView: true } });

        const permission = await this.em.findOne(Forum, { $or: conds });
        return !!permission;
    }

    async canCreateThread(forum: Forum, userGroups?: ForumGroup[]): Promise<boolean> {
        let ids: number[] = [];
        if (!userGroups || userGroups.length === 0) {
            ids = [];
        } else {
            ids = userGroups.map((g: ForumGroup) => g && g.id);
        }

        const conds = [];
        if (ids.length > 0) {
            conds.push({
                id: forum.id,
                permissions: { userGroup: { $in: ids }, canCreateThread: true },
            });
        }
        conds.push({ id: forum.id, permissions: { isPublic: true, canCreateThread: true } });

        const permission = await this.em.findOne(Forum, { $or: conds });
        return !!permission;
    }
}
