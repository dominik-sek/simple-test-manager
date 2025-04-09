import { test_caseModel, test_caseCreateInput } from "./test_case";
import { test_step_runModel, test_step_runCreateInput } from "./test_step_run";

export interface test_stepModel {
  id: number;
  test_case_id: number;
  step_actions: string | null;
  expected_results: string | null;
  test_case?: test_caseModel;
  test_step_run?: test_step_runModel[];
}

export interface test_stepCreateInput {
  id?: number;
  test_case_id?: number;
  step_actions?: string | null;
  expected_results?: string | null;
  test_case?: test_caseCreateInput;
  test_step_run?: test_step_runCreateInput[];
}

export type test_stepUpdateInput = Partial<test_stepCreateInput>;

