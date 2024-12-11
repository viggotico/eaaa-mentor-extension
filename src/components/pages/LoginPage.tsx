import { Page } from "../Page";
import { LoginSection } from "../sections/LoginSection";

export const LoginPage = () => {
  return <Page visibility='PublicOnly'>
    <LoginSection />
  </Page>
}
