<template>
  <v-stage class="bg-gray-400 w-full"  :config="configKonva">
    <v-layer>
      <v-line :config="backgroundHexagon"></v-line>
      <v-line v-for="(section, index) in sections" :key="index" :config="section"></v-line>
    </v-layer>
  </v-stage>
</template>

<script>

import { Tile } from '../hex-tile-factory/Tile'

export default {
    data() {
        return {
        configKonva: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        tile: Tile.fromEncoded('110200'),
        };
    },

    computed: {
        backgroundHexagon: function() {
            return new Konva.Line({
                points: this.tile.backgroundHexagon.asArray(),
                fill: 'LightBlue',
                stroke: 'black',
                strokeWidth: 1,
                closed: true,
                draggable: true,
                offsetX: -window.innerWidth/2,
                offsetY: -window.innerHeight/2,
            })
        },

        sections: function() {
            return this.tile.sections.map(section => {
                return new Konva.Line({
                    points: section.asLine().asArray(),
                    fill: this.indexToColor(section.type),
                    stroke: 'black',
                    strokeWidth: 1,
                    closed: true,
                    draggable: true,
                    offsetX: -window.innerWidth/2,
                    offsetY: -window.innerHeight/2,
                })
            })
        },        
    },

    methods: {
        indexToColor(index) {
            let colors = ['#50D050', '#149414', '#46C79C', '#82FF82', '#8CFF8C']
            return colors[index];
        }
    }
}

</script>