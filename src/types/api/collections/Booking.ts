import { CommonApi, CommonApiIgnore } from "../common/CommonApi";
import { RelationSingle } from "../common/RelationApi";
import { MeetingType, UserSimple } from "./User";

export interface Booking extends CommonApi {
    mentor: UserSimple;
    mentee: UserSimple;
    date: string;
    confirmed: boolean;
    rejected: boolean;
    meetingType: MeetingType;
}

export interface BookingPostData extends Omit<Booking, CommonApiIgnore | 'mentor' | 'mentee'> {
    mentor: RelationSingle;
    mentee: RelationSingle;
}