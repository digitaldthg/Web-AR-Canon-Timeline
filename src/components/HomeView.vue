<template>
  <div>
    <img v-if="target.GLTF_data === null" class="backgroundImg" :src = "GetTitleImagePath(target)"/>
    
    <div class="shortDescriptionContainer">
        <img class="backgroundPanel" src="assets/common/Long Description Board.png"  />
        <!--<img class="icon" src="assets/common/Icon Info.png"/>-->
        <div class="textContainer">
        <h1>{{target.title}}</h1>
        <h2>{{target.subtitle}}</h2>
        <p>{{target.shorttext}}</p>
        </div>
    </div>



    
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props:['target'],
  methods: {
    GetTitleImagePath: function(target) {
      //var path = "assets/02_windmachine/02_windmachine_01title.png";
      var path = "assets/"+target.folder+"/images/"+target.title_image;
        return path;
    }
  }
};
</script>

<style scoped>
.backgroundImg{
  height: 100%;
  width: auto;
  position: absolute;
  top:50px;
left: 50%;
transform: translateX(-50%);
z-index: 9;
}

.shortDescriptionContainer{
height: 250px;
  width: 400px;
float:right;
margin: 20px;
position: relative;
top:270px;
z-index: 10;
}

.backgroundPanel{
    position: absolute;
height: 100%;
  width: 100%;
}

.icon{
    position:relative;
    float:right;
}



</style>
