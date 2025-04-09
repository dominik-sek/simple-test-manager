import { test_case_parameterModel, test_case_parameterCreateInput } from "./test_case_parameter";
import { test_parameter_keyModel, test_parameter_keyCreateInput } from "./test_parameter_key";

export interface test_parameter_valueModel {
  id: number;
  value: string;
  key_id: number;
  test_case_parameter?: test_case_parameterModel[];
  key?: test_parameter_keyModel;
}

export interface test_parameter_valueCreateInput {
  id?: number;
  value: string;
  key_id?: number;
  test_case_parameter?: test_case_parameterCreateInput[];
  key?: test_parameter_keyCreateInput;
}

export type test_parameter_valueUpdateInput = Partial<test_parameter_valueCreateInput>;

