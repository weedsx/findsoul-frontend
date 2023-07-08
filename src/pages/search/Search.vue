<template>
  <van-search
      v-model="keyWord"
      show-action
      placeholder="请输入搜索关键词"
      @search="handleSearchTags"
      @clear='handleSearchClear'
  >
    <template #action>
      <div @click="handleSearchTags">搜索</div>
    </template>
  </van-search>
  
  <van-divider>已选标签</van-divider>
  <van-row gutter="10" style='padding: 0 10px'>
    <van-col v-for='tag in activeTags' style='padding-bottom: 5px'>
      <van-tag
          closeable
          size="medium"
          type="primary"
          @close="handleTagClose(tag)"
      >
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  
  <van-divider>可选标签</van-divider>
  <van-tree-select
      v-model:active-id="activeTags"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">根据已选标签筛选</van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter();

// 搜索
const keyWord = ref('');

const handleSearchTags = () => {
  if (!keyWord.value || keyWord.value.trim() === '') {
    handleSearchClear();
  }
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = { ...parentTag };
    tempParentTag.children = tempChildren.filter(childTag => {
      return childTag.text.includes(keyWord.value);
    });
    return tempParentTag;
  });
};

const doSearchResult = () => {
  router.push({
    path: '/search/result',
    query: {
      tags: activeTags.value
    }
  });
};

const handleSearchClear = () => {
  keyWord.value = '';
  console.log(originTagList);
  tagList.value = originTagList;
};

const handleTagClose = (tag) => {
  activeTags.value = activeTags.value.filter(tagId => {
    return tagId !== tag;
  });
};

// 分类选择
/**
 * 已选中的标签
 * @type {Ref<UnwrapRef<*[]>>}
 */
const activeTags = ref([]);
const activeIndex = ref(0);
/**
 * 原标签
 * @type {[{children: [{text: string, id: string},{text: string, id: string},{disabled: boolean, text: string, id: string}], text: string},{children: [{text: string, id: string},{text: string, id: string},{text: string, id: string}], text: string}]}
 */
const originTagList = [
  {
    text: '方向',
    children: [
      { text: 'C++', id: 'C++' },
      { text: 'Java', id: 'Java' },
      { text: '前端', id: '前端' },
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: '南京' },
      { text: '无锡', id: '无锡' },
      { text: '徐州', id: '徐州' },
    ],
  },
  // { text: '福建', disabled: true },
];
/**
 * 基于原标签数据经搜索筛选后的标签
 * @type {Ref<UnwrapRef<[{children: [{text: string, id: string},{text: string, id: string},{disabled: boolean, text: string, id: string}], text: string},{children: [{text: string, id: string},{text: string, id: string},{text: string, id: string}], text: string}]>>}
 */
let tagList = ref(originTagList);


</script>