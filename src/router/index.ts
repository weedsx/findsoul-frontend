import * as VueRouter from 'vue-router';
import store from '../store/index';
import {showNotify} from 'vant';

const routes = [
  {path: '/', component: () => import('/src/pages/Home.vue'), meta: {title: '首页'}},
  {path: '/team', component: () => import('/src/pages/team/Team.vue'), meta: {title: '组队'}},
  {path: '/team/add', component: () => import('/src/pages/team/AddTeam.vue'), meta: {title: '创建队伍'}},
  {path: '/team/update', component: () => import('/src/pages/team/AddTeam.vue'), meta: {title: '编辑队伍'}},
  {path: '/user', component: () => import('/src/pages/user/User.vue'), meta: {title: '用户'}},
  {path: '/user/detail', component: () => import('/src/pages/user/UserDetail.vue'), meta: {title: '用户详情'}},
  {path: '/user/edit', component: () => import('/src/pages/user/UserEdit.vue'), meta: {title: '信息修改'}},
  {
    path: '/user/my/team/:type',
    name: 'myTeamList',
    component: () => import('/src/pages/user/MyTeam.vue'),
    meta: {title: '我的队伍'}
  },
  {path: '/search', component: () => import('/src/pages/search/Search.vue'), meta: {title: '搜索'}},
  {path: '/search/result', component: () => import('/src/pages/search/SearchResult.vue'), meta: {title: '结果'}},
  {path: '/login', component: () => import('/src/pages/Login.vue'), meta: {title: '登录'}},
];

// 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里暂时保持简单
const router = VueRouter.createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
});

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // 如果路径直接是 /login
  if (to.path === '/login') {
    next();
  } else {
    // 先查看 currentUser 有没有
    if (store.state.user.currentUser) {
      next();
    } else {
      // 没有就去取
      try {
        await store.dispatch('user/fetch');
      } catch (e) {
        showNotify({type: 'danger', message: '啥情況，网络有波动哦'});
      }
      // 再查看有没有当前用户，没有就是还没登录
      if (store.state.user.currentUser) {
        next();
      } else {
        next('/login');
      }
    }
  }
});

router.afterEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : 'Find Soul';
});

export default router;