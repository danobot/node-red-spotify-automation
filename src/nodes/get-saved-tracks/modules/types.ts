import { Node, NodeDef } from "node-red";
import { GetSavedTracksOptions } from "../shared/types";

export interface GetSavedTracksNodeDef extends NodeDef, GetSavedTracksOptions {}

// export interface GetSavedTracksNode extends Node {}
export type GetSavedTracksNode = Node;
