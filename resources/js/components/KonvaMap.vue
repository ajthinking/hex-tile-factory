<template>
<div class="flex bg-gray-300">
    <div class="px-4 flex flex-col bg-gray-100 text-gray-200">
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">Topology</label>
            <input v-model="topology" class="shadow tracking-widest rounded mt-2 px-2 py-1 text-gray-600 text-xs" placeholder="011020">
        </div>
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">Seed</label>
            <div class="flex">
                <input v-model="seed" class="shadow tracking-widest rounded mt-2 px-2 py-1 text-gray-600 text-xs" placeholder="12345">
                <div @click="seed=Math.floor(Math.random()*1000000)" class="font-medium flex mt-2 ml-2 px-2 cursor-pointer text-gray-500 items-center text-xs lowercase">random</div>
            </div>
        </div>
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">Iterations: {{ this.iterations}}</label>
                <div class="w-full">
                    <input v-model="iterations" type="range" :min="1" :max="5"
                        class="w-full"
                    >                    
                </div> 
        </div>        
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">History: {{ tileStateIndex  }}</label>
            <div class="mt-2 flex text-gray-600">
                <div class="w-full">
                    <input v-model="tileStateIndex" type="range" min="0" :max="tile.states.length-1"
                        class="w-full"
                    >                    
                </div>                
            </div>
            <div class="flex text-sm w-full mt-2 text-gray-500 normal-case">
                Message: "{{ activeTile.message }}"
            </div>
        </div>
        <div class="flex justify-center mt-8 uppercase font-bold">
            <div @click="randomize()" class="text-sm shadow bg-indigo-500 rounded py-2 px-4 hover:bg-indigo-600 cursor-pointer">Random</div>
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
            topology: '110200',
            seed: Math.floor(Math.random() * 100000),
            tileStateIndex: null,
            iterations: 3,
            city: false,
            grass: false,
            water: false,
        };
    },

    computed: {
        tile: function() {
            let tile = new Tile({
                topology: this.topology,
                seed: this.seed,
                iterations: this.iterations,
            })

            this.tileStateIndex = tile.states.length-1
            return tile
        },
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
                offsetX: -window.innerWidth/3,
                offsetY: -window.innerHeight/3,
                fillPatternImage: this.water,
                //fillPatternImage: this.grass,
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
                    offsetX: -window.innerWidth/3,
                    offsetY: -window.innerHeight/3,
                    fillPatternImage: this.grass,
                    //fillPatternImage: this.city,
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
                    offsetX: -window.innerWidth/3,
                    offsetY: -window.innerHeight/3,
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

        randomTopology() {
            let configuration = '';

            for(let i = 0; i< 6; i++) {
                configuration += Math.floor(Math.random()*3).toString()
            }

            return configuration;
        },

        randomize() {
            this.topology=this.randomTopology()            
        }
    },
    
    created() {
        const city = new window.Image();
        city.src = "/images/city.jpg";
        city.onload = () => {
            this.city = grass
        };

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

<style scoped>
input[type=range]::-ms-thumb {
  fill: red;
  stroke: none;
}
</style>