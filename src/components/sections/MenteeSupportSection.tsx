import { ApiFrontend } from "@/services/api/ApiFrontend"; // brug dette class til at få den nuværende bruger's data fx ApiFrontend.currentUser eller til at kalde på backend API's fx ApiFrontend.users.getAll()
import { Section } from "@/components/Section";
import styles from "./MenteeSupportSection.module.css"; // brug dette object til css
import { SectionNested } from "../SectionNested";

export const MenteeSupportSection = () => {
  return (
    // <Section> komponenten er en flexbox med flex-direction: row og en gap på 15px
    <Section
      visibility='Public' // her kan du ændre hvem der har adgang til sektionen
      bgColor='--main-color-teel-green: #80b4bf' // her kan du ændre baggrundsfarve til sektionen
      gap='15px' // normale værdi er '15px'
      flexDirection='column' // normale værdi er 'column'
    >
      {/* Skriv dit indhold herinde */}
      <SectionNested>
      {/* <div className={styles.innerBox}> */}
      <h3>Vejledning til mentees</h3>
      <p><strong>Er du i tvivl om du skal være en mentor/mentee?</strong></p>
      <p>Skriv til os på mail for at få vejledning angående mentorordningen. Du er også velkommen til at stille spørgsmål.</p>
      <p>E-mail: <a href="mailto:mentor@eaaa.dk">mentor@eaaa.dk</a></p>
      {/* </div> */}
      </SectionNested>
    </Section>
  );
}
