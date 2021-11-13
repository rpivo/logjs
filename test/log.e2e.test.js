const { default: logger, exit } = require('../log.js');

logger.module = 'Tests';

logger.debug('debug');
logger.error('error');
logger.info('info');
logger.log('log');
logger.success('success');
logger.warning('warning');

logger.module = 'Renaming a module';

logger.debug('debug');
logger.error('error');
logger.info('info');
logger.log('log');
logger.success('success');
logger.warning('warning');

logger.module = null;

logger.debug('debug');
logger.error('error');
logger.info('info');
logger.log('log');
logger.success('success');
logger.warning('warning');

exit('Oh no!');
