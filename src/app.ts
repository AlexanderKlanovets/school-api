import http from 'http';
import { db } from './database';
import TeacherDao from './dao/teacherDao';
import TeacherService from './services/teacherService';
import TeacherController from './controllers/teacherController';
import getTeacherRoute from './routes/teacherRoute';
import Router from './routing/router';
import { appConfig } from './config';
import Logger from './utils/logger';

const logger = new Logger('logs');

const teacherDao = new TeacherDao(db);
const teacherService = new TeacherService(teacherDao);
const teacherController = new TeacherController(teacherService, logger);

const teacherRouting = getTeacherRoute(teacherController);

const router = new Router();
router.register('/api', teacherRouting);

const connections = new Map();

const server = http.createServer((req, res) => {
  connections.set(res.connection, res);
  router.dispatch(req, res);
});

server.on('connection', (connection) => {
  connection.on('close', () => {
    connections.delete(connection);
  });
});

server.listen(appConfig.PORT);

const timeout = (msec: number) => new Promise((resolve) => {
  setTimeout(resolve, msec);
});

const closeConnections = () => {
  console.log('Closing connections...');

  /* eslint-disable-next-line */
  for (const [connection, res] of connections.entries()) {
    connections.delete(connection);
    res.end('Server stopped.');
    connection.destroy();
  }
};

const freeResources = async () => {
  console.log('Freeing resourses...');

  await db.close();
  await logger.close();
};

const gracefulShutdown = async () => {
  server.close((error) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });
  await timeout(appConfig.SHUTDOWN_TIMEOUT);
  await freeResources();
  closeConnections();
};

process.on('SIGINT', async () => {
  console.log();
  console.log('Starting graceful shutdown...');
  await gracefulShutdown();
  console.log('Server has been stopped successfully.');
  process.exit(0);
});
