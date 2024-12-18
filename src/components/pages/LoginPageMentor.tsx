'use client'

import { Page } from "../Page";
import { LoginSection } from "../sections/LoginSection";

export const LoginPageMentor = () => {
  return <Page visibility='PublicOnly'>
    <LoginSection type='Mentor' />
  </Page>
}
