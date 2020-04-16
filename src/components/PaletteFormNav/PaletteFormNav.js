import React, { Component } from 'react';
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

const appBarHeight = 64;
const drawerWidth = 400;

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
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    navBtns: {
        
    }
});

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPaletteName: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("paletteNameUnique", (value) =>
            this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { newPaletteName } = this.state;
        const { classes, open } = this.props;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create a new palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
                            <TextValidator
                                name="newPaletteName"
                                label="Palette name"
                                value={newPaletteName}
                                onChange={this.handleChange}
                                validators={["required", "paletteNameUnique"]}
                                errorMessages={[
                                    "Enter palette name",
                                    "Name already used",
                                ]}
                            />
                            <Link to="/">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                >
                                    Go back
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save palette
                            </Button>
                        </ValidatorForm>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);