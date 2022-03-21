import React from 'react';
import {Card,Button,List,message} from 'antd'
import  { ArrowLeftOutlined} from '@ant-design/icons'
import { useLocation,useNavigate } from 'react-router-dom';
import { reqCommentById} from '../../api/index'
const Commentdetial = () => {
    const {Item} = List
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const pathkey = pathname.split('/').reverse()[0]//根据路径获取文章id
    console.log(pathkey,"AAAAA");
    const [detail,setdetail] = React.useState({
        isLoading:false,//是否加载完成
        id:'',//评论id
        content:'',//评论内容
        createdtime:'',//评论时间
        device:'',//评论设备
        isshow:'',//是否展示
        dislike:'',//踩的数量
        like:'',//点赞数量
        equipment:'',//浏览器版本
        ip:'',//ip地址
        location:'',//城市地址
        name:'',//名称
        rid:'',//回复id
        email:'',//邮箱
    })
    React.useEffect(()=>{
       const getCommentById = async(id)=>{//箭头函数
            let result = await reqCommentById(id)
            const {status,data,msg} = result
            console.log(result,"result");
            if(status === 0){
                setdetail(oldState =>({
                    ...oldState,
                    isLoading:false,
                    ...data,
                }))
            }else{
                message.error(msg)
            }
        }
        getCommentById(pathkey)
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Card 
        title={
        <div className='left-top' >
            <Button type='link' size='small' onClick={()=>{navigate(`/admin/comments`)}}>
                <ArrowLeftOutlined style={{fontSize:'20px'}} />
            </Button>
            <span>评论详情</span>
            </div>}
         >
            <List loading={detail.isLoading}>
                <Item className='item'>
                    <span className='article-title'>评论id：</span>
                    <span>{detail.id}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>评论回复id：</span>
                    <span>{detail.rid}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>名字：</span>
                    <span>{detail.name}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>评论时间：</span>
                    <span>{detail.createdtime}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>邮箱：</span>
                    <span>{detail.email}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>评论内容：</span>
                    <span>{detail.content}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>是否展示：</span>
                    <span>{detail.isshow === 'true'? '是' : '否'}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>点赞数量：</span>
                    <span>{detail.like}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>踩的数量：</span>
                    <span>{detail.dislike}</span>
                </Item>
                
                <Item className='item'>
                    <span className='article-title'>评论设备：</span>
                    <span>{detail.device}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>浏览器：</span>
                    <span>{detail.equipment}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>ip地址：</span>
                    <span>{detail.ip}</span>
                </Item>
                <Item className='item'>
                    <span className='article-title'>城市：</span>
                    <span>{detail.location}</span>
                </Item>
            </List>
        </Card>
    );
};

export default Commentdetial;