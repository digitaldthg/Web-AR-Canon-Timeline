<template>
  <div class="iconContainer">
      <img class="icon"  @click="close" src = "assets/common/Icon Close.png"/>
      <img class="icon" src = "assets/common/Icon Language English.png"/>
      <img class="icon" src = "assets/common/Icon Account.png"/>
      <img class="icon" src = "assets/common/Icon Like.png"/>
        
        
        
  </div>
</template>

<script>
export default {
  name: "TopbarIcons",
  methods: {
    close: function() {
      this.$store.commit("setVisible", false);
    }
  }
};
</script>

<style scoped>
.iconContainer{
  position:absolute;
  right:20px;
}
.icon{
    height:50%;
    width:auto;
    float:right;
}
/*style="display: flex;"justify-content: flex-end; */
</style>