const mappings = {
  CZK: 'CZK',
  's DPH': 'CZK',
  'bez DPH': 'CZK',
  USD: 'USD',
}

export default (currency: string): string => mappings[currency] || currency
