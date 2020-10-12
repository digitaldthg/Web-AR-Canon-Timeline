<template>
  <div>
    <img v-if="this.$store.state.currentInterfaceState != state" @click="ChangeView(state)" :src="sourceInactive">
    <img v-if="this.$store.state.currentInterfaceState === state" :src="sourceActive"/>
  </div>
</template>

<script>
export default {
  name: "InteractionButton",
  props: ['sourceInactive', 'sourceActive','state'],
  methods: {
    ChangeView: function(state) {
        console.log("Change State");
      this.$store.commit("setCurrentInterfaceState", state);
    }
  }
};
</script>

<style scoped>

</style>
