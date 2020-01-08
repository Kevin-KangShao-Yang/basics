import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1a5b9258 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */))
const _573c3630 = () => interopDefault(import('..\\pages\\user\\one.vue' /* webpackChunkName: "pages_user_one" */))
const _7d67de3c = () => interopDefault(import('..\\pages\\user\\_id.vue' /* webpackChunkName: "pages_user__id" */))
const _7ba64ebf = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _7afc39aa = () => interopDefault(import('..\\pages\\_slug\\index.vue' /* webpackChunkName: "pages__slug_index" */))
const _d4502410 = () => interopDefault(import('..\\pages\\_slug\\comment.vue' /* webpackChunkName: "pages__slug_comment" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/user",
    component: _1a5b9258,
    name: "user"
  }, {
    path: "/user/one",
    component: _573c3630,
    name: "user-one"
  }, {
    path: "/user/:id",
    component: _7d67de3c,
    name: "user-id"
  }, {
    path: "/",
    component: _7ba64ebf,
    name: "index"
  }, {
    path: "/:slug",
    component: _7afc39aa,
    name: "slug"
  }, {
    path: "/:slug/comment",
    component: _d4502410,
    name: "slug-comment"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
