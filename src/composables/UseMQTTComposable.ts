/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable para gerenciar conexões MQTT
 */
import { protocol, endpoint, host, options, port, mqtt } from '@/api/Mqtt'
import { ref } from 'vue'

/**
 * Hook para gerenciar conexões MQTT
 * @returns {Object} Objeto contendo funções e estados para gerenciar conexões MQTT
 */
export const useMQTT = () => {
  const connection = ref<mqtt.MqttClient>()
  const connectionMQ = ref(true)
  const retryTimes = ref(0)
  const connecting = ref(false)
  const subscribeSuccess = ref(false)
  const receiveNews = ref('')

  /**
   * Inicializa a conexão MQTT
   */
  const mqttCon = () => {
    try {
      const connectUrl = `${protocol}://${host}:${port}${endpoint}`
      connection.value = mqtt.connect(connectUrl, options) as any as mqtt.MqttClient

      connection.value.on('connect', () => {
        connectionMQ.value = false
        console.log('Connection succeeded!')
      })

      connection.value.on('reconnect', handleOnReConnect)
      connection.value.on('error', (error) => {
        console.log('Connection failed', error)
      })
      connection.value.on('message', (topic, message) => {
        receiveNews.value = receiveNews.value.concat(message.toString())
        console.log(`Received message ${message} from topic ${topic}`)
      })
    } catch (error) {
      connecting.value = false
      console.log('mqtt.connect error', error)
    }
  }

  /**
   * Manipula eventos de reconexão
   */
  const handleOnReConnect = () => {
    retryTimes.value += 1
    if (retryTimes.value > 5) {
      try {
        connection.value?.end()
        initData()
        console.log('Connection maxReconnectTimes limit, stop retry')
      } catch (error: any) {
        console.log(error.toString())
      }
    }
  }

  /**
   * Reinicializa os dados da conexão
   */
  const initData = () => {
    connectionMQ.value = false
    retryTimes.value = 0
    connecting.value = false
    subscribeSuccess.value = false
  }

  /**
   * Publica uma mensagem em um tópico
   * @param {string} topic - Tópico para publicação
   * @param {string} msg - Mensagem a ser publicada
   */
  const publish = (topic: string, msg: string) => {
    connection.value?.publish(topic, msg, (error) => {
      if (error) {
        console.log('Publish error', error)
      }
    })
  }

  /**
   * Encerra a conexão MQTT
   */
  const stoppedPublish = () => {
    connection.value?.end()
  }

  return { mqttCon, publish, stoppedPublish }
}
