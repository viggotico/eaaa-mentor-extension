import { Page } from "../Page";
import { FindAMentorSection } from "../sections/FindAMentorSection";
import { MenteeSupportSection } from "../sections/MenteeSupportSection";

export const MenteePage = () => {
  return <Page visibility='Public'>
    <MenteeSupportSection />
    <FindAMentorSection />
  </Page>
}
