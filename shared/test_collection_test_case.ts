import { test_caseModel, test_caseCreateInput } from "./test_case";
import { test_collectionModel, test_collectionCreateInput } from "./test_collection";

export interface test_collection_test_caseModel {
  id: number;
  test_collection_id: number;
  test_case_id: number;
  test_case?: test_caseModel;
  test_collection?: test_collectionModel;
}

export interface test_collection_test_caseCreateInput {
  id?: number;
  test_collection_id?: number;
  test_case_id?: number;
  test_case?: test_caseCreateInput;
  test_collection?: test_collectionCreateInput;
}

export type test_collection_test_caseUpdateInput = Partial<test_collection_test_caseCreateInput>;

