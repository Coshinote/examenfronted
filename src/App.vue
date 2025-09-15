<template>
  <div id="app">
    <!-- Header Navigation -->
    <nav class="navbar navbar-light bg-light border-bottom">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Programación Front End</span>
      </div>
    </nav>

    <!-- Tabs Navigation -->
    <div class="container-fluid mt-3">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link 
            to="/" 
            class="nav-link" 
            :class="{ active: $route.name === 'Calificaciones' }"
          >
            Cálculo de calificaciones
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            to="/formulario-registro" 
            class="nav-link" 
            :class="{ active: $route.name === 'FormularioRegistro' }"
          >
            Formulario de Registro
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-muted" href="#">En construcción</a>
        </li>
      </ul>
    </div>

    <!-- Router View -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Bootstrap se importa en index.html */

/* Estilos para navegación */
.navbar-brand {
  font-weight: 600;
  color: #333 !important;
}

/* Estilos para las pestañas */
.nav-tabs .nav-link.active {
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  color: #333;
  font-weight: 500;
}

.nav-tabs .nav-link {
  color: #6c757d;
  border: 1px solid transparent;
  padding: 12px 20px;
  text-decoration: none;
}

.nav-tabs .nav-link:hover {
  color: #495057;
  background-color: #f8f9fa;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-tabs .nav-link {
    padding: 8px 15px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .navbar-brand {
    font-size: 1rem;
    text-align: center;
  }
  
  .container-fluid {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>