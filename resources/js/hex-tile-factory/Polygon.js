export class Polygon {
    constructor(line) {
        this.line = line
    }

    asArray() {
        let r = this.line.points.reduce((result, point) => {
            return [...result, ...point.asArray()]
        },[])

        console.log(r)
        // console.log("Har linjen punkter?", this.line.points) JA

        return r
    }
}