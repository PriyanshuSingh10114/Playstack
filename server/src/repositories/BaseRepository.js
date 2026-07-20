"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        const created = new this.model(data);
        return await created.save();
    }
    async findById(id) {
        return await this.model.findOne({ _id: id, deletedAt: null }).exec();
    }
    async findOne(filter) {
        return await this.model.findOne({ ...filter, deletedAt: null }).exec();
    }
    async find(filter = {}, options = {}) {
        let query = this.model.find({ ...filter, deletedAt: null });
        if (options.sort)
            query = query.sort(options.sort);
        if (options.skip)
            query = query.skip(options.skip);
        if (options.limit)
            query = query.limit(options.limit);
        return await query.exec();
    }
    async count(filter = {}) {
        return await this.model.countDocuments({ ...filter, deletedAt: null }).exec();
    }
    async update(id, update) {
        return await this.model.findOneAndUpdate({ _id: id, deletedAt: null }, update, { new: true, runValidators: true }).exec();
    }
    async softDelete(id) {
        return await this.model.findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true }).exec();
    }
    async restore(id) {
        return await this.model.findOneAndUpdate({ _id: id }, { deletedAt: null }, { new: true }).exec();
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map