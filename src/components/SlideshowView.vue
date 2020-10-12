<template>
    <div id="container">
        <div class="iconContainerLeft">
            <img @click="ChangeImage(target, -1)" src="assets/common/Icon Previous.png">
        </div>

        <div >
                <img id="imageContainer" :src="GetImage(target)"/>
        </div>
        <div class="iconContainerRight">
            <img @click="ChangeImage(target, 1)" src="assets/common/Icon Next.png">
        </div>
    </div>
</template>

<script>
export default {
    name: "SlideshowView",
    props: ["target"],
    data(){
        return {currentIdx: 0}
    },
    methods:{
        ChangeImage: function(target, dir) {
            if(this.currentIdx + dir < 0){
                this.currentIdx = (target.slide_images).length - 1;
            } else if(this.currentIdx + dir > (target.slide_images).length - 1){
                this.currentIdx = 0;
            }else {
                this.currentIdx += dir;
            }

            console.debug("ChangeImage " + this.currentIdx);
        },
        GetImage: function(target){
        var path = "assets/"+target.folder+"/images/"+target.slide_images[this.currentIdx];
        return path;
        }
    }
}
</script>

<style scoped >
#container{
    width: 100%;
    height: 100%;
    
}

#imageContainer{


  display: block;
    max-width: 500px;
    max-height: 500px;

position: absolute;
z-index:9;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
}

.iconContainerLeft{
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
    z-index: 10;
}
.iconContainerRight{
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    z-index: 10;
}
</style>