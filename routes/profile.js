var express = require('express');
var router = express.Router();

/* EXECUTE LA PAGE INFORMATIONS DU CLIENT */
router.get('/:user_id/informations', function(req, res, next) {
  res.render('profile/informations', { title: 'Profile' });
});

/* EXECUTE LA PAGE PHOTO PROFIL USER */
router.get('/:user_id/photo', function (req, res, next) {
	res.render('profile/photo', {
		title : 'Photo de profile'
	})
})

/* EXECUTE LA PAGE CONFIGURATION DU COMPTE  */
router.get('/:user_id/securite', function (req, res, next) {
	res.render('profile/securite', {
		title : 'Configuration du compte'
	})
})

/* EXECUTE LA PAGE RENVOYANT LES BIENS D'UN BAYEUR OU VENDEUR */
router.get('/:user_id/biens', function (req, res, next) {
	res.render('profile/biens', {
		title : 'Vos biens'
	})
})

/* EXECUTE LA PAGE RENVOYANT LE FORMULAIRE D'AJOUR D'UN BIEN */
router.get('/:user_id/biens/ajouter', function (req, res, next) {
	res.render('profile/ajoutBien', {
		title : 'Publiez un bien'
	})
})
module.exports = router;
