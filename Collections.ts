import type { Collection } from '@mikro-orm/core';

type MikroOrmCollection<T> = {
    getItems: () => T[];
    isInitialized?: () => boolean;
    loadItems?: () => Promise<T[]>;
    init?: () => Promise<unknown>;
};

export function getCollectionItems<T extends object>(value: Collection<T> | T[] | null | undefined): T[] {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    const col = value as unknown as MikroOrmCollection<T>;
    if (typeof col.getItems !== 'function') return [];

    if (typeof col.isInitialized === 'function' && !col.isInitialized()) {
        return [];
    }

    try {
        return col.getItems();
    } catch {
        return [];
    }
}

export async function getOrLoadCollectionItems<T extends object>(value: Collection<T> | T[] | null | undefined): Promise<T[]> {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    const col = value as unknown as MikroOrmCollection<T>;
    if (typeof col.getItems !== 'function') return [];

    if (typeof col.isInitialized === 'function' && col.isInitialized()) {
        return col.getItems();
    }

    if (typeof col.loadItems === 'function') {
        try {
            return await col.loadItems();
        } catch {
            return [];
        }
    }

    if (typeof col.init === 'function') {
        try {
            await col.init();
            return typeof col.getItems === 'function' ? col.getItems() : [];
        } catch {
            return [];
        }
    }

    return [];
}
