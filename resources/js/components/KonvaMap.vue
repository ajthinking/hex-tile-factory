<template>
  <v-stage class="bg-gray-400 w-full"  :config="configKonva">
    <v-layer>
      <v-group :config="{draggable: true}">
        <v-line :config="backgroundHexagon"></v-line>
        <v-line v-for="(section, index) in sections" :key="index" :config="section"></v-line>
        <v-line v-for="(triangle, index) in triangles" :key="index+1000" :config="triangle"></v-line>
      </v-group>
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
            grass: false,
            water: false,
        };
    },

    computed: {
        backgroundHexagon: function() {
            return new Konva.Line({
                points: this.tile.backgroundHexagon.asArray(),
                //fill: 'LightBlue',
                stroke: 'black',
                strokeWidth: 1,
                closed: true,
                //draggable: true,
                offsetX: -window.innerWidth/2,
                offsetY: -window.innerHeight/2,
                fillPatternImage: this.water,
                //fillPatternRepeat: 'no-repeat',
                fillPatternScale: {
                    x: 0.4,
                    y: 0.4
                },           
            })
        },

        sections: function() {
            return this.tile.sections.map(section => {
                return new Konva.Line({
                    points: section.asLine().asArray(),
                    //fill: this.indexToColor(section.type),
                    stroke: 'black',
                    strokeWidth: 3,
                    closed: true,
                    //draggable: true,
                    offsetX: -window.innerWidth/2,
                    offsetY: -window.innerHeight/2,
                    fillPatternImage: this.grass,
                    //fillPatternRepeat: 'no-repeat',
                    fillPatternScale: {
                        x: 0.1,
                        y: 0.1
                    },
                })
            })
        },
        
        triangles: function() {
            return this.tile.connectedTriangles.map(triangle => {
                return new Konva.Line({
                    points: triangle.asArray(),
                    //fill: this.indexToColor(section.type),
                    stroke: 'black',
                    strokeWidth: 1,
                    closed: true,
                    //draggable: true,
                    offsetX: -window.innerWidth/2,
                    offsetY: -window.innerHeight/2,
                    //fillPatternImage: this.grass,
                    //fillPatternRepeat: 'no-repeat',
                    fillPatternScale: {
                        x: 0.1,
                        y: 0.1
                    },
                })
            })
        },        
    },

    methods: {
        indexToColor(index) {
            let colors = ['#50D050', '#149414', '#46C79C', '#82FF82', '#8CFF8C']
            return colors[index];
        },
    },
    
    created() {
        const grass = new window.Image();
        grass.src = "/images/grass.jpg";
        grass.onload = () => {
            this.grass = grass
        };

        const water = new window.Image();
        water.src = "/images/water.jpg";
        water.onload = () => {
            this.water = water
        };        
    }
}

</script>