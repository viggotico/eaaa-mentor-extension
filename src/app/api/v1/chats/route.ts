import { ApiBackend } from "@/services/api/ApiBackend";
import { handleRequest } from "../../api-helper";
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    return await handleRequest(req, async ({ data }) => {
        const res = await ApiBackend.chats.update(req, params.id, data);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return await handleRequest(req, async () => {
        const res = await ApiBackend.chats.delete(req, params.id);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}