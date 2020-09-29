<template>
  <div>
    <div class="row">
      <div class="col-10">
        <h4>Game board</h4>
        <div id="game_board" class="row">{{ boardConfiguration.boardName }}</div>
        <button
          v-for="(slot, index) in boardConfiguration.slotValues"
          :key="index"
          :id="'slot-'+ index"
          type="button"
          :class="'col-xs-1 btn btn-'+ boardConfiguration.slotColors[index]"
        >{{index}}</button>
      </div>
      <div class="col-2">
        <div id="spinner" v-show="displaySpinner" style="height: 100px;"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <board-events />
      </div>
    </div>
  </div>
</template>

<script>
import { Spinner } from "spin.js";
import boardEvents from "@/components/GameBoard/BoardEvents.vue";
import * as Settings from '../../settings';
export default {
  components: {
    boardEvents
  },
  data() {
    return {
      displaySpinner: false,
      boardConfiguration: {
        name: "",
        slotCount: 0,
        slots: [],
        slotValues: [],
        slotColors: []
      }
    };
  },
  mounted() {
    this.initConfiguration();
    this.initSpinner();
    this.newGame();
  },
  methods: {  
    initConfiguration() {
      this.$store.dispatch("createBoardLogItem", "Loading game board");
      this.$store.dispatch("fetchRouletteConfiguration").then(() => {
        this.boardConfiguration.name = this.$store.state.board.boardName;
        this.boardConfiguration.slotCount = this.$store.state.board.boardSlotCount;
        this.boardConfiguration.slots = this.$store.state.board.boardSlots;
        this.boardConfiguration.slotValues = this.$store.state.board.boardSlotValues;
        this.boardConfiguration.slotColors = this.$store.state.board.boardSlotColors;
      });
    },

    newGame() {
      let store = this.$store;
      let me = this;
      store.dispatch("createBoardLogItem", "Checking for new game");
      if(!this.$store.state.statistics.firstRun){
        store.dispatch("fetchStatistics");
      }
      store.dispatch("fetchNextGame")
        .then(() => {
          if(this.$store.state.statistics.firstRun){
            store.dispatch("fetchStatistics");
            store.dispatch("updateFirstRun", false);
          }
          me.waitForGame();
        })
        .catch(function() {
          store.dispatch("createBoardLogItem", 'Error, sleeping for '+ Settings.RETRY_TIMER +'  and retrying');
          setTimeout(function() {me.newGame()}, Settings.RETRY_TIMER);
        });
    },

    waitForGame(){
      let me = this;
      let store = me.$store;
      let nextGameData = store.state.board.nextGameData;

      if (nextGameData.fakeStartDelta <= 0) {
        me.startGame();
        return;
      }      
      store.dispatch("createBoardLogItem", 'sleeping for fakeStartDelta '+ nextGameData.fakeStartDelta +' sec');
      store.dispatch("createBoardEventItem", 'Game '+ nextGameData.id + " will start in " + nextGameData.fakeStartDelta +' sec');   
      
      var timer_id = setInterval(function (){
				store.dispatch("decreaseFakeStartDelta");
				if (nextGameData.fakeStartDelta  > 0) {
          store.dispatch("updateLastBoardEventItem", 'Game '+ nextGameData.id + " will start in " + nextGameData.fakeStartDelta +' sec');
					return;
				}
				clearInterval(timer_id);
				me.startGame();
			}, 1000);
    },

    startGame(){
      let store = this.$store;
      let me = this;    
      let nextGameData = store.state.board.nextGameData;            
      this.startSpinner();
      store.dispatch("updateLastBoardEventItem", 'Game '+ nextGameData.id + ", the wheel is spinning");               
      store.dispatch("fetchNewGame", nextGameData.id)
        .then(() => {
          let newGameData = store.state.board.newGameData;       
          if (newGameData.result == null) {
            store.dispatch("createBoardLogItem", "Still no result continue spinning");					
  					setTimeout(function() {me.startGame()}, Settings.RETRY_TIMER);
          } 
          else {
            store.dispatch("createBoardLogItem", "Result is " + newGameData.result);
            store.dispatch("updateLastBoardEventItem", 'Game '+ newGameData.id + " ended, result is " + newGameData.result );		 
            let luckySlot = document.getElementById("slot-"+ newGameData.result);            
            me.fadeOut(luckySlot);
            me.fadeIn(luckySlot);
            me.fadeOut(luckySlot);
            me.fadeIn(luckySlot);
            me.fadeOut(luckySlot);
            me.fadeIn(luckySlot);			       
            me.stopSpinner();      
					  me.newGame();
				}
        })
        .catch(function() {
          store.dispatch("createBoardLogItem","Error getting results continue spinning");
          setTimeout(me.newGame(), Settings.RETRY_TIMER);
        });      
    },

    initSpinner() {
      let target = document.getElementById("spinner");
      var spinner = new Spinner({ position: "relative" }).spin();
      target.appendChild(spinner.el);
    },

    startSpinner(){
      this.$store.dispatch("createBoardLogItem","Spinning the wheel");  
      if(this.displaySpinner){
        this.$store.dispatch("createBoardLogItem","Wheel is already spinning");
        return; 
      }
      this.displaySpinner = true;
    },  

    stopSpinner(){
      this.$store.dispatch("createBoardLogItem","Stopping the wheel");
      this.displaySpinner = false;
    },      
  
    fadeOut(el){
       var s = el.style;
            s.opacity = 1;
            (function fade(){
               (s.opacity-=.1) < 0 ? s.display="none" : setTimeout(fade,40)})();
    },

    fadeIn(el){
       var s = el.style;
            s.opacity = 1;
            (function appear(){
               (s.opacity+=.1) > 1 ? s.display="initial" : setTimeout(appear,40)})();
    }
  }}
</script>

<style scoped>
.btn-black {
  color: #fff;
  background-color: #000000;
  border-color: #222222;
}
.btn-red {
  color: #fff;
  background-color: #d9534f;
  border-color: #ac2925;
}
.btn-green {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.fade-in {
  visibility: visible;
  opacity: 1;
  transition: opacity 2s linear;
}
.fade-out {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s linear;
}
</style>