import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-pie',
    templateUrl: './pie.component.html',
    styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
    dataPath = '../assets/boston-housing.csv'

    ngOnInit(): void {
        const width: number = 1000, height: number = 500, margin: number = 30;
        let circles: any, xScale: any, yScale: any;
        let svg = d3.select('#chart')
            .append('svg')
            .attr('width', `${width}px`)
            .attr('height', `${height}px`);

        // svg.append('rect')
        //     .attr('x', 100)
        //     .attr('y', 100)
        //     .attr('width', 10)
        //     .attr('height', 10);
        //
        // svg.append('circle')
        //     .attr('cx', 200)
        //     .attr('cy', 100)
        //     .attr('r', 5);
        //
        // svg.append('line')
        //     .attr('x1', 300)
        //     .attr('y1', 100)
        //     .attr('x2', 400)
        //     .attr('y2', 200)
        //     .attr('stroke', '#000000');

        d3.csv(this.dataPath).then((data) => {
            // console.log(data);

            data = data.sort((a: any, b: any) => a['charles'] - b['charles'])

            let xMinMax: any[] = d3.extent(data, (d => parseFloat(d['poor'])));
            let yMinMax: any[] = d3.extent(data, (d => parseFloat(d['rooms'])));
            let rMinMax: any[] = d3.extent(data, (d => parseFloat(d['value'])));

            xScale = d3.scaleLinear()
                .domain(xMinMax)
                .range([margin, width - margin]);

            yScale = d3.scaleLinear()
                .domain([yMinMax[1], yMinMax[0]])
                .range([margin, height - margin]);

            let rScale = d3.scaleLinear()
                .domain(rMinMax)
                .range([2, 10]);

            let cScale = d3.scaleOrdinal([0, 1], ['#333333', 'steelblue']);

            circles = svg.selectAll('.dot')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'dot')
                .style('stroke', 'black')
                .style('stroke-width', 1)
                .attr('cx', (d: any) => xScale(d.poor))
                .attr('cy', (d: any) => yScale(d.rooms))
                .attr('r', (d: any) => rScale(d.value))
                .attr('fill', (d: any) => cScale(d.charles))
                .style('opacity', (d: any) => d.charles == 1 ? 1 : 0.3)
        })
    }

}
