<template>
   <div class="page-content">
        <div class="content">
<ul class="breadcrumb">
            <li>
              <p>МУЛЬТИЛЕНДИНГ</p>
            </li>
            <li><a href="#" class="active">Аналитика</a> </li>
          </ul>
          <div class="page-title">
            <i class="icon-custom-left back" @click="back"></i>
            <h3><span class="semi-bold">{{site.name}}</span> Аналитика</h3>
          </div>
          <!-- END PAGE TITLE -->
          <!-- BEGIN BASIC FORM ELEMENTS-->
          <div class="row">
            <div class="col-md-12">
              <div class="grid simple">
                <div class="grid-title no-border">
                  <h4 class="text-center"><span class="semi-bold">Яндекс метрика</span></h4>
                  <div class="tools">
                    <a href="javascript:;" class="collapse" @click="collapse"></a>
                  </div>
                </div>
                <div class="grid-body no-border">
                  <div class="row">
                    <div class="col-md-8 col-sm-8 col-xs-8">
                      <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-6">
                          <div class="form-group">
                          <label class="form-label">Дата начала</label>
                          <div class="controls">
                            <datepicker language="ru" v-model="state.date1"></datepicker>
                          </div>
                         </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-6">
                          <div class="form-group">
                            <label class="form-label">Дата окончания</label>
                            <div class="controls">
                              <datepicker language="ru" v-model="state.date2"></datepicker>
                            </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <h4>Посетители</h4>
                      <p>{{state}}</p>
                      <line-chart :data="chartData" label="Поситители" :messages="{empty: 'No data'}" :colors="['green', '#666']" legend="bottom" :discrete="true"></line-chart>
                    </div>
                    <div class="col-md-6">
                      <h4>Сегментация</h4>
                      <pie-chart :donut="true" :data="chartData"></pie-chart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END PLACE PAGE CONTENT HERE -->
          <!-- BEGIN PlACE PAGE CONTENT HERE -->
          <!-- END PLACE PAGE CONTENT HERE -->
        </div>
      </div>
</template>

<script>
// import config from '../../config'
// Date Pickers
import Datepicker from 'vuejs-datepicker'
export default {
  data () {
    return {
      site: {},
      yaMetrika: {},
      chartData: [['Январь', 4], ['Февраль', 2], ['Март', 10], ['Апрель', 5], ['Май', 3]],
      state: {}
    }
  },
  created: function () {
    this.fetchSiteData()
  },

  methods: {
    fetchSiteData: function () {
      // this.$http.get(config.api.uri + 'sites/' + this.$route.params.siteId).then((response) => {
      //   this.site = response.body
      //   console.log(response.body)
      //   if (typeof this.site.yaMetrikaId !== 'undefined') {
      //     this.$http.get(config.yaMetrika.uri + 'metrics=ym:s:users&id=' + this.site.yaMetrikaId + '&oauth_token=' + config.yaMetrika.oauth_token).then((response) => {
      //       console.log(response.body)
      //       this.yaMetrika = response.body
      //     }, (response) => {

      //     })
      //   }
      // }, (response) => {

      // })
    },
    back: function () {
      this.$router.go(-1)
    }
    // https://api-metrika.yandex.ru/stat/v1/data?metrics=ym:s:users&id=48196652&oauth_token=AQAAAAAWBpIcAATo5lXd52eLnUG1mYHtHOfg-Ug
  },
  components: {
    Datepicker
  }
}
</script>

<style scoped>

</style>
