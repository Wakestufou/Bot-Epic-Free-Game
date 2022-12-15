import { ExtendedClient } from './structures/Client';
import Logger from './utils/Logger';
import 'dotenv/config';

Logger.info('Program starting...', 'START');

Logger.info('Creating the client...', 'START');
export const client = new ExtendedClient();

Logger.info('Client created !', 'START');

Logger.info('Bot starting...', 'START');
client.start();
