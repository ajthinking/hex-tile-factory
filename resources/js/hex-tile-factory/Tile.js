import { HexagonFactory} from './HexagonFactory'
import { SectionFactory} from './SectionFactory'

export class Tile {    
    constructor(options) {
        this.encoded = options.encoded

        this.backgroundHexagon = HexagonFactory.make()

        this.sections = SectionFactory.make(this.encoded)

        this.randomize()
    }

    static fromEncoded(encoded) {
        let instance = new Tile({
            encoded
        })

        return instance
    }

    hasSections() {
        return true;
    }

    isSixSided() {
        return false;
    }
    
    randomize() {
        // for each section
            // for each non fixed point
                // randomize
        // densify
    }

    densify() {

    }
}