<template>
  <div class="row">
    <div class="col-12">
      <h4>Log</h4>
        <pre>
          <div v-for="(eventItem, index) in boardLogs " :key="index">{{ eventItem }}</div>
        </pre>
    </div>
  </div>
</template>
<script>
export default {  
  computed: {
    boardLogs() {
      return this.$store.state.boardLogs.logItems;
    }
  },
  methods: {

  }
};
</script>
