'use strict';

module.exports = function(Usuario) {
    /**
    * acepta las solicitudes pendientes
    * @param {object} contexto argumento necesario para recoger el token
    * @param {Function(Error, array)} callback
    */

   Usuario.prototype.aceptarSolicitud = function(contexto, callback) {
     var miembrosLista;
     //consigo el id del solicitante NO SE SI ES NECESARIO EL .id
     var idSolicitante = this.id;
     //consigo el id de la lista familiar a la que pertenezco
     //
     //compruebo si el solicitante tiene alguna solicitud en mi lista
     //
     //lo meto en mi lista
     //
     //borro la solicitud
     // TODO
     callback(null, miembrosLista);
   };

};
