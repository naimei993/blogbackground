import React from 'react';
import {Table,Card,Switch,message,Button,Modal} from 'antd';
import {  useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {reqArticleList,reqArticleIsShow,reqDeleteArticlelist} from '../../../api/index'
import {createSaveArticleAction} from '../../../redux/action_creators/article_action'
import { PAGE_SIZE } from '../../../config';
const Articlelist = (props) => {
  const [articleinfo,setarticleinfo] = React.useState({isModalVisible:false,_id:""})
    const [pageinfo,setpageinfo] = React.useState({current:1,total:"",isLoading:true,})
    const [dataSource, setdataSource] = React.useState('')
   React.useEffect(()=>{
    const getList = async (number=1)=>{
        let result = await reqArticleList(number,PAGE_SIZE)
        console.log(result);
        const {status,msg,data} = result
        const {list,total} = data
        if(status === 0){
          setdataSource(list)
          setpageinfo(oldState => ({
            ...oldState,
            current:number,
            total,
            isLoading:false,
        }))
        props.saveArticleList(list)
          console.log(list);
        }else{
          message.error(msg,1)
        }
      }
      getList()

   },[])// eslint-disable-line react-hooks/exhaustive-deps
    const navigate =  useNavigate()
      const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
          },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '分类',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '日期',
          dataIndex: 'createdDate',
          key: 'createdDate',
        },{
            title: '是否展示',
            // dataIndex: 'show',
            key: 'isshow',
            render:(item)=>{return(
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={JSON.parse(item.isshow)} onChange={(checked)=>{onChangeIsShowOrTop(checked,item.id,"isshow")}} />
            )},
            align:'center',

          },{
            title: '是否置顶',
            // dataIndex: 'show',
            key: 'top',
  
            render:(item)=>{return(
                <Switch checkedChildren="置顶" unCheckedChildren="正常" defaultChecked={JSON.parse(item.top)} onChange={(checked)=>{onChangeIsShowOrTop(checked,item.id,"top")}} />
            )},
            align:'center'
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
                            <Button type='link' onClick={()=>{navigate(`/admin/article_about/articledetail/${item.id}`)}}>详情</Button>
                            <Button type='link' onClick={()=>{navigate(`/admin/article_about/articleupdate/${item.id}`)}}>修改</Button>
                            <Button type='link' onClick={()=>{showModal(item)}}>删除</Button>
                            <Modal destroyOnClose okText="确定" cancelText="取消" title={`删除${item.title}`} visible={articleinfo.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p style={{fontSize:'20px',fontWeight:'500'}}>确定删除<span style={{color:'red'}}>{item.title}?</span></p>
                            
                             </Modal>
                        </div>
                    )
                }
              },
      ];
      const showModal =(item)=>{//箭头函数
        setarticleinfo(oldState => ({
          ...oldState,
          isModalVisible:true,
          _id:item.id
      }))
      }
      const handleOk = ()=>{//箭头函数
        setarticleinfo(oldState => ({
          ...oldState,
          isModalVisible:false,
      }))
      deleteProduct(articleinfo._id)
      console.log(articleinfo._id);
      }
      const handleCancel =()=>{//箭头函数
        setarticleinfo(oldState => ({
          ...oldState,
          isModalVisible:false,
      }))
      }
      const deleteProduct = async(_id) =>{
        let result = await reqDeleteArticlelist(_id)
        console.log(result);
        const {status} = result
        if(status === 0){
            message.success('删除成功',1)
            getList1()
        }else{
            message.error('删除失败',1)
        }
    }
      const getList1 = async (number=1)=>{
        let result = await reqArticleList(number,PAGE_SIZE)
        console.log(result);
        const {status,msg,data} = result
        const {list,total} = data
        if(status === 0){
          setdataSource(list)
          setpageinfo(oldState => ({
            ...oldState,
            current:number,
            total,
        }))
        }else{
          message.error(msg,1)
        }
      }
      const onChangeIsShowOrTop= async(checked,id,key)=>{
        let result =await reqArticleIsShow({checked,id,key})
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
               title="文章列表展示"
            >
        <Table 
        dataSource={dataSource} 
        columns={columns} 
        bordered={true}
        rowKey="id"
        pagination={{
          pageSize:PAGE_SIZE,
          showQuickJumper:true,
          current:pageinfo.current,
          total:pageinfo.total,
          onChange:getList1
        }}
        loading={pageinfo.isLoading}
        />
        </Card>
        
           
        </React.Fragment>
    );
};
const mapStateToProps = ()=>({
    
  

})
// const mapDispatchToProps = () => {
//     return {
//         deleteUserInfo:createDeleteUserInfoAction,
//     }
// }
// export default connect(
//     mapStateToProps,mapDispatchToProps
//   )(Admin)
export default connect(
// state => ({userInfo:state.userInfo}),
mapStateToProps,
{saveArticleList:createSaveArticleAction}
)(Articlelist)
