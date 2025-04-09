import { test_step_status } from "./enums";
import { test_case_runModel, test_case_runCreateInput } from "./test_case_run";
import { test_stepModel, test_stepCreateInput } from "./test_step";
import { userModel, userCreateInput } from "./user";

export interface test_step_runModel {
  id: number;
  test_step_id: number;
  test_case_run_id: number;
  user_id: number;
  actual_results: string | null;
  status: test_step_status | null;
  test_case_run?: test_case_runModel;
  test_step?: test_stepModel;
  user?: userModel;
}

export interface test_step_runCreateInput {
  id?: number;
  test_step_id?: number;
  test_case_run_id?: number;
  user_id?: number;
  actual_results?: string | null;
  status?: test_step_status | null;
  test_case_run?: test_case_runCreateInput;
  test_step?: test_stepCreateInput;
  user?: userCreateInput;
}

export type test_step_runUpdateInput = Partial<test_step_runCreateInput>;

