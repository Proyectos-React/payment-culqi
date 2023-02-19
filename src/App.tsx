import { useEffect, useState } from 'react';
import Cleave from 'cleave.js/react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useCreateChargeMutation, useCreateTokenMutation } from './store/apis';
import visa from 'payment-icons/min/flat/visa.svg';
import mastercard from 'payment-icons/min/flat/mastercard.svg';
import diners from 'payment-icons/min/flat/diners.svg';
import amex from 'payment-icons/min/flat/amex.svg';
import jcb from 'payment-icons/min/flat/jcb.svg';
import discover from 'payment-icons/min/flat/discover.svg';
import { ChangeEvent } from 'cleave.js/react/props';

type FormValues = {
  card_number: string,
  date: string,
  cvv: string,
  email: string
}
  ;
interface CardType {
  id: string,
  value: string,
};

const cardTypes: CardType[] = [
  {
    id: 'visa',
    value: visa
  },
  {
    id: 'mastercard',
    value: mastercard
  },
  {
    id: 'diners',
    value: diners
  },
  {
    id: 'amex',
    value: amex
  },
  {
    id: 'jcb',
    value: jcb
  },
  {
    id: 'discover',
    value: discover
  },
]

function App() {

  const [creditCardType, setCreditCardType] = useState('');
  const [createToken, { isLoading: isLoadingToken, isError: isErrorToken, error: errorToken, isSuccess: isSuccessToken, data: dataToken }] = useCreateTokenMutation();
  const [createCharge, { isLoading: isLoadingCharge, isError: isErrorCharge, error: errorCharge, isSuccess: isSuccessCharge, data: dataCharge }] = useCreateChargeMutation();

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      card_number: '',
      date: '',
      cvv: '',
      email: ''
    }
  });

  useEffect(() => {
    if (isSuccessToken) {
      const chargeBody = {
        amount: "20000",
        currency_code: "PEN",
        email: "richard@piedpiper.com",
        source_id: dataToken?.id,
        capture: true
      }
      createCharge(chargeBody)
    }
    if (isErrorToken) {
      console.log('errorToken', errorToken);
    }
  }, [isLoadingToken])

  useEffect(() => {
    if (isSuccessCharge) {
      console.log('dataChargesssssssssss',dataCharge);
    }
  }, [isLoadingCharge])
  


  const onSubmit: SubmitHandler<FormValues> = async data => {
    if (isLoadingToken) return;
    const { card_number, date, ...value } = data;
    const [month, year] = date.split("/");
    const formData = {
      card_number: card_number.replace(/ /g, ''),
      expiration_month: month,
      expiration_year: year,
      ...value
    };
    // console.log(data);
    createToken(formData);
  };

  const onCreditCardTypeChanged = (type: string) => {
    const typeCard = cardTypes.find((cardType: CardType) => cardType.id == type);
    setCreditCardType(typeCard?.value || '');
  }

  const onCreditCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    return e.target.rawValue;
  }

  return (
    <div className='min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16'>
      <div className='w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 max-w-lg'>
        <div className="w-full pt-1 pb-5">
          <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            <i className="mdi mdi-credit-card-outline text-3xl"></i>
          </div>
        </div>
        <div className="mb-5">
          <h1 className="text-center font-bold text-lg uppercase">INFORMACIÓN DE PAGO SEGURO</h1>
        </div>
        <div className='mb-5 flex justify-center'>
          {
            creditCardType ? (
              <img src={creditCardType} className='h-8' alt="" />
            ) : (
              cardTypes.map((cardType) => (
                <img src={cardType.value} key={cardType.id} className='h-7 mx-1' alt="" />
              ))
            )
          }
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="font-bold text-sm mb-2 ml-1">Número de tarjeta</label>
            <div>
              <Controller
                control={control}
                name="card_number"
                render={({ field: { onChange, onBlur } }) => (
                  <Cleave
                    className='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                    placeholder='0000 0000 0000 0000'
                    onChange={onChange}
                    onBlur={onBlur}
                    options={{ creditCard: true, onCreditCardTypeChanged }}
                  />
                )}
              />
              {/* <ErrorMessage
                  errors={errors}
                  name="card_number"
                  render={({ message }) => <p>{message}</p>}
                /> */}
            </div>
          </div>
          <div className="mb-2 -mx-2 flex items-end">
            <div className="px-2 w-1/2">
              <label className="font-bold text-sm mb-2 ml-1">Fecha de caducidad</label>
              <div>
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Cleave
                      className='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                      placeholder='Mes/Año'
                      onChange={onChange}
                      onBlur={onBlur}
                      options={{ date: true, datePattern: ['m', 'y'] }}
                    />
                  )}
                  rules={{
                    required: "cvv is required"
                  }}
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <label className="font-bold text-sm mb-2 ml-1">Codigo de seguridad</label>
              <div>
                <Controller
                  control={control}
                  name="cvv"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Cleave
                      className='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                      placeholder='CVV'
                      onChange={onChange}
                      onBlur={onBlur}
                      options={{ blocks: [3], numericOnly: true }}
                    />
                  )}
                  rules={{
                    required: "cvv is required"
                  }}
                />
              </div>
            </div>
          </div>
          <div className='mb-5'>
            <label className="font-bold text-sm mb-2 ml-1">Correo electrónico</label>
            <div>
              <input {...register('email')} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="example@example.com" type="text" />
            </div>
          </div>
          <div>
            <button disabled={isLoadingToken || isLoadingCharge} className={`block w-full  bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold ${isLoadingToken || isLoadingCharge ? 'opacity-95 cursor-not-allowed' : null}`}>
              <i className="mdi mdi-lock-outline mr-1"></i> PAGAR AHORA
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
