import { BaseRepository } from './BaseRepository';
import { IUser } from '../models/User';
export declare class UserRepository extends BaseRepository<IUser> {
    constructor();
    findByEmail(email: string): Promise<IUser | null>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=UserRepository.d.ts.map