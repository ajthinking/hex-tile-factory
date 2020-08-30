export class Line {
    constructor(points = []) {
        this.points = points
    }

    addPoint(point) {
        this.points.push(point)
    }
}