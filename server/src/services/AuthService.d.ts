export declare class AuthService {
    login(email: string, password: string): Promise<{
        user: import("../models/User").IUser;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
    refresh(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export declare const authService: AuthService;
//# sourceMappingURL=AuthService.d.ts.map