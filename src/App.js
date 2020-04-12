import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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
                <Route exact path="/" render={() => <h1>Palette list goes here</h1>} />
                <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
            </Switch>
        );
    }
}

export default App;