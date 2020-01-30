import React from "react";
import Dot from './Dot';

export class InputFrontImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            mouseCoords: { x: [], y: [] },
            selectedFile: null,
            imagePreviewUrl: null,
            webstate: true
        };

    }

    fileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            webstate: false
        })

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(event.target.files[0])

    }

    render() {
        let $imagePreview = (
            <div className="previewText image-container">
                1. Wybierz najpierw materiał poglądowy:
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFileLang" lang="pl-Pl" onChange={this.fileChangedHandler} />
                    <label className="custom-file-label" htmlFor="customFileLang">Wybierz pliki graficzne</label>
                </div>
            </div>
        );
        if (this.state.imagePreviewUrl) {
            var sectionStyle = {
                border: "2px dotted #17a2b8",
                width: "100%",
                height: "300px",
                backgroundImage: "url(" + this.state.imagePreviewUrl + ")",
                position: "relative",
            };
            $imagePreview = (
                < div className="image-container" >
                    2. Kliknij w poniższym polu, aby dodać punkty:
                    <div style={sectionStyle} className="dot-wrapper" onKeyDown={this.onKeyDown} onClick={this.props.onMouseClick} src={this.state.imagePreviewUrl}>
                        {this.props.dots.map((dot, i) =>
                            <Dot key={i} x={dot.x} y={dot.y} />
                        )}
                    </div>
                </div >
            );
        }
        return (
            <div>
                {$imagePreview}
            </div >
        );
    }
}