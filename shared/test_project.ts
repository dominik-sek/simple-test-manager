import { test_project_collectionModel, test_project_collectionCreateInput } from "./test_project_collection";
import { test_project_userModel, test_project_userCreateInput } from "./test_project_user";

export interface test_projectModel {
  id: number;
  name: string;
  description: string | null;
  test_project_collection?: test_project_collectionModel[];
  test_project_user?: test_project_userModel[];
}

export interface test_projectCreateInput {
  id?: number;
  name: string;
  description?: string | null;
  test_project_collection?: test_project_collectionCreateInput[];
  test_project_user?: test_project_userCreateInput[];
}

export type test_projectUpdateInput = Partial<test_projectCreateInput>;

