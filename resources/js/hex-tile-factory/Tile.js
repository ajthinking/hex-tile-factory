import { HexagonFactory} from './HexagonFactory'
import { SectionFactory} from './SectionFactory'
import { Point } from './Point'

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
        [0,1,2,3,4,5,6,7].forEach(iteration => {
            this.sections.forEach(section => {
                section.innerBorder.points.forEach
                for(let i = 1; i+1 < section.innerBorder.points.length; i++) {
                    let point = section.innerBorder.points[i]
                    point.x = point.x + (0.5-Math.random())*100*Math.pow(1/2, iteration);
                    point.y = point.y + (0.5-Math.random())*100*Math.pow(1/2, iteration);
                }
            })

            this.densify()
        })

        console.log(this.sections[0].innerBorder)

        // for each section
            // for each non fixed point
                // randomize
        // densify
    }

    densify() {
        console.log("CALLED")
        this.sections.forEach(section => {
            for(let i = section.innerBorder.length() -1; i > 0; i=i-2) {
                
                section.innerBorder.points.splice(i,0, new Point(
                    (section.innerBorder.points[i-1].x+section.innerBorder.points[i].x)/2,
                    (section.innerBorder.points[i-1].y+section.innerBorder.points[i].y)/2,
                ))
            }
        })
    }
}