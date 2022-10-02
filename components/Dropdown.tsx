import React, {ChangeEvent, ChangeEventHandler} from 'react';

type Props = {
  name: string;
  label: string;
  options: Array<string>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

const Dropdown = ({ name, label, options, onChange }: Props) => (
  <>
    <label htmlFor={name}>
      { label }
    </label>
    <select name={name} onChange={onChange}>
      {
        options.map(option => (
          <option value={option} key={option}>{ option }</option>
        ))
      }
    </select>
  </>
);

export default Dropdown;
