import { EditorRED } from "node-red";
import { SpotifyEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<SpotifyEditorNodeProperties>("spotify", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    credentials: null,
    auth: null,
    api: null
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "spotify",
  label: function () {
    return this.name || "spotify";
  },
});
