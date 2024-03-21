/* istanbul ignore file */

import * as dotenv from 'dotenv';
import * as path from 'path';

module.exports = async () => {
  console.log('START >> importing test database');
  dotenv.config({ path: path.join(__dirname, '../', `.env.test`) });
  if (process.env.NODE_ENV && ['development', 'testing'].indexOf(process.env.NODE_ENV) === 0) {
    throw new Error('Testing is not allowed');
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { execSync } = require('child_process');
  try {
    // success command
    const dbUser = process.env.DB_USERNAME;
    const dbPass = process.env.DB_PASSWORD;
    const dbName = process.env.DB_NAME;

    const resNpmVersion = await execSync(
      `cd ${__dirname} && sh ../bin/scripts/import_test_db.sh -u ${dbUser} -p ${dbPass} -d ${dbName}`
    );

    console.log('success', resNpmVersion.toString());
  } catch (error: any) {
    console.log(error.message);
    console.log('error', error.stdout.toString());
  }

  console.log('<< END Finished importing test database');
};
