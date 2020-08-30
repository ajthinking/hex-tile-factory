<template>
  <v-stage class="bg-gray-400 w-full"  :config="configKonva">
    <v-layer>
      <!--<v-circle :config="configCircle"></v-circle>
      <v-line :config="configPolygon"></v-line>-->
      <v-line :config="hexagon"></v-line>
      <v-line :config="section"></v-line>
    </v-layer>
  </v-stage>
</template>

<script>

import { HexagonFactory } from '../hex-tile-factory/HexagonFactory'
import { SectionFactory } from '../hex-tile-factory/SectionFactory'

export default {
  data() {
    return {
      configKonva: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      hexagon: new Konva.Line({
        points: HexagonFactory.make({ offsetX: 0, offsetY: 0}).asArray(),
        fill: 'gray',
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        draggable: true,
      }),

      section: new Konva.Line({
        points: SectionFactory.make('110000')[0].asLine().asArray(),
        fill: 'red',
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        draggable: true,
      }),
    };
  },

  mounted() {
      console.log(
          SectionFactory.make('110000')[0].asLine().asArray()
      )
  }
};

</script>