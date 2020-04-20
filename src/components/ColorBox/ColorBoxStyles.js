import chroma from 'chroma-js';
import sizes from '../../sizes';

export default {
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
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => props.showingFullPalette ? "20%" : "33.3333%",
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => props.showingFullPalette ? "10%" : "20%",
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => props.showingFullPalette ? "5%" : "10%"
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
        right: "0px",
        bottom: "0px",
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
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "#000",
        letterSpacing: "1px",
        fontSize: "12px"
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
            padding: "1rem",
            [sizes.down("xs")]: {
                fontSize: "6rem"
            }
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