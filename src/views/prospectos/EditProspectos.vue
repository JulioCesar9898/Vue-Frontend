<template>
  <CCard class="shadow">
    <CCardHeader color="dark p-1">
      <h4 class="text-white">
        Editar Status de Prospecto:

        <span v-text="$route.params.id" />
      </h4>
    </CCardHeader>
    <CForm @submit.prevent="update()" method="POST">
      <CCardBody>
        <CRow v-if="errors != null" class="alert alert-danger p-0 m-0">
          <CCol sm="12"
            ><ul>
              <li class=" text-danger" v-for="error in errors">
                {{ error[0] }}
              </li>
            </ul></CCol
          >
        </CRow>
        <CRow>
          <CCol sm="">
            <CCol sm="">
              <CInput
                label="Nombre del prospecto *"
                type="text"
                placeholder="Nombre"
                maxlength="50"
                class="mb-0"
                :lazy="false"
                :value.sync="form.nom"
                disabled
              >
                <template #prepend-content><CIcon name="cilItalic"/></template>
              </CInput>
            </CCol>

            <CCol sm="">
              <CInput
                label="Primer Apellido"
                type="text"
                placeholder="Primer Apellido"
                maxlength="200"
                class="mb-0"
                :lazy="false"
                :value.sync="form.apell_p"
                disabled
              >
                <template #prepend-content
                  ><CIcon name="cilListNumbered"
                /></template>
              </CInput>
            </CCol>
            <CCol sm="">
              <CInput
                label="Segundo Apellido*"
                type="text"
                placeholder="Segundo Apellido"
                maxlength="200"
                class="mb-0"
                :lazy="false"
                :value.sync="form.apell_m"
                disabled
              >
                <template #prepend-content><CIcon name="cilItalic"/></template>
              </CInput>
            </CCol>

            <CCol sm="">
              <CInput
                label="Calle *"
                type="text"
                placeholder="Calle"
                maxlength="200"
                class="mb-0"
                :lazy="false"
                :value.sync="form.calle"
                disabled
              >
                <template #prepend-content><CIcon name="cilItalic"/></template>
              </CInput>
            </CCol>
            <CCol sm="">
              <CInput
                label="Número*"
                type="text"
                placeholder="Número"
                maxlength="200"
                class="mb-0"
                :lazy="false"
                :value.sync="form.numero"
                disabled
              >
                <template #prepend-content><CIcon name="cilList"/></template>
              </CInput>
            </CCol>
            <br />
          </CCol>
          <CCol sm="">
            <CCol sm="">
              <CInput
                label="Colonia *"
                type="text"
                placeholder="Colonia"
                maxlength="50"
                class="mb-0"
                :lazy="false"
                :value.sync="form.colonia"
                disabled
              >
                <template #prepend-content><CIcon name="cilItalic"/></template>
              </CInput>
            </CCol>

            <CCol sm="">
              <CInput
                label="Código Postal"
                type="text"
                placeholder="Código Postal"
                maxlength="200"
                class="mb-0"
                :lazy="false"
                :value.sync="form.cp"
                disabled
              >
                <template #prepend-content
                  ><CIcon name="cilListNumbered"
                /></template>
              </CInput>
            </CCol>
            <CCol sm="">
              <CInput
                label="Teléfono*"
                type="text"
                placeholder="Teléfono"
                maxlength="200"
                class="mb-0"
                :lazy="false"
                :value.sync="form.telefono"
                disabled
              >
                <template #prepend-content><CIcon name="cilItalic"/></template>
              </CInput>
            </CCol>

            <CCol sm="">
              <CInput
                label="RFC *"
                type="text"
                placeholder="RFC"
                maxlength="200"
                class="mb-0"
                :lazy="false"
                :value.sync="form.RFC"
                disabled
              >
              </CInput>
              <br />
            </CCol>
            <CCol>
              <CFormGroup wrapperClasses="input-group pt-2">
                <template #label>Actualiza Estatus</template>
                <template #input>
                  <multiselect
                    v-model="form.status"
                    :options="$options.option"
                    :group-select="true"
                    tag-placeholder="Sin coincidencias"
                    placeholder="Buscar . . ."
                    select-label="Seleccionar"
                    selected-label="Seleccionado"
                    deselect-label="Quitar selección"
                    label="text"
                    track-by="value"
                    :taggable="true"
                    class="form-control border-0 p-0 m-0"
                    selectionType="tags"
                    :selection="true"
                  />
                </template>
              </CFormGroup>
            </CCol>
          </CCol>
        </CRow>
        <CCol sm="">
          <CTextarea
            v-if="form.status.value == 'Rechazado'"
            label="Observacion *"
            placeholder="Ingrese las Observaciones"
            rows="2"
            v-model="form.observacion"
            
            
           />
        </CCol>
        <!--
        <CCol lg="6">
          <CCard :class="`bg-${submitted ? 'info' : 'secondary' }`">
            <pre>{{formString}}</pre>
          </CCard>
        </CCol>
        -->
      </CCardBody>
      <CCardFooter>
    <CRow class="content-center">
          <CCol>
            <CButton
              type="submit"
              color="info"
              class="w-75"
           
              ><CIcon name="cilSave" /> Actualizar</CButton
            >
          </CCol>
        </CRow>
      </CCardFooter>
    </CForm>


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
                 <img src="https://img.icons8.com/color/16/000000/download--v2.png"/>
                </CButton>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
        
      </CCard>
   
    </CCol>
     <CCardFooter>
        
      </CCardFooter>
  </CCard>
