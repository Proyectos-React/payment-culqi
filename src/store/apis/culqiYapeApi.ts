import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface IYapeToken {
    otp: string;
    number_phone: string;
    amount: string;
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

interface IYapeTokenResponse {
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


interface IYapeChargeBody {
    amount: string;
    currency_code: string;
    email: string;
    source_id: string | undefined;
    capture: boolean;
}

interface IssuerCharge {
    name: string;
    country: string;
    country_code: string;
    website: string;
    phone_number: string;
}

interface IinCharge {
    object: string;
    bin: string;
    card_brand: string;
    card_type: string;
    card_category?: any;
    issuer: Issuer;
    installments_allowed: any[];
}

interface ClientCharge {
    ip: string;
    ip_country: string;
    ip_country_code: string;
    browser: string;
    device_fingerprint?: any;
    device_type: string;
}

interface MetadataCharge {
}

interface SourceCharge {
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

interface OutcomeCharge {
    type: string;
    code: string;
    merchant_message: string;
    user_message: string;
}

interface Metadata2Charge {
}

interface FixedFeeCharge {
}

interface VariableFeeCharge {
    currency_code: string;
    commision: number;
    total: number;
}

interface FeeDetailsCharge {
    fixed_fee: FixedFeeCharge;
    variable_fee: VariableFeeCharge;
}

interface IYapeChargeResponse {
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
    source: SourceCharge;
    outcome: OutcomeCharge;
    fraud_score?: any;
    dispute: boolean;
    capture: boolean;
    capture_date: number;
    reference_code: string;
    authorization_code: string;
    duplicated: boolean;
    metadata: Metadata2Charge;
    total_fee: number;
    fee_details: FeeDetailsCharge;
    total_fee_taxes: number;
    transfer_amount: number;
    paid: boolean;
    statement_descriptor: string;
    transfer_id?: any;
}




const urlTokenYape = 'https://secure.culqi.com/v2/tokens/yape';
const urlChargeYape = 'https://api.culqi.com/v2/charges';


export const culqiYapeApi = createApi({
  reducerPath: 'culqiYapeApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    createYapeToken: builder.mutation<IYapeTokenResponse, IYapeToken>({
        query(body) {
          console.log(body);
          return {
            url: urlTokenYape,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer pk_test_8cuOBD2QcEypyg4c',
                'Content-Type': 'application/json'
            },
            body: body,
          };
        },
    }),
    createYapeCharge: builder.mutation<IYapeChargeResponse, IYapeChargeBody>({
        query(body) {
          return {
            url: urlChargeYape,
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



export const { useCreateYapeTokenMutation, useCreateYapeChargeMutation } = culqiYapeApi;