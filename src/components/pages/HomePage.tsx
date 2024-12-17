"use client"

import React, { useState } from "react";
import { Page } from "../Page";
import { LoginCardsSection } from "../sections/LoginCardsSection";
import { AboutUsSection } from "../sections/AboutUsSection";
import {CalenderSection} from "../sections/CalenderSection"
import {CalenderSubmit} from "../sections/CalenderSubmitSection"
import {FindAMentorSection} from "../sections/FindAMentorSection"
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
      <br />
      <ChatsPage />
      <br />
      {/* <CalenderSection/>
      <CalenderSubmit/> */}
      <div>
      {showSubmit ? (
        <CalenderSubmit />
      ) : (
        <CalenderSection onSendClick={handleShowSubmit} />
      )}
    </div>

    <br />
    <FindAMentorSection />
    </Page>
  );
};
