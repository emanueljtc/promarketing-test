/**
 * React component for managing tabs, providers, and checkbox changes.
 *
 * @return {JSX.Element} The JSX element representing the tabs section.
 */
'use client';
import React from 'react';
import './style.css';
import TabItem from './TabItem';
import ContainerForm from '../ContainerForm';
import { Roboto } from 'next/font/google';
import Checkbox from '../Checkbox';

export type TitemsTab = {
  id: string;
  ariaName: string;
};

type TProviders = {
  id: number;
  name: string;
  Name?: string;
  description: string;
  Descripcion?: string;
  checked: boolean;
};

type TForTime = 'temporary' | 'permanent' | '';

const roboto = Roboto({ weight: ['700'], subsets: ['latin'] });
const Tabs = () => {
  const [tab, setTab] = React.useState<string>('create');
  const itemsTab: TitemsTab[] = [
    { id: 'create', ariaName: 'Crear Solicitud' },
    { id: 'limit', ariaName: 'Limite de deposito' },
  ];
  const [selectAllProviders, setSelectAllProviders] =
    React.useState<boolean>(false);

  const [providers, setProviders] = React.useState<TProviders[]>([]);
  const [forTime, setForTime] = React.useState<TForTime>('');

  const callProviders = async () => {
    try {
      const response = await fetch(
        'https://64b68442df0839c97e15b2a0.mockapi.io/api/v1/provider',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }
      const data = await response.json();
      const transformData = data.map((item: TProviders) => ({
        id: Number(item.id),
        name: item.name || item.Name,
        description: item.description || item.Descripcion,
        checked: false,
      }));
      setProviders(transformData);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  React.useMemo(() => {
    if (providers.length > 0) return;
    callProviders();
  }, [providers]);

  const handleCheckboxChange = () => {
    const changeData = providers.map((item) => {
      return {
        ...item,
        checked: !selectAllProviders ? true : false,
      };
    });

    setProviders([...changeData]);

    setSelectAllProviders(!selectAllProviders);
  };

  const changeDataProviders = (id: number) => {
    setProviders((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      })
    );
  };

  return (
    <section className="tabset">
      {itemsTab.map((item) => (
        <TabItem key={item.id} itemsTab={item} setTab={setTab} tab={tab} />
      ))}
      <div className="tab-panels">
        <div id="create" className="tab-panel">
          <ContainerForm>
            <div className="bg-gray-transparent rounded-lg p-3.5 max-w-3xl">
              <h2 className={`${roboto.className} title-tab`}>
                Autoexclusión PROVEEDORES
              </h2>
              <div id="contentCheckbox" className="mt-4">
                <div className="flex items-center border-b-neutral-200 border-b-2 pb-4">
                  <Checkbox
                    index={0}
                    title="Todos"
                    checked={selectAllProviders}
                    onChange={() => handleCheckboxChange()}
                  />
                </div>
                <div className="flex items-center flex-wrap gap-4  mt-8">
                  {providers?.map((provider: TProviders, index: number) => (
                    <Checkbox
                      index={index}
                      key={provider.id}
                      title={provider.description}
                      checked={provider.checked}
                      onChange={() => changeDataProviders(provider.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ContainerForm>
        </div>
        <section id="limit" className="tab-panel">
          <div className="bg-gray-transparent rounded-lg p-3.5 max-w-3xl md:min-w-[48rem]">
            <h2 className={`${roboto.className} title-tab`}>
              Por un periodo de tiempo{' '}
            </h2>
            <div className="tab_panel_content w-3/4 md:w-2/5">
              <Checkbox
                title="Temporal hasta"
                checked={forTime === 'temporary' ? true : false}
                type="radio"
                onChange={() => setForTime('temporary')}
              />
              <Checkbox
                title="Indefinido"
                checked={forTime === 'permanent' ? true : false}
                type="radio"
                onChange={() => setForTime('permanent')}
              />
            </div>
            <div className="tab_panel_content w-full md:w-3/6 mt-8">
              <input
                type="date"
                placeholder="dd/mm/aaaa"
                className="p-3 rounded-xl w-full border border-yellow-500"
              ></input>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Tabs;

