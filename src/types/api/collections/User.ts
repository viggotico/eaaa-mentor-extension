import { Booking } from "./Booking";
import { Chat } from "./Chat";
import { CommonApi, CommonApiIgnore } from "../common/CommonApi";
import { RelationSingle, RelationMany } from "../common/RelationApi";
import { AvailabilityComponent, AvailabilityComponentPostData } from "../components/AvailabilityComponent";
import { Role } from "./Role";

export type UddannelseType =
| 'Datamatiker'
| 'Multimediedesigner'
| 'Finansøkonom'
| 'Finansbachelor'
| 'Markedsføringsøkonom';

export type MeetingType =
| 'Physical'
| 'Online'
| 'Both';

export interface User extends CommonApi {
    username: string;
    name: string;
    surname: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: Role;
    age: number;
    skills: string;
    subject: string;
    type: 'Mentor' | 'Mentee';
    mentorChats: Chat[];
    menteeChats: Chat[];
    uddannelse: UddannelseType;
    semester: string;
    acceptingMentees: boolean;
    mentorBookings: Booking[];
    menteeBookings: Booking[];
    meetingType: MeetingType;
    availability: AvailabilityComponent[];
}

export interface UserPostData extends Omit<User, CommonApiIgnore
| 'role' | 'mentorChats' | 'menteeChats' | 'mentorBookings' | 'menteeBookings' | 'availability'> {
    role: RelationSingle;
    mentorChats: RelationMany;
    menteeChats: RelationMany;
    mentorBookings: RelationMany;
    menteeBookings: RelationMany;
    availability: AvailabilityComponentPostData[];
}

export interface UserLoginRegisterResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
    };
}

export interface UserLoginPostData {
    identifier: string;
    password: string;
}

export interface UserRegisterPostData extends Omit<User, CommonApiIgnore
| 'username'
| 'confirmed'
| 'blocked'
| 'role'
> {
    password?: string;
}