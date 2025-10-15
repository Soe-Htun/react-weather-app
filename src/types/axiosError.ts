export interface AxiosErrorResponse {
    message: string;
    name: string;
    code?: string;
    status?: number;
    response?: {
      data: {
        message: string;
      };
      status: number;
    };
  }