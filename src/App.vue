<template>
  <div id="app">
    <!-- Header Navigation -->
    <nav class="navbar navbar-light bg-light border-bottom">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Programación Front End</span>
        <div class="d-flex">
          <input 
            class="form-control me-2" 
            type="search" 
            placeholder="Search" 
            style="width: 200px;"
          >
          <button class="btn btn-outline-success" type="submit">Búsqueda</button>
        </div>
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
/* Importar Bootstrap */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css');

/* Estilos para navegación */
.navbar-brand {
  font-weight: 600;
  color: #333 !important;
}

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
  .navbar .d-flex {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  
  .navbar .form-control {
    width: 100% !important;
  }
  
  .nav-tabs .nav-link {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>