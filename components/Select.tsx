import React, {ChangeEvent, ChangeEventHandler} from 'react';
import elementStyles from '../styles/Elements.module.scss';

type Props = {
  name: string;
  label: string;
  options: Array<string>;
  defaultOption?: string;
  onChange: ChangeEventHandler<HTMLElement>;
};

const Select = ({ name, label, options, defaultOption, onChange }: Props) => (
  <div>
    <label htmlFor={name}>
      { label }
    </label>
    <select name={name} onChange={onChange} defaultValue='' className={elementStyles.select}>
      {
        defaultOption && <option value='' disabled>{ defaultOption }</option>
      }
      {
        options.map(option => (
          <option value={option} key={option}>{ option }</option>
        ))
      }
    </select>
  </div>
);

export default Select;
