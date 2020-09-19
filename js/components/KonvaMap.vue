<template>
<div class="flex">
    <div class="px-4 flex flex-col bg-gray-100 text-gray-200">
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">Topology</label>
            <input v-model="topology" class="shadow tracking-widest rounded mt-2 px-2 py-1 text-gray-600 text-xs" placeholder="011020">
        </div>
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">Seed</label>
            <div class="flex">
                <input type="number" v-model="seed" number class="shadow tracking-widest rounded mt-2 px-2 py-1 text-gray-600 text-xs" placeholder="12345">
            </div>
        </div>
        <div class="mt-4 uppercase font-bold">
            <label class="tracking-wider text-xs text-gray-500">Strategy</label>
                <div class="w-full mt-2">
                    <select v-model="strategy"
                        class="block appearance-none w-full shadow tracking-widest rounded mt-2 px-2 py-1 text-gray-600 text-xs">
                        <option selected>RandomOffset</option>
                    </select>                    
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
        </div>
        <div class="flex justify-center mt-8 uppercase font-bold">
            <div @click="randomize()" class="text-sm shadow bg-indigo-500 rounded py-2 px-4 hover:bg-indigo-600 cursor-pointer">Random</div>
        </div>

    </div>
  <v-stage class="w-full bg-gray-200" :config="configKonva" @wheel="zoom" @mouseup="panning=false" @mousedown="panning=true" @mousemove="pan">
    <v-layer>
      <v-group :config="{draggable: true, rotation}" @click="rotation += 60">
        <v-line :config="backgroundHexagon"></v-line>
        <v-line v-for="(section, index) in sections" :key="index" :config="section"></v-line>
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
                height: window.innerHeight,
                scale: {
                    x: 1,
                    y: 1,
                },
                offsetX: -150,
                offsetY: -150,
            },
            topology: '110200',
            seed: Math.floor(Math.random() * 100000),
            tileStateIndex: null,
            iterations: 4,
            city: false,
            grass: false,
            water: false,
            panning: false,
            rotation: 0,
        };
    },

    computed: {
        strategy: {
            get () {
                return this.$store.state.map.strategy
            },
            set (value) {
                this.$store.commit('updateStrategy', value)
            }
        },
        tile: function() {
            let tile = new Tile({
                topology: this.topology,
                seed: this.seed,
                iterations: this.iterations,
                strategy: this.strategy,
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
                stroke: 'black',
                strokeWidth: 1,
                closed: true,
                offsetX: 0,
                offsetY: 0,
                fillPatternImage: this.water,
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
                    stroke: 'black',
                    strokeWidth: 3,
                    closed: true,
                    offsetX: 0,
                    offsetY: 0,
                    fillPatternImage: this.grass,
                    fillPatternScale: {
                        x: 0.1,
                        y: 0.1
                    },
                    rotation: 0,
                })  
            })
        },       
    },

    methods: {
        randomTopology() {
            let configuration = '';

            for(let i = 0; i< 6; i++) {
                configuration += Math.floor(Math.random()*3).toString()
            }

            return configuration;
        },

        randomize() {
            this.topology=this.randomTopology()            
        },

        zoom (event) {
            event.evt.preventDefault()
            console.log(event.evt)
            let speed = 0.01
            let direction = event.evt.wheelDelta > 0 ? 1 : -1
            let min = 0.5
            let max = 5
            let newScale = this.configKonva.scale.x + direction*speed;
            newScale = newScale < min ? min : (newScale > max ? max : newScale)
            let t = this.configKonva.scale.y + direction*speed
            this.configKonva.scale = {
                x: newScale,
                y: newScale,
            }
        },     

        pan(event) {
            if(this.panning) {
                this.configKonva.offsetX = this.configKonva.offsetX - event.evt.movementX
                this.configKonva.offsetY = this.configKonva.offsetY - event.evt.movementY
            }
            
        },

        rotate(event) {
            this.rotation += 60
        }
    },
    
    created() {
        const city = new window.Image();
        city.src = "images/city.jpg";
        city.onload = () => {
            this.city = grass
        };

        const grass = new window.Image();
        grass.src = "images/grass.jpg";
        grass.onload = () => {
            this.grass = grass
        };        

        const water = new window.Image();
        water.src = "images/water.jpg";
        water.onload = () => {
            this.water = water
        };        
    }
}

</script>