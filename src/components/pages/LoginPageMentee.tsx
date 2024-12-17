import { Page } from "../Page";
import { LoginSection } from "../sections/LoginSection";

export const LoginPageMentee = () => {
  return <Page visibility='PublicOnly'>
    <LoginSection type='Mentee' />
  </Page>
}
