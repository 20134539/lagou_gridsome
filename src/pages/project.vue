<template>
<Layout>
    <div style="min-height: 600px">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
            <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
            <el-button @click="$share()" icon="el-icon-share" type="warning" style="margin-left: 10px" plain circle></el-button>
        </el-card>

        <div v-if="$page.projects.edges&&$page.projects.edges.length>0">
            <el-card shadow="hover" v-for="(item,index) in $page.projects.edges" :key="'pro'+index" style="margin-bottom: 20px" v-if="!item.node.hide">
                <div slot="header">
                    <el-row>
                        <el-col :span="16">
                            <span>
                                <g-link style="text-decoration:none;cursor:pointer" :to='"/project/content/"+item.node.id'>
                                    <i class="el-icon-service"></i>&nbsp;&nbsp; {{item.node.name}}
                                </g-link>
                            </span>
                        </el-col>
                        <el-col :span="8">
                            <div style="text-align: right;">
                                <el-button @click="goGithub(item.node.url)" style="padding: 3px 0" type="text" icon="el-icon-back">前往GitHub</el-button>
                                <el-button @click="$share('/user/project/details/'+item.node.name)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                    最近更新 {{item.node.updateTime}}
                </div>
                <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
                    {{item.node.description}}
                </div>
                <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
                    <el-row>
                        <el-col :span="16" style="padding-top: 5px">
                            <el-tooltip effect="dark" :content="'star '+item.node.stargazersCount" placement="bottom">
                                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
                            </el-tooltip>
                            {{item.node.stargazersCount}}
                            <el-tooltip effect="dark" :content="'watch '+item.node.watchersCount" placement="bottom">
                                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                            </el-tooltip>
                            {{item.node.watchersCount}}
                            <el-tooltip effect="dark" :content="'fork '+item.forksCount" placement="bottom">
                                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                            </el-tooltip>
                            {{item.node.forksCount}}
                        </el-col>
                        <el-col :span="8" style="text-align: right;">
                            <el-tag size="small" type="danger" v-if="item.node.license">{{item.node.license}}</el-tag>
                            <el-tag size="small" type="success">{{item.node.language}}</el-tag>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <div style="text-align: center">
                <pager :info="$page.projects.pageInfo"></pager>
            </div>
        </div>

        <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!$page.projects.edges||$page.projects.edges.length==0">
            <font style="font-size: 30px;color:#dddddd ">
                <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
            </font>
        </el-card>
    </div>
</Layout>
</template>

<page-query>
query($page: Int){
  	projects: allStrapiProject(perPage: 2, page: $page) @paginate{
		pageInfo{
	  		currentPage
	  		totalPages
		}
		edges{
			node{
				id
				name
				url
				description
				stargazersCount
				watchersCount
				forksCount
				license
				language
				content
			}
		}
  	}
}
</page-query>

<script>
    import { Pager } from "gridsome"
    export default {
        components: {
            Pager
        },
        data() {
            return {
                searchKey: ""
            }
        },
        methods: {
            search() {
                for (let i = 0; i < this.$page.projects.edges.length; i++) {
                    this.$page.projects.edges[i].node.hide = this.$page.projects.edges[i].node.name.indexOf(this.searchKey) < 0
				}
				this.$forceUpdate()
            },
            goGithub(url) {
                window.open(url)
            }
        }
    }
</script>