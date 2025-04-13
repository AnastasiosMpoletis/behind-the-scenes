import { useState } from 'react';
import { log } from './log.js';

import Header from './components/Header.jsx';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';
import Counter from './components/Counter/Counter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        {/**
         * In our case, key is a perfect practise to use when we set a new chosenCount and we want a new Counter component to be created.
         * Could be done with {@link Counter} useEffect that is commented out, but key is much better.
         */}
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
