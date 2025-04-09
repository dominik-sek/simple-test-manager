import { test_collection_test_caseModel, test_collection_test_caseCreateInput } from "./test_collection_test_case";
import { test_project_collectionModel, test_project_collectionCreateInput } from "./test_project_collection";

export interface test_collectionModel {
  id: number;
  name: string | null;
  description: string | null;
  test_collection_test_case?: test_collection_test_caseModel[];
  test_project_collection?: test_project_collectionModel[];
}

export interface test_collectionCreateInput {
  id?: number;
  name?: string | null;
  description?: string | null;
  test_collection_test_case?: test_collection_test_caseCreateInput[];
  test_project_collection?: test_project_collectionCreateInput[];
}

export type test_collectionUpdateInput = Partial<test_collectionCreateInput>;

