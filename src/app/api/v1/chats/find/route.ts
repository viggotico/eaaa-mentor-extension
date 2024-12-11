import { handleRequest } from "@/app/api/api-helper";
import { ApiBackend } from "@/services/api/ApiBackend";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return await handleRequest(req, async ({ searchParams }) => {
        const filters = searchParams.get('filters');
        if (!filters) throw new Error('Query is missing filters.');
        const res = await ApiBackend.chats.find(filters);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}