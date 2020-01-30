import React from "react";
import { InputFrontImage } from "./InputFrontImage";
import { connect } from 'react-redux';

class InputXYPoints extends React.Component {

    onMouseClick = (e) => {
        if (!this.props.xList.includes(e.nativeEvent.offsetX)) {
            this.props.addX(e.nativeEvent.offsetX);
            this.props.addY(e.nativeEvent.offsetY);
        }
        else {
            alert("X musi być róznowartosciowy!");
        }
    }

    render() {
        let points = [];
        for (let i = 0; i < this.props.xList.length; i++) {
            points.push({ x: this.props.xList[i], y: this.props.yList[i] });
        }
        return (
            <div className="container">
                <InputFrontImage dots={points} onMouseClick={this.onMouseClick.bind(this)} clearPoints={this.clearPoints} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        xList: state.mouseCoords.x,
        yList: state.mouseCoords.y,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addX: (x_value) => {
            dispatch({
                type: "ADD_X",
                payload: x_value,
            })
        },
        addY: (y_value) => {
            dispatch({
                type: "ADD_Y",
                payload: y_value
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputXYPoints);