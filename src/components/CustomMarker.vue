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
  </a-marker>
</template>

<script>
import { store } from "../store.js";

//On Marker Detected Event
AFRAME.registerComponent("detect-visible-component", {
  schema: {
    targetID: { type: "string", default: null },
  },
  init: function () {
    //get current visibility state
    this.oldVisible = this.el.object3D.visible;
  },
  tick: function () {
    var newVisible = this.el.object3D.visible;
    if (newVisible != this.oldVisible) { //check if visibility state has changed
      if (newVisible) {
        store.state.currentTargetID = this.data.targetID; //set this object as current object in the store such that the UI can react to it
        store.state.isVisible = true;
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
      if (typeof t != "undefined") {
        var path = "url(assets/" + t.folder + "/model/" + t.GLTF_data + ")";
        return path;
      }
    },
  },
};
</script>