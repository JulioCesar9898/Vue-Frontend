<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
 
      <CSidebarNav>
  <CSidebarNavItem name="Lista de Prospectos" to="/ListProspectos" icon="cil-notes"></CSidebarNavItem>
   <CSidebarNavItem name="Regitrar Prospectos" to="/RegProspectos" icon="cil-user-follow" ></CSidebarNavItem>
     <CSidebarNavItem name="Evaluacion de Prospectos" to="/Evaluacion" icon="cil-notes"></CSidebarNavItem>
  <!---<CSidebarNavDropdown name="Prospectos" to="/" icon="cil-user" >
   
    <CSidebarNavItem name="Lista de usuarios" to="/users" icon="cil-list" ></CSidebarNavItem>
    <CSidebarNavItem name="Email" to="/email" icon="cil-speech" ></CSidebarNavItem>
  </CSidebarNavDropdown>-->

  </CSidebarNav>
















    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheSidebar',
  
  data () {
    return {
      // minimize: false,
     
      // show: 'responsive',
      buffor: [],
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  },
  methods: {
  },

  mounted () {
    this.$root.$on('toggle-sidebar', () => {
      const sidebarOpened = this.show === true || this.show === 'responsive'
      this.show = sidebarOpened ? false : 'responsive'
    })
    this.$root.$on('toggle-sidebar-mobile', () => {
      const sidebarClosed = this.show === 'responsive' || this.show === false
      this.show = sidebarClosed ? true : 'responsive'
    })

  }
}
</script>
