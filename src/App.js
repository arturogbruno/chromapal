import React from 'react';
import Palette from './components/Palette/Palette';
import seedPalettes from './seeds/seedPalettes';

function App() {
    return (
        <div className="App">
            <Palette {...seedPalettes[4]} />
        </div>
    );
}

export default App;
