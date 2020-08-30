import { HexagonFactory } from "./HexagonFactory"
import { Point } from "./Point"

export class Section {
    constructor(options) {
        this.options = options
        this.border = HexagonFactory.borderBetween(options.start, options.end)
        this.helperPoint = new HexagonFactory.centerPoint();
    }

    asLine() {

        console.log("HELPER POINT", this.helperPoint)
        return this.border.addPoint(this.helperPoint);
        return this.border.addPoint(this.helperPoint)
    }
}