import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import Detail from '@/views/Detail.vue';
import AddLabels from '@/views/AddLabels.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/detail'
  },
  {
    path: '/detail',
    component: Detail,
    props: (route) => ({ query: route.query.tab })
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/addLabels',
    component: AddLabels
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
