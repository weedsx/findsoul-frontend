<template>
  <div style='margin-bottom: 30px'>
    <van-skeleton title avatar :row="3"
                  :loading="props.loading"
                  style='margin: 10px 0'
    >
      <van-card
          v-for='user in props.userList'
          :key='user.id'
          :desc="user.profile"
          :title="`${user.userName}【编号：${user.planetCode}】`"
          :thumb="user.avatarUrl"
      >
        <template #tag>
          <div style='margin-top: 5px'>
            <van-tag v-if='user.gender === 1' mark type="primary">♂</van-tag>
            <van-tag v-if='user.gender === 0' mark type="danger">♀</van-tag>
          </div>
        </template>
        <template #tags>
          <van-tag plain type="primary" v-for='tag in user.tags' style='margin: 3px'>
            {{ tag }}
          </van-tag>
        </template>
        <template #footer>
          <van-button size="mini">联系我</van-button>
        </template>
      </van-card>
    </van-skeleton>
    <van-skeleton title avatar :row="3"
                  :loading="props.loading"
                  style='margin: 10px 0'/>
    <van-skeleton title avatar :row="3"
                  :loading="props.loading"
                  style='margin: 10px 0'/>
  </div>
  
  <van-back-top bottom='70'/>

</template>

<script setup lang='ts'>
import {defineProps} from 'vue';
import {withDefaults} from 'vue/dist/vue';
import {UserType} from '../models/user';

interface UserCardListProps {
  loading?: boolean;
  userList?: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  userList: () => [],
  loading: true
});
</script>

<style scoped>

</style>