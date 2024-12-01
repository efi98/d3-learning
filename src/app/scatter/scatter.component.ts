import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-scatter',
    templateUrl: './scatter.component.html',
    styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
    dataPath = '../assets/boston-housing.csv'

    ngOnInit(): void {
        const margin = {top: 30, right: 30, bottom: 30, left: 30}, width: number = 1000 - margin.right - margin.left,
            height: number = 500 - margin.top - margin.bottom;
        let circles: any, xScale: any, yScale: any;
        let svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        /*         // draw line, rectangle and circle
                        svg.append('rect')
                            .attr('x', 100)
                            .attr('y', 100)
                            .attr('width', 10)
                            .attr('height', 10)
                            .attr('fill', 'green');

                        svg.append('circle')
                            .attr('cx', 200)
                            .attr('cy', 100)
                            .attr('r', 5)
                            .attr('fill', 'red');

                        svg.append('line')
                            .attr('x1', 300)
                            .attr('y1', 100)
                            .attr('x2', 400)
                            .attr('y2', 200)
                            .attr('stroke', '#b609c1');*/

        d3.csv(this.dataPath).then((data) => {
            console.log(data);

            data = data.sort((a: any, b: any) => a['charles'] - b['charles'])

            let xMinMax: any[] = d3.extent(data, (d => parseFloat(d['poor'])));
            let yMinMax: any[] = d3.extent(data, (d => parseFloat(d['rooms'])));
            let rMinMax: any[] = d3.extent(data, (d => parseFloat(d['value'])));

            xScale = d3.scaleLinear()
                .domain(xMinMax)
                .range([0, width]);

            yScale = d3.scaleLinear()
                .range([0, height])
                .domain([yMinMax[1], yMinMax[0]])
                .nice();

            let rScale = d3.scaleLinear()
                .domain(rMinMax)
                .range([2, 10]);

            let cScale = d3.scaleOrdinal([0, 1], ['#333333', 'steelblue']);

            svg.append('g').call(d3.axisLeft(yScale));
            svg.append('g')
                .attr('transform', `translate(${0},${height})`)
                .call(d3.axisBottom(xScale))
                .selectAll('text');

            let circle = svg.selectAll('.dot')
                .data(data)
                .enter()
                .append('g');

            circle.append('circle')
                .attr('class', 'dot')
                .style('stroke', 'white')
                .style('stroke-width', 0.5)
                .attr('cx', (d: any) => xScale(d.poor))
                .attr('cy', (d: any) => yScale(d.rooms))
                .attr('r', (d: any) => rScale(d.value))
                .attr('fill', (d: any) => cScale(d.charles))
                .style('opacity', 0.5)
                .style('r', (d: any) => rScale(0))
                .transition().duration(1000)
                .style('r', (d: any) => rScale(d.value))
            ;
        })
    }

}
