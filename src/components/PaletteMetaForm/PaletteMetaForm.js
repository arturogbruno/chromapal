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
            newPaletteName: ""
        }

        this.handleChange = this.handleChange.bind(this);
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

    render() {
        const { newPaletteName } = this.state;
        const { formShowing, hideForm, handleSubmit } = this.props;
        return (
            <Dialog
                open={formShowing}
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new beautiful palette. Make sure it's unique!
                        </DialogContentText>
                        <Picker />
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
        );
    }
}

export default PaletteMetaForm;
