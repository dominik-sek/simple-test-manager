import { userModel, userCreateInput } from "./user";

export interface user_logModel {
  id: number;
  user_id: number | null;
  action: string;
  result: string;
  metadata: any | null;
  createdAt: string;
  user?: userModel;
}

export interface user_logCreateInput {
  id?: number;
  user_id?: number | null;
  action: string;
  result?: string;
  metadata?: any | null;
  createdAt?: string;
  user?: userCreateInput;
}

export type user_logUpdateInput = Partial<user_logCreateInput>;

