'use client'

import { ApiFrontend } from "@/services/api/ApiFrontend"; // brug dette class til at få den nuværende bruger's data fx ApiFrontend.currentUser eller til at kalde på backend API's fx ApiFrontend.users.getAll()
import { Section } from "@/components/Section";
import styles from "./CalenderSubmit.module.css"; // brug dette object til css

export const CalenderSubmit = () => {
  return (
    // <Section> komponenten er en flexbox med flex-direction: row og en gap på 15px
    <Section
      visibility='PublicOnly' // her kan du ændre hvem der har adgang til sektionen
      bgColor='--secondary-color-quiet-gray: #f3f4f7' // her kan du ændre baggrundsfarve til sektionen
      gap='15px' // normale værdi er '15px'
      flexDirection='column' // normale værdi er 'column'
    >
      {/* Skriv dit indhold herinde */}


      <div className={styles.submitContainer}>

        <div className={styles.submit}>
       <span className={styles.done}>✅</span>
       <h1 className={styles.submitTekst}>Dit vælg vil nu blive sendt til din mentor 🎉</h1>
       </div>

      </div>



    </Section>
  );
}
