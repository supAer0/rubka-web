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
            <h3><span class="semi-bold">{{site.name}}</span> Элементы</h3>
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
                  <h4>Элементы сайта</h4>
                  <div class="tools">
                    <a href="javascript:;" class="collapse"></a>
                  </div>
                </div>
                <div id="table" class="table-editable overflow block_elements grid-body no-border">
                  <span class="table-add pull-right glyphicon glyphicon-plus" id="btn_add_elements" @click="addNewLine"></span>
                  <table class="table" id="table_elements">
                      <tr class="tr-head">
                      <th>Название</th>
                      <th>Ключ</th>
                      <th></th>
                      </tr>
                      <tr  v-for="(element) in elements"
                      :key="element.id">
                          <td contenteditable="true">{{element.name}}</td>
                          <td contenteditable="true">{{element.keyName}}</td>
                          <td>
                              <span class="table-remove glyphicon glyphicon-remove" @click="removeLine(element.id)"></span>
                          </td>
                      </tr>
                  </table>
                  <div class="form-actions">
                    <div class="pull-right">
                      <button type="submit" class="btn btn-primary btn-cons-md" @click="saveElements">Сохранить</button>
                    </div>
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
let i = 0
export default {
  data () {
    return {
      site: {},
      elements: {}
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
      this.$http.get(config.api.uri + 'sites/' + this.$route.params.siteId + '/siteElements').then((response) => {
        this.elements = response.body
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
    saveElements: function () {
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
    back: function () {
      this.$router.go(-1)
    },
    addNewLine: function () {
      this.elements.push({id: i.toString(), name: 'undef', keyName: 'undef'})
      i++
    },
    removeLine: function (inputId) {
      for (let j = 0; j < this.elements.length; j++) {
        if (this.elements[j].id === inputId) {
          this.elements.splice(j, 1)
          return
        }
      }
    }
  }
}
</script>

<style>
  .back {
    cursor: pointer
  }
</style>
