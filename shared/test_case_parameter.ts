import { test_parameter_valueModel, test_parameter_valueCreateInput } from "./test_parameter_value";
import { test_caseModel, test_caseCreateInput } from "./test_case";

export interface test_case_parameterModel {
  id: number;
  test_case_id: number;
  parameter_value_id: number;
  paremeter_value?: test_parameter_valueModel;
  test_case?: test_caseModel;
}

export interface test_case_parameterCreateInput {
  id?: number;
  test_case_id?: number;
  parameter_value_id?: number;
  paremeter_value?: test_parameter_valueCreateInput;
  test_case?: test_caseCreateInput;
}

export type test_case_parameterUpdateInput = Partial<test_case_parameterCreateInput>;

