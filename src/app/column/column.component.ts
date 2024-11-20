import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
    dataPath = '../assets/person.csv'
    slider = {
        value: 0,
        min: 0,
        max: 100
    };
    data: any;
    private svg: any;
    private xScale: any;
    private yScale: any;
    private height!: number;

    ngOnInit(): void {
        const margin = {top: 30, right: 30, bottom: 50, left: 30}, width: number = 960 - margin.right - margin.left,
            height: number = 500 - margin.top - margin.bottom;

        const formatData = (data: any) => {
            data.age = +data.age;
            data.children = +data.children;
            data.credit = +data.credit;
            data.male = +data.male;
            return data;
        }

        this.svg = d3.select('#chart').append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        this.xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.1);


        this.yScale = d3.scaleLinear()
            .range([height, 0]);
        let svg = this.svg;
        let xScale = this.xScale;
        let yScale = this.yScale;

        d3.csv(this.dataPath, formatData).then((data) => {
            this.data = data;
            let maxValue = d3.max(data, d => d.age);
            this.slider.max = maxValue;

            xScale.domain(data.map(d => d.name));
            yScale.domain([0, maxValue])
                .nice();

            svg.append('g').call(d3.axisLeft(yScale));
            svg.append('g')
                .attr('transform', `translate(${0},${height})`)
                .call(d3.axisBottom(xScale))
                .selectAll('text')
                .attr('x', xScale.bandwidth() / 2)
                .attr('y', 0)
                .attr('dy', '0.35em')
                .attr('transform', `rotate(90)`)
                .attr('text-anchor', `start`);

            this.createBars(data, svg, xScale, yScale, height);

            console.log(data);
        }).catch((error) => {
            throw error;
        });
    }

    createBars(data: d3.DSVParsedArray<any>,
              svg: any,
              x: d3.ScaleBand<string>,
              y: d3.ScaleLinear<number, number, never>,
              height: number) {
        svg.selectAll('.bar-group')
            .data(data, (d: any) => d.name)
            .join(
                (enter: any) => {
                    let bar = enter.append('g')
                        .attr('class', `bar-group`)
                        .style('opacity', 1);

                    bar.append('rect')
                        .attr('class', 'bar')
                        .attr('x', ((d: any) => x(d.name) as any))
                        .attr('y', ((d: any) => y(0)))
                        .attr('width', x.bandwidth())
                        .attr('height', 0)
                        .style('fill', 'steelblue')
                        .transition().duration(750)
                        .attr('y', (d: any) => y(d.age))
                        .attr('height', (d: any) => height - y(d.age));

                    bar.append('text')
                        .text((d: any) => d.age)
                        .attr('x', ((d: any) => x(d.name) as any + (x.bandwidth() / 2)))
                        .attr('y', ((d: any) => y(d.age) - 5))
                        .attr('text-anchor', 'middle')
                        .style('font-family', 'sans-serif')
                        .style('font-size', 10)
                        .style('opacity', 0)
                        .transition().duration(1500)
                        .style('opacity', 1);
                },
                (update: any) => {
                    update.transition().duration(750)
                        .style('opacity', 1)
                },
                (exit: any) => {
                    exit.transition().duration(750)
                        .style('opacity', 0.15)
                }
            )
    }

    onSliderChange() {
        let filteredData = this.data.filter((d: any) => d.age >= this.slider.value);
        this.createBars(filteredData, this.svg, this.xScale, this.yScale, this.height)
        console.log('filteredData', filteredData);
        // const currentSliderVal = (event.target as HTMLInputElement).value;
        // console.log('Slider value changed to:', currentSliderVal);
    }
}
