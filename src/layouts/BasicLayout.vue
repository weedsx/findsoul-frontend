<template>
  <van-nav-bar
      v-show='route.path!=="/login"'
      :title="route.meta.title"
      right-text="按钮"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  
  <van-nav-bar title="登录" v-show='route.path === "/login"'/>
  
  <div id="content">
    <RouterView/>
  </div>
  
  <van-tabbar v-show='route.path!=="/login"' route v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="home" to='/'>主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" to='/team'>队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" to='/user'>个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang='ts'>
import {ref} from 'vue';
import {showToast} from 'vant';
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search');
};

const active = ref('home');
const onChange = (index) => showToast(`标签 ${index}`);

</script>

<style scoped>
#content {
  padding-top: 56px;
  padding-bottom: 90px;
}
</style>