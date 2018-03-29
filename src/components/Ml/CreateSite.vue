<template>
  <div class="page-content">
        <div class="content">
          <!-- BEGIN PAGE TITLE -->
          <ul class="breadcrumb">
            <li>
              <p>МУЛЬТИЛЕНДИНГ</p>
            </li>
            <li><a href="#" class="active">Добавить новый</a> </li>
          </ul>
          <div class="page-title">
             <i class="icon-custom-left" @click="back"></i>
            <h3>Новый <span class="semi-bold">сайт</span></h3>
          </div>
          <form v-on:submit.prevent="createSite">
          <!-- END PAGE TITLE -->
          <!-- BEGIN BASIC FORM ELEMENTS-->
            <div class="row">
              <div class="col-md-12">
                <div class="grid simple">
                  <div class="grid-title no-border">
                    <h4>Параметры нового сайта</h4>
                    <div class="tools">
                      <a href="javascript:;" class="collapse"></a>
                    </div>
                  </div>
                  <div class="grid-body no-border">
                    <br>
                    <div class="row">
                      <div class="col-md-8 col-sm-8 col-xs-8">
                        <div class="form-group">
                          <label class="form-label">Название</label>
                          <div class="controls">
                            <input type="text" placeholder="Супер мега сайт" class="form-control"  v-model="site.name" required>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Адрес сайта</label>
                          <div class="controls">
                            <input type="text" placeholder="google.com" class="form-control"  v-model="site.url" required>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">ID яндекс метрики</label>
                          <div class="controls">
                            <input type="text" v-model="site.yaMetrikaId" class="form-control">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row-fluid">
              <div class="span12">
                <div class="grid simple ">
                  <div class="grid-title">
                    <h4>Элементы на сайте</h4>
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
                          <editable-td :content="element.name" @update="element.name = $event"></editable-td>
                          <editable-td :content="element.keyName" @update="element.keyName = $event"></editable-td>
                          <td>
                              <span class="table-remove glyphicon glyphicon-remove" @click="removeLine(element.id)"></span>
                          </td>
                      </tr>
                  </table>
                  <div class="form-actions">
                    <div class="pull-right">
                      <button type="submit" class="btn btn-primary btn-cons-md" @click="createSite">Перейти к сценариям</button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
           </form>

          <!-- END BASIC FORM ELEMENTS-->
          <!-- BEGIN PlACE PAGE CONTENT HERE -->
          <!-- END PLACE PAGE CONTENT HERE -->
        </div>
      </div>
</template>

<script>
import config from '../../config'
import editableTd from './editable-td'

let i = 0
export default {
  data () {
    return {
      site: {},
      elements: []
    }
  },
  methods: {
    createSite: function () {
      this.$http.post(config.api.uri + 'sites/', this.site, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.site = response.body
        this.elements.map(e => { e.siteId = this.site.id })
        this.$http.post(config.api.uri + 'sites/' + this.site.id + '/saveSiteElements', this.elements, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.$router.push({
            name: 'MlAnalytics',
            params: {
              siteId: this.site.id
            }
          })
        }, (response) => {
          // TODO notif
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
  },
  components: {
    'editable-td': editableTd
  }
}
</script>
