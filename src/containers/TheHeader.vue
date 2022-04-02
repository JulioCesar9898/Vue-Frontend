<template>
  <CHeader with-subheader>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>

    <CMenu/>

    
      
      
  
    </CHeaderNav>
 
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif'
import TheHeaderDropdownTasks from './TheHeaderDropdownTasks'
import TheHeaderDropdownMssgs from './TheHeaderDropdownMssgs'
import CMenu from './Menu'
import axios from 'axios'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownNotif,
    TheHeaderDropdownTasks,
    TheHeaderDropdownMssgs,
    CMenu
  },
  data: function(){
    return {
      langs: [],
      locale: 'en',
    }
  },
  methods:{
    selectLocale: function(option){
      localStorage.setItem("locale", option)
      this.$i18n.set( option )
      //location.reload()
      this.$emit('change-locale', option)
    }
  },
  mounted () {
    let self = this;
    if(typeof localStorage.locale !== 'undefined'){
      this.locale = localStorage.getItem("locale")
    }
    axios.get( this.$apiAdress + '/api/langlist?token=' + localStorage.getItem("api_token") )
    .then(function (response) {
      self.langs = [];
      for(let i =0; i<response.data.length; i++){
        self.langs.push({
          value: response.data[i].short_name,
          label: response.data[i].name
        });
      }
    }).catch(function (error) {
      console.log(error)
      self.$router.push({ path: '/login' })
    });
  }
}
</script>
