'use client'

import { Page } from "../Page";
import { AboutMentorshipSection } from "../sections/AboutMentorshipSection";
import { BudskabSection } from "../sections/BudskabSection";

export const AboutMentorshipPage = () => {
  return <Page visibility='Public'>
    <AboutMentorshipSection />
    <BudskabSection />
  </Page>
}
