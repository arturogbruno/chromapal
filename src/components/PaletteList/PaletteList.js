import React, { Component } from 'react';
import MiniPalette from '../MiniPalette/MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import styles from './PaletteListStyles';

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const {palettes, classes} = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                    <header className={classes.header}>
                        <h1>ChromaPal</h1>
                    </header>
                    <div className={classes.palettes}>
                        {palettes.map(palette => <MiniPalette key={palette.id} {...palette} handleClick={() => this.goToPalette(palette.id)} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);