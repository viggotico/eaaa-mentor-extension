'use client'

import React from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { Section } from "@/components/Section";
import styles from "./ChatsSection.module.css";


export const ChatsSection = ({ onSelectChat }: { onSelectChat: any }) => {
  // Mock-data for chats
  const mockChats = [
    {
      id: "chat1",
      participants: [{ id: "user1", name: "User 1" }],
      lastMessage: "Hej, jeg har nogle udfordringer med...",
      lastMessageTime: "10:00 AM",
    },
    {
      id: "chat2",
      participants: [{ id: "user2", name: "User 2" }],
      lastMessage: "Hej, jeg har nogle udfordringer med...",
      lastMessageTime: "9:30 AM",
    },
    {
      id: "chat3",
      participants: [{ id: "user1", name: "User 3" }],
      lastMessage: "Hej, jeg har nogle udfordringer med...",
      lastMessageTime: "10:00 AM",
    },
   
  ];

  return (
    <Section
      visibility="Public"
      bgColor="--secondary-color-quiet-gray: #f3f4f7"
      gap="15px"
      flexDirection="column"
    >
      <div className={styles.chatHeader}>
      <h1 >Dine chats</h1>
      </div>
      <ul className={styles.chatList}>
        {mockChats.map((chat) => (
          <li
            key={chat.id}
            className={styles.chatItem}
            onClick={() => onSelectChat(chat.id, chat.participants[0].name)} // Pass chatId and menteeName


          >
            <div>
              <strong>{chat.participants[0].name}</strong>
              <p>{chat.lastMessage}</p>
            </div>
            <span>{chat.lastMessageTime}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};
