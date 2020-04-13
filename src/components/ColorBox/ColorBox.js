import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            copied: false
        }

        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => setTimeout(() => this.setState({ copied: false }), 1500));
    }

    render() {
        const {colorName, background, showLink, moreUrl} = this.props;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.4;
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ backgroundColor: background }} className="ColorBox">
                    <div style={{ backgroundColor: background }} className={`copy-overlay ${this.state.copied && "show"}`} />
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1 className={isLightColor ? "dark-text" : undefined}>Copied!</h1>
                        <p className={isLightColor ? "dark-text" : undefined}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarkColor ? "light-text" : undefined}>{colorName}</span>
                        </div>
                        <button className={`copy-button ${isLightColor ? "dark-text" : undefined}`}>Copy</button>
                    </div>
                    {showLink && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}><span className={`see-more ${isLightColor ? "dark-text" : undefined}`}>More</span></Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;