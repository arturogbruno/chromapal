import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import ColorBox from '../ColorBox/ColorBox';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import { withStyles } from '@material-ui/styles';
import './Palette.css';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    colors: {
        height: "90%"
    }
};

class Palette extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: 500,
            format: "hex"
        }

        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel });
    }

    changeFormat(newFormat) {
        this.setState({ format: newFormat });
    }

    render() {
        const {colors, id, paletteName, emoji} = this.props.palette;
        const {classes} = this.props;
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(color => <ColorBox key={color.id} background={color[format]} colorName={color.name} showingFullPalette={true} moreUrl={`/palette/${id}/${color.id}`} />)
        return(
            <div className={classes.Palette}>
                <Navbar showSlider={true} level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);