import { handleRequest } from "@/app/api/api-helper";
import { ApiBackend } from "@/services/api/ApiBackend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return await handleRequest(req, async ({ data }) => {
        if (!data) throw new Error('Invalid data.');
        let resPlaceholder = new Response(null, { status: 200 });
        const res = await ApiBackend.auth.register(req, resPlaceholder, data);
        return new Response(JSON.stringify(res), { headers: resPlaceholder.headers });
    });
}