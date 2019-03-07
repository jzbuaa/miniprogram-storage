export interface IStorage{
    set(key: string, value: any): void;
    set(key: string, value: any, expiresAt: Date): void;
    get(key: string): any;
    get(key: string, removeAfter: boolean): any;
    remove(key: string): void;
}