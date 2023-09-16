# 技术栈

- Vue3
- Vue-Router
- VantUI
- Vite
- Axios

# 技术难点

## axios URL 参数的列表传参

URL 参数如果是一个数组，需要进行规整，可以使用 [qs 库](https://www.npmjs.com/package/qs)，`yarn add qs`，然后在 axios 请求时加上

```typescript
import request from '/src/plugins/axios-config';
import qs from 'qs';

export function searchUsersByTags(tagList) {
  return request({
    url: '/user/search/tags',
    params: {tagList},
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false});
    }
  });
}
```

## axios 传参带上后端的会话凭证

```typescript
axiosInstance.defaults.withCredentials = true; // 表示跨域请求时是否需要使用凭证
```

这样后端才能凭借会话 cookie 找到对应的 Session

后端同时也要允许证书

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
