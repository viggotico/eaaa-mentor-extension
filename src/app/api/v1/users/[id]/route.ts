import { handleRequest } from "@/app/api/api-helper";
import { ApiBackend } from "@/services/api/ApiBackend";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return await handleRequest(req, async () => {
        const res = await ApiBackend.users.get(params.id);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}