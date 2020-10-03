export class MagicStack {    
    constructor(options = {}) {
        this.options = options
    }

    static make(options) {
        return new MagicStack(options ?? {
            propabilities: {
                sea: 0.8,
                coastal: 0.2,
                //inland: 0.2
            }
        })
    }

    randomSparseTopology() {
        let configuration = '';

        for(let i = 0; i< 6; i++) {
            configuration += Math.floor(Math.random()*3).toString()
        }

        return configuration;        
    }

    getConstrained(sides) {
        console.log("CONSTRAINED")
        // let propabilities = {
        //     coastal: 0.2
        // }

        // if(this.couldBeSea(sides) && Math.random() < 0.5) {
        //     return '000000'
        // }

        // if(this.couldBeInland(sides)) {
        //     propabilities.inland = 0.1
        // }
        // seedrandom(Date.now(), { global: true })
        // let choice = this.randomBucket(propabilities)

        // console.log(propabilities, choice)


        // if(choice == 'sea') return '000000'
        // if(choice == 'inland') return '111111'

        // else coastal
        let configuration = '';

        for(let i = 0; i< 6; i++) {
            configuration += sides[i] !== null ? sides[i].toString() : Math.floor(Math.random()*2).toString()
        }

        return configuration;
        
    }

    couldBeInland(sides) {
        return !sides.includes(0)
    }

    couldBeSea(sides) {
        return !sides.includes(1)
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