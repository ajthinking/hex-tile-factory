export class Polygon {
    constructor(line) {
        this.line = line
    }

    asArray() {
        return this.line.points.reduce((result, point) => {
            return [...result, ...point.asArray()]
        },[])
    }
}