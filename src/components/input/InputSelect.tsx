import { useEffect, useRef } from "react";
import "./select.css";
import styles from "./InputSelect.module.css";

export interface InputSelectPropsCallbackData extends Omit<InputSelectProps, 'required' | 'onChange'> {}
export interface InputSelectProps {
    id: string;
    label: string;
    name?: string;
    type: 'checkbox' | 'radio';
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    hidden?: boolean;
    onChange?: (checked: boolean, item?: InputSelectPropsCallbackData) => void;
}

export const InputSelect = ({ id, label, name, type, checked, disabled, required, hidden, onChange }: InputSelectProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const handleOnClick = (e: any) => {
        if (!ref?.current) return;
        e?.preventDefault();
        if (ref.current.disabled) return;
        const checked = !ref.current.checked;
        ref.current.checked = checked;
        const item = {
            label,
            type,
            hidden,
            id: ref.current.id,
            name: ref.current.name,
            checked: ref.current.checked,
            disabled: ref.current.disabled,
        };
        onChange?.(checked, item);
    }

    useEffect(() => {
        if (!ref?.current) return;
        ref.current.checked = checked ?? false;
    }, []);

    return <label className={`control control-${type}${hidden ? ' control_hidden' : ''}`} onClick={handleOnClick}>
        {label}
        <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            // checked={checked}
            required={required}
            disabled={disabled}
            onChange={() => {}}
        />
        <div className="control_indicator"></div>
    </label>;
}