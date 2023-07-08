<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamInfo.name"
          name="name"
          label="队伍名称"
          placeholder="队伍名称"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      
      <van-field
          v-model="addTeamInfo.description"
          rows="2"
          autosize
          label="描述"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述"
          show-word-limit
      />
      
      <van-field
          v-model='computedExpireDate'
          is-link
          readonly
          name="datetimePicker"
          label="过期日期"
          placeholder="点击选择过期日期"
          @click="showDatePicker = true"
      />
      <van-popup v-model:show="showDatePicker" position="bottom">
        <van-date-picker
            v-model="expireDate"
            @confirm="showDatePicker = false"
            @cancel='showDatePicker = false'
            title="请选择过期日期"
            :min-date="minDate"
        />
      </van-popup>
      <van-field
          v-model='computedExpireTime'
          is-link
          readonly
          name="datetimePicker"
          label="过期时间"
          placeholder="点击选择过期时间"
          @click="showTimePicker = true"
      />
      <van-popup v-model:show="showTimePicker" position="bottom">
        <van-time-picker
            v-model="expireTime"
            @confirm="showTimePicker = false"
            @cancel='showTimePicker = false'
            title="请选择过期时间"
            :min-time="minTime"
        />
      </van-popup>
      
      <van-field name="stepper" label="队伍最大人数">
        <template #input>
          <van-stepper v-model="addTeamInfo.maxNum" min='2' max='20'/>
        </template>
      </van-field>
      
      <van-field name="radio" label="队伍类型">
        <template #input>
          <van-radio-group v-model="addTeamInfo.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      
      <van-field
          v-if="addTeamInfo.status === '2'"
          v-model="addTeamInfo.password"
          type="password"
          name="password"
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
import { computed, onMounted, ref } from "vue";
import moment from "moment/moment.js";
import { addTeam, getTeamById, updateTeam } from "../../api/index";
import { showFailToast, showSuccessToast } from "vant";
import { useRoute, useRouter } from "vue-router";

let router = useRouter();
let route = useRoute();

const initTeam = {
  "description": "",
  "expireTime": "",
  "maxNum": 0,
  "name": "",
  "password": "",
  "status": "0"
};

const addTeamInfo = ref({ ...initTeam });
// 过期时间相关
const showDatePicker = ref(false);
const showTimePicker = ref(false);
// todo: 刷新时间
const minDate = new Date();

const expireTime = ref([]);
const expireDate = ref([]);

const computedExpireDate = computed(() => {
  let expireDateStr = expireDate.value.toString();
  expireDateStr = expireDateStr.replaceAll(",", "-");
  return expireDateStr;
});
const computedExpireTime = computed(() => {
  let expireTimeStr = expireTime.value.toString();
  expireTimeStr = expireTimeStr.replaceAll(",", ":");
  return expireTimeStr;
});
const minTime = computed(() => {
  return moment().format("HH:mm:ss");
});

onMounted(async () => {
  if (route.query?.teamId) {
    let res = await getTeamById(route.query?.teamId);
    if (res.data) {
      addTeamInfo.value = res.data;
    }
  }
});

async function handleAddTeam() {
  let teamInfo = {
    ...addTeamInfo.value,
    status: Number(addTeamInfo.value.status),
    expireTime: moment(computedExpireDate.value + " " + computedExpireTime.value).toDate()
  };
  try {
    let res = await addTeam(teamInfo);
    if (res.code === 200 && res.data) {
      showSuccessToast("创建成功");
      await router.push({
        path: "/team",
        replace: true
      });
    }
  } catch (e) {
    showFailToast("创建失败");
  }
}

async function handleUpdateTeam() {
  let teamInfo = {
    ...addTeamInfo.value,
    status: Number(addTeamInfo.value.status),
    expireTime: moment(computedExpireDate.value + " " + computedExpireTime.value).toDate()
  };
  try {
    let res = await updateTeam(teamInfo);
    if (res.code === 200 && res.data) {
      await router.push({
        path: "/team",
        replace: true
      });
    }
  } catch (e) {
    showFailToast(e.message);
  }
}

const onSubmit = async () => {
  if (route.query?.teamId) {
    await handleUpdateTeam();
  } else {
    await handleAddTeam();
  }
};
</script>

<style scoped>

</style>