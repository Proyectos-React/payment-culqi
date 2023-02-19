import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ITokenBody {
    card_number: string,
    cvv: string,
    expiration_month: string,
    expiration_year: string,
    email: string,
}


interface Metadata {
}

interface Client {
    device_fingerprint?: any;
    ip_country_code: string;
    ip: string;
    browser: string;
    ip_country: string;
    device_type: string;
}

interface Issuer {
    country: string;
    country_code: string;
    website: string;
    name: string;
    phone_number: string;
}

interface Iin {
    installments_allowed: any[];
    bin: string;
    card_category?: any;
    card_brand: string;
    card_type: string;
    issuer: Issuer;
    object: string;
}

interface CulqiTokenResponse {
    metadata: Metadata;
    card_number: string;
    last_four: string;
    active: boolean;
    client: Client;
    id: string;
    creation_date: number;
    type: string;
    email: string;
    object: string;
    iin: Iin;
}

interface Issuer {
    name: string;
    country: string;
    country_code: string;
    website: string;
    phone_number: string;
}

interface Iin {
    object: string;
    bin: string;
    card_brand: string;
    card_type: string;
    card_category?: any;
    issuer: Issuer;
    installments_allowed: any[];
}

interface Client {
    ip: string;
    ip_country: string;
    ip_country_code: string;
    browser: string;
    device_fingerprint?: any;
    device_type: string;
}

interface Metadata {
}

interface Source {
    object: string;
    id: string;
    type: string;
    creation_date: number;
    email: string;
    card_number: string;
    last_four: string;
    active: boolean;
    iin: Iin;
    client: Client;
    metadata: Metadata;
}

interface Outcome {
    type: string;
    code: string;
    merchant_message: string;
    user_message: string;
}

interface Metadata2 {
}

interface FixedFee {
}

interface VariableFee {
    currency_code: string;
    commision: number;
    total: number;
}

interface FeeDetails {
    fixed_fee: FixedFee;
    variable_fee: VariableFee;
}

interface IChargeResponse {
    object: string;
    id: string;
    creation_date: number;
    amount: number;
    amount_refunded: number;
    current_amount: number;
    installments: number;
    installments_amount?: any;
    currency_code: string;
    email: string;
    description?: any;
    source: Source;
    outcome: Outcome;
    fraud_score?: any;
    dispute: boolean;
    capture: boolean;
    capture_date: number;
    reference_code: string;
    authorization_code: string;
    duplicated: boolean;
    metadata: Metadata2;
    total_fee: number;
    fee_details: FeeDetails;
    total_fee_taxes: number;
    transfer_amount: number;
    paid: boolean;
    statement_descriptor: string;
    transfer_id?: any;
}
interface IChargeBody {
  amount: string,
  currency_code: string,
  email: string,
  source_id: string | undefined,
  capture: boolean
}


const baseUrlSecure = 'https://secure.culqi.com/v2';
const baseUrlApi = 'https://api.culqi.com/v2';


export const culqiApi = createApi({
  reducerPath: 'culqiApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    createToken: builder.mutation<CulqiTokenResponse, ITokenBody>({
        query(body) {
          console.log(body);
          return {
            url: `${baseUrlSecure}/tokens`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer pk_test_8cuOBD2QcEypyg4c',
                'Content-Type': 'application/json'
            },
            body: body,
          };
        },
    }),
    createCharge: builder.mutation<IChargeResponse, IChargeBody>({
        query(body) {
          return {
            url: `${baseUrlApi}/charges`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk_test_TSEUd5CMxbXyZHb8',
                'Content-Type': 'application/json'
            },
            body: body,
          };
        },
    }),
  }),
});



export const { useCreateTokenMutation, useCreateChargeMutation } = culqiApi;