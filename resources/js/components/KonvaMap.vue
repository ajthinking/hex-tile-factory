<template>
  <v-stage class="bg-gray-400 w-full"  :config="configKonva">
    <v-layer>
      <!--<v-circle :config="configCircle"></v-circle>
      <v-line :config="configPolygon"></v-line>-->
      <v-line :config="hexagon"></v-line>
    </v-layer>
  </v-stage>
</template>

<script>

import { HexagonFactory } from '../hex-tile-factory/HexagonFactory'

export default {
  data() {
    return {
      configKonva: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      hexagon: new Konva.Line({
        points: HexagonFactory.make({ offsetX: 200, offsetY: 200}).asArray(),
        fill: 'gray',
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        draggable: true,
      }),
    };
  }
};

</script>