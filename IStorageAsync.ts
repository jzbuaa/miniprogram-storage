export interface IStorageAsync {
    setAsync(key: string, value: any): Promise<void>;
    setAsync(key: string, value: any, expiresAt: Date): Promise<void>;
    getAsync(key: string): Promise<any>;
    getAsync(key: string, removeAfter: boolean): Promise<any>;
    removeAsync(key: string): Promise<void>;
}