import { ChatMessageSimple } from "./ChatMessage";
import { CommonApi, CommonApiIgnore } from "../common/CommonApi";
import { RelationSingle, RelationMany } from "../common/RelationApi";
import { User } from "./User";

export interface Chat extends CommonApi {
    mentor: User;
    mentee: User;
    mentorMessages: ChatMessageSimple[];
    menteeMessages: ChatMessageSimple[];
}

export interface ChatPostData extends Omit<Chat, CommonApiIgnore
| 'mentor' | 'mentee' | 'mentorMessages' | 'menteeMessages'> {
    mentor: RelationSingle;
    mentee: RelationSingle;
    mentorMessages: RelationMany;
    menteeMessages: RelationMany;
}