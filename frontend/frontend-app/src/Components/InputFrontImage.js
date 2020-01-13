import React, { Component } from 'react';
import axios from 'axios';

class InputFrontImage extends Component {
    state = {
        elements: [],
        mouseCoords: { x: [], y: [] },
        selectedFile: null,
        imagePreviewUrl: null
    };

    fileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(event.target.files[0])

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

    submit = () => {
        const dataLen = this.state.elements.length;
        const lastID = this.state.elements.map((element) => element.id_element)[dataLen - 1];
        const listValueX = this.state.mouseCoords.x;
        const listValueY = this.state.mouseCoords.y;
        if (listValueY.length > 0 && listValueY.length > 0) {
            axios.post('http://localhost:5000/api/cords', {
                id_coords: lastID + 1,
                x_val: listValueX,
                y_val: listValueY,
                method: 'cubic'
            })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            console.log("Points not found");
        }
    }
    onMouseClick = (e) => {
        this.setState({
            mouseCoords: {
                x: this.state.mouseCoords.x.concat(e.nativeEvent.offsetX),
                y: this.state.mouseCoords.y.concat(e.nativeEvent.offsetY * -1)
            }
        });
    }

    clearPoints = () => {
        this.setState({
            mouseCoords: {
                x: [],
                y: [],
            }
        })
    }

    render() {

        let $imagePreview = (
            <div className="previewText image-container">
                Please select an Image for Preview
            </div>
        );
        if (this.state.imagePreviewUrl) {
            $imagePreview = (
                <div className="image-container" >
                    <img onKeyDown={this.onKeyDown} onClick={this.onMouseClick} src={this.state.imagePreviewUrl} alt="icon" width="100%" />
                </div>
            );
        }
        /*
        if (this.state.mouseCoords.y.length > 0)
            console.log(this.state.mouseCoords);
        */
        return (
            <div className="col-sm-4">
                <input type="file" name="avatar" onChange={this.fileChangedHandler} />
                {$imagePreview}
                <button type="button" onClick={this.submit} > Interpolate </button>
                <button type="button" onClick={this.clearPoints} > Clear Points </button>
            </div>
        );
    }
}

export default InputFrontImage;