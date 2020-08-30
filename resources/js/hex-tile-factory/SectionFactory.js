import { Polygon } from './Polygon'
import { Line } from './Line'
import { Point } from './Point';
import { Section } from './Section';

export class SectionFactory {
    static make(encoded)
    {
        // Assume sections does not intersect array end-to-start

        let sides = encoded.split('').map(str => parseInt(str))
        let sections = []
        let currentType = sides[0]
        let currentStart = 0

        for(let i = 0; i < 6; i++) {
            if(sides[i] !== currentType) {
                sections.push(
                    new Section({type: currentType, start: currentStart, end: i})
                )
                currentType = sides[i]
                currentStart = i
            }

            if(i == 5) {
                sections.push(
                    new Section({type: currentType, start: currentStart, end: 6})
                )
            }
        }

        return sections;
    }
}