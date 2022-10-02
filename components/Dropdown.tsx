import React, {ChangeEvent, ChangeEventHandler} from 'react';

type Props = {
  name: string;
  label: string;
  options: Array<string>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

const Dropdown = ({ name, label, options, onChange }: Props) => (
  <div>
    <label htmlFor={name}>
      { label }
    </label>
    <select name={name} onChange={onChange} defaultValue=''>
      <option value='' disabled>Choose city</option>
      {
        options.map(option => (
          <option value={option} key={option}>{ option }</option>
        ))
      }
    </select>
  </div>
);

export default Dropdown;
