import React, {ChangeEvent, ChangeEventHandler} from 'react';

type Props = {
  name: string;
  label: string;
  minValue: number;
  maxValue: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const NumberInput = ({ name, label, minValue, maxValue, onChange }: Props) => (
  <>
    <label htmlFor={name}>
      { label }
    </label>
    <input
      type="number"
      name={name}
      min={minValue.toString()}
      max={maxValue.toString()}
      onChange={onChange}
      defaultValue={minValue}
    />
  </>
);

export default NumberInput;
