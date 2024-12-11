import readline from 'readline';
import { createSuperAdminUser } from './init/index.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phoneNumber);
};

const main = async () => {
  try {
    console.log('Create a Super Admin User');

    let email;
    while (true) {
      email = await askQuestion('Enter email address: ');
      if (isValidEmail(email)) break;
      console.log('Invalid email format. Please try again.');
    }

    let phoneNumber;
    while (true) {
      phoneNumber = await askQuestion(
        'Enter phone number (e.g., +1234567890): '
      );
      if (isValidPhoneNumber(phoneNumber)) break;
      console.log('Invalid phone number format. Please try again.');
    }

    let password;
    while (true) {
      password = await askQuestion('Enter password (minimum 6 characters): ');
      if (password.length >= 6) break;
      console.log('Password too short. Please try again.');
    }

    const firstName = await askQuestion('Enter first name: ');
    const lastName = await askQuestion('Enter last name: ');
    const passcode = await askQuestion('Enter passcode: ');

    const userObject = {
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
      passcode,
    };

    const response = await createSuperAdminUser(userObject);
    if (!response.error) {
      console.log('Super Admin user created successfully!');
    } else {
      console.log(response.error);
    }
    process.exit(1);
  } catch (error) {
    console.error('Error creating Super Admin user:', error.message);
  } finally {
    rl.close();
  }
};

main();
