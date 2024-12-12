import { CommonApi, CommonApiIgnore } from "../common/CommonApi";
import { RelationSingle } from "../common/RelationApi";
import { MeetingType, User } from "./User";

export interface Booking extends CommonApi {
    mentor: User;
    mentee: User;
    date: string;
    confirmed: boolean;
    rejected: boolean;
    meetingType: MeetingType;
}

export interface BookingPostData extends Omit<Booking, CommonApiIgnore | 'mentor' | 'mentee'> {
    mentor: RelationSingle;
    mentee: RelationSingle;
}