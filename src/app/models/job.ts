import { Application } from "./application";

export class Job {
    id: number;
    batch: string;
    name: string;
    description: string;
    datepub: Date;
    datestart: Date;
    vacancies: number;
    applications: Application[];
}
