import { createRouter, createWebHistory } from 'vue-router'
import Calificaciones from '../views/Calificaciones.vue'
import Formularioregistro from '../views/Formularioregistro.vue'

const routes = [
  {
    path: '/',
    name: 'Calificaciones',
    component: Calificaciones
  },
  {
    path: '/formulario-registro',
    name: 'FormularioRegistro',
    component: Formularioregistro
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router