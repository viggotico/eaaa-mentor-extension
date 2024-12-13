'use client'

import Link from "next/link";
import { ChangeEventHandler } from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend"; // brug dette class til at få den nuværende bruger's data fx ApiFrontend.currentUser eller til at kalde på backend API's fx ApiFrontend.users.getAll()
import { Section } from "@/components/Section";
import { User } from "@/types/api";
import styles from "./LoginSection.module.css"; // brug dette object til css

interface InputSelectProps {
  id: string;
  label: string;
  type: 'checkbox' | 'radio';
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const InputSelect = ({ label, id, type, checked, onChange }: InputSelectProps) => {
  return <div className={styles.selectInput}>
      <input
      id={id}
      type={type}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}></label>
  </div>;
}

interface InputSelectGroupProps {
  id: string;
  label: string;
  items: InputSelectProps[];
  description?: string;
}

export const InputSelectGroup = ({ label, id, items, description }: InputSelectGroupProps) => {
  return <div className={styles.inputGroup}>
    <label htmlFor={id}>{label}</label>
    <div id={id}>
      {
        items.map(item => {
          return <InputSelect
            key={item.id}
            id={item.id}
            label={item.label}
            type={item.type}
            checked={item.checked}
            onChange={item.onChange}
          />;
        })
      }
    </div>
    {description ? <span>{description}</span> : <></>}
  </div>;
}

interface LoginSectionProps {
  type: User['type'];
}

export const LoginSection = ({ type }: LoginSectionProps) => {
  return (
    // <Section> komponenten er en flexbox med flex-direction: row og en gap på 15px
    <Section
      visibility='PublicOnly' // her kan du ændre hvem der har adgang til sektionen
      bgColor='--secondary-color-quiet-gray: #f3f4f7' // her kan du ændre baggrundsfarve til sektionen
      gap='15px' // normale værdi er '15px'
      flexDirection='column' // normale værdi er 'column'
    >
      {/* Skriv dit indhold herinde */}
      <h1>{type} login</h1>
      <p>Har du ikke en bruger? <Link href={`/register/${type.toLowerCase()}`}><u>Opret dig</u></Link>.</p>
      <InputSelectGroup
        id='test'
        label='Options'
        description='description'
        items={[
          {
            id: 'option1',
            label: 'option 1',
            type: 'checkbox',
            checked: true,
            onChange: () => {}
          },
          {
            id: 'option2',
            label: 'option 2',
            type: 'checkbox',
            checked: true,
            onChange: () => {}
          },
        ]}
      />
    </Section>
  );
}
