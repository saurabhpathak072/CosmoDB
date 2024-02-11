import { connect, connections } from 'mongoose';
import chalk from 'chalk';

export const connectMongoDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await connect(process.env.AZURE_MONGO_URI);
      if (result.connection.readyState === 1) {
        console.log(chalk.blue.bold('DataBase Connected'));
      }

      resolve(connections.readyState);
    } catch (error) {
      const errorMsg = new Error(error);
      console.log(chalk.red.bold(errorMsg.message));
      reject(errorMsg);
    }
  });
};
