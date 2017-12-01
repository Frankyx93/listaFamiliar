'use strict';

module.exports = function(Usuario) {
    /**
    * acepta las solicitudes pendientes
    * @param {object} contexto argumento necesario para recoger el token
    * @param {Function(Error, array)} callback
    */

   Usuario.prototype.aceptarSolicitud = function(contexto, callback) {
     var miembrosLista;
     var usuarioLogueadoListaFamiliarId;
     
     
     //consigo el id del solicitante
     var solicitante = this;
     
     
     //consigo el id de la lista familiar a la que pertenezco
     var usuarioLogueadoId = contexto.req.accessToken.userId;
     Usuario.findById(usuarioLogueadoId, function(err, usuario){
         if(err)callback(err);
         usuarioLogueadoListaFamiliarId = usuario.listaFamiliarId;

     
     
        //compruebo si el solicitante tiene alguna solicitud en mi lista
        solicitante.solicitudes.findById(usuarioLogueadoListaFamiliarId, function(err, solicitud){
           if(err)callback(err);


       //lo meto en mi lista
            solicitante.listaFamiliarId = usuarioLogueadoListaFamiliarId;


       //borro la solicitud
            solicitante.solicitudes.remove(solicitud, function(err, solicitud){
                if(err)callback(err);
                solicitante.save();
                Usuario.find({where:{listaFamiliarId:usuarioLogueadoListaFamiliarId}}, function(err, instances){
                    if(err)callback(err);
                    miembrosLista = instances;
       //devuelvo el array de miembros 
                    callback(null, miembrosLista);
                      });
             });
         });     
     });
   };
        /**
      * Elimina la solicitud de un usuario en mi lista familiar
      * @param {boolean} contexto argumento necesario para recoger el token
      * @param {Function(Error, array)} callback
      */

     Usuario.prototype.rechazarSolicitud = function(contexto, callback) {
     var miembrosLista;
     var usuarioLogueadoListaFamiliarId;
     
     
     //consigo el id del solicitante
     var solicitante = this;
     
     
     //consigo el id de la lista familiar a la que pertenezco
     var usuarioLogueadoId = contexto.req.accessToken.userId;
     Usuario.findById(usuarioLogueadoId, function(err, usuario){
         if(err)callback(err);
         usuarioLogueadoListaFamiliarId = usuario.listaFamiliarId;

     
     
        //compruebo si el solicitante tiene alguna solicitud en mi lista
        solicitante.solicitudes.findById(usuarioLogueadoListaFamiliarId, function(err, solicitud){
           if(err)callback(err);


       


       //borro la solicitud
            solicitante.solicitudes.remove(solicitud, function(err, solicitud){
                if(err)callback(err);
                
                Usuario.find({where:{listaFamiliarId:usuarioLogueadoListaFamiliarId}}, function(err, instances){
                    if(err)callback(err);
                    miembrosLista = instances;
       //devuelvo el array de miembros 
                    callback(null, miembrosLista);
                      });
             });
         });     
     });
   };

};
