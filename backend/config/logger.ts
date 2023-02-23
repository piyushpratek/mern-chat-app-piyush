import chalk from 'chalk';

export default {
  success: (...args: string[]) => {
    console.log(chalk.bold.greenBright(...args));
  },
  error: (...args: string[]) => {
    console.log(chalk.bold.redBright(...args));
  },
  info: (...args: string[]) => {
    console.log(chalk.bold.yellowBright(...args));
  },
};
