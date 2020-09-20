export class MagicStack {    
    constructor(options = {}) {
        //
    }

    static make(options) {
        return new MagicStack(options ?? {
            sea: 0.2,
            inland: 0.2,
            coastal: 0.6,
        })
    }

    get() {
        return '001100'
    }

    getNew() {
        
    }
    
    randomBucket(propabilities) {
        let scale = Object.keys(propabilities).reduce(function(sum, key, value) {
            return sum + value
        }, 0);
        let ticket = Math.random() * scale;
        let cursor = 0
        let current

        for (const [key, value] of Object.entries(propabilities)) {
            current = key
            cursor += value
            if(cursor > ticket) return current
        }

        return current
    }
}