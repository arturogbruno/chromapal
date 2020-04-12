import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Palette from './components/Palette/Palette';
import seedPalettes from './seeds/seedPalettes';

function App() {
    return (
        <Switch>
            <Route exact path="/" render={() => <h1>Palette list goes here</h1>} />
            <Route exact path="/palette/:id" render={() => <h1>Individual palette</h1>} />
        </Switch>
    );
}

export default App;
