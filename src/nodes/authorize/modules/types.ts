import { Node, NodeDef } from "node-red";
import { AuthorizeOptions } from "../shared/types";

export interface AuthorizeNodeDef extends NodeDef, AuthorizeOptions {}

// export interface AuthorizeNode extends Node {}
export type AuthorizeNode = Node;
