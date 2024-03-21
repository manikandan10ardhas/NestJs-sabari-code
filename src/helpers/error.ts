export const ERROR_LIST = {
  AUTH: {
    PUBLIC_KEY_NOT_FOUND: { TITLE: 'Please check the public key', MESSAGE: 'Public key and private key not matching' },
    JWT_EXPIRED: { TITLE: 'Error!', MESSAGE: 'JWT token expired' }
  },
  USER: {
    USER_EMAIL_EXIST: { TITLE: 'Unable to register the user', MESSAGE: 'Email already exist' },
    USER_NOT_EXIST: { TITLE: '', MESSAGE: 'User not exist' },
    USER_ROLE_NOT_EXIST: { TITLE: '', MESSAGE: 'Unable to find user role details' },
    USER_DETAILS_EXIST: { TITLE: 'Unable to register the user', MESSAGE: 'Email or phone already exist' }
  }
};
