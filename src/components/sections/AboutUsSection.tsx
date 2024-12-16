import { ApiFrontend } from "@/services/api/ApiFrontend"; // brug dette class til at få den nuværende bruger's data fx ApiFrontend.currentUser eller til at kalde på backend API's fx ApiFrontend.users.getAll()
import { Section } from "@/components/Section";
import styles from "./AboutUsSection.module.css"; // brug dette object til css

export const AboutUsSection = () => {
  return (
    // <Section> komponenten er en flexbox med flex-direction: row og en gap på 15px
    <Section
      visibility='Public' // her kan du ændre hvem der har adgang til sektionen
      bgColor='--secondary-color-quiet-gray: #f3f4f7' // her kan du ændre baggrundsfarve til sektionen
      gap='15px' // normale værdi er '15px'
      flexDirection='column' // normale værdi er 'column'
    
    >
      {/* Skriv dit indhold herinde */}
      <div className={styles.container}>
        <div className={styles.circleBox}></div>
          <div className={styles.imageBox}></div>
          <div className={styles.textContainer}>
          <h1>Om os</h1>
          <p>
            Mentorordningen på Erhvervsakademi Aarhus forbinder studerende med
            erfarne mentorer(Studerende), der kan hjælpe med faglige og studiemæssige
            udfordringer.
          </p>
          <p>
            Vores platform gør det nemt at finde en mentor, booke møder og
            kommunikere direkte via chat. Med støtte fra andre studerende
            skaber vi et stærkere studiemiljø, hvor alle kan trives og udvikle
            sig.
          </p>
        </div>
      </div>
    </Section>
  );
}
