import { Page } from "../Page";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { SingleItem } from "@/types/single-item";
import { ProfileSection } from "../sections/ProfileSection";
import { Section } from "../Section";
import { NotFoundPage } from "./NotFoundPage";

export const ProfilePage = async ({ params }: SingleItem) => {
  const { id } = await params;

  if (!id) { // hvis 404 not found hvis id'en ikke er korrekt
    return <NotFoundPage />;
  }

  const ownProfile = ApiFrontend.currentUser?.documentId === id;
  const user = await ApiFrontend.users.get(id);

  if (!user) { // vent til at profilen er fetched fra databasen
    // alle andre APIs returnere en data og meta object men det gør users ikke
    return <Page visibility='Public'>
      <Section
        visibility='Public'
        bgColor='--secondary-color-quiet-gray: #f3f4f7'
      >
        <h1>Loading...</h1>
      </Section>
    </Page>;
  }

  return ownProfile ? // tjekke om det er den aktive bruger's profil
    <Page visibility='ActiveUser'>
      <ProfileSection user={user} />
    </Page> :
    // vis kun mentee profiler hvis man er logget ind
    // mentor profiler kan blive set af alle
    <Page visibility={user.type === 'Mentee' ? 'Private' : 'Public'}>
      <ProfileSection user={user} />
    </Page>
}
