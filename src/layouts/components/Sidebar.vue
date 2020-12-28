<template>
    <div>
        <el-card shadow="never">
            <el-menu :default-active="active">
                <el-menu-item index="/">
                    <g-link to="/">
                        <i class="el-icon-star-off"></i>
                        <span slot="title">最新动态</span>
                    </g-link>
                </el-menu-item>
                <el-menu-item index="/social">
                    <g-link to="/social">
                        <i class="el-icon-mobile-phone"></i>
                        <span slot="title">社交圈</span>
                    </g-link>
                </el-menu-item>
                <el-menu-item index="/blog">
                    <g-link to="/blog">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">博客列表</span>
                    </g-link>
                </el-menu-item>
                <el-menu-item index="/project">
                    <g-link to="/project">
                        <i class="el-icon-service"></i>
                        <span slot="title">开源项目</span>
                    </g-link>
                </el-menu-item>
            </el-menu>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: "/",
                parentUrl: "",
                menuList: []
            }
        },
        mounted() {
            this.active = location.pathname
        },
        methods: {
        }
    }
</script>

<style scoped>
a{
    color: inherit;
}
</style>