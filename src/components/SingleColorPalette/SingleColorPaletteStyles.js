export default {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    colors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        marginBottom: "-3.5px",
        display: "inline-block",
        position: "relative",
        textTransform: "uppercase",
        backgroundColor: "#000",
        "& a": {
            color: "#fff",
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
        }
    }
};