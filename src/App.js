import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PaletteList from './components/PaletteList/PaletteList';
import Palette from './components/Palette/Palette';
import seedPalettes from './seeds/seedPalettes';
import { generatePalette } from './colorHelpers';

class App extends Component {
    findPalette(id) {
        return seedPalettes.find(palette => palette.id === id);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={(routeProps) => <PaletteList palettes={seedPalettes} {...routeProps} />} />
                <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
                <Route exact path="/palette/:paletteId/:colorId" render={() => <h1>Single Color Page</h1>} />
            </Switch>
        );
    }
}

export default App;