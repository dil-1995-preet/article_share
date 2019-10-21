import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'allarticles',
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }, {
      path: '/allarticles',
      name: 'allarticles',
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/allarticles/:id',
      name: 'abc',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "Article" */ './views/Article.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "Login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "Register" */ './views/Register.vue')
    },
    {
      path: '/myarticles',
      name: 'myarticles',
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "myarticles" */ './views/MyArticles.vue')
    },
    {
      path: '/myfavorticles',
      name: 'myfavorticles',
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "myfavarticles" */ './views/MyFavoriteArticles.vue')
    },
    {
      path: '/addarticle',
      name: 'addarticle',
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "addarticle" */ './views/AddArticle.vue')
    },
    {
      path: '/editArticle/:id',
      name: 'editarticle',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "EditArticle" */ './views/EditArticle.vue')
    },
    {
      path: '/addcomment/:id',
      name: 'addcomment',
      // route level code-splitting
      // this generates a separate chunk (allarticles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "AddComment" */ './views/AddComment.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/allarticles'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});
export default router;