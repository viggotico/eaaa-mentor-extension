'use client'

import { Page } from "../Page";
import { LoginCardsSection } from "../sections/LoginCardsSection";

export const LoginPage = () => {
  return <Page visibility='PublicOnly'>
    <LoginCardsSection />
  </Page>
}
