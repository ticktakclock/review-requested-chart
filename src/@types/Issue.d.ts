import { User } from "./User";

export interface Issue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  url: string;
  user: User;
}
