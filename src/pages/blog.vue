<template>
    <Layout>
        <div style="min-height: 600px">
            <el-card shadow="never" style="margin-bottom: 20px">
                <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
                <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
                <el-button @click="$share()" style="margin-left: 10px" icon="el-icon-share" type="warning" plain circle></el-button>
                <!-- <el-button type="primary" icon="el-icon-edit" round plain style="float: right;" @click="goAdd">写博文</el-button> -->
            </el-card>

            <div v-if="$page.post.edges&&$page.post.edges.length>0">
                <el-card shadow="hover" v-for="(item,index) in $page.post.edges" :key="'p'+index" style="margin-bottom: 20px" v-if="!item.node.hide">
                    <div slot="header">
                        <el-row>
                            <el-col :span="16">
                                <span>
                                    <g-link style="text-decoration:none;cursor:pointer" :to='"/blog/post/"+item.node.id'>
                                        <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{item.node.title}}
                                    </g-link>
                                </span>
                            </el-col>
                            <el-col :span="8">
                                <div style="text-align: right;">
                                    <el-button @click="$share('/user/blog/details/'+item.node.id)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                                    <!-- <el-button @click="editBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token"></el-button> -->
                                    <!-- <el-button @click="deleteBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token"></el-button> -->
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                        最近更新 {{item.node.updated_at}}
                    </div>
                    <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
                        {{item.node.desc}}
                    </div>
                </el-card>
                <div style="text-align: center">
                    <pager :info="$page.post.pageInfo"></pager>
                </div>
            </div>

            <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!$page.post.edges||$page.post.edges.length==0">
                <font style="font-size: 30px;color:#dddddd ">
                    <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
                </font>
            </el-card>
        </div>
    </Layout>
</template>
<page-query>
query($page: Int){
  	post: allStrapiPost(perPage: 2, page: $page) @paginate{
		pageInfo{
	  		currentPage
	  		totalPages
		}
		edges{
			node{
				id
				title
				content
				desc
				updated_at
				published_at
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
                for (let i = 0; i < this.$page.post.edges.length; i++) {
                    this.$page.post.edges[i].node.hide = this.$page.post.edges[i].node.title.indexOf(this.searchKey) < 0
                }
                this.$forceUpdate()
            },
        }
    }
</script>