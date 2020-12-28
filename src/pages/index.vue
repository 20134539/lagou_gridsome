<template>
    <Layout>
		<div style="min-height: 600px">
			<el-card shadow="never" style="min-height: 400px" v-if="$page.post.edges[0].node.id">
				<div slot="header">
					<span>{{$page.post.edges[0].node.title}}</span>
				</div>
				<div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
					发布 {{$page.post.edges[0].node.published_at}}
					<br> 更新 {{$page.post.edges[0].node.updated_at}}
				</div>
				<div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
					<pre style="font-family: '微软雅黑'">{{$page.post.edges[0].node.desc}}</pre>
				</div>
				<div v-html="md2html($page.post.edges[0].node.content)" class="markdown-body" style="padding-top: 20px"></div>
			</el-card>
			<el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!$page.post.edges[0].node.id">
				<font style="font-size: 30px;color:#dddddd ">
					<b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
				</font>
			</el-card>
		</div>
    </Layout>
</template>

<page-query>
query{
  	post: allStrapiPost(perPage: 1, page:1){
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
import MarkdownIt from "markdown-it"
const md = new MarkdownIt()
export default {
    // metaInfo: {
    //     title: "Hello, world!",
	// },
	methods: {
		md2html(markdown) {
			return md.render(markdown)
		}
	}
};
</script>

<style>
.home-links a {
    margin-right: 1rem;
}
</style>
