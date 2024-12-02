import axios from 'axios';
import FormData from 'form-data'; // Import from form-data package

const sendSMSverification = async (phoneNumber, message) => {
  var data = new FormData();
  data.append('token', process.env.SMS_KEY);
  data.append('phone', phoneNumber);
  data.append('msg', message);
  data.append('shortcode_id', 24);

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.geezsms.com/api/v1/sms/send',
    headers: {
      ...data.getHeaders(), // getHeaders method is now available
    },
    data: data,
  };

  try {
    await axios(config);
    return true;
  } catch (error) {
    console.error(error); // Log the error for debugging
    return false;
  }
};

export default sendSMSverification;
