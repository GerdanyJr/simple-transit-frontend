export interface LoginResponse {
    userId: number;
    login: string;
    authToken: string;
    refreshToken: string;
}