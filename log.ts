import chalk from 'chalk';

enum LogLevels {
  DEBUG,
  ERROR,
  INFO,
  LOG,
  SUCCESS,
  WARNING,
}

function exit(exitReason: string, exitCode = LogLevels.ERROR) {
  log(exitReason, exitCode);
  log('Exiting...', LogLevels.LOG);
  process.exit(exitCode);
}

function log(message: string, logLevel = LogLevels.LOG) {
  const Logs = {
    [LogLevels.DEBUG]: {
      prefix: '[DEBUG]',
      color: chalk.yellow,
    },
    [LogLevels.ERROR]: {
      prefix: '[ERROR]',
      color: chalk.redBright,
    },
    [LogLevels.INFO]: {
      prefix: '[INFO]',
      color: chalk.blueBright,
    },
    [LogLevels.LOG]: {
      prefix: '[LOG]',
      color: chalk.white,
    },
    [LogLevels.SUCCESS]: {
      prefix: '[SUCCESS]',
      color: chalk.greenBright,
    },
    [LogLevels.WARNING]: {
      prefix: '[WARNING]',
      color: chalk.yellow,
    },
  };

  const { prefix, color } = Logs[logLevel];

  console.log(prefix, color(message), '\n');
}

function debug(message: string) {
  log(message, LogLevels.DEBUG);
}

function error(message: string) {
  log(message, LogLevels.ERROR);
}

function info(message: string) {
  log(message, LogLevels.INFO);
}

function success(message: string) {
  log(message, LogLevels.SUCCESS);
}

function warning(message: string) {
  log(message, LogLevels.WARNING);
}

const logger = { debug, error, info, log, success, warning };

export default logger;
export { exit };
