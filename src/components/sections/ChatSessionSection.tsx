'use client'

import React, { useState } from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { Section } from "@/components/Section";
import styles from "./ChatSessionSection.module.css";



// interface ChatSessionSectionProps {
//   chat: Chat;
// }


// Props for den aktive chat
interface ChatSessionSectionProps {
  chatId: string;
  menteeName: string;
}

export const ChatSessionSection = ({ chatId, menteeName }: ChatSessionSectionProps) => {
  // Mock-data for chatbeskeder
  const mockMessages: Record<string, any> = {
    chat1: [
      {
        id: "msg1",
        chatId: "chat1",
        sender: "mentee",
        content: "hej med dig mit navn er “...” tak for at vælge mig som din mentor, hvad kan jeg hjælpe med.",
        timestamp: "10:00 AM",
      },
      {
        id: "msg2",
        chatId: "chat1",
        sender: "mentor",
        content: "Hej, jeg har nogle udfordringer med programmering. Har du tid i næste uge til at mødes og gennemgå mine problemer?",
        timestamp: "10:01 AM",
      },
      
    ],
    chat2: [
      {
        id: "msg1",
        chatId: "chat2",
        sender: "mentee",
        content: "hej med dig mit navn er “...” tak for at vælge mig som din mentor, hvad kan jeg hjælpe med.",
        timestamp: "9:30 AM",
      },
      {
        id: "msg2",
        chatId: "chat2",
        sender: "mentor",
        content: "Hej, jeg har nogle udfordringer med design. Har du tid i næste uge til at mødes og gennemgå mine problemer?",
        timestamp: "9:35 AM",
      },
    ],

    chat3: [
      {
        id: "msg1",
        chatId: "chat2",
        sender: "mentee",
        content: "hej med dig mit navn er “...” tak for at vælge mig som din mentor, hvad kan jeg hjælpe med.",
        timestamp: "9:30 AM",
      },
      {
        id: "msg2",
        chatId: "chat2",
        sender: "mentor",
        content: "Hej, jeg har nogle udfordringer med UX. Har du tid i næste uge til at mødes og gennemgå mine problemer?",
        timestamp: "9:35 AM",
      },
    ],
  };

  const messages = mockMessages[chatId] || [];
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    messages.push({
      id: `msg${messages.length + 1}`,
      chatId,
      sender: "mentor",
      content: newMessage,
      timestamp: "Now",
    });
    setNewMessage("");
  };

  return (
    <Section
      visibility="Public"
      bgColor="--secondary-color-quiet-gray: #f3f4f7"
      gap="15px"
      flexDirection="column"
    >
        <div className={styles.chatSectionHeader}>
      {/* <h1 >Dine chats</h1> */}
      <h1>{menteeName ? `${menteeName}` : "Dine chats"}</h1>
      </div>
      <div className={styles.messagesContainer}>
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.sender === "mentor" ? styles.sent : styles.received
            }`}
          >

            <p>{msg.content}</p>
            {/* <span>{msg.timestamp}</span> */}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
        className={styles.input}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Skriv besked..."
        />
        <button
        className={styles.button}
         onClick={handleSend}>Send</button>
      </div>
    </Section>
  );
};
