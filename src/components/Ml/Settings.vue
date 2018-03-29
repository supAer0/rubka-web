<template>
  <div class="page-content">
        <div class="content">
          <ul class="breadcrumb">
            <li>
              <p>МУЛЬТИЛЕНДИНГ</p>
            </li>
            <li><a href="#" class="active">Настройки</a> </li>
          </ul>
          <div class="page-title">
            <i class="icon-custom-left back" @click="back"></i>
            <h3><span class="semi-bold">{{site.name}}</span> <a v-bind:href="site.url" target="_blank">{{site.url}}</a></h3>
            <div class="pull-right">
              <button class="btn btn-danger btn-cons-md" @click="removeSite">Удалить сайт</button>
            </div>
          </div>
          <!-- END PAGE TITLE -->
          <!-- BEGIN BASIC FORM ELEMENTS-->
          <div class="row">
            <div class="col-md-12">
              <div class="grid simple">
                <div class="grid-title no-border">
                  <h4>Параметры сайта</h4>
                  <div class="tools">
                    <a href="javascript:;" class="collapse"></a>
                  </div>
                </div>
                <div class="grid-body no-border">
                  <br>
                  <div class="row">
                    <form v-on:submit.prevent="patchSite">
                      <div class="col-md-8 col-sm-8 col-xs-8">
                        <div class="form-group">
                          <label class="form-label">Название</label>
                          <div class="controls">
                            <input type="text" v-model="site.name" class="form-control" required>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Адрес сайта</label>
                          <div class="controls">
                            <input type="text" v-model="site.url" class="form-control" required>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">ID яндекс метрики</label>
                          <div class="controls">
                            <input type="text" v-model="site.yaMetrikaId" class="form-control">
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Токен</label>
                          <div class="controls">
                            <input type="text" v-model="site.token" class="form-control" disabled="disabled">
                          </div>
                          <div class="form-actions">
                            <div class="pull-right">
                              <button type="submit" class="btn btn-primary btn-cons-md">Сохранить</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END PLACE PAGE CONTENT HERE -->
        </div>
      </div>
</template>

<script>
import config from '../../config'

export default {
  data () {
    return {
      site: {}
    }
  },
  created: function () {
    this.fetchSiteData()
  },

  methods: {
    fetchSiteData: function () {
      this.$http.get(config.api.uri + 'sites/' + this.$route.params.siteId).then((response) => {
        this.site = response.body
      }, (response) => {

      })
    },
    patchSite: function () {
      this.$http.patch(config.api.uri + 'sites/' + this.$route.params.siteId, this.site, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.$router.push({
          name: 'MlAnalytics'
        })
      }, (response) => {
        // TODO notif
      })
    },
    removeSite: function () {
      if (confirm('Вы действительно хотите удалить сайт ' + this.site.name + '?')) {
        this.$http.delete(config.api.uri + 'sites/' + this.$route.params.siteId, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.$router.push({
            name: 'Rubka'
          })
        }, (response) => {
          // TODO notif
        })
      }
    },
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
  .back {
    cursor: pointer
  }
</style>
