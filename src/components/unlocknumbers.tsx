import React, { useState } from 'react';
import { UnlockNumber, UnlockNumberCondition, UnlockNumberState } from './unlocknumber';

export const UnlockNumbers = (): React.ReactElement => {
  const createRandomArray = (): UnlockNumberState[] => {
    const numbers: UnlockNumberState[] = [];
    for (let i = 0; i < 10; i++) {
      numbers.push({
        num: i + 1,
        condition: UnlockNumberCondition.Initial,
      });
    }
    numbers.sort(() => {
      return 0.5 - Math.random();
    });
    return numbers;
  };

  const [numbersState, setNumbersState] = useState<UnlockNumberState[]>(createRandomArray());
  const [nextNumber, setNextNumber] = useState(1);

  const onNumberClicked = (val: number): void => {
    console.log(`clicked on ${val}`);

    if (val === nextNumber) {
      // correct
      setNextNumber(nextNumber + 1);
      for (const item of numbersState) {
        if (val === item.num) {
          item.condition = UnlockNumberCondition.Good;
          break;
        }
      }
      if (val === 10) {
        window.setTimeout(() => {
          if (window.confirm('Play again?')) {
            setNextNumber(1);
            setNumbersState(createRandomArray());
          }
        }, 100);
      }
    } else {
      const newArray = [...numbersState];
      for (const item of newArray) {
        setNextNumber(1);
        item.condition = UnlockNumberCondition.Bad;
      }
      setNumbersState(newArray);
      window.setTimeout(() => {
        const newInitArray = [...newArray];
        for (const item of numbersState) {
          item.condition = UnlockNumberCondition.Initial;
        }
        setNumbersState(newInitArray);
      }, 3000);
    }
  };

  return (
    <div className="numbers-container">
      <div className="numbers">
        {numbersState.map((val) => {
          return (
            <UnlockNumber
              key={val.num}
              num={val.num}
              condition={val.condition}
              onNumberClicked={onNumberClicked}></UnlockNumber>
          );
        })}
      </div>
    </div>
  );
};
