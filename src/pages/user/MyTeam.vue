<template>
  <!--  <van-search v-model="searchText"-->
  <!--              placeholder="请输入搜索关键词 (根据名称或描述哦~)"-->
  <!--              @search='doSearch'/>-->
  <van-sticky :offset-top="40">
    <van-divider>{{ route.params.type === "CreatedTeam" ? "创建的队伍" : "加入的队伍" }}</van-divider>
  </van-sticky>
  
  <TeamList :team-list='teamList'/>
  
  <van-empty v-if='showVanEmpty' image="search" description="没有找到队伍哦"/>

</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getMyCreatedTeam, getMyJoinedTeam } from "../../api/index";
import { showFailToast } from "vant";

let route = useRoute();
let router = useRouter();

const teamList = ref([]);
const showVanEmpty = ref(false);


const fetchTeamList = async () => {
  try {
    let res;
    if (route.params.type === "CreatedTeam") {
      res = await getMyCreatedTeam();
    } else {
      res = await getMyJoinedTeam();
    }
    if (res.code === 200 && res.data?.length !== 0) {
      teamList.value = res.data.filter(t => t.hasJoined);
      showVanEmpty.value = false;
    } else {
      showVanEmpty.value = true;
    }
  } catch (e) {
    showFailToast(e.message);
  }
};

onMounted(() => {
  fetchTeamList();
});

// const searchText = ref('');
//
// const doSearch = async (val) => {
//   let keyWord = val.trim();
//   try {
//     let res = await getTeamList({ searchText: keyWord });
//     if (res.code === 200 && res.data?.length !== 0) {
//       teamList.value = res.data;
//       showVanEmpty.value = false;
//     } else {
//       showFailToast(res.description === '' ?? res.message);
//       teamList.value = [];
//       showVanEmpty.value = true;
//     }
//   } catch (e) {
//     showFailToast('出了点意外');
//   }
// };
</script>

<style scoped>

</style>