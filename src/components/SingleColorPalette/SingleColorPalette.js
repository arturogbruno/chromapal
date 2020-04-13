import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import ColorBox from '../ColorBox/ColorBox';
import PaletteFooter from '../PaletteFooter/PaletteFooter';

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
        const {paletteName, emoji} = this.props.palette;
        const {format} = this.state;
        const colorBoxes = this._shades.map(color => <ColorBox key={color.id} colorName={color.name} background={color[format]} showLink={false} />);
        return(
            <div className="Palette">
                <Navbar showSlider={false} handleChange={this.changeFormat} />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default SingleColorPalette;