'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './InputDropzone.module.css';

export interface DropzoneComponentProps {
    id?: string;
    required?: boolean;
    name?: string;
    dropDescription: string;
    onSuccess?: () => void;
    onError?: (message: string) => void;
}

function Dropzone({ id, required, name, dropDescription, onSuccess, onError }: DropzoneComponentProps) {
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        onDrop: (incomingFiles) => {
            if (hiddenInputRef.current) {
                // Note the specific way we need to munge the file into the hidden input
                // https://stackoverflow.com/a/68182158/1068446
                const dataTransfer = new DataTransfer();
                incomingFiles.forEach((v) => {
                    dataTransfer.items.add(v);
                });
                hiddenInputRef.current.files = dataTransfer.files;
            }
        }
    });

    useEffect(() => {
        if (!hiddenInputRef.current?.validationMessage) {
            onSuccess?.();
            return;
        } else onError?.(hiddenInputRef.current?.validationMessage);
    }, [hiddenInputRef.current?.validationMessage]);

    const files = acceptedFiles.map((file: any) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return !files.length ?
        <div {...getRootProps({ className: 'dropzone' })}>
            <input
                id={id}
                type='file'
                name={name}
                required={required}
                style={{ opacity: 0 }}
                ref={hiddenInputRef}
            />
            <input {...getInputProps()} />
            <p>{dropDescription}</p>
            <span onClick={open}></span>
        </div> :
        <aside>
            <strong>Filer</strong>
            <ul>{files}</ul>
        </aside>;
}

export interface InputDropzoneProps extends Omit<DropzoneComponentProps, 'onSuccess' | 'onError'> {
    id?: string;
    label: string;
    description: string;
}

export const InputDropzone = ({ id, label, name, description, dropDescription, required }: InputDropzoneProps) => {
    const [dropzoneErrorMessage, setDropzoneErrorMessage] = useState<string | undefined>(undefined);

    return <div className={styles.inputDropzoneWrapper}>
        <label htmlFor={id}><strong>{label}</strong>{required ? ' *' : ''}</label>
        {description ? <p>{description}</p> : <></>}
        <div className={styles.inputDropzone}>
            <Dropzone
                required={required}
                name={name}
                dropDescription={dropDescription}
                onSuccess={() => setDropzoneErrorMessage(undefined)}
                onError={(message: string) => setDropzoneErrorMessage(message)}
            />
        </div>
        {dropzoneErrorMessage ? <p className={styles.errorMsg}>{dropzoneErrorMessage}</p> : <></>}
    </div>;
}