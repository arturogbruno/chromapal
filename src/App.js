import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { generatePalette } from './colorHelpers';
import seedPalettes from './seeds/seedPalettes';
import PaletteList from './components/PaletteList/PaletteList';
import Palette from './components/Palette/Palette';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

        this.state = {
            palettes: savedPalettes || seedPalettes
        }

        this.findPalette = this.findPalette.bind(this);
        this.savePalette = this.savePalette.bind(this);
        this.deletePalette = this.deletePalette.bind(this);
    }

    findPalette(id) {
        return this.state.palettes.find(palette => palette.id === id);
    }

    savePalette(newPalette) {
        this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
    }

    syncLocalStorage() {
        window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
    }

    deletePalette(id) {
        this.setState(st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }), this.syncLocalStorage);
    }

    render() {
        return (
            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={500}>
                        <Switch location={location}>
                            <Route
                                exact
                                path="/"
                                render={routeProps => (
                                    <div className="page">
                                        <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} /> 
                                    </div>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/new"
                                render={routeProps => (
                                    <div className="page">
                                        <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
                                    </div>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:id"
                                render={routeProps => (
                                    <div className="page">
                                        <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                                    </div>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:paletteId/:colorId"
                                render={routeProps => (
                                    <div className="page">
                                        <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId} />
                                    </div>
                                )}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />
        );
    }
}

export default App;