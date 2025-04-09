import { test_status } from "./enums";
import { test_case_parameterModel, test_case_parameterCreateInput } from "./test_case_parameter";
import { test_case_runModel, test_case_runCreateInput } from "./test_case_run";
import { test_collection_test_caseModel, test_collection_test_caseCreateInput } from "./test_collection_test_case";
import { test_stepModel, test_stepCreateInput } from "./test_step";

export interface test_caseModel {
  id: number;
  name: string | null;
  description: string | null;
  status: test_status | null;
  parameters?: test_case_parameterModel[];
  test_case_run?: test_case_runModel[];
  test_collection_test_case?: test_collection_test_caseModel[];
  test_step?: test_stepModel[];
}

export interface test_caseCreateInput {
  id?: number;
  name?: string | null;
  description?: string | null;
  status?: test_status | null;
  parameters?: test_case_parameterCreateInput[];
  test_case_run?: test_case_runCreateInput[];
  test_collection_test_case?: test_collection_test_caseCreateInput[];
  test_step?: test_stepCreateInput[];
}

export type test_caseUpdateInput = Partial<test_caseCreateInput>;

