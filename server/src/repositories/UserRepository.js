"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const User_1 = __importDefault(require("../models/User"));
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(User_1.default);
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=UserRepository.js.map