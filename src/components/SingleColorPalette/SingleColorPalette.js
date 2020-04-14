import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ColorBox from '../ColorBox/ColorBox';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './SingleColorPaletteStyles';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            format: "hex"
        }
        
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors) {
            shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy));
        }
        return shades.slice(1);
    }

    changeFormat(newFormat) {
        this.setState({ format: newFormat });
    }

    render() {
        const {id, paletteName, emoji} = this.props.palette;
        const {classes} = this.props;
        const {format} = this.state;
        const colorBoxes = this._shades.map(color => <ColorBox key={color.name} colorName={color.name} background={color[format]} showingFullPalette={false} />);
        return(
            <div className={classes.Palette}>
                <Navbar showSlider={false} handleChange={this.changeFormat} />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);