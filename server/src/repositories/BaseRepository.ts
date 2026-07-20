import { Model, Document, QueryFilter, UpdateQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const created = new this.model(data);
    return await created.save();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findOne({ _id: id, deletedAt: null }).exec();
  }

  async findOne(filter: QueryFilter<T>): Promise<T | null> {
    return await this.model.findOne({ ...filter, deletedAt: null }).exec();
  }

  async find(filter: QueryFilter<T> = {}, options: { skip?: number; limit?: number; sort?: any } = {}): Promise<T[]> {
    let query = this.model.find({ ...filter, deletedAt: null });
    
    if (options.sort) query = query.sort(options.sort);
    if (options.skip) query = query.skip(options.skip);
    if (options.limit) query = query.limit(options.limit);
    
    return await query.exec();
  }

  async count(filter: QueryFilter<T> = {}): Promise<number> {
    return await this.model.countDocuments({ ...filter, deletedAt: null }).exec();
  }

  async update(id: string, update: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findOneAndUpdate(
      { _id: id, deletedAt: null },
      update,
      { new: true, runValidators: true }
    ).exec();
  }

  async softDelete(id: string): Promise<T | null> {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { deletedAt: new Date() } as any,
      { new: true }
    ).exec();
  }

  async restore(id: string): Promise<T | null> {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { deletedAt: null } as any,
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
