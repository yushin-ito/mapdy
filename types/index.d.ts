import type { Database } from "./database";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Membership = Database["public"]["Tables"]["memberships"]["Row"];
