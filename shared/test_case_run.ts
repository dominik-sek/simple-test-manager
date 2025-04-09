import { test_status } from "./enums";
import { test_caseModel, test_caseCreateInput } from "./test_case";
import { test_runModel, test_runCreateInput } from "./test_run";
import { test_step_runModel, test_step_runCreateInput } from "./test_step_run";

export interface test_case_runModel {
  id: number;
  test_case_id: number;
  test_run_id: number;
  status: test_status | null;
  test_case?: test_caseModel;
  test_run?: test_runModel;
  test_step_run?: test_step_runModel[];
}

export interface test_case_runCreateInput {
  id?: number;
  test_case_id?: number;
  test_run_id?: number;
  status?: test_status | null;
  test_case?: test_caseCreateInput;
  test_run?: test_runCreateInput;
  test_step_run?: test_step_runCreateInput[];
}

export type test_case_runUpdateInput = Partial<test_case_runCreateInput>;

