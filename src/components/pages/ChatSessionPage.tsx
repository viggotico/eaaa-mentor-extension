import { Page } from "../Page";
import { SingleItem } from "@/types/single-item";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import { ChatSessionSection } from "../sections/ChatSessionSection";
import { Section } from "../Section";
import { NotFoundPage } from "./NotFoundPage";

export const ChatSessionPage = async ({ params }: SingleItem) => {
  const { id } = await params;

  if (!id) { // hvis 404 not found hvis id'en ikke er korrekt
    return <NotFoundPage />;
  }

  const chat = await ApiFrontend.chats.get(id);

  if (!chat || !chat.data) { // vent til at profilen er fetched fra databasen
    return <Page visibility='Public'>
      <Section
        visibility='Public'
        bgColor='--secondary-color-quiet-gray: #f3f4f7'
      >
        <h1>Loading...</h1>
      </Section>
    </Page>;
  }
  
  return <Page visibility='Private'>
    <ChatSessionSection chat={chat.data} />
  </Page>
}
