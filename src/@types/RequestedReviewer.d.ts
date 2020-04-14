import { Issue } from "./Issue";
import { User } from "./User";

export interface RequestedReviewer {
  issues: Array<Issue>;
  user: User;
}
