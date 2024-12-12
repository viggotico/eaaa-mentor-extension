import { getParamsId, handleRequest, Params } from "@/app/api/api-helper";
import { ApiBackend } from "@/services/api/ApiBackend";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: Params) {
    return await handleRequest(req, async () => {
        const id = await getParamsId(params);
        const res = await ApiBackend.chatMessages.get(id);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}