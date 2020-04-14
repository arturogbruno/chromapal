import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ColorBox from '../ColorBox/ColorBox';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import { withStyles } from '@material-ui/styles';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    colors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        marginBottom: "-3.5px",
        display: "inline-block",
        position: "relative",
        textTransform: "uppercase",
        backgroundColor: "#000",
        "& a": {
            color: "#fff",
            width: "100px",
            height: "30px",
            display: "inline-block",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            border: "none",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            textTransform: "uppercase",
            textDecoration: "none",
            lineHeight: "30px",
            cursor: "pointer",
        }
    }
};

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