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
};
