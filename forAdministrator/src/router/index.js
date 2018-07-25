import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '首页' }
                },
                {
                    path: '/me',
                    component: resolve => require(['../components/page/Me.vue'], resolve),
                    meta: { title: '我的信息' }
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/User.vue'], resolve),
                    meta: { title: '个人信息' }
                },

                {
                    path: '/flowStatistics',
                    component: resolve => require(['../components/page/statistics/FlowStatistics.vue'], resolve),
                    meta: { title: '站点流量' }
                },
                {
                    path: '/attendanceStatistics',
                    component: resolve => require(['../components/page/statistics/AttendanceStatistics.vue'], resolve),
                    meta: { title: '上座率' }
                },
                {
                    path: '/punctualityRateStatistics',
                    component: resolve => require(['../components/page/statistics/PunctualityRateStatistics.vue'], resolve),
                    meta: { title: '准点率' }
                },
                {
                    path: '/station',
                    component: resolve => require(['../components/page/station/Station.vue'], resolve),
                    meta: { title: '站点' }
                },
                {
                    path: '/train',
                    component: resolve => require(['../components/page/train/Train.vue'], resolve),
                    meta: { title: '列车' }
                },
                {
                    path: '/timeTable',
                    component: resolve => require(['../components/page/timeTable/TimeTable.vue'], resolve),
                    meta: { title: '固定时刻表' }
                },
                {
                    path: '/dynamicInformationTable',
                    component: resolve => require(['../components/page/timeTable/DynamicInformationTable.vue'], resolve),
                    meta: { title: '动态信息表' }
                },
                {
                    path: '/employee',
                    component: resolve => require(['../components/page/employee/Employee.vue'], resolve),
                    meta: { title: '员工' }
                },
                {
                    path: '/crew',
                    component: resolve => require(['../components/page/employee/Crew.vue'], resolve),
                    meta: { title: '乘务组' }
                },
                {
                    path: '/order',
                    component: resolve => require(['../components/page/order/Order.vue'], resolve),
                    meta: { title: '客运订单' }
                },
                {
                    path: '/freightOrder',
                    component: resolve => require(['../components/page/order/FreightOrder.vue'], resolve),
                    meta: { title: '货运订单' }
                },
                {
                    path: '/route',
                    component: resolve => require(['../components/page/route/Route.vue'], resolve),
                    meta: { title: '铁路线' }
                },{
                    path: '/priceList',
                    component: resolve => require(['../components/page/priceList/PriceList.vue'], resolve),
                    meta: { title: '客运价格表' }
                },
                {
                    path: '/freightpriceList',
                    component: resolve => require(['../components/page/priceList/FreightPriceList.vue'], resolve),
                    meta: { title: '货运价格表' }
                },
                {
                    path: '/dashboard2',
                    component: resolve => require(['../components/reference/Dashboard2.vue'], resolve),
                    meta: { title: '首页（参考）' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/reference/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/reference/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/reference/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/reference/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/reference/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/reference/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/reference/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/reference/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/reference/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
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
