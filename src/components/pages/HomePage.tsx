"use client"

import React, { useState } from "react";
import { Page } from "../Page";
import { LoginCardsSection } from "../sections/LoginCardsSection";
import { AboutUsSection } from "../sections/AboutUsSection";
import { CalenderSection } from "../sections/CalenderSection"
import { CalenderSubmit } from "../sections/CalenderSubmitSection"
import { ProfileSection } from "../sections/ProfileSection";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { ChatsPage } from "./ChatsPage";
import styles from "../sections/ChatsSection.module.css";

export const HomePage = () => {
  const [showSubmit, setShowSubmit] = useState(false);


  const handleShowSubmit = () => {
    setShowSubmit(true);
    setTimeout(() => {
      setShowSubmit(false);
    }, 2000);
  };
  return (
    <Page visibility="Public">
      <LoginCardsSection />
      <AboutUsSection />
      <ProfileSection user={undefined} />
      {/* <BookingSection /> */}
      <br />
      <ChatsPage />
      <br />
      {
        !ApiFrontend.currentUser || ApiFrontend.currentUser?.type === 'Mentor' ?
          <></> :
          <div>
            {showSubmit ? (
              <CalenderSubmit />
            ) : (
              <CalenderSection onSendClick={handleShowSubmit} />
            )}
          </div>
      }
    </Page>
  );
};
