import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CRUDTeacher from '../views/CrudTeacher.vue'
import create from '../views/CreateTeacher.vue'
import HomeAdmin from '../views/HomeAdmin.vue'
import TeacherEdit from '../views/TeacherEdit.vue'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    // meta: {
    //   isPublic : true,
    //   parim : 
    // },
    meta: { allowedRoles: ['Student'] },
    // beforeEnter: (to, from, next) => {
    //   if (store.state.authenticated) {
    //     next();
    //   } else {
    //     next('/');
    //   }
    // }
  },
  {
    path: '/HomeAdmin',
    name: 'HomeAdmin',
    component: HomeAdmin,
    meta: { allowedRoles: ['Admin'] },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { allowedRoles: ['Student'] },
  },
  {
    path: '/CRUDTeacher',
    name: 'CRUDTeacher',
    component: CRUDTeacher,
    meta: { allowedRoles: ['Admin'] },
  },
  {
    path: '/teacher/create',
    name: 'create',
    component: create,
    meta: { allowedRoles: ['Admin'] },
  },
  {
    path: '/teacher/:id/edit',
    name: 'TeacherEdit',
    component: TeacherEdit,
    meta: { allowedRoles: ['Admin'] },
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiredRoles = to.meta.allowedRoles;
  console.log('Required Roles:', requiredRoles);
  console.log('Authenticated:', store.state.authenticated);

  if (requiredRoles) {
    if (store.state.authenticated) {
      if (requiredRoles[0] === 'Student') {
        next();
      } else if (requiredRoles[0] === 'Admin') {
        next();
      }
    } else {
      next('/');
    }
  } else {
    next();
  }
  
});


export default router
