import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { stringify, parse } from 'zipson'
import type { LoginUser, UserData } from '@/model/IUser'
import { loginUser, loginAuthCheck } from '@/api/actions/Login'
import type { IError } from '@/model/Index'
import { useSwal } from '@/composables/Swal'

/**
 * Interface para resposta da API de login
 */
type dataReqLogin = {
  message: string
  token: string
  user: UserData
}

/**
 * Store para gerenciar autenticação e dados do usuário logado
 * Fornece funções para login, verificação de autenticação e gerenciamento de sessão
 */
export const useLoginStore = defineStore(
  'login',
  () => {
    const { swal } = useSwal()

    /**
     * Token de autenticação do usuário
     */
    const token = ref<string>()
    
    /**
     * Estado de autenticação do usuário
     */
    const isAuth = ref<boolean>()
    
    /**
     * Informações de rota para redirecionamento
     */
    const router = ref<{ path_name: string; name: string }>({ path_name: '', name: '' })
    
    /**
     * Dados do usuário logado
     */
    const user = ref<UserData>({
      user_id: 0,
      user_nome: '',
      user_login: '',
      user_isadmin: 0,
      permissoes: {
        perm_id: 0,
        perm_descricao: '',
        perm_path: ''
      }
    })

    /**
     * Realiza o login do usuário e armazena o token e dados
     * @param {LoginUser} userLogin - Credenciais do usuário
     */
    const sessionLoginUser = async (userLogin: LoginUser) => {
      const { data } = await loginUser<dataReqLogin>(userLogin)

      localStorage.setItem('login', data.token)
      token.value = data.token
      user.value = data.user
    }

    /**
     * Computed que retorna o token de autenticação
     */
    const getToken = computed<string>(() => {
      return token.value ?? (localStorage.getItem('login') as string)
    })
    
    /**
     * Computed que retorna os dados do usuário
     */
    const userData = computed<UserData>(() => user.value as UserData)
    
    /**
     * Computed que retorna o estado de autenticação
     */
    const isAuthC = computed(() => isAuth.value)

    /**
     * Limpa os dados de login do usuário
     */
    const loginReset = () => {
      localStorage.setItem('login', JSON.stringify({}))
    }

    /**
     * Verifica se o token do usuário é válido
     * @returns {Promise} Promise com os dados da resposta da API
     */
    const checkAuthorization = async () => {
      try {
        const { data } = await loginAuthCheck(getToken.value)
        isAuth.value = data.auth
        return data
      } catch (er: unknown) {
        const error = er as IError
        console.log(error)
        if (error.response.status === 401 && isAuth.value === false) {
          swal({
            title: 'Login Expirado',
            icon: 'warning',
            text: error.response.data.msg
          })
        }
      }
    }

    return {
      checkAuthorization,
      token,
      router,
      user,
      sessionLoginUser,
      getToken,
      userData,
      loginReset,
      isAuth,
      isAuthC
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['token', 'user', 'userData', 'user'],
      key: 'userData',
      serializer: {
        deserialize: parse,
        serialize: stringify
      }
    }
  }
)
