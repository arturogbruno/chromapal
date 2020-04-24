import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import styles from './NavbarStyles';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            format: "hex",
            open: false
        }

        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true }, () => this.props.handleChange(this.state.format));
    }

    closeSnackbar() {
        this.setState({ open: false });
    }

    render() {
        const {showSlider, level, changeLevel, classes} = this.props;
        const {format, open} = this.state;
        return(
            <header className={classes.Navbar}>
                <div className={classes.logo}><Link to="/"><span role="img" aria-label="palette icon">🎨</span> ChromaPal</Link></div>
                {showSlider && (
                    <div className={classes.sliderContainer}>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider defaultValue={level} min={100} max={900} step={100} onChange={changeLevel} />
                        </div>
                    </div>
                )}
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}} 
                    open={open} 
                    autoHideDuration={2500} 
                    message={<span id="message-id">Format changed to {format.toUpperCase()}</span>} 
                    ContentProps={{"aria-describedby": "message-id"}}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton 
                            onClick={this.closeSnackbar} 
                            color="inherit" 
                            key="close" 
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    ]} 
                />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);