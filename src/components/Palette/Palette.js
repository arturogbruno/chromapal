import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import ColorBox from '../ColorBox/ColorBox';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import './Palette.css';

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
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(color => <ColorBox key={color.id} background={color[format]} colorName={color.name} showLink={true} moreUrl={`/palette/${id}/${color.id}`} />)
        return(
            <div className="Palette">
                <Navbar showSlider={true} level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default Palette;