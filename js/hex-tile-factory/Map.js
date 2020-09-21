import { Tile } from '../hex-tile-factory/Tile'
import { MagicStack } from '../hex-tile-factory/stacks/MagicStack'

export class Map {
    constructor(options) {
        this.options = options
    }

    placeTile(tile, q, r) {

    }

    getTileAt(q,r) {
        return this.tiles.find(tile => {
            return tile.q == q && tile.r == r
        })
    }

    getConstraintsAt(q,r) {
        for(let q_ = q-1; q_ <= q+1; q_++ ) {
            for(let r_ = r-1; r_ <= r+1; r_++ ) {
                // this is just a sketch
            }            
        }
    }

    tiles() {

        let radius = 100

        let tiles = [];
        let size = this.options.size

        for(let q = -size; q <= size; q++) {
            let r1 = Math.max(-size, -q -size)
            let r2 = Math.min(size, -q +size)
            for(let r = r1; r <= r2; r++) {

                // DIFFERNTIATE UNFILLED SLOTS AND FILLED SLOTS
                // Map.tileAt(q,r) // Tile
                // Map.constraintsAt(q,r) // [null,1,1 null,null,null]

                tiles.push(new Tile({
                    topology: MagicStack.make().get(),
                    seed: 12345,
                    iterations: 3,
                    strategy: 'RandomOffset',
                    rotation: 0,
                    x: r * radius * 3/2,
                    y: q * Math.sqrt(3) * radius + r * Math.sqrt(3) * radius/2
                }))
            }
        }

        return tiles;        
    }
}