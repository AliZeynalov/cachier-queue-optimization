import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [client, setClient] = useState<number>(0);
  const [cashierLines, setCashierLines] = useState<number[][]>([
    [4,8], [3, 10], [2], [3], [1]
  ])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCashierLines(previus => previus.map((line) => [line[0]-1, ...line.slice(1)].filter((value) => value > 0)))
    }, 2000);

    return () => clearInterval(intervalId);
  }, [])

  const addPersonToLine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lengthOfLines = cashierLines.length;
   
    let lineIndexWithMinimumItems = 0;
    if (!lengthOfLines) {
      return;
    }
    let currentMinimum = cashierLines[0]?.reduce((acc, current) => acc+current, 0);
    if (lengthOfLines === 1) {
      return 0;
    }

    for (let i=1; i < lengthOfLines; i++) {
      const sumOfItemInLine = cashierLines[i].reduce((acc, current) => acc+current, 0);
      if (sumOfItemInLine < currentMinimum) {
        currentMinimum = sumOfItemInLine;
        lineIndexWithMinimumItems = i;
      }
    }
    const newCashierLines = cashierLines.map((line, i) => {
      if(i === lineIndexWithMinimumItems) {
        return [...line, client]
      }
      return line;
    })
    setCashierLines(newCashierLines);
  };

  return (
    <div className="App">
      <form onSubmit={addPersonToLine}>
        <input required type="number" value={client} onChange={(e) => setClient(e.currentTarget.valueAsNumber)} />
        <button type="submit">Checkout</button>
      </form>

     <div className="cashiers">
       {cashierLines.map((cashier, index) => {
        return <div className="cashierLine" key={index}> 
          {cashier.map((customerWithItems) => {
            return <div >{customerWithItems}</div>;
          })}
        </div>
      })}
     </div>
     
    </div>
  );
}

export default App;
