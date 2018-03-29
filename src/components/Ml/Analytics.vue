<template>
   <div class="page-content">
        <div class="content">
          <!-- BEGIN PAGE TITLE -->
          <div class="page-title">
            <h3>Analytics must be here!</h3>
          </div>
          {{yaMetrika.data}}
          <!-- END PAGE TITLE -->
          <!-- BEGIN PlACE PAGE CONTENT HERE -->
          <!-- END PLACE PAGE CONTENT HERE -->
        </div>
      </div>
</template>

<script>
import config from '../../config'

export default {
  data () {
    return {
      site: {},
      yaMetrika: {}
    }
  },
  created: function () {
    this.fetchSiteData()
  },

  methods: {
    fetchSiteData: function () {
      this.$http.get(config.api.uri + 'sites/' + this.$route.params.siteId).then((response) => {
        this.site = response.body
        console.log(response.body)
        if (typeof this.site.yaMetrikaId !== 'undefined') {
          this.$http.get(config.yaMetrika.uri + 'metrics=ym:s:users&id=' + this.site.yaMetrikaId + '&oauth_token=' + config.yaMetrika.oauth_token).then((response) => {
            console.log(response.body)
            this.yaMetrika = response.body
          }, (response) => {

          })
        }
      }, (response) => {

      })
    }
    // https://api-metrika.yandex.ru/stat/v1/data?metrics=ym:s:users&id=48196652&oauth_token=AQAAAAAWBpIcAATo5lXd52eLnUG1mYHtHOfg-Ug
  }
}
</script>
