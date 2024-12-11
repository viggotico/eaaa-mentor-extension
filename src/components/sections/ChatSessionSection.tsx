import { ApiFrontend } from "@/services/api/ApiFrontend"; // brug dette class til at få den nuværende bruger's data fx ApiFrontend.currentUser eller til at kalde på backend API's fx ApiFrontend.users.getAll()
import { Section } from "@/components/Section";
import { Chat } from "@/types/api";
import styles from "./ChatSessionSection.module.css"; // brug dette object til css

interface ChatSessionSectionProps {
  chat: Chat;
}

export const ChatSessionSection = async ({ chat }: ChatSessionSectionProps) => {
  return (
    // <Section> komponenten er en flexbox med flex-direction: row og en gap på 15px
    <Section
      visibility='Private' // her kan du ændre hvem der har adgang til sektionen
      bgColor='--secondary-color-quiet-gray: #f3f4f7' // her kan du ændre baggrundsfarve til sektionen
      gap='15px' // normale værdi er '15px'
      flexDirection='column' // normale værdi er 'column'
    >
      {/* Skriv dit indhold herinde */}
      <h1>Chat med {`<mentor/mentee's navn>`}</h1>
    </Section>
  );
}
