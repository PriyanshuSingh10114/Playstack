import { BaseRepository } from './BaseRepository';
import RefreshToken, { IRefreshToken } from '../models/RefreshToken';

export class RefreshTokenRepository extends BaseRepository<IRefreshToken> {
  constructor() {
    super(RefreshToken);
  }

  async findByToken(token: string): Promise<IRefreshToken | null> {
    return this.model.findOne({ token, isRevoked: false }).populate('user').exec();
  }

  async revokeToken(token: string): Promise<void> {
    await this.model.updateOne({ token }, { isRevoked: true }).exec();
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
