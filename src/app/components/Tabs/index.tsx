/**
 * React component for managing tabs, providers, and checkbox changes.
 *
 * @return {JSX.Element} The JSX element representing the tabs section.
 */
'use client';
import React from 'react';
import TabItem from './TabItem';
import ContainerForm from '../ContainerForm';
import { Roboto } from 'next/font/google';
import Checkbox from '@/app/components/Checkbox';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Button from '../Button';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import MessageAlert from '../MessageAlert';

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
  const [providersSelected, setProvidersSelected] = React.useState<
    TProviders[]
  >([]);
  const [forTime, setForTime] = React.useState<TForTime>('');
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const router = useRouter();
  const [errorAlert, setErrorAlert] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showAlertSuccess, setShowAlertSuccess] =
    React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: 'all',
  });
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

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const validData = () => {
    if (providersSelected.length === 0 || forTime === '') {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://64b68442df0839c97e15b2a0.mockapi.io/api/v1/self-limitation',
        {
          method: 'POST',
          body: JSON.stringify({
            proveedores: providersSelected,
            periodoDetiempo: forTime,
            fecha: forTime === 'temporary' ? startDate : null,
            motivo: data.motivoExclusion,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.ok) {
        setShowAlertSuccess(true);
        setLoading(false);
        setProvidersSelected([]);
        setForTime('');
        setStartDate(new Date());
        reset({ motivoExclusion: '' });
        setSelectAllProviders(false);
        callProviders();
      }
    } catch (error: any) {
      setLoading(false);
      setErrorAlert(error.message || 'Error al crear la solicitud');
    }
  });

  React.useEffect(() => {
    validData();
  }, [forTime, startDate, providersSelected]);

  React.useEffect(() => {
    const filterProviderTrue = providers.filter((item) => item.checked);
    setProvidersSelected(filterProviderTrue);
  }, [providers]);

  React.useEffect(() => {
    if (showAlertSuccess) {
      setTimeout(() => {
        setShowAlertSuccess(false);
      }, 1000);
    }
  }, [showAlertSuccess]);

  return (
    <section className="tabset">
      {itemsTab.map((item) => (
        <TabItem key={item.id} itemsTab={item} setTab={setTab} tab={tab} />
      ))}
      <div className="tab-panels">
        <div id="create" className="tab-panel">
          {showAlertSuccess && (
            <MessageAlert message={'Creado con exito'} type="success" />
          )}
          {errorAlert && <MessageAlert message={errorAlert} type="danger" />}
          <form className="flex flex-col" onSubmit={onSubmit}>
            <ContainerForm paddingBottom="0">
              <div className="bg-gray-transparent rounded-lg p-3.5 max-w-3xl">
                <h2 className={`${roboto.className} title-tab`}>
                  Autoexclusión PROVEEDORES
                </h2>
                <div id="contentCheckbox" className="mt-4">
                  <div className="flex items-center border-b-neutral-200 border-b-2 pb-4">
                    {providers.length >= 1 ? (
                      <Checkbox
                        title="Todos"
                        checked={selectAllProviders}
                        onChange={() => handleCheckboxChange()}
                      />
                    ) : (
                      <span className="text-gray-500">Cargando...</span>
                    )}
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
            <ContainerForm>
              <div className="bg-gray-transparent rounded-lg p-3.5 max-w-3xl md:min-w-[48rem]">
                <h2 className={`${roboto.className} title-tab`}>
                  Por un periodo de tiempo{' '}
                </h2>
                {providers.length >= 1 ? (
                  <>
                    <div className="tab_panel_content w-3/4 md:w-2/5">
                      <Checkbox
                        title="Temporal hasta"
                        checked={forTime === 'temporary' ? true : false}
                        type="radio"
                        onChange={() => setForTime('temporary')}
                        index={1}
                      />
                      <Checkbox
                        title="Indefinido"
                        checked={forTime === 'permanent' ? true : false}
                        type="radio"
                        onChange={() => setForTime('permanent')}
                        index={2}
                      />
                    </div>
                    <div className="tab_panel_content w-full md:w-3/6 mt-8">
                      {forTime === 'temporary' && (
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          minDate={moment().toDate()}
                          className="border border-yellow-500 rounded-lg"
                          selected={startDate}
                          onChange={(date: Date) => setStartDate(date)}
                          filterDate={isWeekday}
                        />
                      )}
                    </div>
                    <div className="flex flex-col mt-4">
                      <textarea
                        className="w-full  border border-yellow-500 rounded-lg p-2 mb-4 "
                        placeholder="Motivo de la exclusión"
                        rows={4}
                        {...register('motivoExclusion', {
                          required: 'This field is required',
                          minLength: {
                            value: 8,
                            message: 'Minimum length should be 8',
                          },
                        })}
                      />
                      {/* PD : ESTOS ERRORES NO SE VEN DEBIDO A LA VALIDACION DE LOS CAMPOS HASTA QUE NO SE LLENEN TODOS NO SE HABILITA EL BOTON*/}
                      <ErrorMessage
                        errors={errors}
                        name="motivoExclusion"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => {
                            return (
                              <span
                                key={type}
                                className="text-red-500 capitalize text-sm"
                              >
                                {message}
                              </span>
                            );
                          })
                        }
                      />
                    </div>
                  </>
                ) : (
                  <span className="text-gray-500">Cargando...</span>
                )}
              </div>
              <div className="flex justify-center items-center mt-6">
                <div className="w-11/12 md:w-2/4">
                  <Button
                    title={loading ? 'Cargando...' : 'Enviar'}
                    variant="dark"
                    type="submit"
                    isDisabled={validData() || !isValid}
                  />
                </div>
              </div>
            </ContainerForm>
          </form>
        </div>
        <section id="limit" className="tab-panel"></section>
      </div>
    </section>
  );
};

export default Tabs;

