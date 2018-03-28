// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// style
require('./assets/plugins/pace/pace-theme-flash.css')
require('./assets/plugins/bootstrapv3/css/bootstrap.min.css')
require('./assets/plugins/bootstrapv3/css/bootstrap-theme.min.css')
require('./assets/plugins/font-awesome/css/font-awesome.css')
require('./assets/plugins/animate.min.css')
require('./assets/plugins/jquery-scrollbar/jquery.scrollbar.css')
require('./assets/webarch/css/webarch.css')
// js
require('./assets/plugins/pace/pace.min.js')
require('./assets/plugins/jquery/jquery-1.11.3.min.js')
require('./assets/plugins/bootstrapv3/js/bootstrap.min.js')
require('./assets/plugins/jquery-block-ui/jqueryblockui.min.js')
require('./assets/plugins/jquery-unveil/jquery.unveil.min.js')
require('./assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js')
require('./assets/plugins/jquery-validation/js/jquery.validate.min.js')
require('./assets/plugins/bootstrap-select2/select2.min.js')
require('./assets/webarch/js/webarch.js')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
