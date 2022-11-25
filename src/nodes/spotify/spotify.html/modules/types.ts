import { EditorNodeProperties } from "node-red";
import { SpotifyOptions } from "../../shared/types";

export interface SpotifyEditorNodeProperties
  extends EditorNodeProperties,
    SpotifyOptions {}
