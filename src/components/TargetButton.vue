<template>
  <div>
    <b-button size="sm" @click="changeId(id)">{{name}}</b-button>
  </div>
</template>

<script>
export default {
  name: "TargetButton",
  props: ["name", "id"],
  methods: {
    changeId: function(id) {
      console.debug("VueButton" + id);
      this.$store.commit("setCurrentTargetID", id);
    }
  }
};
</script>

<style scoped>
.btn {
  margin-right: 10px;
}
</style>
