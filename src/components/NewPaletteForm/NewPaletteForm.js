import React, { Component } from "react";
import classNames from "classnames";
import arrayMove from "array-move";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import PaletteFormNav from '../PaletteFormNav/PaletteFormNav';
import DraggableColorList from "../DraggableColorList/DraggableColorList";

const appBarHeight = 64;
const drawerWidth = 400;

const styles = (theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        height: appBarHeight,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        height: `calc(100vh - ${appBarHeight}px)`,
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20,
    };

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            currentColor: "#e4e4e4",
            newColorName: "",
            colors: this.props.palettes[0].colors
        };

        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("colorNameUnique", (value) =>
            this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule("colorUnique", () =>
            this.state.colors.every(({ color }) => color !== this.state.currentColor)
        );
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    addNewColor() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName,
        };
        this.setState({
            colors: [...this.state.colors, newColor],
            newColorName: "",
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(newPaletteName) {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: this.state.colors,
        };
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }

    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(
                (color) => color.name !== colorName
            ),
        });
    }

    clearColors() {
        this.setState({ colors: [] });
    }

    addRandomColor() {
        const allColors = this.props.palettes.map((p) => p.colors).flat();
        const rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        this.setState({ colors: [...this.state.colors, randomColor] });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, currentColor, newColorName, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav 
                    open={open}
                    classes={classes}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant="h4">Design your palette</Typography>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.clearColors}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            disabled={paletteIsFull}
                            variant="contained"
                            color="primary"
                            onClick={this.addRandomColor}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ChromePicker
                        color={currentColor}
                        onChange={this.updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator
                            name="newColorName"
                            value={newColorName}
                            onChange={this.handleChange}
                            validators={[
                                "required",
                                "colorNameUnique",
                                "colorUnique",
                            ]}
                            errorMessages={[
                                "Enter a color name",
                                "Color name must be unique",
                                "Color already used",
                            ]}
                        />
                        <Button
                            type="submit"
                            disabled={paletteIsFull}
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: paletteIsFull ? "#e4e4e4" : currentColor }}
                        >
                            {paletteIsFull ? "Palette full" : "Add Color"}
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);