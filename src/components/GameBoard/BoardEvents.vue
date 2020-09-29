<template>
  <div class="row">
    <div class="col-12">
      <h4>Events</h4>
      <ul id="event_box" class="list-group">
        <li class="list-group-item" v-for="(eventItem, index) in gameBoardEvents" :key="index">{{ eventItem }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {  
  computed: {
    gameBoardEvents() {
      return this.$store.state.boardEvents.boardEventTexts;
    }
  }  
};
</script>
