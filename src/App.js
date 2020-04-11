import React from 'react';
import Palette from './components/Palette/Palette';
import seedPalettes from './seeds/seedPalettes';
import { generatePalette } from './colorHelpers';

function App() {
    return (
        <div className="App">
            <Palette palette={generatePalette(seedPalettes[4])} />
        </div>
    );
}

export default App;
