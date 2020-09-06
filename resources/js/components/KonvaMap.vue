<template>
<div class="flex bg-gray-400">
    <div class="px-4 flex flex-col bg-gray-100 text-gray-200">
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">Topology</label>
            <input class="shadow tracking-widest rounded mt-2 px-2 py-1 text-gray-600 text-xs" placeholder="011020">
        </div>
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">Seed</label>
            <input class="shadow tracking-widest rounded mt-2 px-2 py-1 text-gray-600 text-xs" placeholder="12345">
        </div>
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">History</label>
            <div class="mt-2 flex text-gray-600">
                <div tabindex="0" @click="tileStateIndex=Math.max(tileStateIndex-1, 0)"
                    class="flex w-full border justify-center hover:bg-gray-500">-</div>
                <div tabindex="0" @click="tileStateIndex=Math.min(tileStateIndex+1, tile.states.length-1)"
                    class="flex w-full border justify-center hover:bg-gray-500">+</div>                
            </div>
        </div>
        <div class="flex justify-center mt-8 uppercase font-bold">
            <div class="text-sm shadow bg-indigo-500 rounded py-2 px-4 hover:bg-indigo-600 cursor-pointer">Random</div>
        </div>              

    </div>
  <v-stage class="w-full"  :config="configKonva">
    <v-layer>
      <v-group :config="{draggable: true}">
        <v-line :config="backgroundHexagon"></v-line>
        <v-line v-for="(section, index) in sections" :key="index" :config="section"></v-line>
        <!--<v-line v-for="(triangle, index) in triangles" :key="index+1000" :config="triangle"></v-line>-->
      </v-group>
    </v-layer>
  </v-stage>
</div>
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
            tileStateIndex: 0,
            grass: false,
            water: false,
        };
    },

    computed: {
        activeTile: function() {
            return this.tile.states[
                this.tileStateIndex
            ]
        },

        backgroundHexagon: function() {
            return new Konva.Line({
                points: this.activeTile.backgroundHexagon.asArray(),
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
            return this.activeTile.sections.map(section => {
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
            return this.activeTile.connectedTriangles.map(triangle => {
                return new Konva.Line({
                    points: triangle.asArray(),
                    //fill: this.indexToColor(section.type),
                    stroke: 'black',
                    strokeWidth: 1,
                    closed: true,
                    //draggable: true,
                    offsetX: -window.innerWidth/2,
                    offsetY: -window.innerHeight/2,
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