export interface WebResponse<T> {
    code: number;
    status: string;
    data: T;
}

export interface PingResponse {
    message: string;
    version?: string;
}

// Add more interfaces as needed for ramoo.id and pos.ramoo.id
