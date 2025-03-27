<template>
  <form class="form-signin">
    <logoIcons></logoIcons>
    <div :class="classChange">
      <div class="form-group mb-2">
        <label for="userID" class="sr-only">Nome de usuário</label>
        <input type="text" v-model="userObj.user" id="userID" class="form-control rounded" placeholder="Usuário"
          required autofocus />
        <small id="userError" v-if="!userObj.user" class="form-text text-white text-left">Nome de usuário parece estar
          incorreto.</small>
      </div>

      <div class="form-group mb-2">
        <label for="inputPassword" class="sr-only">Senha</label>
        <input type="password" v-model="userObj.password" id="inputPassword" class="form-control rounded"
          placeholder="Senha" required />
        <small id="passError" v-if="!userObj.password" class="form-text text-white text-left">A senha parece estar
          incorreta, revise.</small>
      </div>

      <div class="form-group text-left">
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" value="" id="invalidCheck01" required />
          <label class="custom-control-label text-white" for="invalidCheck01">
            Mantenha-me conectado
          </label>
        </div>
      </div>

      <button :class="{ 'is-loading is-loading-sm is-loading-md': check }" class="btn btn-lg btn-primary btn-block"
        @click.prevent="loginUser" type="submit">
        ENTRAR
      </button>
    </div>
    <p class="mt-5 mb-3 text-white">&copy; 2024</p>
  </form>
</template>

<script lang="ts" setup>
import { useToast } from '@/composables/Toast'
import type { IError, LoginUser } from '@/model/Index'
import { useLoginStore } from '@/stores/LoginStore'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import logoIcons from '@/components/icons/logoIcons.vue'
const router = useRouter()

//hooks
const { notifyToast } = useToast()
const storeLogin = useLoginStore()

//composables
useHead({
  title: 'Acesso ao Painel ONE1'
})

const userObj = ref<LoginUser>({
  user: '',
  password: ''
})

const check = ref<boolean>(false)

const classChange = computed(() => {
  return userObj.value.user !== '' || userObj.value.password !== '' ? 'was-validated' : ''
})

//functions
const loginUser = async () => {
  try {
    check.value = true

    await storeLogin.sessionLoginUser(userObj.value)
    notifyToast({ msg: 'Login feito com sucesso!', typeToast: 'success' }, 900)
    setTimeout(() => {
      router.push({ path: `${storeLogin.userData.permissoes.perm_path}` })
    }, 900)
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa do login', typeToast: 'error' })
      return
    }

    if (error.response.status === 409) {
      console.log(error)
      notifyToast({ msg: 'Por favor envie os dados requisitados', typeToast: 'error' })
      return
    } else if (error.response.status === 400) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

      return
    } else {
      notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
      return
    }
  } finally {
    setTimeout(() => {
      check.value = false
    }, 1800)
  }
}
//

onMounted(() => {
  document.querySelector('body')?.classList.add('login-form')
})
</script>

<style lang="scss" scoped>
// @import '../assets/css/login.scss';</style>
