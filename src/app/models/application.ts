import { Document } from './document';
import { Job } from './job';
import { User } from './user';

export class Application {
  id: number;
  dateCreated: Date;
  uscitizen: boolean;
  location: string;
  visaStatus: string;
  degree: string;
  coreJavaRating: number;
  advancedJavaRating: number;
  oopsRating: number;
  exceptionHandlingRating: number;
  multithreadingRating: number;
  collectionFrameworkRating: number;
  jdbcRating: number;
  job: Job;
  users: User[];
  documents: Document[];
}
