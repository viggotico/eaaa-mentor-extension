import { handleRequest } from "@/app/api/api-helper";
import { ApiBackend } from "@/services/api/ApiBackend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return await handleRequest(req, async ({ data }) => {
        if (!data) throw new Error('Invalid data.');
        const { currentPassword, password, passwordConfirmation } = data;
        if (!currentPassword) throw new Error('Invalid current password.');
        if (!password) throw new Error('Invalid password.');
        if (!passwordConfirmation) throw new Error('Invalid password confirmation.');
        const res = await ApiBackend.auth.changePassword(req, currentPassword, password, passwordConfirmation);
        return new Response(JSON.stringify(res), { status: 200 });
    });
}