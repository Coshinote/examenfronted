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
          <a class="nav-link text-muted" href="#">Cálculo de calificaciones</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">Formulario de Registro</a>
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
          <form @submit.prevent="enviarFormulario">
            <!-- Nombre -->
            <div class="mb-4 text-center">
              <label class="form-label fw-bold">Nombre:</label>
              <input
                type="text"
                class="form-control"
                v-model="formulario.nombre"
                @blur="validarNombre"
                @input="limpiarError('nombre')"
              >
              <div v-if="errores.nombre" class="error-message">
                {{ mensajesError.nombre }}
              </div>
            </div>

            <!-- Correo -->
            <div class="mb-4 text-center">
              <label class="form-label fw-bold">Correo:</label>
              <input
                type="text"
                class="form-control"
                v-model="formulario.correo"
                @blur="validarCorreo"
                @input="limpiarError('correo')"
              >
              <div v-if="errores.correo" class="error-message">
                {{ mensajesError.correo }}
              </div>
            </div>

            <!-- Contraseña -->
            <div class="mb-4 text-center">
              <label class="form-label fw-bold">Contraseña:</label>
              <input
                type="password"
                class="form-control"
                v-model="formulario.contrasena"
                @blur="validarContrasena"
                @input="limpiarError('contrasena')"
              >
              <div v-if="errores.contrasena" class="error-message">
                {{ mensajesError.contrasena }}
              </div>
            </div>

            <!-- Repetir Contraseña -->
            <div class="mb-4 text-center">
              <label class="form-label fw-bold">Repetir Contraseña:</label>
              <input
                type="password"
                class="form-control"
                v-model="formulario.repetirContrasena"
                @blur="validarRepetirContrasena"
                @input="limpiarError('repetirContrasena')"
              >
              <div v-if="errores.repetirContrasena" class="error-message">
                {{ mensajesError.repetirContrasena }}
              </div>
            </div>

            <!-- Botón Enviar -->
            <div class="text-start">
              <button type="submit" class="btn btn-success px-4">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormularioRegistro',
  data() {
    return {
      formulario: {
        nombre: '',
        correo: '',
        contrasena: '',
        repetirContrasena: ''
      },
      errores: {
        nombre: false,
        correo: false,
        contrasena: false,
        repetirContrasena: false
      },
      mensajesError: {
        nombre: '',
        correo: '',
        contrasena: '',
        repetirContrasena: ''
      }
    }
  },
  computed: {
    esCorreoValido() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.formulario.correo);
    },
    contrasenasCoinciden() {
      return this.formulario.contrasena === this.formulario.repetirContrasena && 
             this.formulario.contrasena !== '';
    },
    formularioValido() {
      return this.formulario.nombre.trim() !== '' &&
             this.esCorreoValido &&
             this.formulario.contrasena !== '' &&
             this.contrasenasCoinciden &&
             !this.errores.nombre &&
             !this.errores.correo &&
             !this.errores.contrasena &&
             !this.errores.repetirContrasena;
    }
  },
  methods: {
    validarNombre() {
      if (this.formulario.nombre.trim() === '') {
        this.errores.nombre = true;
        this.mensajesError.nombre = 'El campo nombre es requerido';
      } else {
        this.errores.nombre = false;
        this.mensajesError.nombre = '';
      }
    },
    validarCorreo() {
      if (this.formulario.correo.trim() === '') {
        this.errores.correo = true;
        this.mensajesError.correo = 'El campo correo es requerido';
      } else if (!this.esCorreoValido) {
        this.errores.correo = true;
        this.mensajesError.correo = 'El formato del correo no es válido';
      } else {
        this.errores.correo = false;
        this.mensajesError.correo = '';
      }
    },
    validarContrasena() {
      if (this.formulario.contrasena === '') {
        this.errores.contrasena = true;
        this.mensajesError.contrasena = 'El campo contraseña es requerido';
      } else {
        this.errores.contrasena = false;
        this.mensajesError.contrasena = '';
      }
      
      // Re-validar repetir contraseña si ya se escribió algo
      if (this.formulario.repetirContrasena !== '') {
        this.validarRepetirContrasena();
      }
    },
    validarRepetirContrasena() {
      if (this.formulario.repetirContrasena === '') {
        this.errores.repetirContrasena = true;
        this.mensajesError.repetirContrasena = 'El campo repetir contraseña es requerido';
      } else if (this.formulario.contrasena !== this.formulario.repetirContrasena) {
        this.errores.repetirContrasena = true;
        this.mensajesError.repetirContrasena = 'Las contraseñas no coinciden';
      } else {
        this.errores.repetirContrasena = false;
        this.mensajesError.repetirContrasena = '';
      }
    },
    limpiarError(campo) {
      // Solo limpiar el error mientras se escribe si el campo tiene contenido
      if (this.formulario[campo] !== '') {
        this.errores[campo] = false;
        this.mensajesError[campo] = '';
      }
    },
    validarTodosLosCampos() {
      this.validarNombre();
      this.validarCorreo();
      this.validarContrasena();
      this.validarRepetirContrasena();
    },
    enviarFormulario() {
      this.validarTodosLosCampos();
      
      if (!this.formularioValido) {
        return;
      }
      
      // Mostrar alert de éxito
      alert('El registro se ha realizado correctamente');
      
      // Limpiar formulario después del registro exitoso
      this.limpiarFormulario();
    },
    limpiarFormulario() {
      this.formulario = {
        nombre: '',
        correo: '',
        contrasena: '',
        repetirContrasena: ''
      };
      this.errores = {
        nombre: false,
        correo: false,
        contrasena: false,
        repetirContrasena: false
      };
      this.mensajesError = {
        nombre: '',
        correo: '',
        contrasena: '',
        repetirContrasena: ''
      };
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
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-size: 16px;
  text-align: center;
}

/* Botón */
.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  padding: 10px 25px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

/* Mensajes de error */
.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
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