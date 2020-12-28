<template>
<Layout>
    <div style="min-height: 600px">
        <el-card shadow="never" style="min-height: 400px">
            <div slot="header">
                <el-row>
                    <el-col :span="12">
                        <span>{{$page.post.title}}</span>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right;">
                            <el-button @click="$share()" style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
                            <!-- <el-button @click="edit" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token">编辑</el-button> -->
                            <g-link to="/blog">
                                <el-button style=" padding: 3px 0" type="text" icon="el-icon-more-outline">更多博客</el-button>
                            </g-link>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                发布 {{$page.post.published_at}}
                <br> 更新 {{$page.post.updated_at}}
            </div>
            <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
                <pre style="font-family: '微软雅黑'">{{$page.post.desc}}</pre>
            </div>
            <div v-html="md2html($page.post.content)" class="markdown-body" style="padding-top: 20px"></div>
        </el-card>
    </div>
</Layout>
</template>

<page-query>
query($id: ID!){
    post: strapiPost(id: $id){
        id
        title
        content
        desc
        updated_at
        published_at
    }
}
</page-query>

<script>
import MarkdownIt from "markdown-it"
const md = new MarkdownIt()
    export default { 
        methods: {
            md2html(markdown) {
                return md.render(markdown)
            }
        }
    }
</script>