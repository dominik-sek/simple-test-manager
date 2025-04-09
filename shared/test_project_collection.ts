import { test_collectionModel, test_collectionCreateInput } from "./test_collection";
import { test_projectModel, test_projectCreateInput } from "./test_project";

export interface test_project_collectionModel {
  id: number;
  test_project_id: number | null;
  test_collection_id: number | null;
  test_collection?: test_collectionModel;
  test_project?: test_projectModel;
}

export interface test_project_collectionCreateInput {
  id?: number;
  test_project_id?: number | null;
  test_collection_id?: number | null;
  test_collection?: test_collectionCreateInput;
  test_project?: test_projectCreateInput;
}

export type test_project_collectionUpdateInput = Partial<test_project_collectionCreateInput>;

