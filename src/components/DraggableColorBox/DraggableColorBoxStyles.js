import chroma from 'chroma-js';
import sizes from '../../sizes';

export default {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        marginBottom: "-5px",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        "&:hover svg": {
            color: "#fff",
            transform: "scale(1.3)"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%"
        }
    },
    boxContent: {
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        left: "0",
        bottom: "0",
        padding: "10px",
        color: props => chroma(props.color).luminance() <= 0.08 ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)",
        letterSpacing: "1px",
        fontSize: "12px",
        textTransform: "uppercase"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};