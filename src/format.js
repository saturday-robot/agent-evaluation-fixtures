const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatAmount(value) {
  return currency.format(Number(value) || 0);
}
