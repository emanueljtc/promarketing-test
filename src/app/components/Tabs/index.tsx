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

const roboto = Roboto({ weight: ['700'], subsets: ['latin'] });
const Tabs = () => {
  const [tab, setTab] = React.useState<string>('create');
  const itemsTab: TitemsTab[] = [
    { id: 'create', ariaName: 'Crear Solicitud' },
    { id: 'limit', ariaName: 'Limite de deposito' },
  ];
  const [allProviders, setAllProviders] = React.useState<boolean>(false);
  const [providers, setProviders] = React.useState<TProviders[]>([]);
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
        checked: !allProviders ? true : false,
      };
    });

    setProviders([...changeData]);

    setAllProviders(!allProviders);
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
                    checked={allProviders}
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
        <section id="rauchbier" className="tab-panel">
          <h2>6B. Rauchbier</h2>
          <p>
            <strong>Overall Impression:</strong> An elegant, malty German amber
            lager with a balanced, complementary beechwood smoke character.
            Toasty-rich malt in aroma and flavor, restrained bitterness, low to
            high smoke flavor, clean fermentation profile, and an attenuated
            finish are characteristic.
          </p>
          <p>
            <strong>History:</strong> A historical specialty of the city of
            Bamberg, in the Franconian region of Bavaria in Germany.
            Beechwood-smoked malt is used to make a Märzen-style amber lager.
            The smoke character of the malt varies by maltster; some breweries
            produce their own smoked malt (rauchmalz).
          </p>
        </section>
      </div>
    </section>
  );
};

export default Tabs;

