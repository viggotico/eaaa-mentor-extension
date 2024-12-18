'use client'

import { Page } from "../Page";
import { RegisterSection } from "../sections/RegisterSection";

export const RegisterPageMentee = () => {
  return <Page visibility='PublicOnly'>
    <RegisterSection type='Mentee' />
  </Page>
}
