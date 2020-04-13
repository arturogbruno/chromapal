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
            opacity: "1"
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
        opacity: "0"
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0",
        bottom: "0",
        padding: "10px",
        color: "#000",
        letterSpacing: "1px",
        fontSize: "12px",
    },
    copyOverlay: {
        width: "100%",
        height: "100%",
        opacity: "0",
        zIndex: "0",
        transform: "scale(0)",
        transition: "transform 0.6s ease-in-out"
    },
    showOverlay: {
        position: "absolute",
        opacity: "1",
        zIndex: "10",
        transform: "scale(50)"
    },
    copyMessage: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4rem",
        color: "#fff",
        opacity: "0",
        transform: "scale(0)",
        "& h1": {
            width: "100%",
            fontWeight: "400",
            textShadow: "1px #000",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            marginBottom: "0",
            padding: "1rem"
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "200",
            textTransform: "lowercase"
        }
    },
    showMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "20",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s"
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
        const {copied} = this.state;
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ backgroundColor: background }} className={classes.ColorBox}>
                    <div style={{ backgroundColor: background }} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} />
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                        <h1 className={classes.copyText}>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
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