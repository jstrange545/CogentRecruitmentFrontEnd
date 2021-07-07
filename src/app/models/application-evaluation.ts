import { ApplicationStatus } from "./application-status";
import { Application } from "./application";
import { User } from "./user";

export class ApplicationEvaluation {
    id: number;
    notes: string;
    adm: User;
    app: Application;
    appStatus: ApplicationStatus;

}
