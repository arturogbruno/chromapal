import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from "@material-ui/core/Avatar";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import MiniPalette from '../MiniPalette/MiniPalette';

import styles from './PaletteListStyles';

class PaletteList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openDeleteDialog: false,
            deletingId: "",
            deletingName: ""
        };

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }

    openDialog(id, name) {
        this.setState({ openDeleteDialog: true, deletingId: id, deletingName: name });
    }

    closeDialog() {
        this.setState({ openDeleteDialog: false, deletingId: "", deletingName: "" });
    }

    handleDelete() {
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const {openDeleteDialog, deletingName} = this.state;
        const {palettes, classes, restoreDefaultPalettes} = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                    <header className={classes.header}>
                        <h1 className={classes.heading}>ChromaPal</h1>
                        <Link to="/palette/new"><Button variant="contained" color="secondary">Create Palette</Button></Link>
                    </header>
                    {palettes.length === 0 ? (
                        <div className={classes.noPalettes}>
                            <h1>There are no palettes yet.</h1>
                            <h1><span role="img" aria-label="palette emoji">🎨</span> Start creating your own palettes or restore the default ones.</h1>
                            <Button variant="outlined" color="secondary" onClick={restoreDefaultPalettes}>Restore default palettes</Button>
                        </div>
                    ) : (
                        <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                <MiniPalette
                                    key={palette.id}
                                    id={palette.id}
                                    {...palette}
                                    goToPalette={this.goToPalette}
                                    openDialog={this.openDialog}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    )} 
                </div>
                <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
                    <DialogTitle id="delete-dialog-title">Delete <span className={classes.paleteToDelete}>{deletingName}</span> palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);