import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import seedPalettes from './seeds/seedPalettes';
import PaletteList from './components/PaletteList/PaletteList';
import Palette from './components/Palette/Palette';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';

class App extends Component {
    findPalette(id) {
        return seedPalettes.find(palette => palette.id === id);
    }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={routeProps => <PaletteList palettes={seedPalettes} {...routeProps} />} 
                />
                <Route
                    exact
                    path="/palette/:id"
                    render={routeProps => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />}
                />
                <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={routeProps => <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId} />}
                />
            </Switch>
        );
    }
}

export default App;