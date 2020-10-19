<template>
    <div class="container">
        <img id="backgroundPanel" src="assets/common/Long Description Board.png"/>
        <div class="auto">
            <h1>{{target.title}}</h1>
            <h2>{{target.subtitle}}</h2>
            <p>{{target.longtext}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "LongTextView",
    props: ["target"],
    methods: {
        GetBackgroundImagePath: function(target) {
        //var path = "assets/02_windmachine/02_windmachine_01title.png";
        var path = "assets/"+target.folder+"/"+target.titleImage;
            return path;
        }
    }
}
</script>

<style scoped>
.container{
position: absolute;
width: 733px;
height: 470px;
left: 50%;
transform: translateX(-50%);
top: 78px;
z-index:9;
}

#backgroundPanel{
width: 100%;
height: 100%;
}

.auto{
    height: 463px;
    width: 653px;
margin: 30px;
overflow: scroll;
position: absolute;
top: 0;
padding: 20px;
}

</style>