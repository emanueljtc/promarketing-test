import React from 'react';
import { Checkbox as FlowbiteCheckbox, Radio } from 'flowbite-react';
interface CheckboxProps {
  index?: number;
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  type?: 'checkbox' | 'radio';
}
const Checkbox = ({
  checked,
  onChange,
  title,
  index,
  type = 'checkbox',
}: CheckboxProps) => {
  if (type === 'radio') {
    return (
      <div className="flex items-center">
        <Radio
          id={`custom-radio-${index}`}
          title={title}
          checked={checked}
          onChange={() => onChange(!checked)}
          className="w-6 h-6 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`custom-radio-${index}`}
          className="ms-2 text-sm  text-neutral-500 cursor-pointer"
        >
          {title}
        </label>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <FlowbiteCheckbox
        id={`custom-checkbox-${index}`}
        title={title}
        checked={checked}
        onChange={() => onChange(!checked)}
        className="w-6 h-6 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={`custom-checkbox-${index}`}
        className="ms-2 text-sm  text-neutral-500 cursor-pointer"
      >
        {title}
      </label>
    </div>
  );
};

export default Checkbox;

