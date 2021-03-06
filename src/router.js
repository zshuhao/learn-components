import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/form',
            name: 'FormIndex',
            component: () => import(/* webpackChunkName: "about" */ './views/form/Index.vue')
        },
        {
            path: '/checkbox',
            name: 'CheckoutIndex',
            component: () => import(/* webpackChunkName: "about" */ './views/checkbox/Index.vue')
        },
        {
            path: '/display',
            name: 'Display',
            component: () => import(/* webpackChunkName: "about" */ './views/display.vue')
        },
        {
            path: '/table',
            name: 'table',
            component: () => import(/* webpackChunkName: "about" */ './views/table-render.vue')
        },
        {
            path: '/table-slot',
            name: 'tableSlot',
            component: () => import(/* webpackChunkName: "about" */ './views/table-slot.vue')
        },
        {
            path: '/tree',
            name: 'tree',
            component: () => import(/* webpackChunkName: "about" */ './views/tree.vue')
        }
    ]
})
