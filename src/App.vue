<template>
  <div>
    <div v-if="!this.loading">

      <div class="topbar">
        <img class="topbarPanel" src="assets/common/Topbar.png" />
        <img class="logo" src="assets/common/Artboard.png" />
        <TopbarIcons />
      </div>


      <!--DEBUG BUTTONS
        <div class="buttonrow">
        <TargetButton
          v-for="(value, key) in this.$store.state.targets"
          :key="key"
          :name="value.title"
          :id="key"
        />
      </div>-->

      <div class="windowfixed" v-if="this.$store.state.isVisible">
        <TargetInterface
          :target="this.$store.state.targets[this.$store.state.currentTargetID]"
        />
      </div>

      <img
        v-if="!this.$store.state.isVisible"
        class="scanIcon"
        src="assets/common/Scan Board.png"
      />

      <ARScene/>
    </div>
  </div>
</template>

<script>
import TargetInterface from "./components/TargetInterface.vue";
import TargetButton from "./components/TargetButton.vue";
import TopbarIcons from "./components/TopbarIcons.vue";
import ARScene from "./components/ARScene.vue";

export default {
  name: "App",
  components: {
    TargetInterface,
    TargetButton,
    TopbarIcons,
    ARScene
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.loading = true,
    //Load Data from CanonData.json
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  z-index: 11;
}

.logo{
  z-index:11;
  position: absolute;
  margin-top: 20px;
  margin-left: 20px;
}
.topbarPanel{
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
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
  z-index: 99;
}

.scanIcon {
  display: block;
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.windowfixed {
  top: 70px;
  height: 100%;
  width: 100%;
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
