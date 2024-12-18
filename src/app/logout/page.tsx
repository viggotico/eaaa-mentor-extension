'use client'

import { useEffect } from "react";
import { Page } from "@/components/Page";
import { Section } from "@/components/Section";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { goHome } from "@/services/StringUtilsFront";
import { useSession } from "@/hooks/useSession";
import { NotFoundPage } from "@/components/pages/NotFoundPage";

export default function LogoutPage() {
    const { loggedIn, currentUser } = useSession();

    useEffect(() => {
        if (!loggedIn) return;
        ApiFrontend.auth.logout()
            .then(value => {
                if (!value) {
                    console.log('Failed to log out.');
                    return;
                }
                console.log('successfully logged out!');
                goHome();
            });
    }, []);

    if (!loggedIn) return <NotFoundPage />;

    return <Page visibility='Public'>
        <Section
        bgColor='--secondary-color-quiet-gray: #f3f4f7'
        visibility='Private'
        >
            <h3>Logger ud...</h3>
        </Section>
    </Page>;
}