"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRepository = exports.RefreshTokenRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
class RefreshTokenRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(RefreshToken_1.default);
    }
    async findByToken(token) {
        return this.model.findOne({ token, isRevoked: false }).populate('user').exec();
    }
    async revokeToken(token) {
        await this.model.updateOne({ token }, { isRevoked: true }).exec();
    }
}
exports.RefreshTokenRepository = RefreshTokenRepository;
exports.refreshTokenRepository = new RefreshTokenRepository();
//# sourceMappingURL=RefreshTokenRepository.js.map