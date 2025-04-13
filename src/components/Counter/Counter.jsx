import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

/**
 * memo prevents external changes if no props are changed.
 * We should use it as high up as possible and not in every tree leaf.
 * Furthermore, memo checks props and this costs if done in a lot of components or for functions that change props frequently.
 * 
 * AFTER CREATING ConfigureCounter, MEMO IS USELESS HERE. We keep it just for reference.
 */
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  /**
   * useMemo is wrapped around normal functions that are executed in component functions to prevent their execution.
   * Just like memo, useMemo should be used for functions with complex functionality and not in every function.
   */
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  // const [counter, setCounter] = useState(initialCount);
  /**
   * Using key={index} ({@link CounterHistory}) is not recommended. 
   * It is better to use a unique key for every element in order to bind the functionality to the same element, 
   *   not the element that happens to be placed in the same position.
   */
  const [counterChanges, setCounterChanges] = useState([{
    id: Math.random() * 1000,
    value: initialCount
  }]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
      {
        id: Math.random() * 1000,
        value: -1
      },
      ...prevCounterChanges
    ]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [
      {
        id: Math.random() * 1000,
        value: 1
      },
      ...prevCounterChanges
    ]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;