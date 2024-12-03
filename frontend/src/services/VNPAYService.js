const VNPAY_URL = 'http://localhost:8888/order';
const BaseURL = 'http://localhost:3000/api';
export const fetchVNPAY = async (data) => {
  try {
    // Dynamically create a form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `http://localhost:8888/order/create_payment_url`;
    // form.target = '_blank'; // Open in a new tab

    // Add form fields
    const addField = (name, value) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addField('orderId', data.order_id);
    addField('amount', data.amount);
    addField('bankCode', 'VNBANK');
    addField('language', 'vn');
    addField('accountId', data.accountId);
    addField('proPlanId', data.proPlanId);
    addField('returnUrl', 'http://localhost:3000/payment-success');

    // Append the form to the document and submit
    document.body.appendChild(form);
    form.submit();

    // Remove the form after submission
    document.body.removeChild(form);
  } catch (error) {
    throw new Error(
      error?.response ? 'Yêu cầu thất bại. Vui lòng thử lại.' : 'Hệ thống không phản hồi.',
    );
  }
  // try {
  //   console.log(JSON.stringify(data));
  //   const response = await fetch(`${BaseURL}/vnpay/create_payment_url`, {
  //     // mode: 'no-cors',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error('Error when fetching VNPAY');
  //   }
  //   const responseData = await response.json();
  //   const { paymentUrl } = responseData;
  //   // console.log(paymentUrl);

  //   if (paymentUrl) {
  //     window.location.href = paymentUrl;
  //   } else {
  //     throw new Error('Error when fetching VNPAY');
  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  //   return error;
  // }
};
