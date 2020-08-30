export class Line {
    constructor(points = []) {
        this.points = points
    }

    addPoint(point) {
        this.points.push(point)
        return this
    }

    addLine(line) {
        this.points = [...this.points, ...line.points]
        return this
    }    

    asArray()
    {
        return this.points.reduce((result, point) => {
            return [...result, ...point.asArray()]
        },[])
    }

    length() {
        return this.points.length
    }
}