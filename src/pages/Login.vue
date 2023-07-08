<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import { ref } from 'vue';
import { login } from '../api';
import { useRouter } from 'vue-router';
import { showFailToast } from 'vant';

let router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async (values) => {
  const { userAccount, userPassword } = values;
  try {
    let res = await login(userAccount, userPassword);
    if (res.data) {
      await router.replace('/');
    }
  } catch (e) {
    showFailToast('账号密码错误');
  }
};
</script>

<style scoped>

</style>