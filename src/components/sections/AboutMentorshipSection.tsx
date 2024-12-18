'use client'

import { ApiFrontend } from "@/services/api/ApiFrontend"; // brug dette class til at få den nuværende bruger's data fx ApiFrontend.currentUser eller til at kalde på backend API's fx ApiFrontend.users.getAll()
import { Section } from "@/components/Section";
import { SectionNested } from "../SectionNested";
import styles from "./AboutMentorshipSection.module.css"; // brug dette object til css

export const AboutMentorshipSection = () => {
  return (
    // <Section> komponenten er en flexbox med flex-direction: row og en gap på 15px
    <Section
      visibility='Public' // her kan du ændre hvem der har adgang til sektionen
      bgColor='--secondary-color-butter-yellow: #f4ebc0' // her kan du ændre baggrundsfarve til sektionen
      gap='15px' // normale værdi er '15px'
      flexDirection='column' // normale værdi er 'column'
    >
      {/* Skriv dit indhold herinde */}
      <SectionNested>
        <h3>Om mentorordningen</h3>
        <p><strong>Hvad går mentorordningen ud på?</strong></p>
        <p>
          Mentorordningen er lavet for at øge fokus på den 
          faglige integration, hvor ældre studerende vejleder 
          og støtter de nye studerende.
        </p>
        <p>
          Mentorordningen skal med andre ord ses som en del 
          af den samlede vifte af initiativer for at sikre 
          et godt studiemiljø og fastholde og motivere de studerende.
        </p>
      </SectionNested>
    </Section>
  );
}
