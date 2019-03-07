import { IStorageEntity } from "./IStorageEntity";

export function extractEntity(entity: IStorageEntity): any {
    if (!entity) {
        return undefined;
    }
    if (entity.expiresAt > 0) {
        if (entity.expiresAt < Date.now()) {
            return undefined;
        } else {
            return entity.value;
        }
    } else {
        return entity.value;
    }
}

export function packEntity(value: any, expiresAt: Date): IStorageEntity {
    const entity: IStorageEntity = {
        value: value,
        expiresAt: expiresAt ? expiresAt.getTime() : -1
    };
    return entity;
}

export function getKey(key: string, prefix: string): string {
    if (key.startsWith(prefix)) {
        throw new Error(`invalid key, must not starts with ${prefix}`);
    }

    if (!key) {
        throw new Error("invalid key");
    }

    return this.prefix + key;
}
