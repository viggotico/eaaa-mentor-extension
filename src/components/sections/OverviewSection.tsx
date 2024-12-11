import { ApiFrontend } from "@/services/api/ApiFrontend"; // brug dette class til at få den nuværende bruger's data fx ApiFrontend.currentUser eller til at kalde på backend API's fx ApiFrontend.users.getAll()
import { Section } from "@/components/Section";
import styles from "./OverviewSection.module.css"; // brug dette object til css

export const OverviewSection = () => {
  return (<>
    <Section
      visibility='Mentor' 
      bgColor='--secondary-color-quiet-gray: #f3f4f7'
      gap='15px'
      flexDirection='column'
    >
      <h1>Overblik</h1>
    </Section>

    <Section
      visibility='Mentee'
      bgColor='--secondary-color-quiet-gray: #f3f4f7'
      gap='15px'
      flexDirection='column'
    >
      <h1>Overblik</h1>
    </Section>
  </>);
}
