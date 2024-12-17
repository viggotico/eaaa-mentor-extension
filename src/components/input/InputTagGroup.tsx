'use client'

import { useState } from "react";
import { randomString } from "@/services/StringUtils";
import { InputText, InputTextProps } from "./InputText";
import "./input.css";
import styles from "./InputTagGroup.module.css";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface InputTagGroupProps {
    id?: string;
    label: string;
    name?: string;
    required?: boolean;
    placeholder?: string;
    description?: string;
    limit?: number;
    onChange?: (items: InputTextProps[]) => void;
}

export const InputTagGroup = ({ id, label, name, required, placeholder, description, limit, onChange }: InputTagGroupProps) => {
    const [items, setItems] = useState<InputTextProps[]>([]);
    const limitReached = items.length >= (limit ?? 5);

    const onChangedText = (value: string, item: Omit<InputTextProps, "onChanged">) => {
        const targetIndex = items.findIndex(x => x.id === item.id);
        if (targetIndex < 0) return;
        const updatedItem = { ...items[targetIndex], item };
        const updatedItems = [...items];
        updatedItems.splice(targetIndex, 1, updatedItem);
        setItems(updatedItems);
        onChange?.(items);
    }

    const onTagAdd = (e: any) => {
        e?.preventDefault();
        setItems(prev => [
            ...prev,
            {
                id: `input-tag-${randomString()}`,
                type: 'text',
                name,
                short: true,
                placeholder: placeholder ?? '...',
                required: true,
                hideErrorMsg: true,
                autoWidth: true,
                onChanged: onChangedText
            }
        ]);
    }

    const onTagRemove = (e: any,targetId: string) => {
        e?.preventDefault();
        const targetIndex = items.findIndex(x => x.id === targetId);
        if (targetIndex < 0) return;
        const updatedItems = [...items];
        updatedItems.splice(targetIndex, 1);
        setItems(updatedItems);
    }

    return <div className={styles.inputGroup}>
        <label htmlFor={id}><strong>{label}</strong>{required ? ' *' : ''}</label>
        {description ? <span>{description}</span> : <></>}
        <div className={styles.inputGroupFlex}>
            {items.map(item => {
                return <div key={item.id} className={styles.tagGroup}>
                    <InputText key={item.id} {...item} />
                    <button className={styles.tagRemoveButton} onClick={(e) => onTagRemove(e, item.id!)}>
                        <DeleteIcon />
                    </button>
                </div>;
            })}
            <button className={styles.tagAddButton} onClick={onTagAdd} disabled={limitReached}>
                Tilføj
                <AddIcon />
            </button>
        </div>
    </div>;
}