'use client'

import React from "react";
import { CssColor } from "@/types/css-color";
import { ContentVisibility } from "@/types/content-visibility";
import { useSession } from "@/hooks/useSession";

interface SectionProps extends ContentVisibility {
    children?: React.ReactNode;
    bgColor: CssColor;
    gap?: React.CSSProperties['gap'];
    flexDirection?: React.CSSProperties['flexDirection'];
}

export const Section = ({ children, visibility, bgColor, gap, flexDirection }: SectionProps) => {
    const { loggedIn, currentUser } = useSession();

    const backgroundColor = `var(${bgColor.split(': ')[0]})`;
    if (visibility !== 'Public') {
        if (visibility === 'Mentor' || visibility === 'Mentee') {
            if (!loggedIn) return <></>;
            switch (visibility) {
                case 'Mentor':
                    if (currentUser?.type === 'Mentor') break;
                    return <></>;
                case 'Mentee':
                    if (currentUser?.type === 'Mentee') break;
                    return <></>;
            }
        } else if (visibility === 'Private' && !currentUser) return <></>;
        else if (visibility === 'PublicOnly' && currentUser) return <></>;
    }

    return <section className='section' style={{ backgroundColor, gap, flexDirection }}>
        {children ?? <></>}
    </section>;
}