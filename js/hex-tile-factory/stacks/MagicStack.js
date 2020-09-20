export class MagicStack {    
    constructor(options = {}) {
        this.options = options
    }

    static make(options) {
        return new MagicStack(options ?? {
            propabilities: {
                sea: 0.5,
                coastal: 0.5,
                //inland: 0.2
            }
        })
    }

    get() {
        let type = this.randomBucket(this.options.propabilities)

        if(type == 'sea') return '000000'

        if(type == 'inland') return '111111'
        
        return this.randomTopology();
    }

    randomTopology() {
        let configuration = '';

        for(let i = 0; i< 6; i++) {
            configuration += Math.floor(Math.random()*3).toString()
        }

        return configuration;
    }    

    getConstrained(sides) {
        let example = [
            null,1,null,null,0,null
        ]
        
    }

    couldBeInland(sides) {
        return !sides.contains(0)
    }

    couldBeSea(sides) {
        return !sides.contains(1)
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