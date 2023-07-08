<template>
  <van-cell center>
    <template #title>
      <van-icon name="aim">
        匹配模式
      </van-icon>
      <van-stepper v-model="matchNum" min='5' max='20' style='margin-left: 15px'/>
    </template>
    <template #right-icon>
      <van-switch :loading='loading' v-model="isMatchModel"/>
    </template>
  </van-cell>
  
  <CardList :userList='userList' :loading='skeletonLoading'/>
  
  <van-empty
      v-show='showVanEmpty'
      image="/src/assets/empty.png"
      image-size="80"
      description="找不到哦"
  />

</template>

<script setup lang='ts'>
import {watchEffect} from 'vue';
import {showFailToast} from 'vant';
import {matchUsers, recommendUsers} from '../api';
import CardList from '../components/CardList.vue';
import {$ref} from 'vue/macros';

let userList = $ref([]);

let showVanEmpty = $ref(false);

let isMatchModel = $ref<boolean>(false);
let loading = $ref<boolean>(false);
let matchNum = $ref<number>(5);
let skeletonLoading = $ref<boolean>(true);

const fetchRecommendUsers = async () => {
  try {
    userList = [];
    skeletonLoading = true;
    let res = await recommendUsers(1, 10);
    if (res.data) {
      userList = res.data.records;
      showVanEmpty = false;
      skeletonLoading = false;
    } else {
      showFailToast('无符合标签的用户');
      showVanEmpty = true;
      skeletonLoading = false;
    }
  } catch (e) {
    showFailToast('请求失败');
  }
};

const fetchMatchUsers = async () => {
  try {
    loading = true;
    skeletonLoading = true;
    userList = [];
    let res = await matchUsers(matchNum);
    if (res.data) {
      userList = res.data;
      showVanEmpty = false;
      loading = false;
      skeletonLoading = false;
    } else {
      showFailToast('无符合标签的用户');
      showVanEmpty = true;
      loading = false;
      skeletonLoading = false;
    }
  } catch (e) {
    showFailToast('请求失败');
  }
};

watchEffect(() => {
  if (isMatchModel) {
    fetchMatchUsers();
  } else {
    fetchRecommendUsers();
  }
});
</script>

<style scoped>

</style>