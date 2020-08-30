import { HexagonFactory } from "./HexagonFactory"
import { Point } from "./Point"

export class Section {
    constructor(options) {
        this.options = options
        this.type = options.type
        this.start = options.start
        this.end = options.end
        this.length = this.end-this.start + 1
        this.border = HexagonFactory.borderBetween(options.start, options.end)
        //this.helperPoint = new HexagonFactory.centerPoint()
        this.helperPoint = this.getHelperPoint()
    }

    asLine() {
        return this.border.addPoint(this.helperPoint)
    }

    getHelperPoint() {
        let angle = this.start*Math.PI/3 + this.length*Math.PI/6 - Math.PI/6

        return new Point(
            30*Math.cos(angle),
            30*Math.sin(angle),
        )
    }
}