import { Chat } from "./Chat";
import { CommonApi, CommonApiIgnore } from "../common/CommonApi";
import { RelationSingle } from "../common/RelationApi";
import { User } from "./User";

export interface ChatMessage extends CommonApi {
    mentorChat: Chat;
    menteeChat: Chat;
    content: string;
    type: User['type'];
}

export type ChatMessageSimple = Omit<ChatMessage,
| 'mentorChat'
| 'menteeChat'>;

export interface ChatMessagePostData extends Omit<ChatMessage, CommonApiIgnore
| 'mentorChat' | 'menteeChat'> {
    mentorChat: RelationSingle;
    menteeChat: RelationSingle;
}