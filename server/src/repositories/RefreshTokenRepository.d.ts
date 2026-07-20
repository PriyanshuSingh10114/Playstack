import { BaseRepository } from './BaseRepository';
import { IRefreshToken } from '../models/RefreshToken';
export declare class RefreshTokenRepository extends BaseRepository<IRefreshToken> {
    constructor();
    findByToken(token: string): Promise<IRefreshToken | null>;
    revokeToken(token: string): Promise<void>;
}
export declare const refreshTokenRepository: RefreshTokenRepository;
//# sourceMappingURL=RefreshTokenRepository.d.ts.map