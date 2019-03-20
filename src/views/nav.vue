<template>
<div class="show">
    <Header></Header>
    <el-row>
        <el-col :span="4" class="nav">
            <el-menu @select="menuSelect" background-color="#432E31" text-color="#fff" active-text-color="#ffd04b" class="sider">
                <template v-for="item in menus">

                    <el-menu-item v-if="!item.children" :index="item.url" :key="item.name">
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>

                    <el-submenu v-else :key="item.name" :index='item.id'>
                        <template slot="title">
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item v-for="item2 in item.children" :key="item2.name" :index="item2.url">
                            <span slot="title" style="padding-left:30px;font-weight: normal">{{item2.name}}</span>
                        </el-menu-item>
                    </el-submenu>

                </template>
            </el-menu>
        </el-col>
        <el-col :span="20" class="view">
            <router-view></router-view>
        </el-col>
    </el-row>
</div>
</template>

<script>
//引入路由
import menus from '../menus.js'
import Header from '../components/Header.vue'
export default {
    data() {
        return {
            menus: menus
        }
    },
    methods: {
        menuSelect(index) {
            this.$router.push({
                path: index
            })
        }
    },
    components: {
        Header
    }
}
</script>

<style lang="less" scoped>
.show {
    .nav {
        min-height: 500px;
        .sider{
            min-height: 606px;
        }
    }

    .view {
        padding: 20px;
    }
}
</style>
