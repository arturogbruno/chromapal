import sizes from '../../sizes';
import bg from '../../bg.svg';

export default {
    "@global": {
        ".fade-exit": {
            opacity: "1"
        },
        ".fade-exit-active": {
            opacity: "0",
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        backgroundColor: "rgb(91, 0, 184)",
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${bg})`,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "auto",
        boxSizing: "border-box"
    },
    container: {
        width: "50%",
        marginBottom: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "80%"
        },
        [sizes.down("xs")]: {
            width: "75%"
        }
    },
    header: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        "& a": {
            color: "#fff",
            textDecoration: "none"
        }
    },
    heading: {
        fontSize: "2rem"
    },
    noPalettes: {
        color: "#e4e4e4",
        width: "100%",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& h1": {
            margin: "0.5rem 0"
        },
        "& button": {
            marginTop: "2rem"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",
        justifyContent: "space-between",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
            justifyContent: "space-around",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1.4rem"
        }
    },
    paleteToDelete: {
        fontStyle: "italic"
    }
}