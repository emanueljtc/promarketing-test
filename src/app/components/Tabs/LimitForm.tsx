import React from 'react';
import {
  TitleSection,
  Checkbox,
  ContainerForm,
  TabItem,
  MessageAlert,
} from '@/app/components';
import moment from 'moment';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import DatePicker from 'react-datepicker';

const LimitForm = () => {
  const [errorAlert, setErrorAlert] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showAlertSuccess, setShowAlertSuccess] =
    React.useState<boolean>(false);
  const [startDate, setStartDate] = React.useState<Date>(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: 'all',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { dailyAmount, weeklyAmount, monthlyAmount, minimumAmount } = data;

      if (
        Number(minimumAmount) < 50000 ||
        Number(dailyAmount) < 50000 ||
        Number(weeklyAmount) < 50000 ||
        Number(monthlyAmount) < 50000
      ) {
        return setErrorAlert('Los montos deben  ser mayor o igual a 50000');
      }

      if (Number(dailyAmount) > Number(weeklyAmount)) {
        /* Si previamente se ingresó un Monto Semanal, se verifica que el monto Diario sea menor al monto Semanal. */
        return setErrorAlert(
          'El monto diario no puede ser mayor al monto semanal'
        );
      }
      if (Number(dailyAmount) > Number(monthlyAmount)) {
        /* Si previamente se ingresó un Monto Mensual, se verifica que el monto Diario sea menor al monto Semanal. */
        return setErrorAlert(
          'El monto diario no puede ser mayor al monto mensual'
        );
      }

      if (Number(weeklyAmount) > Number(monthlyAmount)) {
        /* Si previamente se ingresó un Monto Mensual, se verifica que el monto Semanal sea menor al monto Mensual. */
        return setErrorAlert(
          'El monto semanal no puede ser mayor al monto mensual'
        );
      }

      if (Number(monthlyAmount) > Number(minimumAmount)) {
        /* Si previamente se ingresó un Monto Minimo, se verifica que el monto Mensual sea mayor al monto Minimo. */
        return setErrorAlert(
          'El monto mensual debe  ser mayor al monto minimo'
        );
      }

      if (Number(monthlyAmount) < Number(dailyAmount)) {
        /* Si previamente se ingresó un Monto Minimo, se verifica que el monto Mensual sea menor al monto Minimo. */
        return setErrorAlert(
          'El monto mensual debe  ser mayor al monto minimo'
        );
      }
      setLoading(true);
      const res = await fetch(
        'https://64b68442df0839c97e15b2a0.mockapi.io/api/v1/self-limitation',
        {
          method: 'POST',
          body: JSON.stringify({
            dailyAmount,
            weeklyAmount,
            monthlyAmount,
            minimumAmount,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.ok) {
        setShowAlertSuccess(true);
        setLoading(false);
        setStartDate(new Date());
        reset({
          motivoAutolimitacion: '',
          dailyAmount: '',
          weeklyAmount: '',
          monthlyAmount: '',
          minimumAmount: '',
        });
      }
    } catch (error: any) {
      setLoading(false);
      setErrorAlert(error.message || 'Error al crear la solicitud');
    }
  });

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  React.useEffect(() => {
    if (showAlertSuccess) {
      setTimeout(() => {
        setShowAlertSuccess(false);
      }, 1000);
    }
  }, [showAlertSuccess]);

  return (
    <>
      {showAlertSuccess && (
        <MessageAlert message={'Creado con exito'} type="success" />
      )}
      {errorAlert && <MessageAlert message={errorAlert} type="danger" />}
      <form className="flex flex-col" onSubmit={onSubmit}>
        <ContainerForm>
          <div className="bg-gray-transparent rounded-lg p-3.5 max-w-3xl md:min-w-[48rem]">
            <TitleSection title="DEFINA SUS LÍMITES DE depÓsito" />
            <div className="flex flex-col justify-center items-center w-2/3 m-auto">
              <input
                type="text"
                id="minimumAmount"
                placeholder="Monto minimo de depósito"
                className="w-full  border border-yellow-500 rounded-lg p-2 mb-4 "
                {...register('minimumAmount', {
                  required: 'this field is required',
                  minLength: { value: 4, message: 'minimum 4 character' },
                  maxLength: { value: 9, message: 'maximum 9 character' },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="minimumAmount"
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
              <input
                type="text"
                id="dailyAmount"
                placeholder="Diario (De 00:00 hasta 24:00 hrs)"
                className="w-full  border border-yellow-500 rounded-lg p-2 mb-4 "
                {...register('dailyAmount', {
                  required: 'this field is required',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter a valid numeric value',
                  },
                  minLength: { value: 4, message: 'minimum 4 character' },
                  maxLength: { value: 9, message: 'maximum 9 character' },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="dailyAmount"
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

              <input
                type="text"
                id="weeklyAmount"
                placeholder="Semanal (De lunes a domingo)"
                className="w-full  border border-yellow-500 rounded-lg p-2 mb-4 "
                {...register('weeklyAmount', {
                  required: 'this field is required',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter a valid numeric value',
                  },
                  minLength: { value: 4, message: 'minimum 4 character' },
                  maxLength: { value: 9, message: 'maximum 9 character' },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="weeklyAmount"
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
              <input
                type="text"
                id="monthlyAmount"
                placeholder="Mensual (Del 1 al 30)"
                className="w-full  border border-yellow-500 rounded-lg p-2 mb-4 "
                {...register('monthlyAmount', {
                  required: 'this field is required',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter a valid numeric value',
                  },
                  minLength: { value: 4, message: 'minimum 4 character' },
                  maxLength: { value: 9, message: 'maximum 9 character' },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="monthlyAmount"
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
              <textarea
                className="w-full  border border-yellow-500 rounded-lg p-2 mb-4 "
                placeholder="Motivo de la autolimitacion"
                rows={4}
                {...register('motivoAutolimitacion', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'Minimum length should be 8',
                  },
                  maxLength: {
                    value: 250,
                    message: 'Maximum length should be 250',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="motivoAutolimitacion"
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
              <div className="w-full flex  justify-center items-center">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  minDate={moment().toDate()}
                  className="border border-yellow-500 rounded-lg"
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  filterDate={isWeekday}
                />
              </div>
            </div>
            <Button title={loading ? 'Loading...' : 'Login'} type="submit" />
          </div>
        </ContainerForm>
      </form>
    </>
  );
};

export default LimitForm;

