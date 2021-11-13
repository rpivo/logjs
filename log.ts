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

function getCallerFromStackTrace() {
  const callerLine = new Error().stack
    ?.split('\n')
    .filter((line) => !line.includes('log.js'))[1]
    .trim();
  return callerLine?.substring(callerLine.lastIndexOf('/') + 1).split(':')[0];
}

function log(message: string, logLevel = LogLevels.LOG) {
  const caller = getCallerFromStackTrace();

  const Logs = {
    [LogLevels.DEBUG]: {
      prefix: 'DEBUG',
      color: chalk.magentaBright,
    },
    [LogLevels.ERROR]: {
      prefix: 'ERROR',
      color: chalk.redBright,
    },
    [LogLevels.INFO]: {
      prefix: 'INFO',
      color: chalk.blueBright,
    },
    [LogLevels.LOG]: {
      prefix: 'LOG',
      color: chalk.white,
    },
    [LogLevels.SUCCESS]: {
      prefix: 'SUCCESS',
      color: chalk.greenBright,
    },
    [LogLevels.WARNING]: {
      prefix: 'WARNING',
      color: chalk.yellow,
    },
  };

  const { prefix, color } = Logs[logLevel];

  console.log(`${caller} [${prefix}]`, color(message), '\n');
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
