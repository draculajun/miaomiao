export default {
    path: '/movie',
    redirect: '/movie/tab1',     //设置默认子路由的TAB1被选中
    component: () => import('@/views/movie/movie_view'),
    children: [{
        path: '/movie/tab1',
        component: () => import('@/views/movie/movie_view_tab1')
    }, {
        path: '/movie/tab2',
        component: () => import('@/views/movie/movie_view_tab2')
    }]
}