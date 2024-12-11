import { NextRequest } from "next/server";

const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds().toFixed(3);
    return `[${hours}:${mins}:${seconds}:${milliseconds}]`;
}

export const handleRequest = async (req: NextRequest, callback: ({ data, searchParams }: { data?: any, searchParams: URLSearchParams }) => Promise<Response>) => {
    try {
        let data: any;
        switch (req.method.toUpperCase()) {
            case 'POST':
            case 'PUT':
                data = await req.json();
                if (!data) throw new Error('Undefined data.');
                break;
        }
        const searchParams = req.nextUrl.searchParams;
        const res = await callback({ data, searchParams });
        // console.log(`${getTime()} ${req.method} ${req.url} ${res.status} ${res.statusText}`);
        return res;
    } catch (err: any) {
        console.error(`${getTime()} ${req.method} ${req.url}`, err);
        return new Response(JSON.stringify({
            status: err.response.status,
            message: err.response.statusText,
        }), { status: err.status });
    }
}