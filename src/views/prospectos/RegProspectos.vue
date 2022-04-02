<template>
  <CCard>
    <div class="m-2">
      <CRow sm="">
        <CCol sm="">
          <CForm @submit.prevent="store()" method="POST" novalidate>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Nombre del Prospecto *"
                  placeholder="Nombre"
                  :value.sync="$v.form.nom.$model"
                  :isValid="checkIfValid('nom')"
                  :lazy="false"
                >
                  <template #prepend-content
                    ><CIcon name="cil-user"
                  /></template>
                </CInput>
                <span
                  class="text-danger float-right"
                  v-if="!$v.form.nom.required"
                  >Este campo es obligatorio</span
                >
              </CCol>

              <CCol sm="6">
                <CInput
                  label="Primer Apellido *"
                  placeholder="Primer Apellido"
                  :value.sync="$v.form.apell_p.$model"
                  :isValid="checkIfValid('apell_p')"
                  :lazy="false"
                >
                  <template #prepend-content
                    ><CIcon name="cil-user"
                  /></template>
                </CInput>
                <span
                  class="text-danger float-right"
                  v-if="!$v.form.apell_p.required"
                  >Este campo es obligatorio</span
                >
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Segundo Apellido"
                  placeholder="Segundo Apellido"
                  :value.sync="form.apell_m"
                >
                  <template #prepend-content
                    ><CIcon name="cil-user"
                  /></template>
                </CInput>
              </CCol>

              <CCol sm="6">
                <CInput
                  label="Calle"
                  :value.sync="$v.form.calle_.$model"
                  :isValid="checkIfValid('calle_')"
                  :lazy="false"
                >
                  <template #prepend-content
                    ><CIcon name="cil-bookmark"
                  /></template>
                </CInput>
                <span
                  class="text-danger float-right"
                  v-if="!$v.form.calle_.required"
                  >Este campo es obligatorio</span
                >
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="6">
                <CInput
                  label="No. Ext."
                  placeholder="No.Ext"
                  :value.sync="$v.form.numero.$model"
                  :isValid="checkIfValid('numero')"
                  :lazy="false"
                >
                  <template #prepend-content
                    ><CIcon name="cil-bookmark"
                  /></template>
                </CInput>
                <span
                  class="text-danger float-right"
                  v-if="!$v.form.numero.required"
                  >Este campo es obligatorio</span
                >
              </CCol>
              <CCol sm="">
                <CInput
                  label="Colonia"
                  placeholder="Colonia"
                  :value.sync="$v.form.colonia.$model"
                  :isValid="checkIfValid('colonia')"
                  :lazy="false"
                >
                  <template #prepend-content
                    ><CIcon name="cil-bookmark"
                  /></template>
                </CInput>
                <span
                  class="text-danger float-right"
                  v-if="!$v.form.colonia.required"
                  >Este campo es obligatorio</span
                >
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="">
                <CInput
                  label="Código postal"
                  placeholder="Código postal"
                  :value.sync="$v.form.cp.$model"
                  :isValid="checkIfValid('cp')"
                  :lazy="false"
                >
                  <template #prepend-content
                    ><CIcon name="cil-bookmark"
                  /></template>
                </CInput>
                <span
                  class="text-danger float-right"
                  v-if="!$v.form.cp.required"
                  >Este campo es obligatorio</span
                >
              </CCol>

              <CCol sm="">
                <CInput
                  label="Teléfono"
                  placeholder="Teléfono"
                  :value.sync="$v.form.telefono.$model"
                  :isValid="checkIfValid('telefono')"
                  :lazy="false"
                >
                  <template #prepend-content
                    ><CIcon name="cil-bookmark"
                  /></template>
                </CInput>
                <span
                  class="text-danger float-right"
                  v-if="!$v.form.telefono.required"
                  >Este campo es obligatorio</span
                >
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="">
                <CInput
                  label="RFC"
                  placeholder="RFC"
                  :value.sync="$v.form.RFC.$model"
                  :isValid="checkIfValid('RFC')"
                  :lazy="false"
                >
                  <template #prepend-content
                    ><CIcon name="cil-bookmark"
                  /></template>
                </CInput>
                <span
                  class="text-danger float-right"
                  v-if="!$v.form.RFC.required"
                  >Este campo es obligatorio</span
                >
              </CCol>
            </CRow>
          </CForm>
        </CCol>
      </CRow>

      <div class="mb-3">
        <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
          >Cargar documentos sustento</CFormLabel
        >
      </div>
      <CRow>
        <div class="col-md-12">
          <el-row type="flex" class="row-bg" justify="center">
            <!-- TODO: cambiar url en modo produccion -->
            <el-upload
              ref="upload"
              action="http://localhost:8000/api/prospectos/uploadFiles"
              class="upload-demo"
              drag
              accept=".pdf"
              :auto-upload="false"
              multiple
              name="file[]"
              :on-change="statusfile"
              :file-list="listaDocumentosAdjuntos"
              :on-remove="eliminarDocumentos"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                Suelta tu archivo aquí o <em>haz clic para cargar</em>
              </div>
              <div slot="tip" class="el-upload__tip">
                Solo archivos PDF de tamaño menor de 4MB
              </div>
            </el-upload>
          </el-row>
        </div>
      </CRow>
      <CButton
        type="submit"
        @click="store()"
        class="btn btn-success float-right w-25"
        ><CIcon name="cilSave" /> Guardar</CButton
      >
      <CButton class="btn btn-danger float-left w-25" @click="goBack()"
        ><CIcon name="cil-XCircle" /> Salir</CButton
      >
    </div>
  </CCard>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  name: "regprospec",
  data() {
    return {
      listaDocumentosAdjuntos: [],
      submitted: false,
      form: this.getEmptyForm(),

      message: "",
      dismissSecs: 3,
      dismissCountDown: 0
    };
  },
  computed: {
    formString() {
      return JSON.stringify(this.form, null, 4);
    },
    isValid() {
      return !this.$v.form.$invalid;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      nom: { required },
      apell_p: { required },
      calle_: { required },
      numero: { required },
      colonia: { required },
      cp: { required },
      telefono: { required },
      RFC: { required }
    }
  },

  methods: {
    goBack() {
      Swal.fire({
        title: "¿Estas segulo que desea salir?",
        text: "¡Todos los datos capturados serán eliminados!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,Salir!"
      }).then(result => {
        if (result.isConfirmed) {
          this.$router.go(-1);
        }
      });
    },

    getEmptyForm() {
      return {
        nom: "",
        apell_p: "",
        apell_m: "",
        calle_: "",
        numero: "",
        colonia: "",
        cp: "",
        telefono: "",
        RFC: ""
      };
    },
    clearForm() {
      let self = this;
      self.form.nom = "";
      self.form.apell_p = "";
      self.form.apell_m = "";
      self.form.calle_ = "";
      self.form.numero = "";
      self.form.colonia = "";
      self.form.cp = "";
      self.form.telefono = "";
      self.form.RFC = "";
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },

    //Registrar prospecto
    store() {
      if (
        this.form.nom == "" ||
        this.form.apell_p == "" ||
        this.form.calle_ == "" ||
        this.form.numero == "" ||
        this.form.colonia == "" ||
        this.form.cp == "" ||
        this.form.telefono == "" ||
        this.form.RFC == ""
      ) {
        if (this.form.nom == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El Nombre del Prospecto es Obligatorio"
          });
        }
        if (this.form.apell_p == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El Primer Apellido es Obligatorio"
          });
        }

        if (this.form.calle_ == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La Calle es Obligatoria"
          });
        }

        if (this.form.numero == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El Numero es Obligatorio"
          });
        }

        if (this.form.colonia == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Colonia Obligatoria"
          });
        }

        if (this.form.cp == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Codigo Postal Obligatorio"
          });
        }
        if (this.form.telefono == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Telefono Obligatorio"
          });
        }
        if (this.form.Rfc == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "RFC Obligatorio"
          });
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "¿Estás seguro que quieres guardar el registro",
          reverseButtons: true,
          showCancelButton: true,
          confirmButtonText: "Guardar",
          confirmButtonColor: "#CB3234",
          cancelButtonText: `Cancelar`
        }).then(result => {
          if (result.isConfirmed) {
            let self = this;
            self.submitted = true;
            self.errors = [];
            axios
              .post(
                this.$apiAdress +
                  "/api/prospectos/store?token=" +
                  localStorage.getItem("api_token"),
                self.form
              )
              .then(function(response) {
            
                self.uploadImage();
                self.clearForm();
                self.submitted = false;
                alert.response200(3, "Guardado exitosamente!", "");
                self.$refs.upload.clearFiles();
              })

              .catch(function(error) {
                self.submitted = false;
                console.log(error);
              });
          }
        });
      }
    },
    eliminarDocumentos(file, listaDocumentosAdjuntos) {
      let vm = this;
      let index = _.findIndex(vm.listaDocumentosAdjuntos, ["uid", file.uid]);
      vm.$delete(vm.listaDocumentosAdjuntos, index);
    },
    statusfile(file) {
      this.listaDocumentosAdjuntos.push(file);
      console.log(this.listaDocumentosAdjuntos);
    },
    beforeRemove(file) {
      this.$delete(this.files, index);
    },
    uploadImage() {
      this.$refs.upload.submit();
    }
  }
};
</script>
<style lang="scss">
.el-upload-dragger {
  width: 500px;
}
</style>
