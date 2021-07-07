import { Role } from './role';

export class User {
  token: string;
  type: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  active: boolean;
  password: string;
  roles: Role[];
}
