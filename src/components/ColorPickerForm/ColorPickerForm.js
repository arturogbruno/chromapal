import React, { Component } from 'react';
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentColor: "#44877E",
            newColorName: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("colorNameUnique", (value) =>
            this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule("colorUnique", () =>
            this.props.colors.every(({ color }) => color !== this.state.currentColor)
        );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName,
        };
        this.props.addNewColor(newColor);
        this.setState({ newColorName: "" });
    }

    render() {
        const { currentColor, newColorName } = this.state;
        const { paletteIsFull } = this.props;
        return(
            <div className="ColorPickerForm">
                <ChromePicker
                    color={currentColor}
                    onChange={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        name="newColorName"
                        value={newColorName}
                        onChange={this.handleChange}
                        validators={[
                            "required",
                            "colorNameUnique",
                            "colorUnique",
                        ]}
                        errorMessages={[
                            "Enter a color name",
                            "Color name must be unique",
                            "Color already used",
                        ]}
                    />
                    <Button
                        type="submit"
                        disabled={paletteIsFull}
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: paletteIsFull ? "#e4e4e4" : currentColor }}
                    >
                        {paletteIsFull ? "Palette full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default ColorPickerForm;