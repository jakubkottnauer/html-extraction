const mappings = {
  'Kč': 'CZK',
  CZK: 'CZK',
  's DPH': 'CZK',
  'bez DPH': 'CZK',
  USD: 'USD',
  ['$']: 'USD',
  EUR: 'EUR',
  '€': 'EUR',
}

export default (currency: string): string => mappings[currency] || currency
