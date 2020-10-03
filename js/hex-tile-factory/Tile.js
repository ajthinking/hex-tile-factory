import { HexagonFactory} from './HexagonFactory'
import { SectionFactory} from './SectionFactory'
import { Point } from './Point'
import { Line } from './Line'
import Delaunator from 'delaunator';
let jsts = require('jsts')
const _ = require('lodash')
var seedrandom = require('seedrandom');

export class Tile {    
    constructor(options) {
        this.options = options
        this.topology = options.topology
        this.iterations = Array(
            parseInt(options.iterations) ?? 3
        ).fill().map((x,i)=>i)

        this.backgroundHexagon = HexagonFactory.make()

        this.sections = [] // It is up to the strategy to create the sections

        this.states = []

        this.commit('Initial commit')

        let strategy = require('./strategies/' + options.strategy)[options.strategy]
        
        strategy.randomize(this)
    }

    hasSections() {
        return true;
    }

    isSixSided() {
        return false;
    }

    commit(message = 'Commited state') {
        this.message = message
        this.states.push(
            // Dont store the recursive states :)
            _.cloneDeep(_.omit(this, ['states']))
        )
        return this
    }

    densify(section) {
        for(let i = section.innerBorder.length() -1; i > 0; i=i-1) {   
            section.innerBorder.points.splice(i,0, new Point(
                (section.innerBorder.points[i-1].x+section.innerBorder.points[i].x)/2,
                (section.innerBorder.points[i-1].y+section.innerBorder.points[i].y)/2,
            ))
        }
    } 
}