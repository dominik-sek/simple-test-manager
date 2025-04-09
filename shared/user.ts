import { test_project_userModel, test_project_userCreateInput } from "./test_project_user";
import { test_step_runModel, test_step_runCreateInput } from "./test_step_run";
import { user_logModel, user_logCreateInput } from "./user_log";

export interface userModel {
  id: number;
  username: string;
  password: string | null;
  role: string;
  full_name: string | null;
  email: string | null;
  created_at: string | null;
  last_login: string | null;
  is_active: boolean | null;
  test_project_user?: test_project_userModel[];
  test_step_run?: test_step_runModel[];
  user_log?: user_logModel[];
}

export interface userCreateInput {
  id?: number;
  username: string;
  password?: string | null;
  role?: string;
  full_name?: string | null;
  email?: string | null;
  created_at?: string | null;
  last_login?: string | null;
  is_active?: boolean | null;
  test_project_user?: test_project_userCreateInput[];
  test_step_run?: test_step_runCreateInput[];
  user_log?: user_logCreateInput[];
}

export type userUpdateInput = Partial<userCreateInput>;

