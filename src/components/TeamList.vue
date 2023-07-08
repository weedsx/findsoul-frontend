<template>
  <van-card
      v-for='team in props.teamList'
      :key='team?.id'
      :title="team?.name"
      :desc="team?.description"
      thumb="/src/assets/soul.png"
      currency=""
  >
    <template #num>
      <img src='/src/assets/my.png' alt='' v-if="currentUser?.id === team.creator.id">
    </template>
    <template #tags>
      <van-tag plain :type="tagType(team.status)" style="margin: 1px 0">
        {{ tagContent(team.status) }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        队伍人数
        <van-progress :percentage="(team.hasJoinedNum/team.maxNum)*100"
                      :pivot-text="`${team.hasJoinedNum}/${team.maxNum}`"
                      stroke-width="3px"
                      pivot-color="#a7c9f6"
                      color='#a7c9f6'
                      style='margin: 8px 0 12px 0'
        />
      </div>
      <div v-if="team.expireTime">
        {{ "过期时间: " + moment(team.expireTime).format("YYYY-MM-DD HH:mm") }}
      </div>
      <div>
        {{ "创建于: " + moment(team.createTime).format("YYYY-MM-DD HH:mm") }}
      </div>
    </template>
    <template #footer>
      <!-- todo: 加入、解散、修改队伍 -->
      <van-button v-if='currentUser?.id !== team.creator.id && !team.hasJoined'
                  size="mini" type='primary' plain hairline icon='add-o'
                  @click='doJoinTeam(team.id, team.status)'>
        加入队伍
      </van-button>
      <van-button v-if="route.name === 'myTeamList' && currentUser?.id === team.creator.id"
                  size="mini" type='primary' plain hairline
                  @click="handleUpdateTeam(team)"
      >
        <img src='/src/assets/update.png' style='height: 14px; width: 12px' alt='update'>
        更新队伍
      </van-button>
      <van-button v-if="route.name === 'myTeamList' && currentUser?.id === team.creator.id"
                  size="mini" type='danger' plain hairline icon='close'
                  @click="handleQuitTeam(team.id)"
      >
        解散队伍
      </van-button>
      <van-button v-if='currentUser?.id !== team.creator.id && team.hasJoined'
                  size="mini" type='danger' plain hairline
                  @click="handleQuitTeam(team.id)"
      >
        <img src='/src/assets/quit.png' style='height: 14px; width: 12px' alt='quit'>
        退出队伍
      </van-button>
    </template>
  </van-card>
  
  <van-dialog v-model:show="showPasswordDialog" @confirm="handleTeamPassword"
              title="请输入队伍密码" show-cancel-button>
    <van-field v-model="teamPassword"
               autofocus
               size="large"
               type="password"
               input-align="center"/>
  </van-dialog>
</template>

<script setup lang='ts'>
import {defineProps} from "vue";
import {withDefaults} from "vue/dist/vue";
import {TeamType} from "../models/team";
import moment from "moment/moment.js";
import {TeamStatusConstant} from "../constants/teamStatus";
import {joinTeam, quitTeam} from "../api";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {$ref} from "vue/macros";

let store = useStore();
let route = useRoute();
let router = useRouter();

interface TeamCardListProps {
  teamList?: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: () => []
});

let joinTeamId = $ref("");

const doJoinTeam = async (teamId, teamStatus) => {
  if (teamStatus && teamStatus === 2) {
    teamPassword = "";
    showPasswordDialog = true;
    joinTeamId = teamId;
  } else {
    try {
      let res = joinTeam({teamId});
      if (res.code === 200) {
        showSuccessToast("入队啦");
      } else {
        showFailToast(res.description);
      }
    } catch (e) {
      showFailToast("出了点意外");
    }
  }
};

const handleUpdateTeam = (team) => {
  router.push({
    path: "/team/update",
    query: {teamId: team.id}
  });
};
let currentUser = store.state.user.currentUser;

let showPasswordDialog = $ref(false);
let teamPassword = $ref("");


const handleTeamPassword = async () => {
  let res = await joinTeam({teamId: joinTeamId, password: teamPassword});
  if (res.data) {
    showSuccessToast("已入队");
  }
};

const handleQuitTeam = async (teamId) => {
  await quitTeam({teamId});
};


const tagType = (status) => {
  switch (status) {
    case 0:
      return "success";
    case 1:
      return "primary";
    case 2:
      return "danger";
    default:
      return "primary";
  }
};
const tagContent = (status) => {
  switch (status) {
    case 0:
      return TeamStatusConstant["0"];
    case 1:
      return TeamStatusConstant["1"];
    case 2:
      return TeamStatusConstant["2"];
    default:
      return TeamStatusConstant["0"];
  }
};
</script>

<style scoped>
:deep(.van-image__img) {
  height: 88px;
  width: 88px;
}
</style>