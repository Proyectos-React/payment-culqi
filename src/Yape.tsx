import React, { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import 'cleave.js/dist/addons/cleave-phone.pe';
import Cleave from 'cleave.js/react';
import { CodeInput } from 'react-code-verification-input'
import { useCreateYapeChargeMutation, useCreateYapeTokenMutation } from './store/apis/culqiYapeApi';

type FormValues = {
    number_phone: string,
    otp: string
}

export const Yape: FC = () => {
    const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            number_phone: '900000001',
            otp: '946627'
        }
    });

    const [createYapeToken, { isLoading: isLoadingToken, isError: isErrorToken, error: errorToken, isSuccess: isSuccessToken, data: dataToken }] = useCreateYapeTokenMutation();
    const [createYapeCharge, { isLoading: isLoadingCharge, isError: isErrorCharge, error: errorCharge, isSuccess: isSuccessCharge, data: dataCharge }] = useCreateYapeChargeMutation();


    const onSubmit: SubmitHandler<FormValues> = async data => {
        const formData = {
            number_phone: data.number_phone.replace(/ /g, ''),
            otp: data.otp,
            amount: "30000"
        };
        createYapeToken(formData)
    }

    useEffect(() => {
        if (isSuccessToken) {
            const chargeBody = {
                amount: "30000",
                currency_code: "PEN",
                email: "richard@piedpiper.com",
                source_id: dataToken?.id,
                capture: true
            }
            createYapeCharge(chargeBody)
        }
    }, [isLoadingToken]);

    useEffect(() => {
        if (isSuccessCharge) {
            console.log('dataChargesssssssssss yape', dataCharge);
        }
    }, [isLoadingCharge])

    return (
        <div className='min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16'>
            <div className='w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 max-w-sm'>
                <div className="w-full pt-1 pb-5">
                    <div className="text-white bg-purple-900 overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                        <img src="https://www.yape.com.pe/assets/images/Logo.Yape.webp" className='h-12' />
                    </div>
                </div>
                <div className="mb-5">
                    <h1 className="text-center font-bold text-lg">Pago con Yape en línea</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="font-bold text-sm mb-2 ml-1">Ingrese tu celular yape</label>
                        <div>
                            <Controller
                                control={control}
                                name="number_phone"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Cleave
                                        className='w-full px-3 py-2 mb-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                        placeholder='0000 0000 0000'
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={{ phone: true, phoneRegionCode: 'PE' }}
                                    />
                                )}
                            />
                            {/* <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="999 999 999" type="text" /> */}
                        </div>
                    </div>
                    <div className='mb-5'>
                        <label className="font-bold text-sm mb-2 ml-1 ">Código de aprobación</label>
                        <div className='flex justify-center'>

                            <Controller
                                control={control}
                                name="otp"
                                render={({ field: { onChange, value } }) => (
                                    <CodeInput
                                        length={6}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />

                        </div>
                    </div>
                    <div>
                        <button disabled={isLoadingToken} className={`block w-full  bg-purple-900 hover:bg-purple-700 focus:bg-purple-700 text-white rounded-lg px-3 py-3 font-semibold ${isLoadingToken ? 'opacity-95 cursor-not-allowed' : null} `}>
                            <i className="mdi mdi-lock-outline mr-1"></i> PAGAR S/300.00
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
