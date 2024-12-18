'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { Section } from "@/components/Section";
import { User } from "@/types/api";
import { Form } from "../input/Form";
import { InputText } from "../input/InputText";
import { InputButtons } from "../input/InputButtons";
import { goHome } from "@/services/StringUtilsFront";
import styles from "./LoginSection.module.css";

interface LoginSectionProps {
  type: User['type'];
}

class LoginError {
  static msg: string | undefined;
}

export const LoginSection = ({ type }: LoginSectionProps) => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  useEffect(() => {
    setErrorMsg(LoginError.msg)
    if (!LoginError.msg) return;
    alert(LoginError.msg);
  }, [LoginError.msg]);

  return (
    <Section
      visibility='PublicOnly'
      bgColor='--secondary-color-shy-green: #bed4db'
    >
      {/* Skriv dit indhold herinde */}
      <h1>{type} login</h1>
      <p>Har du ikke en bruger? <Link href={`/register/${type.toLowerCase()}`}><u>Opret dig</u></Link>.</p>
      <Form action={async (formData) => {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        await ApiFrontend.auth.login(email, password)
          .then(user => {
            if (user) {
              LoginError.msg = undefined;
              console.log('Successfully logged in as', `${user.name}!`);
              goHome();
            } else {
              LoginError.msg = 'Failed to login due to invalid user.';
              console.error(LoginError.msg);
            }
          }).catch(err => {
            LoginError.msg = err.message;
            alert(err.message);
          });
      }}>
        <InputText
          type='email'
          name='email'
          label='Email'
          required={true}
          placeholder='example@mentorordning.dk'
        />
        <InputText
          type='password'
          name='password'
          label='Adgangskode'
          placeholder='••••••••••'
          required={true}
        />
        <div className='group-row'>
          <InputButtons type='submit' label='Login' />
          <InputButtons type='default' label='Glemt adgangskode' onClick={() => {}} />
        </div>
        {errorMsg ? <p style={{ color: 'rgb(179, 56, 56)' }}>{errorMsg}</p> : <></>}
      </Form>
    </Section>
  );
}
