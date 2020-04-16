import React, { Component } from 'react';
import classNames from "classnames";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

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
            <div className="PaletteFormNav">
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
                            Persistent drawer
                        </Typography>
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
                                <Button variant="contained" color="secondary">Go back</Button>
                            </Link>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save palette
                            </Button>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default PaletteFormNav;