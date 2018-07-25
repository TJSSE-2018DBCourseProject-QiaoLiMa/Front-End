<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-star-on',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'attendanceStatistics',
                        title: '统计',
                        subs: [

                            {
                                index: 'flowStatistics',
                                title: '  站点流量'
                            },

                            {
                                index: 'attendanceStatistics',
                                title: '  车次上座率'
                            },
                            {
                                index: 'punctualityRateStatistics',
                                title: '  车次准点率'
                            }

                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'station',
                        title: '站点'
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'route',
                        title: '铁路线'
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'train',
                        title: '列车'

                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'timeTable',
                        title: '时刻表',
                        subs: [
                            {
                                index: 'timeTable',
                                title: '  固定时刻表'
                            },
                            {
                                index: 'dynamicInformationTable',
                                title: '  动态信息表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: 'priceList',
                        title: '价格表'
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'employee',
                        title: '员工',
                        subs: [
                            {
                                index: 'employee',
                                title: '员工',
                            },
                            {
                                index: 'crew',
                                title: '乘务组',
                            }
                        ]

                    },
                    {
                        icon: 'el-icon-error',
                        index: 'order',
                        title: '订单'
                    },
                    {
                        icon: 'el-icon-error',
                        index: 'charts',
                        title: '参考页面',
                        subs: [
                            {
                                index: 'charts',
                                title: 'charts'
                            },
                            {
                                index: 'form',
                                title: 'form'
                            },
                            {
                                index: 'table',
                                title: 'table'
                            },
                            {
                                index: 'dashboard2',
                                title: 'dashboard'
                            },
                            {
                                index: 'drag',
                                title: 'drag'
                            },
                            {
                                index: 'markdown',
                                title: 'markdown'
                            },
                            {
                                index: 'permission',
                                title: 'permisstion'
                            },
                            {
                                index: 'tabs',
                                title: 'tabs'
                            },
                            {
                                index: 'upload',
                                title: 'upload'
                            },
                            {
                                index: 'editor',
                                title: 'editor'
                            }
                        ]
                    }


                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
