import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _32e9aefa = () => interopDefault(import('..\\pages\\editor\\index.vue' /* webpackChunkName: "pages_editor_index" */))
const _4fc1a4a4 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */))
const _4536f0c4 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages_register_index" */))
const _188e1978 = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages_settings_index" */))
const _26c615c0 = () => interopDefault(import('..\\pages\\article\\article-slug-here.vue' /* webpackChunkName: "pages_article_article-slug-here" */))
const _4e9bff63 = () => interopDefault(import('..\\pages\\editor\\article-slug-here.vue' /* webpackChunkName: "pages_editor_article-slug-here" */))
const _27cd061b = () => interopDefault(import('..\\pages\\profile\\_username\\index.vue' /* webpackChunkName: "pages_profile__username_index" */))
const _d47086c0 = () => interopDefault(import('..\\pages\\profile\\_username\\favorites.vue' /* webpackChunkName: "pages_profile__username_favorites" */))
const _4ebfe1f2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/editor",
    component: _32e9aefa,
    name: "editor"
  }, {
    path: "/login",
    component: _4fc1a4a4,
    name: "login"
  }, {
    path: "/register",
    component: _4536f0c4,
    name: "register"
  }, {
    path: "/settings",
    component: _188e1978,
    name: "settings"
  }, {
    path: "/article/article-slug-here",
    component: _26c615c0,
    name: "article-article-slug-here"
  }, {
    path: "/editor/article-slug-here",
    component: _4e9bff63,
    name: "editor-article-slug-here"
  }, {
    path: "/profile/:username?",
    component: _27cd061b,
    name: "profile-username"
  }, {
    path: "/profile/:username?/favorites",
    component: _d47086c0,
    name: "profile-username-favorites"
  }, {
    path: "/",
    component: _4ebfe1f2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
