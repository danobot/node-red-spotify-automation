import { NodeInitializer } from "node-red";
import { GetSavedTracksNode, GetSavedTracksNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function GetSavedTracksNodeConstructor(
    this: GetSavedTracksNode,
    config: GetSavedTracksNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    this.on("input", (msg, send, done) => {
      send(msg);
      done();
    });
  }

  RED.nodes.registerType("get-saved-tracks", GetSavedTracksNodeConstructor);
};

export = nodeInit;
