import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MiniPalette from '../MiniPalette/MiniPalette';

import styles from './PaletteListStyles';

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const {palettes, deletePalette, classes} = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                    <header className={classes.header}>
                        <h1 className={classes.heading}>ChromaPal</h1>
                        <Link to="/palette/new"><Button variant="contained" color="secondary">Create Palette</Button></Link>
                    </header>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                <MiniPalette
                                    key={palette.id}
                                    id={palette.id}
                                    {...palette}
                                    handleClick={() => this.goToPalette(palette.id)}
                                    handleDelete={deletePalette}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);