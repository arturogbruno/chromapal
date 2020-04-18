import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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
                        <h1>ChromaPal</h1>
                        <Link to="/palette/new"><Button variant="contained" color="secondary">Create Palette</Button></Link>
                    </header>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                            <MiniPalette
                                key={palette.id}
                                id={palette.id}
                                {...palette}
                                handleClick={() => this.goToPalette(palette.id)}
                                handleDelete={deletePalette}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);