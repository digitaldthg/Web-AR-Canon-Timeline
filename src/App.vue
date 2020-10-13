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
        <TargetInterface
          :target="this.$store.state.targets[this.$store.state.currentTargetID]"
        />
      </div>

      <a-scene 
        arjs="detectionMode: mono_and_matrix; matrixCodeType: 4x4_BCH_13_9_3;"
      >
        <CustomMarker
          v-for="(value, key) in this.$store.state.targets"
          :key="key"
          :id="key"
          :idString="GetTargetIdString(key)"
        />
        <a-light color="white" position="-1 1 0"></a-light>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  </div>
</template>

<script>
import TargetInterface from "./components/TargetInterface.vue";
import TargetButton from "./components/TargetButton.vue";
import TopbarIcons from "./components/TopbarIcons.vue";
import CustomMarker from "./components/CustomMarker.vue";

export default {
  name: "App",
  components: {
    TargetInterface,
    TargetButton,
    TopbarIcons,
    CustomMarker,
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    GetTargetIdString: function (id) {
      var idString = "targetID: " + id;
      return idString;
    },
  },
  mounted() {
    (this.loading = true),
      this.$store.dispatch("fetchData").finally(() => (this.loading = false));
  },
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
  top: 10px;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
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
