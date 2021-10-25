<template>
    <youtube id="videoframe" :video-id=target.youtube></youtube>
</template>

<script>
export default {
  name: 'VideoView',
props: ["target"]
}
</script>

<style scoped>
#videoframe{
width: 560px;
height: 315px;
display: block;
position: absolute;
z-index:9;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
}
</style>