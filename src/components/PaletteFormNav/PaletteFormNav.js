import React, { Component } from 'react';
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import QueueIcon from '@material-ui/icons/Queue';
import Button from "@material-ui/core/Button";
import PaletteMetaForm from '../PaletteMetaForm/PaletteMetaForm';

import styles from './PaletteFormNavStyles';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formShowing: false
        }

        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    showForm() {
        this.setState({ formShowing: true });
    }

    hideForm() {
        this.setState({ formShowing: false });
    }

    render() {
        const {formShowing} = this.state;
        const { classes, open, palettes, handleDrawerOpen, handleSubmit } = this.props;
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
                            onClick={handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <QueueIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create a new palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/">
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                            >
                                Go back
                            </Button>
                        </Link>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={this.showForm}
                        >
                            Save
                        </Button>
                    </div>
                </AppBar>
                {formShowing && (
                    <PaletteMetaForm
                        palettes={palettes}
                        hideForm={this.hideForm}
                        handleSubmit={handleSubmit}
                    />
                )} 
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);