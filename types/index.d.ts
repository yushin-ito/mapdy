import type { Database } from "./database";

export type UseQueryResult<T1, T2> = {
  onSuccess?: (response: T1) => void;
  onError?: (error: T2) => void;
};

export type UseMutationResult<T1, T2> = {
  onSuccess?: (response: T1) => void;
  onError?: (error: T2) => void;
};

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Membership = Database["public"]["Tables"]["memberships"]["Row"];
