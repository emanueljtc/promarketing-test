import React from 'react';
import { useForm } from 'react-hook-form';

interface InputCustomProps {
  placeHolder: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'number';
  setData: any;
}

const InputCustom: React.FC<InputCustomProps> = ({
  placeHolder,
  name,
  type = 'text',
  setData,
}) => {
  const { register, getValues } = useForm();
  const value = getValues(name);

  const changeData = () => {
    setData(value);
  };

  const TextAreaCustom = () => {
    return (
      <textarea
        id={name}
        className="w-full  border border-yellow-500 rounded-lg p-2 mb-4 "
        placeholder={placeHolder}
        rows={4}
        {...register(name)}
        onChange={() => changeData()}
      />
    );
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {type === 'textarea' ? (
        <TextAreaCustom />
      ) : (
        <input
          type={type}
          id={name}
          className="w-11/12 md:w-3/4 h-10 border border-yellow-500 rounded-lg p-2 mb-4 "
          placeholder={placeHolder}
          {...register(name)}
        />
      )}
    </div>
  );
};

export default InputCustom;

