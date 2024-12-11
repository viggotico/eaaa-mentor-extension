import { MouseEventHandler } from "react";
import Link from "next/link";
import styles from "./CardCallToAction.module.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SectionNested } from "./SectionNested";

interface CardCallToActionProps {
    bgImage: string;
    title: string;
    description: string;
    url?: string;
    onClick?: MouseEventHandler<HTMLElement> | undefined;
}

export const CardCallToAction = ({ bgImage, title, description, url, onClick }: CardCallToActionProps) => {
    const figure = <figure className={styles.main} onClick={url ? undefined : onClick}>
        <picture style={{ backgroundImage: `url('${bgImage}')` }}></picture>
        <SectionNested figcaption>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={styles.button}>
                <ArrowForwardIosIcon />
            </div>
        </SectionNested>
    </figure>;

    return (<>
        {
            url ? <Link href={url ?? '#'} className={styles.mainLink}>
                {figure}
            </Link> : figure
        }
    </>);
}