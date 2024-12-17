import { useState } from "react"; // Importér useState til håndtering af input
import { Section } from "@/components/Section";
import styles from "./FindAMentorSection.module.css";
// @ts-ignore
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// @ts-ignore
import SchoolIcon from '@mui/icons-material/School';

const mockMentors = [
  { id: 1, name: "Mikkel Nielson", role: "Datamatiker", tags: ["Programmering", "C#", "JavaScript", "React"], image: "/content/mikkel.jpg", available: true },
  { id: 2, name: "Mathias Petersen", role: "Multimediedesigner", tags: ["E-commerce", "Personlig udvikling"], image: "/content/mathias.jpg", available: true },
  { id: 3, name: "Caroline Madsen", role: "Multimediedesigner", tags: ["Content Creation", "Adobe CC", "Figma"], image: "/content/caroline.jpg", available: true },
  { id: 4, name: "Signe Henriksen", role: "Finans Bachelor", tags: ["Erhvervsøkonomi", "Projektledelse", "Organisation"], image: "/content/signe.jpg", available: false },
  { id: 5, name: "Emma Hansen", role: "Multimediedesigner", tags: ["Content Creation", "Adobe CC", "Figma"], image: "/content/emma.jpg", available: false },
];

export const FindAMentorSection = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State til søgeinput

  // Filtrér mentorer baseret på søgeinput
  const filteredMentors = mockMentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section
      visibility="Public"
      bgColor="--secondary-color-quiet-gray: #f3f4f7"
      gap="15px"
      flexDirection="column"
    >
      <h1 className={styles.titelTekst}>Find en mentor</h1>

      {/* Søg efter mentor */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Søg efter mentor..."
          value={searchTerm} // Binder input til state
          onChange={(e) => setSearchTerm(e.target.value)} // Opdater state ved input
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <span className={styles.searchIcon}>🔍</span>
        </button>
      </div>

      {/* Viser filtrerede mentorer */}
      <div className={styles.mentorGrid}>
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className={`${styles.mentorCard} ${
              mentor.available ? styles.available : styles.unavailable
            }`}
          >
            <img
              src={mentor.image}
              alt={mentor.name}
              className={styles.mentorImage}
            />
            <div className={styles.mentorStatus}>
              {mentor.available ? "Tilgængelig" : "Ikke tilgængelig"}
            </div>

            <div className={styles.nameContainer}>
              <h2>{mentor.name}</h2>
              <ArrowForwardIosIcon className={styles.leftArrow} />
            </div>

            <div className={styles.roleContainer}>
              <p>{mentor.role}</p>
              <SchoolIcon className={styles.schoolIcon} />
            </div>

            <div className={styles.tagContainer}>
              {mentor.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Ingen resultater */}
        {filteredMentors.length === 0 && (
          <p className={styles.noResults}>Ingen mentorer matchede din søgning.</p>
        )}
      </div>
    </Section>
  );
};
