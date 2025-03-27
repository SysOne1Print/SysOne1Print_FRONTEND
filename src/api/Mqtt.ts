import mqtt from 'mqtt'

const connection = {
  protocol: 'ws',
  host: 'localhost',
  port: 8083,
  endpoint: '/mqtt',
  clean: true,
  connectTimeout: 30 * 1000, // ms
  reconnectPeriod: 4000, // ms
  clientId: 'emqx' + Math.random().toString(16).substring(2, 8),
  // auth
  username: 'admin',
  password: 'public'
}

export const { protocol, host, port, endpoint, ...options } = connection
export { mqtt }
