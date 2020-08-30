export class Tile {    
    outerBorder

    sections = []

    constructor(config) {
        // from config.encoded
            // create base sections
            // create protected zones
            // randomize
    }

    fromEncoded(encoded) {
        this.encoded = encoded
    }

    hasSections() {
        return true;
    }

    isSixSided() {
        return false;
    }    
}