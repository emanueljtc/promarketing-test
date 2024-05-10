import React from 'react';
import { Roboto } from 'next/font/google';

interface TitleSectionProps {
  title: string;
}
const roboto = Roboto({ weight: ['700'], subsets: ['latin'] });

const TitleSection: React.FC<TitleSectionProps> = ({ title }) => {
  return (
    <>
      <h2 className={`${roboto.className} title-tab`}>{title}</h2>
    </>
  );
};

export default TitleSection;

