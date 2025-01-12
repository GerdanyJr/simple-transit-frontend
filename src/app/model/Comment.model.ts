export interface Comment {
    id: number;
    comment: string;
    date: string;
    userId: number;
    username: string;
    reportId: number;
}

export interface CommentResponse {
    data: Comment[];
    currentPage: number;
    pageNumber: number;
    numberOfElements: number;
    isLastPage: boolean;
}