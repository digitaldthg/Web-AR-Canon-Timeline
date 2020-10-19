<template>
  <a-marker v-if="id === this.$store.state.currentTargetID || this.$store.state.currentTargetID === null"
    type="barcode"
    :value="id"
    :detect-visible-component="idString"
  >
    <a-entity
      :gltf-model="GetModelPath(this.$store.state.targets[id])"
      scale = "0.05 0.05 0.05"
      position="0 0 0"
    ></a-entity>
    <!--<a-box color="tomato" scale="1 1 1"
      position='0 0 0'></a-box>-->
  </a-marker>
</template>

<script>
import { store } from "../store.js";

AFRAME.registerComponent("detect-visible-component", {
  schema: {
    targetID: { type: "string", default: null },
  },
  init: function () {
    console.log("INIT " + this.el.object3D.visible);
    this.oldVisible = this.el.object3D.visible;
  },
  tick: function () {
    var newVisible = this.el.object3D.visible;
    if (newVisible != this.oldVisible) {
      if (newVisible) {
        console.log("Show target with ID: " + this.data.targetID);
        store.state.currentTargetID = this.data.targetID;
        store.state.isVisible = true;
      } else {
        /*store.state.currentTargetID = this.data.targetID;
        store.state.isVisible = false;*/
      }
      this.oldVisible = newVisible;
    }
  },
});

export default {
  name: "CustomMarker",
  props: ["id", "idString"],
  methods: {
    GetModelPath: function (t) {
      console.log("GEt Model Path");
      if (typeof t != "undefined") {
        //var path = "assets/02_windmachine/02_windmachine_01title.png";
        var path = "url(assets/" + t.folder + "/model/" + t.GLTF_data + ")";
        //console.log(path);
        return path;
      }
    },
  },
};
</script>