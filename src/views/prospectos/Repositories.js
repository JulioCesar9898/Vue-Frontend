import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'
//let prueba= 'http://192.168.100.124'
let prueba= 'http://127.0.0.1:8000';
const urlAPI = '/api/prospectos';


const updateRegistro = async (self) => {
  self.submitted      = true
  self.spinner        = true
  self.errors         = null

	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/update/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"), self.form);
    return response.data
	}catch(error) {
    self.submitted    = false
    self.spinner      = false
    self.errors       = alert.responseCatch(error, 'Code #1009');
	}
}
const getRegistrolista = async (self) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/get/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"));
		return response.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1012')
	}
}



export default ({

  updateRegistro,
  getRegistrolista,
  

});
