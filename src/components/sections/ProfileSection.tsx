"use client";

import { SingleItem } from "@/types/single-item";
import { ApiFrontend } from "@/services/api/ApiFrontend"; // Brug denne klasse til at hente data
import { Section } from "@/components/Section";
import { User } from "@/types/api";
import styles from "./ProfileSection.module.css"; // Til CSS styling
import React, { useState } from "react"; // Tilføj useState for chat-funktionen

interface ProfileSectionProps {
  user?: User;
}

interface Booking {
  name: string;
  age: number;
  semester: string;
  preference: string;
  dateTime: string;
}

const bookings: Booking[] = [
  {
    name: "Cecilie",
    age: 20,
    semester: "Første semester",
    preference: "Fysisk møde",
    dateTime: "20/09 kl 12:00",
  },
  {
    name: "Omar",
    age: 23,
    semester: "Første semester",
    preference: "Fysisk møde",
    dateTime: "26/09 kl 10:30",
  },
  {
    name: "Camila",
    age: 24,
    semester: "Første semester",
    preference: "Online møde",
    dateTime: "20/09 kl 13:45",
  },
];

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  const [chatOpen, setChatOpen] = useState(false); // Chat-tilstand

  const toggleChat = () => {
    setChatOpen(!chatOpen); // Skifter mellem åben/lukket
  };

  // Mock data - erstat dette med userdata, når det virker
  const userMock = {
    name: "Mikkel",
    age: 26,
    semester: "4. semester",
    title: "Front-End Developer",
    profileImage: "hani/avatar.jpg", // Skift til rigtig URL
    documentId: "specific-user-id", // Skift dette ID, hvis nødvendigt
  };

  // Betingelse: Kun vis chatten for specifikke brugere
  const isChatEnabled = true; // Test: Gør chat altid synlig

  console.log("isChatEnabled:", isChatEnabled); // Debugging

  return (
    <Section
      visibility="Private" // Kan justeres
      bgColor="--secondary-color-quiet-gray: #f3f4f7" // Sektionens baggrundsfarve
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

      {/* Chat */}
      <section>
        <div className={styles.chatContainer}>
          <button onClick={toggleChat} className={styles.chatButton}>
            💬 Chat
          </button>

          {chatOpen && (
            <div className={styles.chatBox}>
              <div className={styles.chatHeader}>
                <p>Chat med Mikkel</p>
                <button onClick={toggleChat} className={styles.closeButton}>
                  ❌
                </button>
              </div>
              <div className={styles.chatMessages}>
                <p className={styles.message}>
                  Hej! Hvordan kan jeg hjælpe dig?
                </p>
              </div>
              <div className={styles.chatInput}>
                <input type="text" placeholder="Skriv en besked..." />
                <button>Send</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sort streg */}
      <div className={styles.horizontalLine}></div>

      {/* Booking-sektionen */}
      {
        ApiFrontend.currentUser?.type === 'Mentor' ?
          <div className={styles.bookingsSection}>
            <h2 className={styles.bookingsHeader}>Dine Bookinger</h2>
            <div className={styles.cardsContainer}>
              {bookings.map((booking, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardContent}>
                    <div className={styles.profileIcon}>
                      <span role="img" aria-label="user">
                        👤
                      </span>
                    </div>
                    <div className={styles.info}>
                      <p>
                        <strong>Navn:</strong> {booking.name}
                      </p>
                      <p>
                        <strong>Alder:</strong> {booking.age}
                      </p>
                      <p>{booking.semester}</p>
                    </div>
                    <div className={styles.details}>
                      <p>
                        <strong>Ønsker:</strong> {booking.preference}
                      </p>
                      <p>{booking.dateTime}</p>
                    </div>
                    <div className={styles.statusIcon}>
                      <span role="img" aria-label="check">
                        ✅ 🚫
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> :
          <></>
      }
    </Section>
  );
};
