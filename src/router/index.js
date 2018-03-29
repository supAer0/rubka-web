import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Rubka from '@/components/Rubka'
import MlHome from '@/components/Ml/Home'
import MlAnalytics from '@/components/Ml/Analytics'
import MlSettings from '@/components/Ml/Settings'
import CreateSite from '@/components/Ml/CreateSite'
import SiteElements from '@/components/Ml/Elements'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  // mode: 'history',
  props: true,
  routes: [
    {
      path: '/',
      name: 'Rubka',
      component: Rubka
    },
    {
      path: '/sites/:siteId',
      component: MlHome,
      children: [
        // при совпадении пути с шаблоном /user/:id
        // в <router-view> компонента User будет отображён UserHome
        { path: '', name: 'MlAnalytics', component: MlAnalytics },
        { path: 'settings', name: 'MlSettings', component: MlSettings },
        { path: 'new_site', name: 'CreateSite', component: CreateSite },
        { path: 'elements', name: 'SiteElements', component: SiteElements }
        // ...остальные вложенные пути
      ]
    }
  ],
  linkActiveClass: 'active' // active class for non-exact links.
  // linkExactActiveClass: 'active' // active class for *exact* links.
})
