'use client'

import { Section } from "@/components/Section";
import { CardCallToAction } from "@/components/CardCallToAction";
import styles from "./LoginCardsSection.module.css";

export const LoginCardsSection = () => {
  return <Section
    visibility='PublicOnly'
    bgColor='--secondary-color-shy-green: #bed4db'
    flexDirection='row'
  >
    <CardCallToAction
      bgImage='content/login-mentee.jpg'
      title='Mentee'
      description='Login eller opret dig som mentee og find en mentor, som kan hjælpe dig med dine udfordringer.'
      url="/login/mentee"
    />
    <CardCallToAction
      bgImage='content/login-mentor.jpg'
      title='Mentor'
      description='Login eller opret dig som mentor og benyt dine færdigheder til at hjælpe mentees med deres udfordringer.'
      url="/login/mentor"
    />
  </Section>
}
