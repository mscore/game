import Vue from "vue";
import Vuex from "vuex";
import board from './board';
import boardEvents from './boardEvents';
import boardLogs from './boardLogs';
import statistics from './statistics';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      board,
      boardEvents,
      boardLogs,
      statistics
    }
});
