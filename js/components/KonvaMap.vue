<template>
<div class="flex">
    <div class="px-4 flex flex-col bg-gray-100 text-gray-200">
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
        <div class="flex justify-center mt-8 uppercase font-bold">
            <div @click="randomize()" class="text-sm shadow bg-indigo-500 rounded py-2 px-4 hover:bg-indigo-600 cursor-pointer">Random</div>
        </div>

    </div>
  <v-stage class="w-full bg-gray-200" :config="configKonva" @wheel="zoom" @mouseup="panning=false" @mousedown="panning=true" @mousemove="pan">
    <v-layer>
      <v-group v-for="(tile, index) in tiles" :key="index"        
        :config="tileConfig(tile)" @dblclick="rotate">
        <v-line :config="backgroundHexagon"></v-line>
        <v-line v-for="(section, index) in tile.sections" :key="index" :config="konvaLandSection(section)"></v-line>
      </v-group>                            
    </v-layer>
  </v-stage>
</div>
</template>

<script>

import { Tile } from '../hex-tile-factory/Tile'
import { MapTile } from '../hex-tile-factory/MapTile'
import { MagicStack } from '../hex-tile-factory/stacks/MagicStack'

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
        tiles: function() {

            let radius = 100

            let tiles = [];

            for(let q = -this.$store.state.map.size; q < this.$store.state.map.size; q++) {
                for(let r = -this.$store.state.map.size; r < this.$store.state.map.size; r++) {                
                    tiles.push(new Tile({
                        topology: MagicStack.make().get(),
                        seed: this.randomSeed(),
                        iterations: this.iterations,
                        strategy: this.strategy,
                        rotation: 0,
                        x: r * radius * 3/2,
                        y: q * Math.sqrt(3) * radius + r * Math.sqrt(3) * radius/2
                    }))
                }
            }

            return tiles;
        },

        strategy: {
            get () {
                return this.$store.state.map.strategy
            },
            set (value) {
                this.$store.commit('updateStrategy', value)
            }
        },

        backgroundHexagon: function() {
            return new Konva.Line({
                points: this.tiles[0].backgroundHexagon.asArray(),
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
    },

    methods: {
        tileConfig: function(tile) {
            return {
                draggable: true,
                rotation: this.rotation,
                offsetX: tile.options.x,
                offsetY: tile.options.y,
            }
        },

        konvaLandSection(section) {
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
        },

        randomTopology() {
            let configuration = '';

            for(let i = 0; i< 6; i++) {
                configuration += Math.floor(Math.random()*3).toString()
            }

            return configuration;
        },

        randomSeed() {
            return Math.floor(Math.random() * 10000)
        },

        randomize() {
            this.topology=this.randomTopology()            
        },

        zoom (event) {
            event.evt.preventDefault()
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
            // WRECKING STATE            
            event.currentTarget.setRotation(
                event.currentTarget.getRotation() + 60
            )
        }
    },
    
    created() {
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