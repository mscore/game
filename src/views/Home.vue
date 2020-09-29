<template>
<div class="row">
  
<div class="col-10 offset-1  text-left">
  <div class="row">
      <div class="col-12 mt-3 mb-3">
				<label for="api_base">API base URL</label>
				<input class="form-control" v-model="apiUrl">
			</div>	
		</div>
    <div class="row">
      <div class="col-12">
        <statistics />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <game-board ref="board" />
      </div>
      <div class="col-6">
        <board-logs />
      </div>
    </div>
  </div>
</div> 
</template>

<script>
import gameBoard from "@/components/GameBoard/GameBoard.vue";
import boardLogs from "@/components/Logs/BoardLogs.vue";
import statistics from "@/components/Statistics/Statistics.vue";
export default {
  name: "Home",
  components: {
    gameBoard,
    boardLogs,
    statistics
  },
  computed: {
  apiUrl: {
    get () {
      return this.$store.state.board.apiUrl
    },
    set (value) {
      this.$store.dispatch('updateApiUrl', value);
      this.$refs.board.initConfiguration();
      this.$refs.board.newGame();
    }
  }
}
};
</script>
