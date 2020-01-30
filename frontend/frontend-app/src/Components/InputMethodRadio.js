import React from "react";
import { RadioGroup, Radio } from 'react-radio-group';
import { connect } from 'react-redux';

class InputMethodRadio extends React.Component {
    render() {
        return (
            <div className="container">
                Wybierz metodę interpolacji:
                <RadioGroup className="btn-group btn-group-toggle" name="fruit" selectedValue={this.props.method} onChange={(value) => this.props.addMethod(value)}>
                    <label className={this.props.method === "linear" ? "btn btn-info active" : "btn btn-info"}>
                        <Radio value="linear" />linear
                    </label>
                    <label className={this.props.method === "cubic" ? "btn btn-info active" : "btn btn-info"}>
                        <Radio value="cubic" />cubic
                    </label>
                    <label className={this.props.method === "nearest" ? "btn btn-info active" : "btn btn-info"}>
                        <Radio value="nearest" />nearest
                    </label>
                </RadioGroup>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        method: state.method,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMethod: (method) => {
            dispatch({
                type: "ADD_METHOD",
                payload: method
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputMethodRadio);