/* eslint-disable @typescript-eslint/no-unused-vars */
export const sendLoginSecretEmail = async ({
  email,
  data
}: {
  email: string;
  data: {
    otp: number;
    base_url: string;
    expiresIn: string;
  };
}): Promise<boolean | void> => {
  // Create and send OTP email
  return true;
};
