<template>
<!-- BEGIN CONTAINER -->
    <div class="page-container row-fluid">
      <div class="page-sidebar mini mini-mobile" data-inner-menu="1" id="main-menu">
        <!-- BEGIN MINI-PROFILE -->
        <div class="page-sidebar-wrapper scrollbar-dynamic" id="main-menu-wrapper">
          <div class="user-info-wrapper sm">
            <div class="profile-wrapper sm">
              <img src="assets/img/profiles/1.png" alt="" data-src="assets/img/profiles/1.png" data-src-retina="assets/img/profiles/avatar2x.jpg" width="69" height="69" />
              <div class="availability-bubble online"></div>
            </div>
            <div class="user-info sm">
              <div class="username">Иван <span class="semi-bold">Иванов</span></div>
              <div class="status">Всё хорошо</div>
            </div>
          </div>
          <!-- END MINI-PROFILE -->
          <!-- BEGIN SIDEBAR MENU -->
          <p class="menu-title sm">РАЗДЕЛЫ<span class="pull-right"><a href="javascript:;"><i class="material-icons">refresh</i></a></span></p>
          <ul>
            <li class="start active ">
              <router-link :to="{ name: 'Rubka' }">
                 <i class="material-icons">home</i> <span class="title">Главная</span> <span class="selected"></span>
              </router-link>
            </li>
            <li class="">
              <a href="javascript:;"> <i class="material-icons">layers</i> <span class="title">Мультилендинг</span> <span class=" arrow"></span> </a>
              <ul class="sub-menu" >
                <li v-for="(site) in sites"
                :key="site.id">
                  <router-link :to="{name: 'MlAnalytics', params: { siteId: site.id }}">{{site.name}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
          <div class="clearfix"></div>
          <!-- END SIDEBAR MENU -->
        </div>
        <div class="inner-menu nav-collapse">
          <div id="inner-menu">
            <div class="inner-wrapper">
              <!-- <a class="btn btn-block btn-primary" href="ml-new.html"><span class="bold">ДОБАВИТЬ</span></a> -->
              <router-link :to="{ name: 'CreateSite'}" class="btn btn-block btn-primary"><span class="bold">ДОБАВИТЬ</span></router-link>
            </div>
            <div class="inner-menu-content">
              <p class="menu-title">
              </p>
            </div>
            <ul class="big-items">
                <!-- <span class="badge badge-important">2</span>                  -->
                <router-link tag="li" :to="{name:'MlAnalytics'}" exact>
                <a>Аналитика</a>
              </router-link>
              <li>
                <a href="ml-variants.html">Варианты</a>
              </li>
              <router-link tag="li" :to="{name:'SiteElements'}" exact>
                <a>Элементы</a>
              </router-link>
            </ul>
            <ul class="small-items">
                <router-link tag="li" :to="{name:'MlSettings'}" exact>
                <a>Настройки</a>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
      <a href="#" class="scrollup">Scroll</a>
      <!-- END SIDEBAR -->
      <router-view></router-view>
    </div>
    <!-- END CONTAINER -->
</template>

<script>
import config from '../../config'

export default {
  data () {
    return {
      sites: []
    }
  },
  created: function () {
    this.fetchSitesData()
  },

  methods: {
    fetchSitesData: function () {
      this.$http.get(config.api.uri + 'sites').then((response) => {
        this.sites = response.body
      }, (response) => {

      })
    }
  }
}
</script>