</template>

<script>
import { validationMixin } from "vuelidate";

import Repositories from "./Repositories";
import alert from "@/repositories/global/alert";
import axios from "axios";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";

export default {
  name: "editprospectos",
  components: {
    Multiselect
  },
  data() {
    return {
      status: [],
       itemsDocuments: [],
       fieldsDocuments: ["id", "nombre_document", "Descargar"],
      submitted: false,
      spinner: false,
      showForm: true,
      form: this.getEmptyForm(),
      errors: null,
      show: true,
      showDismissibleAlert: false
    };
  },
  option: [
    { value: "Autorizado", text: "Autorizado" },
    { value: "Rechazado", text: "Rechazado" }
  ],

  mounted: function() {
    this.getRegistro();
     
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
  
  },
  computed: {
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    //formString() { return JSON.stringify(this.form, null, 4) },
    isValid() {
      return !this.$v.form.$invalid;
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      observacion: { required }
    }
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
    validar: function validar(event) {
      console.log(event);
      this.form.status = event.target.value;
      if (this.event.target.value == "Rechazado") {
        console.log("agarra");
      }
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    permisos(permisos) {
      return check.permiso(permisos);
    },
    getEmptyForm() {
      return {
        nom: "",
        apell_p: "",
        apell_m: "",
        calle: "",
        numero: "",
        colonia: "",
        cp: "",
        telefono: "",
        RFC: "",
        status: "",
        observacion: ""
      };
    },
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    async update() {
        if(this.form.status=="Rechazado" || this.form.observacion=="" ){

        if(this.form.observacion==""){
            Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Necesita agregar observaciones',
                    })
         }
                  
                }
               else {
  let result = await Swal.fire({
        icon: "info",
        title: "¿Estás seguro que quieres actualizar este registro?",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        cancelButtonText: `Cancelar`
      });

      if (result.value) {
        let self = this;
        self.form.val_ant_cli = self.form.status;
        self.form.status = self.form.status.value;

        let data = await Repositories.updateRegistro(self);

        if (data != undefined) {
          self.form.status = self.form.val_ant_cli;
          self.submitted = false;
          self.spinner = false;
          await alert.response200(3, "¡Actualizado exitosamente!", "");
        }
      }


                }
    
    },
    async getRegistro() {
      let self = this;
      self.form = await Repositories.getRegistrolista(self);
      
      self.showForm = false;

      
     
      
    }
  }
};
</script>
