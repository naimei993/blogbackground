import React from 'react';

const Articleclass = () => {
    const[article,setarticle] = React.useState({isModalVisible:false,title:"",})
    const dataSource = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ];
      
      const columns = [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '分类',
        //   dataIndex: 'classification',
          key: 'classification',
          render:(item)=>{return(
            <div>
                <Button type="link" onClick={()=>{showUpdate(item)}}>修改分类</Button>
                      <Modal keyboard destroyOnClose okText="确定" cancelText="取消" title={`删除${article.title}`} visible={article.isModalVisible} onOk={deleteOk} onCancel={deleteCancel}>
                      <p style={{fontSize:'20px',fontWeight:'500'}}>确定删除<span style={{color:'red'}}>{article.title}?</span></p>
                      
                       </Modal>
            </div>
        )},
        width:"25%",
        align:'center'
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        },{
            title: '展示',
            // dataIndex: 'show',
            key: 'show',
            render:(item)=>{return(
                <div>
                    
                </div>
            )},
            width:"25%",
            align:'center'
          },
      ];
      const showAdd = ()=>{//箭头函数
            console.log("add")
      }
      const showUpdate = ()=>{//箭头函数
            
      }
      const showModal = ()=>{//箭头函数
            
      }
      const deleteOk = () => {
        setarticle(oldState => ({
            ...oldState,
            isModalVisible:false
        }))
        // this.deleteCatory(this.state._id)
      };
      const deleteCancel = () => {
        setarticle(oldState => ({
            ...oldState,
            isModalVisible:false
        }))
      };
    return (
        <React.Fragment>
        <Card
                extra={<Button onClick={showAdd} type="primary"><PlusOutlined />添加</Button>}
            >
        <Table 
        dataSource={dataSource} 
        columns={columns} 
        bordered={true}
        rowKey="id"
        pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
        loading={false}
        />
        </Card>
        <Modal 
            title={operType === 'add' ? '新增分类' :'修改分类'} 
            visible={visible}
            okText='确定'
            cancelText='取消'
            onOk={this.handleOk} 
            onCancel={this.handleCancel}
            >
            <Form
                ref={this.formRef}
                name="normal_login"
                className="login-form"
                initialValues={
                    {remember: true}
            }
            >
      <Form.Item
        name="categoryName"
        initialValue={this.state.modalCurrentValue}
        rules={[{ required: true, message: '分类名必须输入' }]}
       >
         <Input  
         placeholder="请输入分类名"

          />
      </Form.Item>
    
      
    </Form>
            </Modal>
        </React.Fragment>
    );
};

export default Articleclass;