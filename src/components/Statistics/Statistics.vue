<template>
  <div class="row">
    <div class="col-12">
      <h4>Stats (last 200)</h4>
      <table id="stats" class="table ">
        <tr>
          <td></td>
          <th colspan="5" class="cold">Cold</th>
          <th :colspan="(statisticData.length-10)" class="neutral">Neutral</th>
          <th colspan="5" class="hot">Hot</th>
        </tr>
        <tr>
          <th>Slot</th>
          <td
            v-for="(statisticsItem, index) in statisticData "
            :key="index"
            :class="'btn-' + slotColors[statisticsItem.result]"
          >{{ statisticsItem.result }}</td>
        </tr>
        <tr>
          <th>Hits</th>
          <td
            v-for="(statisticsItem, index) in statisticData "
            :key="index"
            :class="getSlotPopularityColor(index)">{{ statisticsItem.count }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    statisticData() {
      return this.$store.state.statistics.summary;
    },
    slotColors() {
      return this.$store.state.board.boardSlotColors;
    }
  },
  methods: {
    getSlotPopularityColor(popularityIndex) {
      if (popularityIndex < 5) {
        return "cold";
      } else if (popularityIndex >= this.statisticData.length - 5) {
        return "hot";
      }
      return "neutral";
    }
  }
};
</script>
<style scoped>
.cold {
  background-color: #d9edf7;
}
.neutral {
  /*background-color: #F5F5F5*/
}
.hot {
  background-color: #f2dede;
}
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

table.table-fit {
    width: auto !important;
    table-layout: auto !important;
}
table.table-fit thead th, table.table-fit tfoot th {
    width: auto !important;
}
table.table-fit tbody td, table.table-fit tfoot td {
    width: auto !important;
}
</style>