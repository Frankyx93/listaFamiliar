'use strict';

module.exports = function(Listafamiliar) {
    //Hook remoto que asigna a la lista familiar el id del usuario que la crea como owner
    Listafamiliar.beforeRemote('create', function (context, listaFamiliar, next){
        //el valor de owner = al token que está en uso en se momento
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    //Cuando un usuario crea una lista familiar, el id de esta lista familiar se le asocia al usuario que la ha creado.
    Listafamiliar.afterRemote('create', function (context, listaFamiliar, next){
        var Usuario = Listafamiliar.app.models.Usuario;
    //Conseguir el id de la listaFamiliar recién creada    
        var ID = listaFamiliar.id;
        console.log(ID);
    //Conseguir el usuario que ha creado  la lista ej: con la propiedad owner
        Usuario.findById(listaFamiliar.owner, function(err, usuario) {
                if(err){next(err);}
                else{
    //Asignar en listaFamiliarId de usuario el id que recogimos al principio
                    usuario.listaFamiliarId = ID;
    //Guardarlo en la Base de Datos
                    usuario.save(function(err, usuario){
                        if(err) next(err);
                        next();
                    });
                }
        });
    });
    /**
     * crea una relación entre el usuario que solicita entrar a una lista y la lista
     * @param {object} contexto con context se le pasa el id del usuario
     * @param {Function(Error, object)} callback
     */

    Listafamiliar.prototype.solicitar = function(contexto, callback) {
      var solicitud;
      //le damos a la variable el valor de this, porque no nos gusta trabajar con this
      var listaFamiliar = this;
      
      //usamos el add porque lo hemos buscado en la documentación, crea una solicitud con un valor que le pasamos(el usuario ID)
      listaFamiliar.solicitudes.add(contexto.req.accessToken.userId, function(err){
          if(err)callback(err);
          //esto se le devuelve al cliente, pero es parafernalia
          solicitud = {
            listaFamiliarId: listaFamiliar.id,
            usuarioId: contexto.req.accessToken.userId
          };
          callback(null, solicitud);
      });
      // TODO
      
    };

};
