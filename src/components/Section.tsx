import React, { useMemo } from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { CssColor } from "@/types/css-color";
import { ContentVisibility } from "@/types/content-visibility";

interface SectionProps extends ContentVisibility {
    children?: React.ReactNode;
    bgColor: CssColor;
    gap?: React.CSSProperties['gap'];
    flexDirection?: React.CSSProperties['flexDirection'];
}

export const Section = ({ children, visibility, bgColor, gap, flexDirection }: SectionProps) => {
    const sectionContent = useMemo(() => {
        const backgroundColor = `var(${bgColor.split(': ')[0]})`;
        if (visibility !== 'Public') {
            if (visibility === 'Mentor' || visibility === 'Mentee') {
                if (!ApiFrontend.currentUser) return <></>;
                switch (visibility) {
                    case 'Mentor':
                        if (ApiFrontend.currentUser.type === 'Mentor') break;
                        return <></>;
                    case 'Mentee':
                        if (ApiFrontend.currentUser.type === 'Mentee') break;
                        return <></>;
                }
            } else if (visibility === 'Private' && !ApiFrontend.currentUser) return <></>;
            else if (visibility === 'PublicOnly' && ApiFrontend.currentUser) return <></>;
        }
        return <section className='section' style={{ backgroundColor, gap, flexDirection }}>
            {children ?? <></>}
        </section>;
    }, [children, visibility, bgColor, gap, flexDirection, ApiFrontend.currentUser]);

    return sectionContent;
}