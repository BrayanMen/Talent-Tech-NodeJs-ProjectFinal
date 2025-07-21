import configEnv from './src/config/env.config.js';
import server from './src/server.js';

const PORT = configEnv.port;
const ENV = configEnv.env;
const ENV_URL = configEnv.workEnviroment;
server.listen(PORT, () => {
    console.log(`
        Servidor funcionando exitosamente en puerto: ${PORT};
        Servidor en entorno: ${ENV};
        Url del servidor: ${ENV_URL};
        `);
});
