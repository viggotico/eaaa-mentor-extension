import { CommonApiComponent, CommonApiIgnore } from "../common/CommonApi";

export interface AvailabilityComponent extends CommonApiComponent {
    date: string;
}

export interface AvailabilityComponentPostData extends Omit<AvailabilityComponent, CommonApiIgnore> {}