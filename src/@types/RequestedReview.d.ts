import { Issue } from "./Issue";
import { User } from "./User";

export interface RequestedReview {
  issues: Array<Issue>;
  user: User;
}
