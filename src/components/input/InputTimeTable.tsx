'use client'

import { useState } from "react";
import { randomString } from "@/services/StringUtilsFront";
import { InputText, InputTextProps } from "./InputText";
import "./input.css";
import styles from "./InputTimeTable.module.css";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

type WeekdayGroup = [string, InputTextProps[]];
export interface InputTimeTableProps {
    id?: string;
    label: string;
    name?: string;
    required?: boolean;
    description?: string;
    onChange?: (items: WeekdayGroup[]) => void;
}

export const InputTimeTable = ({ id, label, name, required, description, onChange }: InputTimeTableProps) => {
    const [weekdays, setWeekdays] = useState<WeekdayGroup[]>([
        ['Mandag', []],
        ['Tirsdag', []],
        ['Onsdag', []],
        ['Torsdag', []],
        ['Fredag', []],
    ]);
    const [items, setItems] = useState(weekdays);

    const onChangedText = (value: string, item: Omit<InputTextProps, "onChanged">) => {
        const updatedItems = [...items];
        const propsArr = updatedItems.flatMap(x => x[1]);
        const updatedItemsIndex = updatedItems.findIndex(x => x[1].find(a => a.id === item.id));
        const targetIndex = propsArr.findIndex(x => x.id === item.id);
        if (targetIndex < 0) return;
        const updatedItem = { ...propsArr[targetIndex], ...item };
        updatedItems[updatedItemsIndex][1].splice(targetIndex, 1, updatedItem);
        setItems(updatedItems);
        onChange?.(items);
    }

    const onTagAdd = (e: any, day: string) => {
        e?.preventDefault();
        setItems(prev => {
            const weekdayGroups = [...prev];
            const dayIndex = weekdayGroups.findIndex(x => x[0] === day);

            if (dayIndex < 0) return [...prev];

            let weekdayGroup = weekdayGroups.find(x => x[0] === day)!;
            weekdayGroups.splice(dayIndex, 1, [day, [
                ...weekdayGroup[1],
                {
                    id: `input-tag-${randomString()}`,
                    type: 'time',
                    fullWidth: true,
                    required: true,
                    placeholder: '10:00',
                    hideErrorMsg: true,
                    centerText: true,
                    min: '08:00',
                    max: '21:00',
                    onChanged: onChangedText
                } as InputTextProps
            ]]);

            return weekdayGroups;
        });
    }

    const onTagRemove = (e: any, weekdayIndex: number, targetIndex: number) => {
        e?.preventDefault();
        const updatedItems = [...items];
        updatedItems[weekdayIndex][1].splice(targetIndex, 1);
        setItems(updatedItems);
    }

    return <div className={styles.inputGroup}>
        <label htmlFor={id}><strong>{label}</strong>{required ? ' *' : ''}</label>
        {description ? <span>{description}</span> : <></>}
        <div className={styles.inputGroupRow}>
            {items.map((itemGroup, weekdayIndex) => {
                const day = itemGroup[0];
                const propsGroup = itemGroup[1];
                return <div key={`${day}-${randomString()}`} className={styles.inputGroupFlex}>
                    <div className={styles.tagGroupHeader}>{day}</div>
                    {propsGroup.map((props, propsIndex) => {
                        return <div key={`${day}-props-${randomString()}`} className={styles.tagGroup}>
                            <InputText key={`${props.id}-${randomString()}`} id={props.id} {...props} name={`${name ? `${name}-` : ''}${day}`} />
                            <button className={styles.tagRemoveButton} onClick={(e) => onTagRemove(e, weekdayIndex, propsIndex)}>
                                <DeleteIcon />
                            </button>
                        </div>;
                    })}
                    <button className={styles.tagAddButton} onClick={(e) => onTagAdd(e, day)}>
                        Tilføj
                        <AddIcon />
                    </button>
                </div>
            })}
        </div>
    </div>;
}