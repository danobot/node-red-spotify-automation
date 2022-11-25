import { EditorRED } from "node-red";
import { GetSavedTracksEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<GetSavedTracksEditorNodeProperties>("get-saved-tracks", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "get saved tracks",
  label: function () {
    return this.name || "get saved tracks";
  },
});
