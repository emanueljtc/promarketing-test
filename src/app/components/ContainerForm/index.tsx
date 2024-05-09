import React from 'react';
import './style.css';
export type ContainerFormProps = {
  children: React.ReactNode;
};
const ContainerForm = (props: ContainerFormProps) => {
  return <div className="containerForm">{props.children}</div>;
};

export default ContainerForm;

