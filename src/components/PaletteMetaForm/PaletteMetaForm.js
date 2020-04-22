import React, { Component } from "react";
import { Picker } from 'emoji-mart';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stage: "form",
            newPaletteName: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }
    
    componentDidMount() {
        ValidatorForm.addValidationRule("paletteNameUnique", (value) =>
            this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    showEmojiPicker() {
        this.setState({ stage: "emoji" });
    }

    savePalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette);
        this.setState({ stage: "" });
    }

    render() {
        const { stage, newPaletteName } = this.state;
        const { hideForm } = this.props;
        return (
            <div>
                <Dialog
                    open={stage === "emoji"}
                    onClose={hideForm}
                >
                    <DialogTitle id="form-dialog-title">Choose a palette emoji</DialogTitle>
                    <Picker title="ChromaPal" onSelect={this.savePalette} />
                </Dialog>
                <Dialog
                    open={stage === "form"}
                    onClose={hideForm}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new beautiful palette. Make sure it's unique!
                            </DialogContentText>
                            <TextValidator
                                name="newPaletteName"
                                label="Palette name"
                                fullWidth
                                margin="normal"
                                value={newPaletteName}
                                onChange={this.handleChange}
                                validators={["required", "paletteNameUnique"]}
                                errorMessages={[
                                    "Enter palette name",
                                    "Name already used",
                                ]}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;
