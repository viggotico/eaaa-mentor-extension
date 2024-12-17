"use client"

import React, { useState } from "react";
import { ChatsSection } from "../sections/ChatsSection";
import { ChatSessionSection } from "../sections/ChatSessionSection";
import styles from "../sections/ChatsSection.module.css";

export const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState({ chatId: null, menteeName: "" });


  const handleBack = () => {
    setSelectedChat({ chatId: null, menteeName: "" });
  };


  return (
    <div className={styles.chatPage}>
      {/* If no chat is selected, show ChatsSection */}
      {!selectedChat.chatId && (
        <ChatsSection
          onSelectChat={(chatId: any, menteeName: any) =>
            setSelectedChat({ chatId, menteeName })
          }
        />
      )}
      
      {/* If a chat is selected, show ChatSessionSection */}
      {selectedChat.chatId && (
        <div className={styles.chatSessionContainer}>
          <button onClick={handleBack} className={styles.backButton}>
            ← Tilbage
          </button>
          <ChatSessionSection
            chatId={selectedChat.chatId}
            menteeName={selectedChat.menteeName}
          />
        </div>
      )}
    </div>
  );
}
