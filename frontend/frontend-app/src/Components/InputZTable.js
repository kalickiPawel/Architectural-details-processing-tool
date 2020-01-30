import React from 'react';
import { connect } from 'react-redux';

class InputZTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onChange(event) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }
    removeOne(value) {
        this.props.removeX(value.index);
        this.props.removeY(value.index);
        this.props.removeZ(value.index);
    }

    renderTableData() {
        let points = [];
        for (let i = 0; i < this.props.xList.length; i++) {
            points.push({ x: this.props.xList[i], y: this.props.yList[i] });
        }
        this.props.addZ(this.state)
        return points.map((point, index) => {
            const { x, y } = point;
            let button;

            if (index === this.props.xList.length - 1) {
                button = <button type="button" className="btn btn-danger btn-sm" onClick={() => this.removeOne({ index })}>
                    <em>&times;</em>
                </button>;
            }
            return (
                <tr key={index}>
                    <td className="text-center">{index}</td>
                    <td className="text-center">{x}</td>
                    <td className="text-center">{y}</td>
                    <td className="text-center"><input className="form-control form-control-sm" required type="number" step="0.01" name={index} placeholder={`Z value id: ${index}`} onChange={(event) => this.onChange(event)} /></td>
                    <td className="text-center">
                        {button}
                    </td>
                </tr>
            )
        })
    }

    render() {
        let drawTable;
        if (this.props.xList.length > 0) {
            drawTable = <div>
                <span>3. Wprowadź wartości Z:</span>
                <table>
                    <thead>
                        <tr>
                            <th className="text-center">Point ID</th>
                            <th className="text-center">X Values</th>
                            <th className="text-center">Y Values</th>
                            <th className="text-center">Z Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        }
        return (
            <div className="container text-center" >
                {drawTable}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        xList: state.mouseCoords.x,
        yList: state.mouseCoords.y
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addZ: (z_value) => {
            dispatch({
                type: "ADD_Z",
                payload: z_value
            })
        },
        removeX: (id_x) => {
            dispatch({
                type: "REMOVE_X",
                payload: id_x
            })
        },
        removeY: (id_y) => {
            dispatch({
                type: "REMOVE_Y",
                payload: id_y
            })
        },
        removeZ: (id_z) => {
            dispatch({
                type: "REMOVE_Z",
                payload: id_z
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputZTable);