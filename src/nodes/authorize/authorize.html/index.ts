import { EditorRED } from "node-red";
import { AuthorizeEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<AuthorizeEditorNodeProperties>("authorize", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "authorize",
  label: function () {
    return this.name || "authorize";
  },
});
