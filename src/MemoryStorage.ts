import { ICache } from "./ICache";
import { ICacheEntity } from "./ICacheEntity";
import { extractEntity, packEntity } from "./Utils";

export class MemoryStorage implements ICache
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
        const entity: ICacheEntity = packEntity(value, expiresAt);
        this.mem[key] = entity;
    }

    public async get(key: string, removeAfter?: boolean): Promise<any>
    {
        if(!key)
        {
            throw new Error("invalid key");
        }
        const entity: ICacheEntity = this.mem[key];
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