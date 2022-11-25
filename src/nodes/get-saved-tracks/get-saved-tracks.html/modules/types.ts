import { EditorNodeProperties } from "node-red";
import { GetSavedTracksOptions } from "../../shared/types";

export interface GetSavedTracksEditorNodeProperties
  extends EditorNodeProperties,
    GetSavedTracksOptions {}
