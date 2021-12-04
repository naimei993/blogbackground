
import React from 'react';
import dayjs from 'dayjs'
import screenfull from 'screenfull';
import { Modal, Button} from 'antd';
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {reqWheather} from '../../../api/index'
import './header.less'
const { confirm } = Modal;
const Header = () => {
    const [info,setinfo] = React.useState({ 
        isFull:false,
        date:dayjs().format(' YYYY年MM月DD日 HH:mm:ss'),
        weather:"",
        title:""
    })
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
        const getWeather = async()=>{
            let result = await reqWheather()
            console.log(result);
            setinfo(oldState => ({
                ...oldState,
                weather:result.data.forecast[0]
              }))
            
        }
        let TimerNumber = setInterval(()=>{//箭头函数
               setinfo(oldState => ({
                ...oldState,date:dayjs().format(' YYYY年MM月DD日 HH:mm:ss')
            }))

         },1000)

        getWeather()
        return () => clearInterval(TimerNumber);
    },[])
    const fullScreen = ()=>{//箭头函数
        screenfull.toggle()
    }
    
    const logout=()=>{//退出登录函数
        confirm({
            title: '确定退出登录？',
            icon: <ExclamationCircleOutlined />,
            cancelText:'取消',
            okText:'确定',
            content: '若退出则需要重新输入账号密码用以登录',
            onOk() {
               console.log("A");
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
                <div className="header-bottom-left">
                    {info.title || info.title}
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

export default Header;

