export class MagicStack {    
    constructor(options = {}) {
        this.options = options
    }

    static make(options) {
        return new MagicStack(options ?? {
            propabilities: {
                sea: 0.4,
                coastal: 0.6,
            }
        })
    }

    get() {
        let type = this.randomBucket(this.options.propabilities)

        if(type == 'sea') return '000000'
        
        return '001100'
    }

    getConstrained(sides) {
        let example = [
            null,1,null,null,0,null
        ]
        
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