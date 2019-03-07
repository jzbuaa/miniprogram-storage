import { IStorage } from "./IStorage";
import { IStorageEntity } from "./IStorageEntity";
import { extractEntity, packEntity } from "./Utils";

export class MemoryStorage implements IStorage
{
    private readonly mem: object = {};

    public static get Default(): MemoryStorage
    {
        return new MemoryStorage();
    }
    
    set(key: string, value: any, expiresAt?: Date): void
    {
        if(!key)
        {
            throw new Error("invalid key");
        }
        const entity: IStorageEntity = packEntity(value, expiresAt);
        this.mem[key] = entity;
    }

    get(key: string, removeAfter?: boolean)
    {
        if(!key)
        {
            throw new Error("invalid key");
        }
        const entity: IStorageEntity = this.mem[key];
        if(removeAfter)
        {
            this.mem[key] = undefined;
        }
        return extractEntity(entity);
    }

    remove(key: string): void
    {
        if(!key)
        {
            throw new Error("invalid key");
        }
        this.mem[key] = undefined;
    }
}