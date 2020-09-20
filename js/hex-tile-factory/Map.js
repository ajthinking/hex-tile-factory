export class Map {
    constructor(options) {
        this.options = options
        this.tiles = []
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
}