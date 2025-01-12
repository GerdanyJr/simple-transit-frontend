export interface ErrorResponse {
    message: string;
    timestamp: string;
    status: string;
    code: number;
}

export interface ValidationErrorResponse {
    errors: Record<string, string>;
    timestamp: string;
    status: string;
    code: number;
}