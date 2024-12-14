import { Page } from "../Page";
import { LoginCardsSection } from "../sections/LoginCardsSection";
import { AboutUsSection } from "../sections/AboutUsSection";
import { ProfileSection } from "../sections/ProfileSection";
import { BookingSection } from "../sections/BookingSection";
import { ApiFrontend } from "@/services/api/ApiFrontend";

export const HomePage = () => {
  return (
    <Page visibility="Public">
      <LoginCardsSection />
      <AboutUsSection />
      <ProfileSection user={undefined} />
      <BookingSection />
    </Page>
  );
};
