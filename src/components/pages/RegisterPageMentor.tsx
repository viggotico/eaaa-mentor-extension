import { Page } from "../Page";
import { RegisterSection } from "../sections/RegisterSection";

export const RegisterPageMentor = () => {
  return <Page visibility='PublicOnly'>
    <RegisterSection type='Mentor' />
  </Page>
}
