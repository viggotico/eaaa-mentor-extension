import styles from "./InputButtons.module.css";

export interface InputButtonsProps {
    id?: string;
    label: string;
    type: 'submit' | 'default';
    labelCancel?: string;
    labelContinue?: string;
    onClick?: React.ReactEventHandler<HTMLElement>;
    onClickCancel?: React.ReactEventHandler<HTMLDivElement>;
    onClickContinue?: React.ReactEventHandler<HTMLDivElement>;
}

export const InputButtons = ({ id, label, type, labelCancel, labelContinue, onClick, onClickCancel, onClickContinue }: InputButtonsProps) => {
    return <div className={styles.inputGroup}>
        {labelCancel ? <div className={styles.button} onClick={onClickCancel}>{labelCancel}</div> : <></>}
        {
            type === 'default' ?
                <div className={styles.button} onClick={onClick}>{label}</div> :
                <input
                    className={styles.button}
                    id={id}
                    type='submit'
                    value={label}
                    onClick={onClick}
                />
        }
        {labelContinue ? <div className={styles.button} onClick={onClickContinue}>{labelContinue}</div> : <></>}
    </div>;
}