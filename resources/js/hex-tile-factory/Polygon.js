export class Polygon {
    constructor(line) {
        this.line = line
    }

    asPoints() {
        return this.line.asPoints()
    }

    asArray() {
        return this.line.points.reduce((result, point) => {
            return [...result, ...point.asArray()]
        },[])
    }
}