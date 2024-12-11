import { CommonApi } from "../common/CommonApi";
import { User } from "./User";

export interface Role extends CommonApi {
    name: 'Authenticated' | 'Public';
    description: string;
    type: string;
    users: User[];
}