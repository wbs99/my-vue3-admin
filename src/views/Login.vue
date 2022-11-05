<template>
  <div class="login-container">
    <div class="content">
      <t-card>
        <h1> mango admin</h1>
        <t-form :data="loginForm" :rules="rules" ref="form" :colon="true" :label-width="0" class="login-form"
          @submit="onLogin">
          <t-form-item name="username">
            <t-input v-model="loginForm.username" clearable placeholder="请输入用户名">
              <template #prefix-icon>
                <icon name="desktop" />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item name="password">
            <t-input v-model="loginForm.password" type="password" clearable placeholder="请输入密码">
              <template #prefix-icon>
                <icon name="lock-on" />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item>
            <t-button theme="primary" type="submit" block>登录</t-button>
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon, SubmitContext } from 'tdesign-vue-next';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '../store/useAppStore';
import { useUserStore } from '../store/useUserStore';

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const loginForm = reactive({
  username: 'admin',
  password: 'admin123'
})
const rules = {
  username: [
    { required: true, message: '请填写用户名' }
  ],
  password: [
    { required: true, message: '请填写密码' }
  ],
}

const onLogin = async ({ validateResult }: SubmitContext) => {
  if (validateResult === true) {
    await appStore.login(loginForm)
    await userStore.fetchCurrentUser()
    const returnTo = route.query.return_to?.toString()
    router.push(returnTo || '/dashboard')
  }
}
</script>


<style lang="scss" scoped>
.login-container{
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  .content{
    width: 400px;
  }
  h1{
    text-align: center;
  }
  .login-form{
    margin: 20px 0;
  }
}
</style>