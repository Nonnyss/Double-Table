type Transaction = {
  id: string;
  object: string;
  amount: number;
  amount_details: {
    atm_fee: number | null;
  };
  authorization: string;
  balance_transaction: string;
  card: string;
  cardholder: string;
  created: number;
  currency: string;
  dispute: string | null;
  livemode: boolean;
  merchant_amount: number;
  merchant_currency: string;
  merchant_data: {
    category: string;
    category_code: string;
    city: string;
    country: string;
    name: string;
    network_id: string;
    postal_code: string;
    state: string;
  };
  metadata: Record<string, unknown>;
  type: string;
  wallet: string | null;
};

type TransactionList = {
  object: string;
  url: string;
  has_more: boolean;
  data: Transaction[];
};

type TransactionListResponse = {
  message: string;
  data: Nullable<TransactionList>;
};
