import { Interview } from "./interview";
import { User } from "./user";

export class InterviewEvaluation {
    id: number;
    notes: string;
    pass: boolean;
    interview: Interview;
    admin: User;
}
