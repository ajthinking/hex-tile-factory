import { HexagonFactory } from "./HexagonFactory"
import { Point } from "./Point"
import { Line } from "./Line"

export class Section {
    constructor(options) {
        this.type = options.type
        this.start = options.start
        this.end = options.end

        this.outerBorder = HexagonFactory.borderBetween(this.start, this.end)
        this.innerBorder = this.getInitialInnerBorder()
    }

    asLine() {
        return new Line([
            ...this.outerBorder.asPoints().map(p => p.clone() ),
            ...this.innerBorder.asPoints().map(p => p.clone() ),
        ])
    }

    getHelperPoint() {
        let angle = this.start*Math.PI/3 + this.length()*Math.PI/6 - Math.PI/6
        
        return new Point(
            30*Math.cos(angle),
            30*Math.sin(angle)
        )
    }

    id() {
        return 'type_' + this.type + '_from_' + this.start + '_to_' + this.end
    }

    getInitialInnerBorder() {
        return new Line([
            HexagonFactory.pointAtIndex(this.end),
            this.getHelperPoint(),
            HexagonFactory.pointAtIndex(this.start)
        ])
    }
    
    length() {
        return this.end-this.start + 1
    }
}