import { ApiFrontend } from "@/services/api/ApiFrontend"; // brug dette class til at få den nuværende bruger's data fx ApiFrontend.currentUser eller til at kalde på backend API's fx ApiFrontend.users.getAll()
import { Section } from "@/components/Section";
import styles from "./BudskabSection.module.css"; // brug dette object til css
import { SectionNested } from "../SectionNested";

export const BudskabSection = () => {
  return (
    // <Section> komponenten er en flexbox med flex-direction: row og en gap på 15px
    <Section
      visibility='Public' // her kan du ændre hvem der har adgang til sektionen
      bgColor='--secondary-color-shy-green: #bed4db' // her kan du ændre baggrundsfarve til sektionen
      gap='15px' // normale værdi er '15px'
      flexDirection='column' // normale værdi er 'column'
    >
      {/* Skriv dit indhold herinde */}
      <SectionNested>
      <h3>Budskab</h3>
      <p>
      EAAA Mentorordningen er din genvej til faglig sparring og personlig 
      udvikling ved hjælp af andre studerende. Platformen gør det 
      nemt at finde en mentor, booke møder og kommunikere direkte,
      så du får den støtte og vejledning, du har brug for i dit studieliv.
      </p>
      </SectionNested>
    </Section>
  );
}
