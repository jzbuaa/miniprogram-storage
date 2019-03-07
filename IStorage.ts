export interface IStorage {
    set(key: string, value: any): Promise<void>;
    set(key: string, value: any, expiresAt: Date): Promise<void>;
    get(key: string): Promise<any>;
    get(key: string, removeAfter: boolean): Promise<any>;
    remove(key: string): Promise<void>;
}