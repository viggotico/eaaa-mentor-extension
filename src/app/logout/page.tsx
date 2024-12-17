'use client'

import { Page } from "@/components/Page";
import { Section } from "@/components/Section";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { getHomeUrl } from "@/services/StringUtils";
import { useEffect } from "react";

export default function LogoutPage() {
    useEffect(() => {
        if (!ApiFrontend.currentUser) return;
        ApiFrontend.auth.logout()
            .then(value => {
                if (!value) {
                    console.log('Failed to log out.');
                    return;
                }
                console.log('successfully logged out!');
                window.location.href = getHomeUrl()!;
            });
    }, []);

    return <Page visibility='Private'>
        <Section
        bgColor='--secondary-color-quiet-gray: #f3f4f7'
        visibility='Private'
        >
            <h3>Logger ud...</h3>
        </Section>
    </Page>;
}