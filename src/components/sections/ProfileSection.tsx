import { SingleItem } from "@/types/single-item";
import { ApiFrontend } from "@/services/api/ApiFrontend"; // Brug denne klasse til at hente data
import { Section } from "@/components/Section";
import { User } from "@/types/api";
import styles from "./ProfileSection.module.css"; // Til CSS styling

interface ProfileSectionProps {
  user?: User;
}

export const ProfileSection = async ({ user }: ProfileSectionProps) => {
  const ownProfile = ApiFrontend.currentUser?.documentId === user?.documentId;
  const userdata = await ApiFrontend.users.get(17);

  if (!userdata) return <p>Loading user...</p>;
  // Mock data - erstat dette med userdata, når det virker
  const userMock = {
    name: "Mikkel",
    age: 26,
    semester: "4. semester",
    title: "Front-End Developer",
    profileImage: "hani/avatar.jpg", // Skift til rigtig URL
  };

  return (
    <Section
      visibility="Public" // Kan justeres
      bgColor="--main-color-teel-green: #80b4bf" // Sektionens baggrundsfarve
      gap="15px"
      flexDirection="column"
    >
    
      <h1 className={styles.header}>Profil</h1>
      <div className={styles.main}>
        <div className={styles.profileContainer}>
          <img
            src={userMock.profileImage}
            alt={`${userMock.name}'s profile`}
            className={styles.profileImage}
          />
          <div className={styles.profileInfo}>
            <h1 className={styles.userName}>{userMock.name}</h1>
            <p className={styles.userDetails}>
              {userMock.age} år
              <br />
              {userMock.semester}
            </p>
            <p className={styles.userTitle}>{userMock.title}</p>
          </div>
        </div>
      </div>
    </Section>
  );
};