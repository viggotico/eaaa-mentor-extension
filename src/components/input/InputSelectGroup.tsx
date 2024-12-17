import { useState } from "react";
import { InputSelect, InputSelectProps, InputSelectPropsCallbackData } from "./InputSelect";
import styles from "./InputSelectGroup.module.css";

export interface InputSelectGroupProps {
    id: string;
    name?: string;
    label: string;
    type: InputSelectProps['type'];
    items: Omit<InputSelectProps, 'type' | 'onChange'>[];
    required?: InputSelectProps['required'];
    description?: string;
    onSelected?: (items: InputSelectPropsCallbackData[]) => void;
}

export const InputSelectGroup = ({ id, name, label, type, items, required, description, onSelected }: InputSelectGroupProps) => {
    const [selected, setSelected] = useState<Record<string, InputSelectPropsCallbackData>>({});

    const onChange = (checked: boolean, item?: InputSelectPropsCallbackData) => {
        if (!item) return;
        setSelected((prev) => {
            let next = { ...prev };
            if (!checked && prev[item.id]) delete prev[item.id];
            else next[item.id] = item;
            onSelected?.(Object.values(next));
            return next;
        });
    }

    return <div className={styles.inputGroup}>
        <label htmlFor={id}><strong>{label}</strong>{required ? ' *' : ''}</label>
        <div id={id}>
            {items.map(item => <InputSelect
                key={item.id}
                {...item}
                name={name}
                type={type}
                onChange={onChange}
                required={type === 'radio' ? true : undefined}
            />)}
        </div>
        {description ? <span>{description}</span> : <></>}
    </div>;
}