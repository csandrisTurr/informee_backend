import { Response } from "express";

export class RestResponse<T = any> {
    message: string;
    status: number;
    type: 'success' | 'error';
    data: T;

    public static ok<T>(data: T, status: number) {
        let res = new RestResponse<T>();
        res.type = 'success';
        res.status = status || 200;
        res.data = data;

        return res;
    }

    public static err<T>(status: number, message: string) {
        let res = new RestResponse<T>();
        res.type = 'error';
        res.status = status || 400;
        res.message = message;

        return res;
    }

    public pipeResponse(res: Response) {
        res.status(this.status).json({
            message: this.message,
            type: this.type,
            data: this.data,
        });
    }
}