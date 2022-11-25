import { EditorNodeProperties } from "node-red";
import { AuthorizeOptions } from "../../shared/types";

export interface AuthorizeEditorNodeProperties
  extends EditorNodeProperties,
    AuthorizeOptions {}
