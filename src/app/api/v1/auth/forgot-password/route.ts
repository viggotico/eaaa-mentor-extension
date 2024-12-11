import { handleRequest } from "@/app/api/api-helper";
import { ApiBackend } from "@/services/api/ApiBackend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return await handleRequest(req, async ({ data }) => {
        if (!data) throw new Error('Invalid data.');
        const { email } = data;
        const res = await ApiBackend.auth.forgotPassword(email);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}