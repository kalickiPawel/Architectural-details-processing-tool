import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_coords: 0,
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/cords').then(res => {
            this.setState({
                id_coords: res.data[res.data.length - 1].id_element
            });
        }).catch((error) => {
            console.log(error)
        });
    }

    sendToServer = () => {
        let next_id = this.state.id_coords + 1;
        let request = {
            id_coords: next_id,
            x_val: this.props.xList,
            y_val: this.props.yList,
            z_val: this.props.zList,
            method: this.props.method
        }

        axios.post('http://localhost:5000/api/cords',
            request
        ).then(function (response) {
            if (window.confirm('Poprawnie wykonano obiekt!')) {
                console.log(response.data);
            }
        }).catch(function (error) {
            alert("Popraw wprowadzone dane!\n" + error);
            console.log(error);
        });

        this.setState({
            id_coords: next_id
        });

        axios.get('http://localhost:5000/api/cords').then(res => {
            this.props.addInterp(res.data[res.data.length - 1].interp);
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <button type="button" className="btn btn-success" onClick={this.sendToServer}>Interpoluj!</button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        xList: state.mouseCoords.x,
        yList: state.mouseCoords.y,
        zList: state.mouseCoords.z,
        method: state.method
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addInterp: (interp) => {
            dispatch({
                type: "ADD_INTERP",
                payload: interp
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendButton);