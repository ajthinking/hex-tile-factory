import { Tile } from '../hex-tile-factory/Tile'
import { MagicStack } from '../hex-tile-factory/stacks/MagicStack'

export class Map {
    constructor(options) {
        this.options = options
        this.tiles = []
        this.populateTiles()
    }

    placeTile(tile, q, r) {

    }

    tileAt(q,r) {
        return this.tiles.find(tile => {
            return tile.options.q == q && tile.options.r == r
        })
    }

    constraintsAt(q,r) {
        let sides = []
        
        sides[0] = this.tileAt(q-1, r-1) ? this.tileAt(q-1, r-1)[4] : null
        sides[1] = this.tileAt(q-1, r  ) ? this.tileAt(q-1, r  )[4] : null
        sides[2] = this.tileAt(q  , r-1) ? this.tileAt(q  , r-1)[4] : null
        sides[3] = this.tileAt(q+1, r+1) ? this.tileAt(q+1, r+1)[4] : null
        sides[4] = this.tileAt(q+1, r  ) ? this.tileAt(q+1, r  )[4] : null
        sides[5] = this.tileAt(q  , r+1) ? this.tileAt(q  , r+1)[4] : null

    }

    populateTiles() {

        let radius = 100

        let size = this.options.size

        for(let q = -size; q <= size; q++) {
            let r1 = Math.max(-size, -q -size)
            let r2 = Math.min(size, -q +size)
            for(let r = r1; r <= r2; r++) {

                let constraints = this.constraintsAt(q,r)

                this.tiles.push(new Tile({
                    topology: MagicStack.make().get(),
                    seed: 12345,
                    iterations: 3,
                    strategy: 'RandomOffset',
                    rotation: 0,
                    q,
                    r,
                    x: r * radius * 3/2,
                    y: q * Math.sqrt(3) * radius + r * Math.sqrt(3) * radius/2
                }))
            }
        }       
    }
}