import { User } from "./api";

export type ContentVisibility = {
    visibility: User['type'] | 'Private' | 'Public' | 'PublicOnly' | 'ActiveUser';
}