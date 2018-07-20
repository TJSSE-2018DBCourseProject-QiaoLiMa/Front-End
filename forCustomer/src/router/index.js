import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/passengersearch'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/passengersearch',
                    component: resolve => require(['../components/page/CustomerSearch/PassengerTransportSearch.vue'], resolve),
                    meta: { title: '客运查询' }
                },
                {
                    path: '/Freightsearch',
                    component: resolve => require(['../components/page/CustomerSearch/FreightSearch.vue'], resolve),
                    meta: { title: '货运查询' }
                },
                {
                    path: '/PassengerOrder',
                    component: resolve => require(['../components/page/CustomerOrder/PassengerOrder.vue'], resolve),
                    meta: { title: '客运订单' }
                },
                {
                    path: '/FreightOrder',
                    component: resolve => require(['../components/page/CustomerOrder/FreightOrder.vue'], resolve),
                    meta: { title: '货运订单' }
                },
                {
                    path: '/me',
                    component: resolve => require(['../components/page/Me.vue'], resolve),
                    meta: { title: '我的信息' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
