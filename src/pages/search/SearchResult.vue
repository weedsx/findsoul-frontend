<template>
  <CardList :user-list='userList' :loading='skeletonLoading'/>
  
  <van-empty
      v-show='userList.length===0'
      image="/src/assets/empty.png"
      image-size="80"
      description="找不到哦"
  />

</template>

<script setup lang='ts'>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {searchUsersByTags} from "../../api";
import {showFailToast} from "vant";
import CardList from "../../components/CardList.vue";
import {$ref} from "vue/macros";

let route = useRoute();
let {tags} = route.query;

const userList = ref([]);
let skeletonLoading = $ref<boolean>(true);

onMounted(async () => {
  try {
    let res = await searchUsersByTags(tags);
    if (res.data) {
      userList.value = res.data;
      skeletonLoading = false;
    } else {
      showFailToast("无符合标签的用户");
    }
    console.log(res);
  } catch (e) {
    showFailToast("请求失败");
  }
});
</script>

<style scoped>

</style>