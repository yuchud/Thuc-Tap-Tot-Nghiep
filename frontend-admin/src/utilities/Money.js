export const formatPrice = (price) => {
  console.log('formatPrice', price);
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (formattedPrice.endsWith('.00')) {
    formattedPrice = formattedPrice.slice(0, -3);
  }
  return formattedPrice;
};
