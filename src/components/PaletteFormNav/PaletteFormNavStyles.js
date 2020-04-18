import { DRAWER_WIDTH, APPBAR_HEIGHT} from '../../constants';
const drawerWidth = DRAWER_WIDTH;
const appBarHeight = APPBAR_HEIGHT;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        height: appBarHeight,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    navBtns: {
        marginRight: "2rem",
        "& a": {
            textDecoration: "none"
        }
    },
    button: {
        margin: "0 0.5rem",
    }
});

export default styles;