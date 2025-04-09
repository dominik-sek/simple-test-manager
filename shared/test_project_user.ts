import { test_projectModel, test_projectCreateInput } from "./test_project";
import { userModel, userCreateInput } from "./user";

export interface test_project_userModel {
  id: number;
  user_id: number;
  test_project_id: number;
  test_project?: test_projectModel;
  user?: userModel;
}

export interface test_project_userCreateInput {
  id?: number;
  user_id?: number;
  test_project_id?: number;
  test_project?: test_projectCreateInput;
  user?: userCreateInput;
}

export type test_project_userUpdateInput = Partial<test_project_userCreateInput>;

