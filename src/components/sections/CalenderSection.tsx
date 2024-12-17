import { ApiFrontend } from "@/services/api/ApiFrontend";
import { Section } from "@/components/Section";
import styles from "./CalenderSection.module.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import "./reactCalender.css"

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalenderSectionProps {
  onSendClick: () => void;
}

export const CalenderSection = ({ onSendClick }: CalenderSectionProps) => {
  const [value, onChange] = useState<Value>(new Date());
  const [selectedMeetingType, setSelectedMeetingType] = useState<string | null>(
    null
  );

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMeetingType(e.target.value);
  };

  const handleButtonClick = () => {
    if (!selectedMeetingType) {
      alert("Vælg venligst en mødetype før du sender."); // Alert if no selection
      return;
    }
    onSendClick(); // Trigger parent function if selection exists
  };

  return (
    <Section
      visibility="Public"
      bgColor="--secondary-color-quiet-gray: #f3f4f7"
      gap="15px"
      flexDirection="column"
    >
      <div className={styles.calenderContainer}>
        <div className={styles.sample}>
          <header className={styles.sampleHeader}>
            <h1>Vælg dato</h1>
          </header>

          <div className={styles.sampleContainer}>
            <main className={styles.sampleContainerContent}>
              <Calendar
                onChange={onChange}
                showWeekNumbers
                value={value}
                locale="da-DK"
              />
            </main>

            <div className={styles.meetingType}>
              <h3 className={styles.meetingTypeHeader}>mødetype</h3>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="meetingType"
                  value="physical"
                  className={styles.radioInput}
                  onChange={handleRadioChange}
                />
                <span>1. Fysisk møde</span>
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="meetingType"
                  value="online"
                  className={styles.radioInput}
                  onChange={handleRadioChange}
                />
                <span>2. Online møde</span>
              </label>
            </div>

            {/* Button logic */}
            <button className={styles.sendButton} onClick={handleButtonClick}>
              Send
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};
