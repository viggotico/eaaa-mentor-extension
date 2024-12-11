import styles from "./SectionNested.module.css";

interface SectionNestedProps {
    children: React.ReactNode;
    figcaption?: boolean;
}

export const SectionNested = ({ children, figcaption }: SectionNestedProps) => {
    return figcaption ?
        <figcaption className={`${styles.sectionInner} ${styles.sectionInnerCaption}`}>
            {children}
        </figcaption> :
        <div className={styles.sectionInner}>
            {children}
        </div>;
}