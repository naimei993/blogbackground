//项目的菜单配置
const menuList = [ //eslint-disable-next-line
  {
    title: '主页', // 菜单标题名称
    key: 'home', // 对应的path
    icon: 'HomeOutlined', // 图标名称
    path: '/admin/home'//对应路径
  },
  {
    title: '文章',
    key: 'article_about',
    icon: 'FormOutlined',
    children: [ // 子菜单列表
      {
        title: '文章列表',
        key: 'articlelist',
        icon: 'UnorderedListOutlined',
        path: '/admin/article_about/articlelist'
      },
      {
        title: '写文章',
        key: 'writearticle',
        icon: 'EditOutlined',
        path: '/admin/article_about/writearticle'
      },
      {
        title: '分类目录',
        key: 'classification',
        icon: 'ClusterOutlined',
        path: '/admin/article_about/classification'
      },
    ]
  },
  {
    title: '系统管理',
    key: 'system',
    icon: 'AreaChartOutlined',
    children: [
      {
        title: '系统日志',
        key: 'log',
        icon: 'DatabaseOutlined',
        path: '/admin/system/log'
      },{
        title: '友情链接',
        key: 'friendlink',
        icon: 'LinkOutlined',
        path: '/admin/system/friendlink'
      },
    ]
  },
  {
    title: '评论',
    key: 'comments',
    icon: 'CommentOutlined',
    path: '/admin/comments'
  },
]
export default menuList