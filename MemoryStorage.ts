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
    
    public async set(key: string, value: any, expiresAt?: Date): Promise<void>
    {
        if(!key)
        {
            throw new Error("invalid key");
        }
        const entity: IStorageEntity = packEntity(value, expiresAt);
        this.mem[key] = entity;
    }

    public async get(key: string, removeAfter?: boolean): Promise<any>
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

    public async remove(key: string): Promise<void>
    {
        if(!key)
        {
            throw new Error("invalid key");
        }
        this.mem[key] = undefined;
    }
}