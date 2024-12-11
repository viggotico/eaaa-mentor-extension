import { useMemo } from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { ContentVisibility } from "@/types/content-visibility";
import { NotFoundSection } from "./sections/NotFoundSection";

interface SectionProps extends ContentVisibility {
    children?: React.ReactNode;
}

export const Page = ({ children, visibility }: SectionProps) => {
    const pageContent = useMemo(() => {
        if (visibility !== 'Public') {
            if (visibility === 'Mentor' || visibility === 'Mentee') {
                if (!ApiFrontend.currentUser) return <NotFoundSection />;
                switch (visibility) {
                    case 'Mentor':
                        if (ApiFrontend.currentUser.type === 'Mentor') break;
                        return <NotFoundSection />;
                    case 'Mentee':
                        if (ApiFrontend.currentUser.type === 'Mentee') break;
                        return <NotFoundSection />;
                }
            } else if (visibility === 'Private') {
                if (!ApiFrontend.currentUser) return <NotFoundSection />;
            } else if (visibility === 'PublicOnly') {
                if (ApiFrontend.currentUser) return <NotFoundSection />;
            }
        }
        return <>{children}</>;
    }, [children, visibility, ApiFrontend.currentUser]);

    return pageContent;
}