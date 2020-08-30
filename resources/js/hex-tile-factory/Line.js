export class Line {
    constructor(points = []) {
        this.points = points
    }

    addPoint(point) {
        this.points.push(point)
        return this
    }

    asArray()
    {
        return this.points.reduce((result, point) => {
            return [...result, ...point.asArray()]
        },[])
    }
}