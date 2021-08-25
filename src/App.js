import React, {useRef, useState} from 'react';
import './App.css';

const KEY_MAP = ['e', 'E', '+', '-'];

function App() {
  const minimum = useRef(null);
  const maximum = useRef(null);

  const [solution, setSolution] = useState(null);

  const calculateFizzBuzz = () => {
    const min = +minimum.current.value;
    const max = +maximum.current.value;

    const sol = [];

    for (let i = min; i <= max; i += 1) {
      if (i % 15 === 0) {
        sol.push('FizzBuzz');
      } else if (i % 3 === 0) {
        sol.push('Fizz');
      } else if (i % 5 === 0) {
        sol.push('Buzz');
      } else {
        sol.push('' + i);
      }
    }

    setSolution(sol.join(', '));
  };

  const allowOnlyNumbers = e => {
    if (KEY_MAP.includes(e.key)) {
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    if (solution) {
      console.log(solution);
    }
  }, [solution]);

  return (
    <>
      {!solution ? (<>
        <label htmlFor="minimum">Minimum range:</label>
        <input
          type="number"
          id="minimun"
          defaultValue={1}
          min={0}
          ref={minimum}
          onKeyDown={allowOnlyNumbers}
        />
        <br />
        <label htmlFor="maximum">Maximum range:</label>
        <input
          type="number"
          id="maximum"
          defaultValue={100}
          ref={maximum}
          min={10}
          onKeyDown={allowOnlyNumbers}
        />
        <br />
        <button type="button" onClick={calculateFizzBuzz}>FizzBuzz!</button>
      </>) : (<>
        <label>{solution}</label>
        <br />
        <button type="button" onClick={() => {
          setSolution(null);
        }}>Play again!</button>
      </>)}
    </>
  );
}

export default App;
