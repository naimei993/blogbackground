import React from 'react';
import { connect } from 'react-redux';
import { message,Switch,Button,Modal,Card,Table,Avatar} from 'antd';
import { useNavigate } from 'react-router';
import {reqGetCommentBackground,reqCommentIsShow,reqDeleteComment} from '../../api/index'
import {createSaveCommentAction} from '../../redux/action_creators/comment_action'
import { COMMENT_PAGE_SIZE } from '../../config';
const Comments = (props) => {
    const navigate = useNavigate()
    const [allinfo,setallinfo] = React.useState({current:1,total:"",isLoading:true,isModalVisible:false,_id:""})//当前页数，总共页数，是否在加载中，是否展示弹窗，删除评论时临时存储id
    const [dataSource, setdataSource] = React.useState('');
    React.useEffect(()=>{
        const getCommentList = async (number=1)=>{
            let result = await reqGetCommentBackground(number,COMMENT_PAGE_SIZE)
            console.log(result);
            const {status,msg,data} = result
            const {list,total} = data
            if(status === 0){
              setdataSource(list)
              setallinfo(oldState => ({
                ...oldState,
                current:number,
                total,
                isLoading:false,
            }))
            props.saveCommentList(list)
            console.log(allinfo);
            }else{
              message.error(msg,1)
            }
          }
          getCommentList()
    
       },[])// eslint-disable-line react-hooks/exhaustive-deps
       const getCommentList1 = async (number=1)=>{
        let result = await reqGetCommentBackground(number,COMMENT_PAGE_SIZE)
        console.log(result);
        const {status,msg,data} = result
        const {list,total} = data
        if(status === 0){
          setdataSource(list)
          setallinfo(oldState => ({
            ...oldState,
            current:number,
            total,
            isLoading:false,
        }))
        console.log(dataSource);
        console.log(allinfo);
        }else{
          message.error(msg,1)
        }
      }
      //表格格式
       const columns = [
        {
            title: '评论类型',
            // dataIndex: 'id',
            key: 'id',
            render:(item)=>{return(
                <div>{item.rid === ''?"主题留言":"回复留言"}</div>
            )

            }
          },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '邮箱',
        //   dataIndex: 'email',
          key: 'email',
          render:(item)=>{return(
              <div>
            <Avatar style={{height:"20%",width:"20%",}} src={`http://q4.qlogo.cn/g?b=qq&nk=${item.email}&s=3`} alt={`${item.name}`} /><p>{item.email}</p>
            </div>
            )},
            align:"center"
          
        },
        {
          title:'内容',
          dataIndex:'content',
          width:450
        },
        {
          title: '日期',
        //   dataIndex: 'createdtime',
          key: 'createdtime',
          render:(item)=>{return(
              <div>{item.createdtime}</div>
          )},
          align:'center'
        },{
            title: '是否展示',
            // dataIndex: 'show',
            key: 'isshow',
            render:(item)=>{return(
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={JSON.parse(item.isshow)} onChange={(checked)=>{onChangeIsShow(checked,item.id)}} />
            )},
            align:'center',

          },
            {
                title: '操作',
                // dataIndex: 'opera',
                key: 'opera',
                align:'center',
                with:'5%',
                render:(item)=>{
                    return(
                        <div>
                            <Button type='link' onClick={()=>{showModal(item)}}>删除</Button>
                            <Button type='link' onClick={()=>{showDetial(item)}}>详情</Button>
                            <Modal destroyOnClose okText="确定" cancelText="取消" title="删除评论" visible={allinfo.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p style={{fontSize:'20px',fontWeight:'500'}}>确定删除此条评论?</p>
                            
                             </Modal>
                        </div>
                    )
                }
              },
      ];
      const showModal = (item)=>{//弹窗调用事件
            setallinfo(oldState=>({
              ...oldState,
              isModalVisible:true,
              _id:item.id
            }))
      }
      const handleOk = ()=>{//弹窗确认事件
        setallinfo(oldState=>({
          ...oldState,
          isModalVisible:false
        }))
        deleteComment(allinfo._id)
      }
      const handleCancel = ()=>{//弹窗取消事件
        setallinfo(oldState=>({
          ...oldState,
          isModalVisible:false
        }))   
      }
      const deleteComment = async(id)=>{//删除评论
        console.log(id);
            let result = await reqDeleteComment(id)
            const {status} = result
        if(status === 0){
            message.success('删除成功',1)
           getCommentList1()
        }else{
            message.error('删除失败',1)
        }
      }
      const showDetial =(item)=>{
        navigate(`/admin/comments/${item.id}`)
      }
      const onChangeIsShow = async(checked,id)=>{
        let result =await reqCommentIsShow({checked,id})
        const{status,msg} = result
        console.log(status,msg);
        if(status === 0){
          message.success(msg,1)
        }else{
          message.success(msg,1)
        }
      }
    return (
        <React.Fragment>
        <Card
               title="评论列表展示"
            >
        <Table 
        dataSource={dataSource} 
        columns={columns} 
        bordered={true}
        rowKey="id"
        pagination={{
          pageSize:COMMENT_PAGE_SIZE,
          showQuickJumper:true,
          current:allinfo.current,
          total:allinfo.total,
          onChange:getCommentList1
        }}
        loading={allinfo.isLoading}
        />
        </Card>
        
           
        </React.Fragment>
    );
};

const mapStateToProps = ()=>({
    
  

})
export default connect(
    // state => ({userInfo:state.userInfo}),
    mapStateToProps,
    {saveCommentList:createSaveCommentAction}
    )(Comments)