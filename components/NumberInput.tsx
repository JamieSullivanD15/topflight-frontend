import React, {ChangeEvent, ChangeEventHandler} from 'react';
import elementStyles from '../styles/Elements.module.scss';

type Props = {
  name: string;
  label: string;
  minValue: number;
  maxValue: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const NumberInput = ({ name, label, minValue, maxValue, onChange }: Props) => (
  <div>
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
      className={elementStyles.input}
    />
  </div>
);

export default NumberInput;
