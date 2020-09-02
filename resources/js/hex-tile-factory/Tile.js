import { HexagonFactory} from './HexagonFactory'
import { SectionFactory} from './SectionFactory'
import { Point } from './Point'
import Delaunator from 'delaunator';

export class Tile {    
    constructor(options) {
        this.encoded = options.encoded

        this.backgroundHexagon = HexagonFactory.make()

        this.sections = SectionFactory.make(this.encoded)

        this.randomize()
    }

    static fromEncoded(encoded) {
        let instance = new Tile({
            encoded
        })

        return instance
    }

    hasSections() {
        return true;
    }

    isSixSided() {
        return false;
    }
    
    randomize() {
        console.log(
            this.allPoints()
        );
        
        [0].forEach(iteration => {
            this.sections.forEach(section => {
                section.innerBorder.points.forEach
                for(let i = 1; i+1 < section.innerBorder.points.length; i++) {
                    let point = section.innerBorder.points[i]
                    point = this.randomizePoint(point, iteration)
                }
            })

            this.densify()
        })
    }

    densify() {
        this.sections.forEach(section => {
            for(let i = section.innerBorder.length() -1; i > 0; i=i-2) {
                
                section.innerBorder.points.splice(i,0, new Point(
                    (section.innerBorder.points[i-1].x+section.innerBorder.points[i].x)/2,
                    (section.innerBorder.points[i-1].y+section.innerBorder.points[i].y)/2,
                ))
            }
        })
    }

    randomizePoint(point, iteration) {
        const points = [
            [point.x, point.y], // Ensures our point is at index 0
            ...this.allPoints().map(p => p.asArray()) // Duplicates will be ignored
        ]

        const delaunay = Delaunator.from(points);
        let triangles = delaunay.triangles
        console.log("Retracing coordinates", points[delaunay.triangles[0]]);

        let connectedTriangles = []

        for (let i = 0; i < triangles.length; i += 3) {
            let pi0 = triangles[i];
            let pi1 = triangles[i+1];
            let pi2 = triangles[i+2];

            if([pi0,pi1,pi2].includes(0)) {
                connectedTriangles.push([
                    points[pi0],
                    points[pi1],
                    points[pi2]
                ]);
            }
        }

        console.log("Total triangels", delaunay.triangles.length/3)
        console.log("Related triangles", connectedTriangles.length)

        // Filter delaunay.triangles to find all triangles touching the point to be randomized
        // calculate each triangle area with herons formula
        // based on area (and possible opinionated directions) select a random triangle
        // in the triangle select a random point

        point.x = point.x + (0.5-Math.random())*100*Math.pow(1/2, iteration);
        point.y = point.y + (0.5-Math.random())*100*Math.pow(1/2, iteration);        
        return point
    }

    allPoints() {
        return [
            ...this.backgroundHexagon.asPoints(),
            ...this.sections.flatMap(s => s.asLine().asPoints())
        ]
    }

    triangleArea(p0,p1,p2) {
        var sides = prompt("Triangle side lengths in cm (number,number,number)"),
            nsides = sides.split(","),
            a = parseFloat(nsides[0]),
            b = parseFloat(nsides[1]),
            c = parseFloat(nsides[2]),
            s = (a + b + c) / 2,
            area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        alert("The triangle's area is " + area + " square cm");
        return area; // return the area
    }    
}