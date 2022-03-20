import React from 'react';
import {Form,Modal,Input,Button,Card,Table, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import { connect } from 'react-redux';
import {v4 as uuidv4} from 'uuid'
import { PAGE_SIZE } from '../../../config';
import {createSaveTypeAction} from '../../../redux/action_creators/type_action'
import {reqArticleType,reqAddType,reqUpdateType,reqDeleteType} from '../../../api/index'
const Classification = (props) => {

    const [type,settype] = React.useState({
        current:1,
        total:"",
        id:"",
        dataSource:[],
        visible:false,
        isModalVisible:false,
        operType:"",
        isLoading:true,
        modalCurrentValue:"",
        modalCurrentId:"",//当前选中的分类id
        currentPage:'',//当前分页器页数
    })
    let formRef = React.createRef()
    React.useEffect(()=>{
        const getArticleType = async(number=1)=>{//箭头函数
              let result = await reqArticleType(number,PAGE_SIZE)
              const{status,data} = result
              const {list,total} = data
              if(status===0){
                settype(oldState=>({
                    ...oldState,
                    dataSource:list,
                    current:number,
                    total,
                    isLoading:false,
                }))
                props.saveTypeList(list)
              }else{
                  message.error("请求列表出错")
              }
              
        }
        getArticleType()
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const getArticleTypestandby = async(number=1)=>{//箭头函数
        let result = await reqArticleType(number,PAGE_SIZE)
        const{status,data} = result
        const {list,total} = data
        if(status===0){
          settype(oldState=>({
              ...oldState,
              dataSource:list,
              current:number,
              total,
              isLoading:false,
          }))
          props.saveTypeList(list)
        }else{
            message.error("请求列表出错")
        }
        
  }
    const getType1 = async(number=1)=>{//箭头函数
        let result = await reqArticleType(number,PAGE_SIZE)
        const{status,data} = result
        const {list,total} = data
        if(status===0){
          settype(oldState=>({
              ...oldState,
              dataSource:list,
              current:number,
              total,
              currentPage:number,
              isLoading:false,
          }))
          props.saveTypeList(list)
        }else{
            message.error("请求列表出错")
        }
    }
    const showUpdate = (item)=>{//箭头函数
        const {id,type} = item
        console.log(item,"item");
        settype(oldState =>({
            ...oldState,
            operType:"update",
            modalCurrentValue:type,
            modalCurrentId:id,
            visible:true,
        }))
        if(formRef.current === null){
            console.log(formRef,"AAAAAAA"); 
        }else{
            formRef.current.setFieldsValue({type:type})//调用setFieldsValue方法动态修改分类的值
        }
    }
    const showModal =(item)=>{//箭头函数
          settype(oldState =>({
              ...oldState,
              isModalVisible:true,
              modalCurrentId:item.id,
              modalCurrentValue:item.type,
          }))
    }
    const deleteOk = ()=>{//箭头函数
        settype(oldState =>({
            ...oldState,
            isModalVisible:false,
        }))
        DeleteType({id:type.modalCurrentId,typevalue:type.modalCurrentValue})
    }
    const DeleteType = async(typeValue)=>{//箭头函数
          let result = await reqDeleteType(typeValue);
          const{status,data,msg} = result
          if(status === 0){
              message.success(msg,1)
              getArticleTypestandby(type.currentPage)
          }else{
              message.error(msg,1)
          }
    }
    const deleteCancel = ()=>{//箭头函数
        settype(oldState =>({
            ...oldState,
            isModalVisible:false,
        }))
    }
    const showAdd= ()=>{//箭头函数
        if(formRef.current !== null){
            formRef.current.setFieldsValue({type:""})
        }
        settype(oldState =>({
            ...oldState,
            operType:"add",
            modalCurrentId:'',
            modalCurrentValue:'',
            visible:true,
        }))
        
        
    }
    
    const handleOk = ()=>{//箭头函数
        settype(oldState =>({
            ...oldState,
            visible:false,
        }))
        formRef.current.validateFields()
       .then(values => {
           console.log(values,"表单values");
           if(type.operType === 'add')  toAdd(values)
            if(type.operType === 'update'){
                const id= type.modalCurrentId;
                console.log(type);
                const typevalue = values.type;
                const typeObj = {id,typevalue}
                toUpdate(typeObj);
            } 
       })
       .catch(info => {
           console.log('Validate Failed:', info);
       });    
        
    }
    const toAdd = async(values)=>{//箭头函数
          let result = await reqAddType({id:uuidv4(),...values})
          const{status,msg} = result
          if(status === 0){
              message.success(msg,1)
              const {data} =result
              const typeList =[...type.dataSource]
              typeList.unshift(data)
              const total1 = type.total +1;
              settype(oldState => ({
                  ...oldState,
                  dataSource:typeList,
                  total:total1,
              }))
          }else{
              message.error(msg,1)
          }
          
    }
    const toUpdate = async(typeObj)=>{//箭头函数
        let result = await reqUpdateType(typeObj) 
        console.log(typeObj);
        const{status,msg} = result
          if(status === 0){
              message.success(msg,1)
              getArticleTypestandby(type.currentPage)
          }else{
              message.error(msg,1)
          }
  }
    const handleCancel = ()=>{//箭头函数
        settype(oldState =>({
            ...oldState,
            visible:false,
            modalCurrentValue:''
        }))
        formRef.current.resetFields()
    }
    const columns = [
        {
            title:'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
          title: '分类名称',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '操作',
          //dataIndex:'categoryName',
          key: 'age',
          render:(item)=>{return(
              <div>
                  <Button type="link" onClick={()=>{showUpdate(item)}}>修改分类</Button>
                  <Button type='link' onClick={()=>{showModal(item)}}>删除分类</Button>
                        <Modal keyboard destroyOnClose okText="确定" cancelText="取消" title={`删除${type.modalCurrentValue}`} visible={type.isModalVisible} onOk={deleteOk} onCancel={deleteCancel}>
                        <p style={{fontSize:'20px',fontWeight:'500'}}>确定删除<span style={{color:'red'}}>{type.modalCurrentValue}?</span></p>
                        
                         </Modal>
              </div>
          )},
          align:'center'
        },
      ];
    return (
        <div>
        <Card
            extra={<Button onClick={showAdd} type="primary"><PlusOutlined />添加</Button>}
        >
           <Table 
           dataSource={type.dataSource}
           columns={columns} 
           bordered={true} 
           rowKey="id"
           pagination={{
            pageSize:PAGE_SIZE,
            showQuickJumper:true,
            current:type.current,
            total:type.total,
            onChange:getType1
            
            }}
           loading={type.isLoading}
          
            />;
        </Card>

        <Modal 
        title={type.operType === 'add' ? '新增分类' :'修改分类'} 
        visible={type.visible}
        okText='确定'
        cancelText='取消'
        onOk={handleOk} 
        onCancel={handleCancel}
        forceRender={true}//Modal的 API中有一个强制渲染的属性,第一次取就可以取到了，只是会把渲染的先隐藏起来，可能会浪费些渲染性能。性能这块不是我们目前首先考虑的问题。
        >
        <Form
            ref={formRef}
            name="normal_login"
            className="login-form"
            initialValues={
                {remember: true}
        }
        >
  <Form.Item
    name="type"
    initialValue={type.modalCurrentValue}
    rules={[{ required: true, message: '分类名必须输入' }]}
   >
     <Input  
     placeholder="请输入分类名"

      />
  </Form.Item>

  
</Form>
        </Modal>
        </div>
        
    );
};

const mapStateToProps = (state)=>({
    
    userInfo:state.userInfo
  
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
  {saveTypeList:createSaveTypeAction}
  )(Classification)