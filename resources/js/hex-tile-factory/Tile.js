import { HexagonFactory} from './HexagonFactory'
import { SectionFactory} from './SectionFactory'

export class Tile {    
    constructor(options) {
        this.encoded = options.encoded

        this.backgroundHexagon = HexagonFactory.make()

        this.sections = SectionFactory.make(this.encoded)
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
}