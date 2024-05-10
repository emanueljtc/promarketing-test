import React from 'react';
import './style.css';
export type ContainerFormProps = {
  children: React.ReactNode;
  paddingBottom?: string;
};
const ContainerForm = ({
  children,
  paddingBottom = '15px',
}: ContainerFormProps) => {
  return (
    <div className={`containerForm`} style={{ paddingBottom: paddingBottom }}>
      {children}
    </div>
  );
};

export default ContainerForm;

