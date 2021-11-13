import chalk from 'chalk';

enum LogLevels {
  DEBUG,
  ERROR,
  INFO,
  LOG,
  SUCCESS,
  WARNING,
}

interface Context {
  module: string;
  debug: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  log: (message: string, logLevel?: LogLevels) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
}

let module = '';

function exit(this: Context, exitReason: string, exitCode = LogLevels.ERROR) {
  log.bind(this)(exitReason, exitCode);
  log.bind(this)('Exiting...', LogLevels.LOG);
  process.exit(exitCode);
}

function getCallerFromStackTrace() {
  const callerLine = new Error().stack
    ?.split('\n')
    .filter((line) => !line.includes('log.js'))[1]
    .trim();
  return callerLine?.substring(callerLine.lastIndexOf('/') + 1).split(':')[0];
}

function log(this: Context, message: string, logLevel = LogLevels.LOG) {
  if (this?.module !== undefined) {
    module = this.module;
  }

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

  console.log(`${module || caller} [${prefix}]`, color(message), '\n');
}

function debug(this: Context, message: string) {
  log.bind(this)(message, LogLevels.DEBUG);
}

function error(this: Context, message: string) {
  log.bind(this)(message, LogLevels.ERROR);
}

function info(this: Context, message: string) {
  log.bind(this)(message, LogLevels.INFO);
}

function success(this: Context, message: string) {
  log.bind(this)(message, LogLevels.SUCCESS);
}

function warning(this: Context, message: string) {
  log.bind(this)(message, LogLevels.WARNING);
}

const logger = { module, debug, error, info, log, success, warning };

export default logger;
export { exit };
