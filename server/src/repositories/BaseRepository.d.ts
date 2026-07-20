import { Model, Document, QueryFilter, UpdateQuery } from 'mongoose';
export declare class BaseRepository<T extends Document> {
    protected model: Model<T>;
    constructor(model: Model<T>);
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(filter: QueryFilter<T>): Promise<T | null>;
    find(filter?: QueryFilter<T>, options?: {
        skip?: number;
        limit?: number;
        sort?: any;
    }): Promise<T[]>;
    count(filter?: QueryFilter<T>): Promise<number>;
    update(id: string, update: UpdateQuery<T>): Promise<T | null>;
    softDelete(id: string): Promise<T | null>;
    restore(id: string): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
//# sourceMappingURL=BaseRepository.d.ts.map