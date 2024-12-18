'use client'

import { useRef, useState } from "react";
import { randomString } from "@/services/StringUtilsFront";
import "./input.css";
import styles from "./InputText.module.css";

type InputTextTypes = 'text' | 'email' | 'fname' | 'lname' | 'file' | 'tel' | 'password' | 'time' | 'number' | 'submit';
export interface InputTextProps {
    id?: string;
    name?: string;
    label?: string;
    type: InputTextTypes;
    required?: boolean;
    hideErrorMsg?: boolean;
    placeholder?: string;
    initialValue?: string;
    description?: string;
    isTextArea?: boolean;
    short?: boolean;
    fullWidth?: boolean;
    centerText?: boolean;
    min?: string;
    max?: string;
    onChanged?: (value: string, item: Omit<InputTextProps, 'onChanged'>) => void;
}

export const InputText = ({
    id,
    name,
    label,
    type,
    required,
    hideErrorMsg,
    placeholder,
    initialValue,
    description,
    isTextArea,
    short,
    fullWidth,
    centerText,
    min,
    max,
    onChanged
}: InputTextProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(initialValue ?? '');
    const groupClassNames: string[] = [];
    const classNames: string[] = [];

    groupClassNames.push(styles.inputGroup);
    if (fullWidth) groupClassNames.push(styles.inputFullWidth);

    if (isTextArea) classNames.push('input-area');
    else classNames.push('input');
    if (short) classNames.push('input-short');
    if (centerText) classNames.push('input-center-text');

    const triggerOnChanged = () => {
        onChanged?.(ref.current?.value ?? '', {
            id,
            name,
            label,
            type,
            required,
            hideErrorMsg,
            placeholder,
            initialValue: ref.current?.value,
            description,
            isTextArea,
            short,
            fullWidth,
            centerText,
            min,
            max,
        });
    }

    const onChange = (e: any) => {
        if (!ref?.current) return;
        e?.preventDefault();
        setValue(ref.current.value);
        if (type === 'time') triggerOnChanged();
    }

    const onBlur = (e: any) => {
        if (!ref?.current) return;
        if (ref.current.disabled) return;
        e?.preventDefault();
        if (type !== 'time') triggerOnChanged();
    }
    
    return <div className={groupClassNames.join(' ')}>
        {label ? <label htmlFor={id}><strong>{label}</strong>{required ? ' *' : ''}</label> : <></>}
        <input
            className={classNames.join(' ')}
            ref={ref}
            id={id ?? randomString()}
            type={type}
            name={name}
            required={required}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            min={min}
            max={max}
        />
        {
            !hideErrorMsg && ref?.current?.validationMessage ?
                <span className='input-error-msg'>
                    {ref?.current?.validationMessage}
                </span>
                : <></>
        }
        {description ? <span>{description}</span> : <></>}
    </div>;
}