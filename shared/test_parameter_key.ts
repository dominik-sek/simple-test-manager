import { test_parameter_valueModel, test_parameter_valueCreateInput } from "./test_parameter_value";

export interface test_parameter_keyModel {
  id: number;
  key: string;
  values?: test_parameter_valueModel[];
}

export interface test_parameter_keyCreateInput {
  id?: number;
  key: string;
  values?: test_parameter_valueCreateInput[];
}

export type test_parameter_keyUpdateInput = Partial<test_parameter_keyCreateInput>;

