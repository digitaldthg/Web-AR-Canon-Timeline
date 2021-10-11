<template>
  <div>
    <img
      v-if="target.GLTF_data === null && target.title_image != null"
      class="backgroundImg"
      :src="GetTitleImagePath(target)"
    />
    <div>
      <img
        id="infoIcon"
        v-if="isVisible === false"
        @click="open"
        src="assets/common/Icon Info.png"
      />
    </div>
    <div v-if="isVisible === true" class="shortDescriptionContainer">
      <img
        class="backgroundPanel"
        src="assets/common/Long Description Board.png"
      />
      <img class="icon" @click="close" src="assets/common/Icon Close.png" />
      <div class="textContainer">
        <h1>{{ target.title }}</h1>
        <h2>{{ target.subtitle }}</h2>
        <p>{{ target.shorttext }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: ["target"],
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    this.isVisible = true;
  },
  methods: {
    GetTitleImagePath: function (target) {
      var path = "assets/" + target.folder + "/images/" + target.title_image;
      return path;
    },
    open: function () {
      this.isVisible = true;
    },
    close: function () {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.backgroundImg {
  height: 100%;
  width: auto;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
}

.shortDescriptionContainer {
  height: 250px;
  width: 400px;

  position: absolute;
  top: 87px;
right:0;
  z-index: 12;
}

.backgroundPanel {
  position: absolute;
  height: 100%;
  width: 100%;
}

.icon {
  position: relative;
  float: right;
  z-index: 14;
}
#infoIcon {
  right: -6px;
  top: 79px;
  position: absolute;
  z-index: 14;
}
</style>
