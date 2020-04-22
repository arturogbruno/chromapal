import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './MiniPaletteStyles';

class MiniPalette extends PureComponent {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.deletePalette = this.deletePalette.bind(this);
    }

    handleClick() {
        this.props.goToPalette(this.props.id);
    }

    deletePalette(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id, this.props.paletteName);
    }

    render() {
        const {classes, paletteName, emoji, colors} = this.props;
        const miniColorBoxes = colors.map(color => <div key={color.name} className={classes.miniColor} style={{backgroundColor: color.color}} />);

        return ( 
            <div className={classes.root} onClick={this.handleClick}>
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