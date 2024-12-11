import { Page } from "../Page";
import { BookingInfoSection } from "../sections/BookingInfoSection";
import { BookingSection } from "../sections/BookingSection";

export const MentorPage = () => {
  return <Page visibility='Public'>
    <BookingInfoSection />
    <BookingSection />
  </Page>
}
