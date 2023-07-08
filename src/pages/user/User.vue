<template>
  <van-cell-group title='个人信息'>
    <van-cell is-link to='/user/detail'>
      <template #title>
        <van-icon name="user-o">
          {{ user?.userName }}
        </van-icon>
      </template>
      <template #value>
        <img :src='user.avatarUrl' style='width: 40px' alt='avatar'>
      </template>
      <template #label>
        {{ user.userAccount }}
      </template>
    </van-cell>
  </van-cell-group>
  
  <van-cell-group title='我的队伍'>
    <van-cell is-link @click='toMyCreatedTeam("CreatedTeam")'>
      <template #title>
        <van-icon name="manager-o">我创建的</van-icon>
      </template>
    </van-cell>
    <van-cell is-link @click='toMyJoinedTeam("JoinedTeam")'>
      <template #title>
        <van-icon name="friends-o">我加入的</van-icon>
      </template>
    </van-cell>
  </van-cell-group>

</template>

<script setup lang='ts'>
import {useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import {getMyCreatedTeam} from '../../api';
import {showFailToast} from 'vant';

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

const toMyCreatedTeam = (type) => {
  router.push({
    name: 'myTeamList',
    params: {
      type
    }
  });
};

const toMyJoinedTeam = (type) => {
  router.push({
    name: 'myTeamList',
    params: {
      type
    }
  });
};

</script>