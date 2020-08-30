import { Polygon } from './Polygon'
import { Line } from './Line'
import { Point } from './Point';

export class HexagonFactory {
    static make(config = {})
    {
        let line = new Line();

        for(let i = 0; i < 6; i++) {
            let radius = config.radius ?? 100
            let offsetX = config.offsetX ?? 0
            let offsetY = config.offsetY ?? 0
            let startX = Math.cos(radius/2)
            let startY = 0//-0.5 * radius

            let point = new Point(
                startX + radius * Math.cos(i*Math.PI/3) + offsetX,
                startY + radius * Math.sin(i*Math.PI/3) + offsetY,
            )

            line.addPoint(point)
        }
        return new Polygon(line)
    }

    static borderBetween(start, end) {
        let line = new Line();
        let config = {};

        for(let i = start; i <= end; i++) {
            let radius = config.radius ?? 100
            let offsetX = config.offsetX ?? 0
            let offsetY = config.offsetY ?? 0
            let startX = Math.cos(radius/2)
            let startY = 0

            let point = new Point(
                startX + radius * Math.cos(i*Math.PI/3) + offsetX,
                startY + radius * Math.sin(i*Math.PI/3) + offsetY,
            )

            line.addPoint(point)
        }

        return line;
    }

    static pointAtIndex(i) {
        let config = {}
        let radius = config.radius ?? 100
        let offsetX = config.offsetX ?? 0
        let offsetY = config.offsetY ?? 0
        let startX = Math.cos(radius/2)
        let startY = 0

        return new Point(
            startX + radius * Math.cos(i*Math.PI/3) + offsetX,
            startY + radius * Math.sin(i*Math.PI/3) + offsetY,
        )
    }

    static centerPoint(config = {}) {
        let offsetX = config.offsetX ?? 0
        let offsetY = config.offsetY ?? 0

        return new Point(
            offsetX,
            offsetY,
        )

    }
}