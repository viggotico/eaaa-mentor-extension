import { ApiBackend } from "@/services/api/ApiBackend";
import { getParamsId, handleRequest, Params } from "../../api-helper";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return await handleRequest(req, async () => {
        const res = await ApiBackend.chats.getAll(); 
        return new Response(JSON.stringify(res), { status: 200 });
    });
}

export async function POST(req: NextRequest) {
    return await handleRequest(req, async ({ data }) => {
        const res = await ApiBackend.chats.create(req, data);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}

export async function PUT(req: NextRequest, { params }: Params) {
    return await handleRequest(req, async ({ data }) => {
        const id = await getParamsId(params);
        const res = await ApiBackend.chats.update(req, id, data);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}

export async function DELETE(req: NextRequest, { params }: Params) {
    return await handleRequest(req, async () => {
        const id = await getParamsId(params);
        const res = await ApiBackend.chats.delete(req, id);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}