import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import Detail from '@/views/Detail.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/detail'
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '*',
    component: NotFound
  },
];

const router = new VueRouter({
  routes
});

export default router;
