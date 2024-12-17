import { NextRequest } from "next/server";

const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds().toFixed(3);
    return `[${hours}:${mins}:${seconds}:${milliseconds}]`;
}

export interface Params {
    params: Promise<{
        id?: string;
    }>;
}

export const getParamsId = async (params: Params['params']) => {
    const { id } = await params;
    if (!id) throw new Error('Invalid id');
    return id;
    
}

export const handleRequest = async (req: NextRequest, callback: ({ data, searchParams }: { data?: any, searchParams: URLSearchParams }) => Promise<Response>) => {
    try {
        let data: any;
        const header = req.headers.get('content-type')?.split(';')[0];
        switch (req.method.toUpperCase()) {
            case 'POST':
            case 'PUT':
                switch (header) {
                    case 'application/json': data = await req.json(); break;
                    case 'multipart/form-data': data = await req.formData(); break;
                    default: throw new Error(`data type for '${header}' is not implemented.`);
                }
                if (!data) throw new Error('Undefined data.');
                break;
        }
        const searchParams = req.nextUrl.searchParams;
        const res = await callback({ data, searchParams });
        res.headers.set('Accept', 'application/json');
        res.headers.set('Content-Type', 'application/json');
        return res;
    } catch (err: any) {
        console.error(`${getTime()} ${req.method} ${req.url}`, err);
        return new Response(JSON.stringify(err?.response?.status ? {
            status: err.response.status,
            message: err.response.statusText,
        } : {
            status: 500,
            message: 'Internal Server Error'
        }), {
            status: err?.status ?? 500,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }
}