<template>
  <div>
    <div v-if="!this.loading">
      <div class="topbar">
        <img class="topbaricons" src="assets/common/Artboard.png" />
        <TopbarIcons v-if="this.$store.state.isVisible" />
      </div>
      <div class="buttonrow">
        <TargetButton
          v-for="(value, key) in this.$store.state.targets"
          :key="key"
          :name="value.title"
          :id="key"
        />
      </div>

      <div class="windowfixed" v-if="this.$store.state.isVisible">
        <TargetInterface :target="this.$store.state.targets[this.$store.state.currentTargetID]" />
      </div>
      <div class="ARWindow">
        <a-scene arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
          <!-- handle marker with your own pattern -->
          <a-marker type="barcode" value="2" detect-visible-component="targetID: 2">
            <a-entity :gltf-model="GetModelPath(this.$store.state.targets[2])" scale="0.1 0.1 0.1"></a-entity>
          </a-marker>

          <a-marker type="barcode" value="5" detect-visible-component="targetID: 4">
            <a-entity :gltf-model="GetModelPath(this.$store.state.targets[4])" scale="0.1 0.1 0.1"></a-entity>
          </a-marker>
        </a-scene>
      </div>
    </div>
  </div>
</template>

<script>
import TargetInterface from "./components/TargetInterface.vue";
import TargetButton from "./components/TargetButton.vue";
import TopbarIcons from "./components/TopbarIcons.vue";
import { store } from "./store.js";

AFRAME.registerComponent("detect-visible-component", {
  schema: {
    targetID: { type: "int", default: null }
  },
  init: function() {
    console.log("INIT " + this.el.object3D.visible);
    this.oldVisible = this.el.object3D.visible;
  },
  tick: function() {
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
  }
});

export default {
  name: "App",
  components: {
    TargetInterface,
    TargetButton,
    TopbarIcons
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    GetModelPath: function(t) {
      console.log("GEt Model Path");
      if (typeof t != "undefined") {
        //var path = "assets/02_windmachine/02_windmachine_01title.png";
        var path = "url(assets/" + t.folder + "/model/" + t.GLTF_data+")";
        console.log(path);
        return path;
      }
    }
  },
  mounted() {
    (this.loading = true),
      this.$store.dispatch("fetchData").finally(() => (this.loading = false));
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.topbar {
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  display: flex;
  z-index: 10;
}

.buttonrow {
  height: 50px;
  width: 100%;
  top: 70px;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
}

.windowfixed {
  top: 70px;
  height: 100%;
  width: 100%;
}

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
