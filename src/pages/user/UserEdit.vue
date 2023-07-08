<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editContent.currValue"
        :name="editContent.editKey"
        :label="editContent.editTitle"
        :placeholder="`请编辑${editContent.editTitle}`"
        :rules="[{ required: true, message: '请填写' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { updateUser } from '../../api';
import { showFailToast } from 'vant';
import { useStore } from 'vuex';

let route = useRoute();
let store = useStore();

console.log(route.query);
const { editTitle, editKey, currValue } = route.query;

const editContent = ref({
  editTitle,
  editKey,
  currValue
});
const onSubmit = async (values) => {
  let id = store.state.user.currentUser?.id;
  try {
    await updateUser({
      id,
      [editKey]: editContent.value.currValue
    });
  } catch (e) {
    showFailToast('更新失败');
  }
};
</script>

<style scoped>

</style>