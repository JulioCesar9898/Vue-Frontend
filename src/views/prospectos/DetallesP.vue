<template>
  <CRow>
    <CCol col="15" lg="6">
      <CCard>
        <CCardHeader> #Prospectos: {{ $route.params.id }} </CCardHeader>
        <CCardBody>
          <CDataTable striped small fixed :items="items" :fields="fields">
            <template slot="value" slot-scope="data">
              <strong>{{ data.item.value }}</strong>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
      
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol col="15" lg="6">
      <CCard>
        <CCardHeader>
          Listado de Documentos Adjuntos
        </CCardHeader>
        <CCardBody>
          <CDataTable
            striped
            small
            fixed
            :items="itemsDocuments"
            :fields="fieldsDocuments"
          >
            <template slot="value" slot-scope="data">
              <strong>{{ data.items.value }}</strong>
            </template>
            <template #Descargar="{item}">
              <td>
                <CButton
                  color="ligth"
                  @click="clickDownload(item.url_document)"
                >
                  <img
                    src="https://img.icons8.com/color/16/000000/download--v2.png"
                  />
                </CButton>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
     
    </CCol>
    <CCol>
    <CButton color="danger" @click="goBack" class="w-50">Regresar</CButton>
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";
export default {
  name: "detallesp",
  data: () => {
    return {
      observacion: [],
      items: [],
      itemsDocuments: [],
      fields: [{ key: "key" }, { key: "value" }],
      fieldsDocuments: ["id", "nombre_document", "Descargar"]
    };
  },
  methods: {
    getProspectosData(id) {
      const user = usersData.find((user, index) => index + 1 == id);
      const userDetails = user ? Object.entries(user) : [["id", "Not found"]];
      return userDetails.map(([key, value]) => {
        return { key, value };
      });
    },
    clickDownload(download) {
      window.open(download, "_blank");
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
    let self = this;
    axios
      .get(
        this.$apiAdress +
          "/api/prospectos/show/" +
          self.$route.params.id +
          "?token=" +
          localStorage.getItem("api_token")
      )
      .then(function(response) {
        console.log(response.data);
        //const items = response.data.users;
        const items = Object.entries(response.data.prospecto);
        const itemsDocuments = response.data.documento;
        self.items = items.map(([key, value]) => {
          return { key: key, value: value };
        });
        self.itemsDocuments = itemsDocuments;
      })
      .catch(function(error) {
        console.log(error);
        self.$router.push({ path: "/login" });
      });
  }
};
</script>
