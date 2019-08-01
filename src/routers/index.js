import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie/movie_router'
import cinemaRouter from './cinema/cinema_router'
import mineRouter from './mine/mine_router'
import fileRouter from './file/file_router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRouter,
    cinemaRouter,
    mineRouter,
    fileRouter,

  ]
})