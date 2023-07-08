<template>
  <van-cell title="头像" is-link>
    <img :src='user.avatarUrl' style='width: 40px' alt='avatar'>
  </van-cell>
  <van-cell title="昵称" is-link :value="user.userName"
            @click='edit("昵称","username",user.userName)'/>
  <van-cell title="账号" is-link :value="user.userAccount"
            @click='edit("账号","userAccount",user.userAccount)'/>
  <van-cell title="性别" is-link :value="user.gender===1?'男':'女'"/>
  <van-cell title="手机号" is-link :value="user.phone"
            @click='edit("手机号","phone",user.phone)'/>
  <van-cell title="邮箱" is-link :value="user.email"
            @click='edit("邮箱","email",user.email)'/>
  <van-cell title="编号" :value="user.planetCode"/>
  <!--  <van-cell title="注册日期" :value="user.createTime)"/>-->
</template>

<script setup lang='ts'>
import {useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';
import {useStore} from 'vuex';

let router = useRouter();
let store = useStore();

let user = ref({
  userName: '',
  userAccount: '',
  avatarUrl: '',
  gender: 0,
  phone: '',
  email: '',
  userStatus: 0,
  planetCode: '',
});

onMounted(() => {
  let currentUser = store.state.user.currentUser;
  user.value = currentUser;
});

const edit = (editTitle: string, editKey: string, currValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editTitle,
      editKey,
      currValue
    }
  });
};
</script>