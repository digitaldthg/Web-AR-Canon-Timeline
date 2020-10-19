<template>
  <div class="iconContainer">

      <img class="icon" src = "assets/common/Icon Language English.png"/>
      <img class="icon" src = "assets/common/Icon Account.png"/>
      <img class="icon" src = "assets/common/Icon Like.png"/>
        
        
        
  </div>
</template>

<script>
export default {
  name: "TopbarIcons"
};
</script>

<style scoped>
.iconContainer{
  position:absolute;
  width: 300px;
  right:20px;
  z-index:14;
}
.icon{
  margin-top: 10px;
    float:right;
    z-index:14;
}
/*style="display: flex;"justify-content: flex-end; */
</style>