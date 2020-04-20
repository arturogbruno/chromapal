import sizes from '../../sizes';

export default {
    Navbar: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "6vh"
    },
    logo: {
        height: "100%",
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "#eceff1",
        display: "flex",
        alignItems: "center",
        "& a": {
            textDecoration: "none",
            color: "#000"
        },
        [sizes.down("sm")]: {
            display: "none"
        }
    },
    sliderContainer: {
        [sizes.down("sm")]: {
            marginLeft: "2rem"
        }
    },
    slider: {
        width: "340px",
        margin: "0 10px",
        display: "inline-block",
        "& .rc-slider-rail": {
            height: "8px"
        },
        "& .rc-slider-track": {
            backgroundColor: "transparent"
        },
        "& .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:focus, .rc-slider-handle:active": {
            backgroundColor: "rgb(0, 128, 0)",
            outline: "none",
            border: "2px solid rgb(0, 128, 0)",
            boxShadow: "none",
            width: "13px",
            height: "13px",
            marginTop: "-3px"
        },
        [sizes.down("sm")]: {
            width: "150px"
        }
    },
    selectContainer: {
        marginLeft: "auto",
        marginRight: "2rem"
    }
};