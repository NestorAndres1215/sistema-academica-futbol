import { Events } from "./events";

export interface Calendar  {
dayOfWeek: any;
day: number;

currentDay: boolean;
currentMonth: boolean;
events: Events[];
date: Date;
isSunday: boolean;
}
