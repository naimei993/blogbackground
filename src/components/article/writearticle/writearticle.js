
import React, { useState } from 'react'
import {marked} from 'marked'
import hljs from "highlight.js";
import { Row, Col, Input, Button,Card, Space } from 'antd'
import 'highlight.js/styles/monokai-sublime.css';
import './writearti.min.css'
const catalogue = require('./catalogue.md')
const { TextArea } = Input
const Writearticle = () => {
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [tipContent,settipContent] = useState('初始化')
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
  }
  const showCatalogue = ()=>{//箭头函数
    const str = "@[TOC](这里写目录标题)# 一级目录## 二级目录 ### 三级目录"
    console.log(catalogue,str);
   
    // settipContent(marked(catalogue))
        
  }
  const showTitle = ()=>{//箭头函数
        
  }
  const showTextStyle = ()=>{//箭头函数
        
  }
    return (
      <div style={{height:'100%',width:'100%'}}>
        <Row style={{height:'100%',width:'100%'}}>
          <Col span={24}>
            <br />
            <Row  >
              <Col span={10} style={{border:'1px solid #CCC',backgroundColor:'#FFFFFF'}}>
                  
                <div className="show-html"  dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
              </Col>
              <Col span={10} >
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
              <Col span={4} >
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',backgroundColor:'#FFF',border:'1px solid #CCC',height:"100%"}} >
                <div>提示</div>
                <div>
                <Space style={{ marginBottom: 16 }}>
                  <Button onClick={showCatalogue}>目录</Button>
                  <Button onClick={showTitle}>标题</Button>
                  <Button onClick={showTextStyle}>文本样式</Button>
                </Space>
                <Card style={{ width:'100%'}}>
                  {tipContent}
                </Card>
                </div>
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