import { ApiBackend } from "@/services/api/ApiBackend";
import { handleRequest } from "../../../api-helper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return await handleRequest(req, async ({ data }) => {
        const res = await ApiBackend.upload.entryFile(req, data?.file, data?.entryUid, data?.entryId, data?.field);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}