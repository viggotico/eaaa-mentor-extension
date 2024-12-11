import { handleRequest } from "@/app/api/api-helper";
import { ApiBackend } from "@/services/api/ApiBackend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return await handleRequest(req, async ({ data }) => {
        if (!data) throw new Error('Invalid data.');
        const { email, password } = data;
        if (!email) throw new Error('Invalid email.');
        if (!password) throw new Error('Invalid password.');
        let resPlaceholder = new Response(null, { status: 200 });
        const res = await ApiBackend.auth.login(resPlaceholder, email, password);
        return new Response(JSON.stringify(res), { headers: resPlaceholder.headers });
    });
}