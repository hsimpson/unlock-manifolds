import React from 'react';

export enum UnlockNumberCondition {
  Initial = 'init',
  Good = 'good',
  Bad = 'bad',
}

export interface UnlockNumberState {
  num: number;
  condition: UnlockNumberCondition;
}

export interface UnlockNumberProps extends UnlockNumberState {
  onNumberClicked: (value: number) => void;
}

export const UnlockNumber = (props: UnlockNumberProps): React.ReactElement => {
  const onNumberClicked = (): void => {
    if (props.condition === UnlockNumberCondition.Initial) {
      props.onNumberClicked(props.num);
    }
  };

  return (
    <div className={`number ${props.condition}`} onClick={onNumberClicked}>
      <span>{props.num}</span>
    </div>
  );
};
