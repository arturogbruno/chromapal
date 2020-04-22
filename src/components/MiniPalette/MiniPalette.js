import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './MiniPaletteStyles';

class MiniPalette extends Component {
    constructor(props) {
        super(props);

        this.deletePalette = this.deletePalette.bind(this);
    }

    deletePalette(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id, this.props.paletteName);
    }

    render() {
        const {classes, paletteName, emoji, colors, handleClick} = this.props;
        const miniColorBoxes = colors.map(color => <div key={color.name} className={classes.miniColor} style={{backgroundColor: color.color}} />);

        return ( 
            <div className={classes.root} onClick={handleClick}>
                <DeleteIcon className={classes.deleteIcon} onClick={this.deletePalette} />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);