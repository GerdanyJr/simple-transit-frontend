export interface ReportByIdResponse {
    id: number;
    summary: string;
    description: string;
    timestamp: string;
    address: string;
    latitude: number;
    longitude: number;
    userId: number;
    username: string;
    reportTypeId: number;
    reportName: string;
}

export interface ReportsResponse {
    data: Report[];
    currentPage: number;
    pageNumber: number;
    totalElements: number;
    numberOfElements: number;
    isLastPage: boolean;
}

export interface Report {
    id: number;
    summary: string;
    description: string;
    timestamp: string;
    address: string;
    latitude: number;
    longitude: number;
    userId: number;
    reportTypeId: number;
}

export interface ReportType {
    id: number;
    description: string;
}

export interface CreateReportReq {
    summary: string;
    description: string;
    timestamp: string;
    address: string;
    latitude: number;
    longitude: number;
    reportTypeId: number;
}