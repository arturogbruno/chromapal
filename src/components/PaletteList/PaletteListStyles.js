export default {
    root: {
        backgroundColor: "darkblue",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    container: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    header: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        color: "#fff"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    }
}