import React from 'react';
import { Button,Card,message,List} from 'antd';
import  { ArrowLeftOutlined} from '@ant-design/icons'
import { useLocation } from 'react-router-dom';
import {marked} from 'marked'
import hljs from "highlight.js";
import { reqArticleById,reqBlogContent} from '../../../api/index'
import './articledetail.less'
// import 'highlight.js/styles/monokai-sublime.css';
import 'highlight.js/styles/an-old-hope.css'
const {Item} = List
const ArticleDetail = () => {
    const { pathname } = useLocation();
    const pathkey = pathname.split('/').reverse()[0]
    console.log(pathkey,"AAAAA");
    const [detail,setdetail] = React.useState({
        isLoading:false,
        id:'',
        title:'',
        type:'',
        createdDate:'',
        isshow:'',
        top:'',
        markedcontent:'',
    })
    React.useEffect(()=>{
       const getArticleById = async(id)=>{//箭头函数
            let result = await reqArticleById(id)
            let markedcontent = await reqBlogContent(id)
            const {status,data,msg} = result
            console.log(result,"result");
            if(status === 0){
                setdetail(oldState =>({
                    ...oldState,
                    isLoading:false,
                    markedcontent,
                    ...data,
                }))
            }else{
                message.error(msg)
            }
        }
        getArticleById(pathkey)
    },[])
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
        gfm: true, // 允许 Git Hub标准的markdown.
        pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
        sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
        breaks: false, // 允许回车换行（该选项要求 gfm 为true）
        smartLists: true, // 使用比原生markdown更时髦的列表
        smartypants: false, // 使用更为时髦的标点
      })
    
    
    return (
        <Card 
            title={
            <div className='left-top' >
                <Button type='link' size='small' onClick={()=>{this.props.history.goBack()}}>
                    <ArrowLeftOutlined style={{fontSize:'20px'}} />
                </Button>
                <span>文章详情</span>
                </div>}
             >
                <List loading={detail.isLoading}>
                    <Item className='item'>
                        <span className='article-title'>文章id：</span>
                        <span>{detail.id}</span>
                    </Item>
                    <Item className='item'>
                        <span className='article-title'>文章标题：</span>
                        <span>{detail.title}</span>
                    </Item>
                    <Item className='item'>
                        <span className='article-title'>文章分类：</span>
                        <span>{detail.type}</span>
                    </Item>
                    <Item className='item'>
                        <span className='article-title'>创建日期：</span>
                        <span>{detail.createdDate}</span>
                    </Item>
                    <Item className='item'>
                        <span className='article-title'>是否展示：</span>
                        <span>{detail.isshow === 'true'? '是' : '否'}</span>
                    </Item>
                    <Item className='item'>
                        <span className='article-title'>是否置顶：</span>
                        <span>{detail.top === 'true'? '是' : '否'}</span>
                    </Item>
                    <Item className='item-content'>
                        <span className='article-title'>文章详情：</span>
                        <div className='contentmaked'>
                        <div
		                id="content"
		                className="article-detail"
		                dangerouslySetInnerHTML={{
		                __html:marked(detail.markedcontent),
			}}
		/>
        </div>
                    </Item>

                </List>

            </Card>
    );
};

export default ArticleDetail;