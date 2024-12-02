export function formatErrors(errors) {
  const formattedErrors = {};
  errors.array().forEach((error) => {
    formattedErrors[error.path] = error.msg;
  });
  return formattedErrors;
}

export function refresh(token) {
  if (!token) {
    return '';
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return '';
    const accessToken = generateToken(user);
    return accessToken;
  });
}

export const isValidPhoneNumber = (phone) => {
  // Ensure the input exists and is a string
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Check if the phone number has exactly 10 digits
  if (!/^\d{12}$/.test(phone)) {
    return false;
  }

  // Validate that the number starts with valid Ethiopian prefixes
  const isValidStart = /^(2519|2517)/.test(phone);

  return isValidStart;
};
