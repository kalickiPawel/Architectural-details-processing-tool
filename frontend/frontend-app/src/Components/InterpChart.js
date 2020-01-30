import React from "react";
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';

class InterpChart extends React.Component {

    render() {
        return (
            <div className="container pl-0">
                <Plot
                    data={[
                        {
                            x: this.props.xList.map((element) => element),
                            y: this.props.yList.map((element) => element),
                            z: this.props.zList.map((element) => element),
                            type: 'mesh3d',
                        },
                    ]}
                    layout={{ width: 400, height: 500, title: 'Przetworzony model 3D' }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        xList: state.interpCoords.x,
        yList: state.interpCoords.y,
        zList: state.interpCoords.z,
        method: state.method
    }
}

export default connect(mapStateToProps)(InterpChart);