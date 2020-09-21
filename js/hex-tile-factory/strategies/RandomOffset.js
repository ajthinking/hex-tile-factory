import { HexagonFactory} from '../HexagonFactory'
import { SectionFactory} from '../SectionFactory'
import { Point } from '../Point'
import { Line } from '../Line'
import Delaunator from 'delaunator';
let jsts = require('jsts')
const _ = require('lodash')
var seedrandom = require('seedrandom');

export class RandomOffset {    
    constructor(tile) {
        this.tile = tile
        this.tile.sections = SectionFactory.make(this.tile.topology)
        this.tile.commit('Added base sections')
    }
    
    // PUBLIC STATIC API
    static randomize(tile) {
        let instance = new this(tile)
        console.log(tile.topology)

        if(tile.topology == '000000') return;

        if(tile.topology == '111111') return;

        return instance.randomize_()
    }

    static description() {
        return 'Creates a pie slice for each topology section, then, for each iteration, densifies section border and offsets interior point by a random value.'
    }

    // PRIVATE API
    randomize_() {
        this.tile.iterations.forEach(iteration => {
            this.tile.sections.forEach(section => {
                this.tile.densify(section)
                this.tile.commit("Densified line")
                                  
                for(let i = 1; i+1 < section.innerBorder.points.length; i++) {
                    let point = section.innerBorder.points[i]
                    this.randomizePoint(point, iteration)
                    this.tile.commit("Randomized point")
                }
        })
    })
    }

    densify(section) {
        for(let i = section.innerBorder.length() -1; i > 0; i=i-1) {   
            section.innerBorder.points.splice(i,0, new Point(
                (section.innerBorder.points[i-1].x+section.innerBorder.points[i].x)/2,
                (section.innerBorder.points[i-1].y+section.innerBorder.points[i].y)/2,
            ))
        }
    }

    randomizePoint(point, iteration = 0) {
        const points = [
            [point.x, point.y], // Ensures our point is at index 0 to easily find it
            ...this.allPoints().map(p => p.asArray()) // Any duplicates will be ignored
        ]

        point.x = point.x + (0.5 - Math.random()) * 50 * (Math.pow(1/2, iteration) )
        point.y = point.y + (0.5 - Math.random()) * 50 * (Math.pow(1/2, iteration) )

        return;

        // const delaunay = Delaunator.from(points);
        // let triangles = delaunay.triangles
        // let connectedTriangles = []
        // let notConnectedTriangles = []

        // for (let i = 0; i < triangles.length; i += 3) {
        //     let pi0 = triangles[i];
        //     let pi1 = triangles[i+1];
        //     let pi2 = triangles[i+2];

        //     if([pi0,pi1,pi2].includes(0)) {
        //         connectedTriangles.push([
        //             // Build area
        //             points[pi0],
        //             points[pi1],
        //             points[pi2]
        //         ]);
        //     } else {
        //         notConnectedTriangles.push([
        //             // Build area
        //             points[pi0],
        //             points[pi1],
        //             points[pi2]
        //         ]);                
        //     }
        // }

        // let selectedTriangleIndex = Math.floor(Math.random() * connectedTriangles.length);
        // let selectedTriangle = connectedTriangles[selectedTriangleIndex];
        
        // // Triangels might overlap with other sections!
        // // Need to perform buffer and clip forbidden areas
        // // CLIPPING
        // //https://github.com/mfogel/polygon-clipping#readme
        // // BUFFER
        // //http://bjornharrtell.github.io/jsts/
        
        // let newPoint;

        // try {
        //     newPoint = new Point(
        //         (selectedTriangle[0][0]+selectedTriangle[1][0]+selectedTriangle[2][0])/3,
        //         (selectedTriangle[0][1]+selectedTriangle[1][1]+selectedTriangle[2][1])/3,
        //     )

        //     this.connectedTriangles = connectedTriangles.map(t => {
        //         return new Line(
        //             t.map(p => new Point(p[0], p[1]))
        //         );
        //     });
            
        //     point.x = newPoint.x
        //     point.y = newPoint.y
        // } catch {
        //     this.connectedTriangles = notConnectedTriangles.map(t => {
        //         return new Line(
        //             t.map(p => new Point(p[0], p[1]))
        //         );
        //     });             
        // }

    }

    allPoints() {
        return [
            ...this.tile.backgroundHexagon.asPoints(),
            ...this.tile.sections.flatMap(s => s.asLine().asPoints())
        ]
    }   
}