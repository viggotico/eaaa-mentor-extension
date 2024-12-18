'use client'

import { useMemo } from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { ContentVisibility } from "@/types/content-visibility";
import { NotFoundSection } from "./sections/NotFoundSection";
import { useSession } from "@/hooks/useSession";

interface SectionProps extends ContentVisibility {
    children?: React.ReactNode;
}

export const Page = ({ children, visibility }: SectionProps) => {
    const { loggedIn, currentUser } = useSession();

    if (visibility !== 'Public') {
        if (visibility === 'Mentor' || visibility === 'Mentee') {
            if (!loggedIn) return <NotFoundSection />;
            switch (visibility) {
                case 'Mentor':
                    if (currentUser?.type === 'Mentor') break;
                    return <NotFoundSection />;
                case 'Mentee':
                    if (currentUser?.type === 'Mentee') break;
                    return <NotFoundSection />;
            }
        } else if (visibility === 'Private') {
            if (!loggedIn) return <NotFoundSection />;
        } else if (visibility === 'PublicOnly') {
            if (loggedIn) return <NotFoundSection />;
        }
    }
    
    return <>{children}</>;
}