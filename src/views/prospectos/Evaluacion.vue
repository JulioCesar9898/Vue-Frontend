<template>
  <CRow>
    <CCol col="14" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            Lista de Prospectos
          </CCardHeader>
          <CCardBody>
            <CAlert :show.sync="dismissCountDown" color="primary" fade>
              ({{ dismissCountDown }}) {{ message }}
            </CAlert>
            <CDataTable
              :items="items"
              :fields="fields"
              :items-per-page="10"
              pagination
            >
              <template #show="{item}">
                <td>
                  <CButton color="ligth" @click="EditarProspecto(item.id)">
                   <img src="https://img.icons8.com/color/24/000000/plus--v1.png"/>
                  </CButton>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </transition>
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";

export default {
  name: "evaluacion",
  data: () => {
    return {
      items: [],
      fields: ["id", "nom", "apell_p", "apell_m", "show"],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      you: null,
      message: "",
      showMessage: false,
      dismissSecs: 7,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  paginationProps: {
    align: "center",
    doubleArrows: false,
    previousButtonHtml: "prev",
    nextButtonHtml: "next"
  },
  methods: {
    EditarProspecto(id) {
      this.$router.push({ path: `/edit/${id.toString()}` });
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    getprospect() {
      let self = this;
      axios
        .post(
          this.$apiAdress +
            "/api/prospectos?token=" +
            localStorage.getItem("api_token")
        )
        .then(function(response) {
          self.items = response.data;
          // self.you = response.data.you;
        })
        .catch(function(error) {
          console.log(error);
          self.$router.push({ path: "/login" });
        });
    }
  },
  mounted: function() {
    this.getprospect();
  }
};
</script>
