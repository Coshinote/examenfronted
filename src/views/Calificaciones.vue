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
          <a class="nav-link active" href="#">Cálculo de calificaciones</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-muted" href="#">Formulario de Registro</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-muted" href="#">En construcción</a>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="container-fluid mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="calcular">
            <!-- Nota 1 -->
            <div class="mb-4 text-center">
              <label class="form-label fw-bold">Nota 1</label>
              <input
                type="number"
                class="form-control text-center"
                :class="{ 'border-primary': errores.nota1 }"
                v-model.number="formulario.nota1"
                placeholder="Nota 1"
                min="10"
                max="70"
                step="0.1"
              >
            </div>

            <!-- Nota 2 -->
            <div class="mb-4 text-center">
              <label class="form-label fw-bold">Nota 2</label>
              <input
                type="number"
                class="form-control text-center"
                :class="{ 'border-primary': errores.nota2 }"
                v-model.number="formulario.nota2"
                placeholder="Nota 2"
                min="10"
                max="70"
                step="0.1"
              >
            </div>

            <!-- Nota 3 -->
            <div class="mb-4 text-center">
              <label class="form-label fw-bold">Nota 3</label>
              <input
                type="number"
                class="form-control text-center"
                :class="{ 'border-primary': errores.nota3, 'border-warning': mostrarTooltipNota3 }"
                v-model.number="formulario.nota3"
                placeholder="Nota 3"
                min="10"
                max="70"
                step="0.1"
                @focus="mostrarTooltipNota3 = true"
                @blur="mostrarTooltipNota3 = false"
              >
              <!-- Tooltip para validación -->
              <div v-if="mostrarTooltipNota3 && (formulario.nota3 < 10 || formulario.nota3 > 70)" 
                   class="tooltip-custom">
                <div class="tooltip-arrow"></div>
                <div class="tooltip-content">
                  <i class="fas fa-exclamation-triangle text-warning"></i>
                  El valor debe ser {{ formulario.nota3 < 10 ? 'superior o igual a 10' : 'inferior o igual a 70' }}
                </div>
              </div>
            </div>

            <!-- Asistencia -->
            <div class="mb-4 text-center">
              <label class="form-label fw-bold">Asistencia %</label>
              <input
                type="number"
                class="form-control text-center"
                :class="{ 'border-primary': errores.asistencia }"
                v-model.number="formulario.asistencia"
                placeholder="Asistencia"
                min="0"
                max="100"
                step="1"
              >
            </div>

            <!-- Botón Calcular -->
            <div class="text-center mb-4">
              <button type="submit" class="btn btn-primary px-4">
                Calcular
              </button>
            </div>
          </form>

          <!-- Mensaje de Error General -->
          <div v-if="mostrarErrorGeneral" class="text-center mb-4">
            <p class="text-danger fw-bold">Por favor, ingrese valores válidos para las notas y la asistencia</p>
          </div>

          <!-- Resultados -->
          <div v-if="mostrarResultado" class="text-center">
            <p class="fw-bold mb-2">El promedio es: {{ promedioPonderado.toFixed(2) }}</p>
            <p class="fw-bold" :class="estadoClase">Tu estado es: {{ estado }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calificaciones',
  data() {
    return {
      formulario: {
        nota1: null,
        nota2: null,
        nota3: null,
        asistencia: null
      },
      errores: {},
      mostrarResultado: false,
      mostrarErrorGeneral: false,
      mostrarTooltipNota3: false,
      promedioPonderado: 0,
      estado: '',
      aprobado: false
    }
  },
  computed: {
    estadoClase() {
      return this.aprobado ? 'text-success' : 'text-danger';
    }
  },
  methods: {
    validarCampos() {
      this.errores = {};
      let valido = true;

      // Validar Nota 1
      if (this.formulario.nota1 === null || this.formulario.nota1 === '' || 
          this.formulario.nota1 < 10 || this.formulario.nota1 > 70) {
        this.errores.nota1 = true;
        valido = false;
      }

      // Validar Nota 2
      if (this.formulario.nota2 === null || this.formulario.nota2 === '' || 
          this.formulario.nota2 < 10 || this.formulario.nota2 > 70) {
        this.errores.nota2 = true;
        valido = false;
      }

      // Validar Nota 3
      if (this.formulario.nota3 === null || this.formulario.nota3 === '' || 
          this.formulario.nota3 < 10 || this.formulario.nota3 > 70) {
        this.errores.nota3 = true;
        valido = false;
      }

      // Validar Asistencia
      if (this.formulario.asistencia === null || this.formulario.asistencia === '' || 
          this.formulario.asistencia < 0 || this.formulario.asistencia > 100) {
        this.errores.asistencia = true;
        valido = false;
      }

      return valido;
    },
    calcular() {
      this.mostrarResultado = false;
      this.mostrarErrorGeneral = false;
      
      if (!this.validarCampos()) {
        this.mostrarErrorGeneral = true;
        return;
      }

      // Calcular promedio ponderado
      this.promedioPonderado = (
        (this.formulario.nota1 * 0.35) +
        (this.formulario.nota2 * 0.35) +
        (this.formulario.nota3 * 0.30)
      );

      // Determinar si aprueba
      const promedioSuficiente = this.promedioPonderado >= 40;
      const asistenciaSuficiente = this.formulario.asistencia >= 80;

      this.aprobado = promedioSuficiente && asistenciaSuficiente;
      this.estado = this.aprobado ? 'Aprobado' : 'Reprobado';
      this.mostrarResultado = true;
    }
  }
}
</script>

<style scoped>
/* Estilos generales */
body {
  background-color: #f8f9fa;
}

/* Navegación */
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
}

/* Formulario */
.form-control {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  background-color: #fff;
  max-width: 400px;
  margin: 0 auto;
}

.form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control.border-primary {
  border-color: #007bff !important;
}

.form-control.border-warning {
  border-color: #ffc107 !important;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-size: 16px;
}

/* Botón */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 10px 30px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

/* Tooltip personalizado */
.tooltip-custom {
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.tooltip-content {
  background-color: #fff;
  border: 1px solid #ffc107;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  color: #856404;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #ffc107;
}

/* Resultados */
.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .form-control {
    max-width: 100%;
  }
  
  .navbar .d-flex {
    flex-direction: column;
    gap: 10px;
  }
  
  .navbar .d-flex input {
    width: 100% !important;
  }
}
</style>