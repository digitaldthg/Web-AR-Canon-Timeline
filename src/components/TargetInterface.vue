<template>
  <div>
    
    <HomeView v-if="this.$store.state.currentInterfaceState === 'AR'" :target="target"/>
    <ModelView v-if="this.$store.state.currentInterfaceState === '3DModel'" :target="target"/>
    <LongTextView v-if="this.$store.state.currentInterfaceState === 'Text'" :target="target"/>
    <SlideshowView v-if="this.$store.state.currentInterfaceState === 'Images'" :target="target"/>
    <VideoView v-if="this.$store.state.currentInterfaceState === 'Video'" :target="target"/>
    
    <div class="buttonrow">
      <InteractionButton sourceInactive="assets/common/01 AR Icon Inactive.png" sourceActive="assets/common/01 AR Icon Active.png" :state="this.$store.state.interfaceStates.ARState"/>
      <InteractionButton v-if="target.GLTF_data != null" sourceInactive="assets/common/02 3D Model Icon Inactive.png" sourceActive="assets/common/02 3D Model Icon Active.png" :state="this.$store.state.interfaceStates.ModelState"/>
      <InteractionButton v-if="target.longtext != null" sourceInactive="assets/common/03 Icon Text Inactive.png" sourceActive="assets/common/03 Icon Text Active.png" :state="this.$store.state.interfaceStates.TextState"/>
      <InteractionButton v-if="target.video != null || target.youtube != null" sourceInactive="assets/common/04 Icon Video Inactive.png" sourceActive="assets/common/04 Icon Video Active.png" :state="this.$store.state.interfaceStates.VideoState"/>
      <InteractionButton v-if="target.slide_images != null" sourceInactive="assets/common/05 Icon Images Inactive.png" sourceActive="assets/common/05 Icon Images Active.png" :state="this.$store.state.interfaceStates.ImageState"/>
    </div>
  </div>
</template>

<script>
import InteractionButton from "./InteractionButton.vue"
import HomeView from "./HomeView.vue"
import ModelView from "./ModelView.vue"
import LongTextView from "./LongTextView"
import SlideshowView from "./SlideshowView"
import VideoView from "./VideoView"

export default {
  name: "TargetInterface",
  props: ["target"],
  components: {
    InteractionButton,
    HomeView,
    ModelView,
    LongTextView,
    SlideshowView,
    VideoView
  }
}

</script>

<style scoped>
.btn{
  margin-bottom: 10px;
}

img{
  height: 100%;
  width: auto;
  position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.buttonrow {
  height: 50px;
  width: 100%;
  left: 20px;
  bottom: 55px;
  position: absolute;
  z-index: 9999;
  display: flex;
}
</style>