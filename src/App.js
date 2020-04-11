import React from 'react';
import Palette from './components/Palette/Palette';
import seedPalettes from './seeds/seedPalettes';
import { generatePalette } from './colorHelpers';

function App() {
    console.log(generatePalette(seedPalettes[4]));
    return (
        <div className="App">
            <Palette {...seedPalettes[4]} />
        </div>
    );
}

export default App;
