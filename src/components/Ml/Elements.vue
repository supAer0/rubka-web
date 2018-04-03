<template>
  <div class="page-content">
        <div class="content">
          <ul class="breadcrumb">
            <li>
              <p>МУЛЬТИЛЕНДИНГ</p>
            </li>
            <li><a href="#" class="active">Элементы</a> </li>
          </ul>
          <div class="page-title">
            <i class="icon-custom-left back" @click="back"></i>
            <h3><span class="semi-bold">{{site.name}}</span> Элементы</h3>
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
                <div id="table" class="table table-editable overflow block_elements grid-body no-border">
                  <span class="table-add pull-right glyphicon glyphicon-plus btn" id="btn_add_elements" @click="addNewLine"></span>
                  <table class="table" id="table_elements">
                      <tr class="tr-head">
                      <th>Название</th>
                      <th>Ключ</th>
                      <th></th>
                      </tr>
                      <tbody>
                      <tr  v-for="(element) in elements"
                      :key="element.id">
                          <!-- <td contenteditable="true">{{element.name}}</td> -->
                          <!-- <td contenteditable="true">{{element.keyName}}</td> -->
                          <editable-td :content="element.name" @update="element.name = $event"></editable-td>
                          <editable-td :content="element.keyName" @update="element.keyName = $event"></editable-td>
                          <td>
                              <span style="cursor: pointer" class="table-remove glyphicon glyphicon-remove" @click="removeLine(element)"></span>
                          </td>
                      </tr>
                      </tbody>
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
import editableTd from './editable-td'

let i = 0
export default {
  data () {
    return {
      site: {},
      elements: []
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
    saveElements: function () {
      console.log(this.elements)
      this.$http.post(config.api.uri + 'sites/' + this.$route.params.siteId + '/saveSiteElements/', this.elements, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // TODO notif
        // TODO rewrite
        this.elements = []
        this.$http.get(config.api.uri + 'sites/' + this.$route.params.siteId + '/siteElements').then((response) => {
          this.elements = response.body
        }, (response) => {

        })
      }, (response) => {
        // TODO notif
      })
    },
    back: function () {
      this.$router.go(-1)
    },
    addNewLine: function () {
      this.elements.push({id: i.toString(), name: 'undef', keyName: 'undef', siteId: this.site.id})
      i++
    },
    removeLine: function (element) {
      if (element.id.length > 10) {
        if (confirm('Вы действительно хотите элемент ' + element.name + '?')) {
          this.$http.delete(config.api.uri + 'siteElements/' + element.id, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {

          }, (response) => {
            console.log(response)
          })
        } else { return }
      }
      for (let j = 0; j < this.elements.length; j++) {
        if (this.elements[j].id === element.id) {
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

<style>
  .back {
    cursor: pointer
  }
</style>
