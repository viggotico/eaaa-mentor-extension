import { Page } from "../Page";
import { LoginCardsSection } from "../sections/LoginCardsSection";
import { AboutUsSection } from "../sections/AboutUsSection";

export const HomePage = () => {
  return <Page visibility='Public'>
    <LoginCardsSection />
    <AboutUsSection />
  </Page>
}
