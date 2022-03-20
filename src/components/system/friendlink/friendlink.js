
import React from 'react'
import { Button } from 'antd';
import 'highlight.js/styles/monokai-sublime.css';

const FriendLink = () => {
  const [count,setcount] = React.useState(0)
  const add = ()=>{//箭头函数
        setcount(count+1)
        console.log(count);
  }
   return(
     <div><Button onClick={add}>点击</Button></div>
   )
};

export default FriendLink;