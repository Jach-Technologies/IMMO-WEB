var express = require('express');
var router = express.Router();
var axios = require("axios").default;
var API = require("../manageURL").URL().API;
var session = require("cookie-session");

var app = express();

app.use(session({
    secret: "frdrcpeterAppImmo"
}))

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//Récupère les stats d'un type
router.get('/statType', (req, res) => {

    axios.get(`${API}/immobilier/getStatType`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        })
})

//Récupère les nouvelles publications
router.get('/new', (req, res) => {
    axios.get(`${API}/immobilier/getNew/9`)
        .then(response => {
            res.status(200);
            res.send(response.data);
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
})

//Recupere tous les immobiliers
router.get('/all', (req, res) => {
    axios.get(`${API}/immobilier/getNew/null`)
        .then(response => {
            res.status(200);
            res.send(response.data);
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
})

//Permet de faire la connexion

router.post('/login', (req, res) => {
    if ((req.body.username && req.body.username.trim(" ")) || (req.body.password && req.body.password.trim(" "))) {
        var data = {
            username: req.body.username,
            password: req.body.password
        }

        axios.post(`${API}/users/login`, data)
            .then(datas => {

                if (datas.data.getEtat) {
                    req.session.id = datas.data.getObjet.id_client;
                    req.session.type = datas.data.getObjet.type;

                    if (req.session.id) {

                        res.status(200);
                        res.send(datas.data);
                    }

                } else {

                    res.status(200);
                    res.send(datas.data)
                }
            })
            .catch(error => {
                res.send(error)
            })
    } else {
        res.send({ getEtat: false, getMessage: "Champ obligatoire" })
    }
})


//Gère la création d'un compte
router.post('/register', (req, res) => {

    if ((req.body.username && req.body.username.trim(" ")) ||
        (req.body.email && req.body.email.trim(" ")) ||
        (req.body.password && req.body.password.trim(" ")) ||
        (req.body.type && req.body.type.trim(" ")) ||
        (req.body.prenom && req.body.prenom.trim(" ")) ||
        (req.body.telephone && req.body.telephone.trim(" ")) ||
        (req.body.nom && req.body.nom.trim(" "))) {
        var data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            type: req.body.type,
            prenom: req.body.prenom,
            telephone: req.body.telephone,
            nom: req.body.nom
        }

        axios.post(`${API}/users/register`, data)
            .then(datas => {

                if (datas.data.getEtat) {
                    req.session.id = datas.data.getObjet._id;
                    req.session.type = datas.data.getObjet.type;

                    res.status(200);
                    res.send(datas.data);

                } else {

                    res.status(200);
                    res.send(datas.data)
                }
            })
            .catch(error => {
                res.send(error)
            })
    } else {
        res.send({
            getEtat: false,
            getMessage: "Certains champs obligatoires sont vides"
        })
    }
})

//Permet de recuperer les types users
router.get('/type_user', (req, res) => {
    axios.get(`${API}/typeUser/getAll`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
});

//Recupere les types de loyer
router.get('/type_rent', (req, res) => {
    axios.get(`${API}/typeRent/getAll`)
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
})


//Recupere les types de tarifs
router.get('/pricing/:id_immo/getAll', (req, res) => {
    axios.get(`${API}/pricing/${req.params.id_immo}/getAll`)
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
})


//Recupere Les types des logements
router.get('/typeHouse/getAll', (req, res) => {
    axios.get(`${API}/typeHouse/getAll`)
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
})


//Recupere les immo par mode
router.get('/immo_by_mode/:id_immo', (req, res) => {
    axios.get(`${API}/immobilier/getAllByMode/${req.params.id_immo}`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
});

//Permet la récupération de détails d'un immobilier
router.get('/details/:id', (req, res) => {
    axios.get(`${API}/immobilier/getDetails/${req.params.id}`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
});


//Permet la récupération de détails d'un immobilier
router.get('/userid', (req, res) => {
    let id = req.session.id ? req.session.id : null,
        obj = {
            "id_client": id
        };

    res.status(200);
    res.send(obj)
})

/* Permet de recuperer le type d'un user */
router.get('/SessionType', (req, res) => {
    let type = req.session.type ? req.session.type : null,
        obj = {
            "type_user": type
        };

    res.status(200);
    res.send(obj)
})

//Permettant la récupération des tous les types
router.get('/getTypeImmo', (req, res) => {
    axios.get(`${API}/type/getAll`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
})

//Permettant de recueperer les immo par type
router.get('/getAllForType/:id_immo', (req, res) => {
    axios.get(`${API}/immobilier/getAllForType/${req.params.id_immo}`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
});

//Permet de recuperer tous les modes
router.get('/getAllMode', (req, res) => {
    axios.get(`${API}/mode/getAll`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
});

//Permet de recuperer les informations d'un user
router.get('/infoForAnyUser/:user_id', (req, res) => {
    axios.get(`${API}/users/infoForAnyUser/${req.params.user_id}`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
});

router.post('/upProfile/:user_id', (req, res) => {

    var dataAdresse = {
        "commune": req.body.commune,
        "avenue": req.body.avenue,
        "numero": req.body.numero,
        "ref": req.body.reference,
        "quartier": req.body.quartier
    }
    axios.post(`${API}/users/setAdress/${req.params.user_id}`, dataAdresse)
        .then(response => {

            var dataContact = {
                "id": req.params.user_id,
                "telephone": req.body.telephone,
                "email": req.body.email
            }

            axios.post(`${API}/users/setContact`, dataContact)
                 .then(responseContact => {
                     var dataProfil = {
                         "id": req.params.user_id,
                         "nom": req.body.nom,
                         "prenom": req.body.prenom,
                         "username": req.body.username,
                     }
                     if ((dataProfil.username && dataProfil.username.trim(" ")) && (dataProfil.nom && dataProfil.nom.trim(" ")) && (dataProfil.prenom && dataProfil.prenom.trim(" "))) {
                         axios.post(`${API}/users/upProfil`, dataProfil)
                             .then(responseProfil => {
                                 res.status(200);
                                 res.send({ getEtat: true, getObjet: responseProfil.data.getObjet })
                             })
                             .catch(err => {
                                 res.status(500);
                                 res.send(err);
                             })
                     } else {
                         res.status(200);
                         res.send({ getEtat: true, getMessage: "La mise à jour de l'adresse a eu lieu mais pas du profil" })
                     }
                 })
                 .catch(err => {
                     res.status(500);
                     res.send({getEtat: true, getMessage: "Adresse défini mais, il y a blocage sur le contact"})
                 })

        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
})

//Publication d'un immo
router.post('/addImmob', (req, res) => {
    var datas = {
        "commune" : req.body.commune,
        "avenue" : req.body.avenue,
        "numero" : req.body.numero,
        "reference" : req.body.reference,
        "id_user" : req.session.id,
        "id_mode_immo" : req.body.id_mode_immo,
        "id_type_immo" : req.body.id_type_immo,
        "id_type_rent" : req.body.id_type_rent,
        "id_type_house" : req.body.id_type_house,
        "id_plans" : req.body.id_plans,
        "nbreChambre" : req.body.nbreChambre,
        "nbreDouche" : req.body.nbreDouche,
        "nbreEtage" : req.body.nbreEtage,
        "prix" : req.body.prix,
        "surface" : {
            longueur : parseInt(req.body.longueur),
            largeur: parseInt(req.body.largeur)
        },
        "description" : req.body.description 
    }

    if ((datas.id_user && datas.id_user.trim(" ")) &&
        (datas.id_mode_immo && datas.id_mode_immo.trim(" ")) &&
        (datas.id_type_immo && datas.id_type_immo.trim(" ")) &&
        (datas.prix && datas.prix.trim(" ")) && 
        (datas.description && datas.description.trim(" ")))
    {
        axios.post(`${API}/immobilier/publish`, datas)
             .then(responseImmob => {
                 res.status(200);
                 res.send({ getEtat: true, getObjet: responseImmob.data.getObjet, getMessage: "Votre immobilier à été ajouter, attendez l'approbation de l'administrateur pour que votre bien soit visible, thank" })
             })
             .catch(err => {
                 res.status(500);
                 res.send(err);
             })
    }else{
       res.status(200);
       res.send({ getEtat: false, getMessage: "Veuillez remplir tous les champs obligatoires" }) 
    }
})

//Recherche d'un immo
router.post('/searchImmo', (req, res) => {
    var datas = {
        "id_user": req.session.id ? req.session.id : null,
        "mode" : req.body.mode,
        "type" : req.body.type,
        "commune" : req.body.commune,
        "nbrePiece" : parseInt(req.body.nbrePiece),
        "montantMax" : parseInt(req.body.montantMax),
        "montantMin" : parseInt(req.body.montantMin),
        "nbreChambre" : parseInt(req.body.nbreChambre) 
    }

    axios.post(`${API}/immobilier/search`, datas)
     .then(responseRecherche => {
         res.status(200);
         res.send(responseRecherche.data)
     })
     .catch(err => {
         res.status(500);
         res.send(err);
     })
})

//Recupere les infos d'un proprietaire
router.get('/infoOwner/:id_owner', (req, res) => {
    axios.get(`${API}/users/infoOwner/${req.params.id_owner}`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
})



//Recupère les immobiliers d'un propriétaire
router.get('/immobilier/owner/getAll', (req, res) => {
    axios.get(`${API}/immobilier/getAllByModeForOwner/${req.session.id}`)
         .then(response => {
             res.status(200);
             res.send(response.data)
         })
         .catch(err => {
             res.status(500);
             res.send(err)
         })
})

//Route Permettant d'assigner un immobilier en tant qu'intéréssé
router.post('/int', (req, res) => {
    var obj = {
        "id_user": req.session.id,
        "id_owner": req.body.id_owner,
        "id_immo": req.body.id_immo
    };

    axios.post(`${API}/extra/interest`, obj)
         .then(response => {
             
             if (response.data.getObjet.isInLocation) {
                res.status(200);
                res.send(response.data)    
             } else {
                var objetRetour = {
                    getEtat: response.data.getEtat,
                    getMessage: response.data.getMessage,
                    getObjet: {
                        isInLocation: response.data.getObjet.isInLocation
                    }
                };

                res.status(200);
                res.send(objetRetour);
             }
             
         })
         .catch(err => {
             res.status(500);
             res.send(err)
         })
})

//Recupere les immo en contact pour un user
router.get('/interestFavorisImmo/:id_user/:type', (req, res) => {
   
    axios.get(`${API}/extra/listImmoAddToExtraForUserAccordingType/${req.params.id_user}/${req.params.type}`)
         .then(response => {
             res.status(200);
             res.send(response.data)
         })
         .catch(err => {
             res.status(500);
             res.send(err)
         })
   
})

//Recupere les contacts d'un immo
router.get('/usersInterestImmo/:id_immo', (req, res) => {
   
    axios.get(`${API}/extra/listUserInterest/${req.params.id_immo}/null`)
         .then(response => {
             res.status(200);
             res.send(response.data)
         })
         .catch(err => {
             res.status(500);
             res.send(err)
         })
   
})

module.exports = router;