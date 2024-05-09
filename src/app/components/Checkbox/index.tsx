import React from 'react';

interface CheckboxProps {
  index: number;
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
const Checkbox = ({ checked, onChange, title, index }: CheckboxProps) => {
  return (
    <>
      <input
        name={title}
        value={title} 
        id={`custom-checkbox-${index}`}
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="w-5 h-5 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-600"
      />
      <label
        htmlFor={`custom-checkbox-${index}`}
        className="ms-2 text-sm  text-neutral-500"
      >
        {title}
      </label>
    </>
  );
};

export default Checkbox;

