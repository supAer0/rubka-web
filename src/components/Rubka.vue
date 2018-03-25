<template>
  <!-- <div class="hello">
    <div class="page-title">
      <h3>{{msg}}</h3>
    </div>
  </div> -->

 <!-- BEGIN CONTENT -->
    <div class="page-container row-fluid">
      <!-- BEGIN SIDEBAR -->
      <div class="page-sidebar " id="main-menu">
        <!-- BEGIN MINI-PROFILE -->
        <div class="page-sidebar-wrapper scrollbar-dynamic" id="main-menu-wrapper">
          <div class="user-info-wrapper sm">
            <div class="profile-wrapper sm">
              <img src="../assets/img/profiles/1.png" width="69" height="69" />
              <div class="availability-bubble online"></div>
            </div>
            <div class="user-info sm">
              <div class="username">Иван <span class="semi-bold">Иванов</span></div>
              <div class="status">Топ</div>
            </div>
          </div>
          <!-- END MINI-PROFILE -->
          <!-- BEGIN SIDEBAR MENU -->
          <p class="menu-title sm">РАЗДЕЛЫ<span class="pull-right"><a href="javascript:;"><i class="material-icons">refresh</i></a></span></p>
          <ul>
            <li class="start active "> <a href="#"><i class="material-icons">home</i> <span class="title">Главная</span> <span class="selected"></span> </a>
            </li>
            <li class="">
              <a > <i class="material-icons">layers</i> <span class="title">Мультилендинг</span> <span class=" arrow"></span> </a>
              <ul class="sub-menu">
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
      </div>
      <a href="#" class="scrollup">Scroll</a>
      <!-- END SIDEBAR -->
      <!-- BEGIN PAGE CONTAINER-->
      <div class="page-content">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
      <!-- END PAGE CONTAINER -->
    </div>
    <!-- END CONTENT -->
</template>

<script>
import config from '../config'

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
