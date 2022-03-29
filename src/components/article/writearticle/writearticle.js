
import React, { useState } from 'react'
import {marked} from 'marked'
import hljs from "highlight.js";
import { Row, Col, Input, Button,Card, Space,Divider } from 'antd'
import 'highlight.js/styles/monokai-sublime.css';
import './writearti.min.css'
const { TextArea } = Input
const Writearticle = () => {
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [tipContent,settipContent] = useState(["# 一级标题","## 二级标题","### 三级标题","#### 四级标题","##### 五级标题","###### 六级标题"])
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
  
    const changeContent = (e) => {
      setArticleContent(e.target.value)
      let html = marked(e.target.value)
      setMarkdownContent(html)
    }
  const Git = ()=>{//箭头函数
        console.log(articleContent);
        settipContent((oldState)=>({//箭头函数
              ...oldState,
        }))
  }
 
  const showTitle = ()=>{//标题
    const Title = ["# 一级标题","## 二级标题","### 三级标题","#### 四级标题","##### 五级标题","###### 六级标题"]
    settipContent(Title)
  }
  const showTextStyle = ()=>{//文字
    const Text = ["**这是加粗的文字**","*这是倾斜的文字*","***这是斜体加粗的文字***","~~这是加删除线的文字~~"]
    settipContent(Text)
  }
  const Reference = ()=>{//引用
        const reference = [">这是引用的内容",">>这是引用的内容",">>>>>>>>>>这是引用的内容"]
        settipContent(reference)
  }
  const DividerMy = ()=>{//分割线
        const divider = ["---","aaa","----","bbb","***","ccc","*****"]
        settipContent(divider)
  }
  const Picture = ()=>{//图片
    const picture = ["![图片alt](图片地址 ''图片title'')","![清朗运动](http://www.gov.cn/govweb/c1478f/202203/5679724/images/4ca43b3c565f46ec800aa071a33cf196.JPG \"清朗行动\")"]
      settipContent(picture)
  }
  const Hyperlinks = ()=>{//超链接
        const hyperlinks = ["[超链接名](超链接地址 \"超链接title\")","[简书](http://jianshu.com)","[百度](http://baidu.com)"]
        settipContent(hyperlinks)
  }
  const orderedList = ()=>{//有序列表
        const orderedlist = ["- 列表内容","+ 列表内容","* 列表内容","注意：- + * 跟内容之间都要有一个空格"]
        settipContent(orderedlist)
  }
  const unorderedList = ()=>{//无序列表
        const unorderedlist =  ["1. 列表内容","2. 列表内容","3. 列表内容","注意：序号跟内容之间要有空格"]
        settipContent(unorderedlist)
  }
  const Table = ()=>{//表格
        const table = ["姓名|技能|排行","--|:--:|--:","刘备|哭|大哥","关羽|打|二哥","张飞|骂|三弟","姓名|技能|排行 \n--|:--:|--:\n刘备|哭|大哥\n关羽|打|二哥\n张飞|骂|三弟"]
        settipContent(table)
  } 
  const Code = ()=>{//代码
        const code = ["`单行代码`","```多行代码\n多行代码\n多行代码\n```"]
        settipContent(code)
  }
    return (
      <div style={{height:'100%',width:'100%'}}>
        <Row style={{height:'100%',width:'100%'}}>
          <Col span={24}>
            <br />
            <Row  >
              <Col span={9} style={{border:'1px solid #CCC',backgroundColor:'#FFFFFF'}}>
                  
                <div className="show-html"  dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
              </Col>
              <Col span={9} >
                <TextArea
                style={{backgroundColor:"#F5F5F5",}}
                  className="markdown-content"
                  rows={35}
                  onChange={changeContent}
                  onPressEnter={changeContent}
                  placeholder="编辑内容"
                  // showCount={true}
                />
              </Col>
              <Col span={6} >
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',backgroundColor:'#FFF',border:'1px solid #CCC',height:"100%"}} >
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',overflow:'auto'}}>{
                  tipContent.map((item)=>{
                    return <div key={item} style={{marginLeft:"20%",overflow:'auto',fontSize:'16px'}}>{item}</div>
                  })
                }
                </div>
                <Divider/>
                <div style={{display:'flex'}}>
                <Space wrap style={{ marginBottom: 16}}>
                  <Button onClick={showTitle}>标题</Button>
                  <Button onClick={showTextStyle}>字体</Button>
                  <Button onClick={Reference}>引用</Button>
                  <Button onClick={DividerMy}>分割线</Button>
                  <Button onClick={Picture}>图片</Button>
                  <Button onClick={Hyperlinks}>超链接</Button>
                  <Button onClick={orderedList}>有序列表</Button>
                  <Button onClick={unorderedList}>无序列表</Button>
                  <Button onClick={Table}>表格</Button>
                  <Button onClick={Code}>代码</Button>
                </Space>
                </div>
                <Card style={{ width:'100%'}}>
                <div style={{ display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center'}}>{
                  tipContent.map((item)=>{
                    return <div key={item}style={{width:"100%",overflow:'auto',textAlign:'center'}} dangerouslySetInnerHTML={{__html: marked(item)}} />
                  })
                }
                </div>
                </Card>
                
              <Button onClick={()=>{Git()}}>提交</Button>
              </div>
              
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
};

export default Writearticle;