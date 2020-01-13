import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import axios from 'axios';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class InterpChart extends Component {

    state = {
        elements: []
    }

    componentDidMount() {
        this.interval = setInterval(() =>
            axios.get('http://localhost:5000/api/cords').then(res => {
                const elements = res.data;
                this.setState({ elements });
            }).catch((error) => {
                console.log(error)
            }), 1000);
    }

    render() {
        const dataLen = this.state.elements.length;
        const options = {
            theme: "light2",
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Result of Interpolation",
                fontSize: 20
            },
            axisX: {
                gridLines: {
                    display: false
                }
            },
            axisY: {
                gridThickness: 0,
            },
            data: [{
                type: "line",
                markerSize: 0,
                toolTipContent: "<b>X value: </b>{x}<br/><b>Y value: </b>{y}",
                dataPoints: this.state.elements.map((element) => element.interp.map(point => point)
                )[dataLen - 1],
            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default InterpChart;