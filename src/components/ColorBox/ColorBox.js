import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import './ColorBox.css';

const styles = {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        marginBottom: "-3.5px",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        "&:hover button": {
            opacity: 1
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.5 ? "#000" : "#fff"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? "#fff" : "#000"
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.5 ? "rgba(0, 0, 0, 0.6)" : "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        right: "0",
        bottom: "0",
        border: "none",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px"
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.5 ? "rgba(0, 0, 0, 0.6": "#fff",
        width: "100px",
        height: "30px",
        display: "inline-block",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        border: "none",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        textTransform: "uppercase",
        textDecoration: "none",
        lineHeight: "30px",
        cursor: "pointer",
        opacity: 0
    }
};

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
        const {colorName, background, showingFullPalette, moreUrl, classes} = this.props;
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ backgroundColor: background }} className={classes.ColorBox}>
                    <div style={{ backgroundColor: background }} className={`copy-overlay ${this.state.copied && "show"}`} />
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1 className={classes.copyText}>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{colorName}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}><span className={classes.seeMore}>More</span></Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);