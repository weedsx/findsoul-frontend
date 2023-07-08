<template>
  <van-search v-model="searchText" placeholder="请输入搜索关键词 (根据名称或描述哦~)" @search='doSearch'/>
  
  <TeamList :team-list='teamList'/>
  
  <van-empty v-if='showVanEmpty' image="search" description="没有找到队伍哦"/>
  
  <van-button class='add-team-button' plain size='small' block type="primary" @click='addTeam' icon='plus'/>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getTeamList } from "../../api/index";
import { showFailToast } from "vant";

let router = useRouter();

const teamList = ref([]);
const showVanEmpty = ref(false);

const fetchTeamList = async () => {
  try {
    let res = await getTeamList({});
    if (res.code === 200 && res.data.length > 0) {
      teamList.value = res.data;
      showVanEmpty.value = false;
    } else {
      showVanEmpty.value = true;
    }
  } catch (e) {
    showFailToast("是不是断网啦");
  }
};

onMounted(() => {
  fetchTeamList();
});

const addTeam = () => {
  router.push({
    path: "/team/add"
  });
};

const searchText = ref("");

const doSearch = async (val) => {
  let keyWord = val.trim();
  try {
    let res = await getTeamList({ searchText: keyWord });
    if (res.code === 200) {
      teamList.value = res.data;
      showVanEmpty.value = true;
    } else {
      showFailToast(res.description === "" ?? res.message);
      showVanEmpty.value = false;
    }
  } catch (e) {
    showFailToast("出了点意外");
  }
};
</script>
