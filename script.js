/*
Vues : Articles, Résultat de la recherche, liste des onglets, connexion, menu/accueil, Paramètres
//http://demo.web-experts.fr/z_ajax_xDomain/test_ajax_xDomain.php
*/
var currentTabsList=new Array();//Liste des onglets ouverts
var currentArticlesList=new Array();//liste des articles de la recherche d'article
var currentOpenedTab=0;

// var currentArticlesArray=new Array(
	// ['Paris', 'Paris', 'Paris est la capitale de la France'],
	// ['Pâris', 'Pâris', 'Pâris est le prince troyen qui déclencha la guerre de Troie en enlevant Hélène'],
	// ['Paris_(Texas)', 'Paris (Texas)', 'Paris est un bled paumé du Texas']
// );
// currentArticlesList=currentArticlesArray;







function selectView(view){
	var contentTypes=document.getElementsByClassName('content_type');
	for(i=0;i<contentTypes.length;i++){//console.log(contentTypes[i].id);
		if(contentTypes[i].id==view){
			contentTypes[i].style.display='block';
		}
		else{
			contentTypes[i].style.display='none';
		}
	}


	document.getElementById('menu_checkbox').checked=0;
}
