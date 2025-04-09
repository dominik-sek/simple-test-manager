import { test_case_runModel, test_case_runCreateInput } from "./test_case_run";

export interface test_runModel {
  id: number;
  name: string | null;
  started_at: string | null;
  finished_at: string | null;
  test_case_run?: test_case_runModel[];
}

export interface test_runCreateInput {
  id?: number;
  name?: string | null;
  started_at?: string | null;
  finished_at?: string | null;
  test_case_run?: test_case_runCreateInput[];
}

export type test_runUpdateInput = Partial<test_runCreateInput>;

