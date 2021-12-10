
import React from 'react';
import dayjs from 'dayjs'
import screenfull from 'screenfull';
import { Modal, Button} from 'antd';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import {reqWheather} from '../../../api/index'
import menuList from '../../../config/menu_config'
import './header.less'
const { confirm } = Modal;
const Header = (props) => {
    const [info,setinfo] = React.useState({ 
        isFull:false,
        date:dayjs().format(' YYYY年MM月DD日 HH:mm:ss'),
        weather:"",
        title:""
    })
    const { pathname } = useLocation();
    React.useEffect(()=>{
        if (screenfull.isEnabled) {
            screenfull.on("error", event => {
                console.error('Failed to enable fullscreen', event);
            });
        }else{
            screenfull.on("change", () => {
                setinfo(oldState => ({
                    ...oldState,
                    isFull:!oldState.isFull
                }))
            });
        }
        const getWeather = async()=>{//获取天气信息api
            let result = await reqWheather()
            setinfo(oldState => ({
                ...oldState,
                weather:result.data.forecast[0]
              }))
        }
        let TimerNumber = setInterval(()=>{//实时更新时间
               setinfo(oldState => ({
                ...oldState,date:dayjs().format(' YYYY年MM月DD日 HH:mm:ss')
            }))
         },1000)
         const getTitle =()=>{//箭头函数
            
            // let pathkey = pathname.split('/').reverse()[0]
            let pathkey = pathname.indexOf('articel') !== -1 ? 'articel' :pathname.split('/').reverse()[0]
            let title = ''
            menuList.forEach((item)=>{//箭头函数
                  if(item.children instanceof Array){
                      let tmp = item.children.find((item2)=>{//箭头函数
                            return item2.key === pathkey
                      })
                      if(tmp) title = tmp.title
                  }else{
                      if(pathkey === item.key) title = item.title
                  }
            })
            setinfo(oldState=>({
                ...oldState,
                title:title
            }))
      }
        getTitle()
        getWeather()
        
        return () => clearInterval(TimerNumber);//清除定时器
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    const fullScreen = ()=>{//箭头函数
        screenfull.toggle()
    }
      //上方标题
      
    //上方标题
   
    const logout=()=>{//退出登录函数
        confirm({
            title: '确定退出登录？',
            icon: <ExclamationCircleOutlined />,
            cancelText:'取消',
            okText:'确定',
            content: '若退出则需要重新输入账号密码用以登录',
            onOk() {
                props.deleteUserInfo()
            },
          });
        
  }
    const low = String(info.weather.low).substring(2)
    const height =String(info.weather.high).substring(2)
    return (
        <header className="header">
                <div className="header-top">
                    <Button size="small" onClick={fullScreen}>
                    {info.isFull ? <FullscreenExitOutlined/>:<FullscreenOutlined />  }
                    </Button>
                    <span className="username">欢迎,你好</span>
                    <Button type="link"size="small" onClick = {logout}>退出登录</Button>
                </div>
                <div className="header-bottom">
                <div className="header-bottom-left" style={{overflow:'hidden'}}>
                    {props.title || info.title}
                    </div>
                <div className="header-bottom-right">
                   <span> {info.date}</span>
                    <span><img src="https://p7.itc.cn/q_70/images03/20210203/562a12a8cbc840dba5c327db641a097c.png" alt="天气信息"/></span>
                    <span>{info.weather.type} {low}~{height}</span>
                    
                </div>
                </div>
            </header>
    );
};

const mapStateToProps = (state)=>({
    userInfo:state.userInfo,
    title:state.title
})
export default connect(
mapStateToProps,
{deleteUserInfo:createDeleteUserInfoAction}
)(Header)

