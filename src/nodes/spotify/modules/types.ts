import { Node, NodeDef } from "node-red";
import { SpotifyOptions } from "../shared/types";

export interface SpotifyNodeDef extends NodeDef, SpotifyOptions {}

// export interface SpotifyNode extends Node {}
export type SpotifyNode = Node;
