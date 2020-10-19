<template>
  <a-scene
    renderer="antialias: true; logarithmicDepthBuffer: true; colorManagement: true; sortObjects: true;"
    vr-mode-ui="enabled: false"
    arjs="sourceWidth:1920; sourceHeight:1080; trackingMethod: best; detectionMode: mono_and_matrix; matrixCodeType: 4x4_BCH_13_9_3;"
  >
    <CustomMarker
      v-for="(value, key) in this.$store.state.targets"
      :key="key"
      :id="key"
      :idString="GetTargetIdString(key)"
    />
    <a-light type="ambient" color="white"></a-light>
    <a-light type="point" color="white" position="0 5 0" intensity="5"></a-light>
    <a-entity camera></a-entity>
  </a-scene>
</template>

<script>
import CustomMarker from "./CustomMarker.vue";
import * as Three from "three";

export default {
  name: "ARScene",
  components: {
    CustomMarker
  },
  methods: {
    GetTargetIdString: function (id) {
      var idString = "targetID: " + id;
      return idString;
    },
    init() {
      const sceneEl = document.querySelector("a-scene");
      sceneEl.addEventListener("loaded", () => {
        sceneEl.camera = new THREE.PerspectiveCamera();
      });
    },
  },
  mounted() {
    //this.init();
  },
};
</script>

<style scoped>
.ARWindow {
  height: 100px;
  width: 100px;
}

.col-fixed {
  width: 600px;
  background: white;
  padding: 10px;
}

.arjs-loader {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.arjs-loader div {
  text-align: center;
  font-size: 1.25em;
  color: white;
}

#arjs-video {
  height: 100px;
  width: 100px;
}
</style>
