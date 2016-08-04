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






function getXDomainRequest(){
	var xdr = null;
	if(window.XDomainRequest){
		xdr = new XDomainRequest(); 
	}
	else if(window.XMLHttpRequest){
		 xdr = new XMLHttpRequest(); 
	}
	else{
		alert('Votre navigateur ne gère pas l\'AJAX cross-domain');
	}
	return xdr;
}

function getXMLHttpRequest(){
	var xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject){
		if (window.ActiveXObject){
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest();
		}
	} else {
		alert('Your browser does\'nt support XMLHTTPRequest objects');
		return null;
	}     
	return xhr;
}

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

	if(view=='article'){
		var articleMenu=document.getElementById('article_menu');
		articleMenu.innerHTML='';
		// var newList=document.createElement('ul');
		// newList.id='article_menu';
		var newLiSaveArticle=document.createElement('li');
		var newLinkSaveArticle=document.createElement('a');
		newLinkSaveArticle.href='#';
		newLinkSaveArticle.addEventListener('click', function() { 
				saveArticle();
		}); 
		var newtextNodeSaveArticle=document.createTextNode('Save article');
		newLinkSaveArticle.appendChild(newtextNodeSaveArticle);
		newLiSaveArticle.appendChild(newLinkSaveArticle);
		articleMenu.appendChild(newLiSaveArticle);
		
		var newLiShareArticle=document.createElement('li');
		var newLinkShareArticle=document.createElement('a');
		newLinkShareArticle.href='#';
		newLinkShareArticle.addEventListener('click', function() { 
				shareArticle();
		}); 
		var newtextNodeShareArticle=document.createTextNode('Share article');
		newLinkShareArticle.appendChild(newtextNodeShareArticle);
		newLiShareArticle.appendChild(newLinkShareArticle);
		articleMenu.appendChild(newLiShareArticle);
		articleMenu.style.display='block';
	}
	else{
		if(document.getElementById('article_menu')){
			var articleMenu=document.getElementById('article_menu');
			articleMenu.style.display='none';
		}
	}
	document.getElementById('menu_checkbox').checked=0;
}

function saveArticle(){
	alert('test');
}

function getArticleData(article){
	var xhr = getXDomainRequest();
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){ 
			//console.log(xhr.response);
			if(xhr.response){
				if(xhr.response.article){
					articleDatas=new Array(
						xhr.response.article.url,
						xhr.response.article.title,
						xhr.response.article.content
					);
					addTab(articleDatas);
				}
				if(xhr.response.list){
					//articlesList=Object.keys(xhr.response.list).map(function(k) { return xhr.response.list[k] });
					var articlesList=new Array();
					for(item of xhr.response.list){
						articlesList.push(Array(item.url,item.title,'test'));
					}
					currentArticlesList=articlesList;
					setArticlesList(currentArticlesList);
					selectView('articles_list_div');
				}
			}
			else{
				//console.log(xhr);
			}
			
		}
	}
	xhr.open("GET", 'http://www.web-experts.fr/z_ajax_xDomain/test_ajax_xDomain.php?q=' + article, true);
	
	xhr.send(null);
}


function switchTab(tab){
	//console.log('test' + tab);
	
	var tabTitle=document.getElementById('article_title');
	var textNode=document.createTextNode(currentTabsList[tab][1]);
	tabTitle.innerHTML='';
	tabTitle.appendChild(textNode);
	var tabcontent=document.getElementById('article_content');
	var textNode=document.createTextNode(currentTabsList[tab][2]);
	tabcontent.innerHTML='';
	tabcontent.appendChild(textNode);
	selectView('article');
}

function addTab(newTabArray){
	var alreadyExists=0;
	//console.log(currentTabsList);
	for(var key in currentTabsList){
		if(newTabArray[0]==currentTabsList[key][0]){
			//console.log(item[0]);
			alreadyExists=1;
			switchTab(key);
		}
	}
	if(alreadyExists==0){
		currentTabsList.push(newTabArray);
		setTabsList(currentTabsList);
		switchTab(currentTabsList.length-1);
	}
}
function deleteTab(delTabIndex){
	delete currentTabsList[delTabIndex];
	setTabsList(currentTabsList);
}

function setTabsList(currentTabsList){
	var tabsList=document.getElementById('tabs_list');
	tabsList.innerHTML='';
	//for(i=0;i<currentTabsList.length;i++){//console.log(i);
	for(i in currentTabsList){
		var newLi = document.createElement("li");
		var newLink = document.createElement("a");
		var newCross = document.createElement("a");
		var textNodeLink = document.createTextNode(currentTabsList[i][0]);
		var textNodeCross = document.createTextNode('x');
		
		newCross.href='#';
		newLink.href='#';
		(function(index){
			newLink.addEventListener('click', function() { 
				switchTab(index);
			}); 
			newCross.addEventListener('click', function() { 
				deleteTab(index);
			}); 
		})(i);

		newLink.appendChild(textNodeLink);
		newCross.appendChild(textNodeCross);
		newLi.appendChild(newLink);
		newLi.appendChild(newCross);
		tabsList.appendChild(newLi);
	}
}


function setArticlesList(currentArticlesList){
	articlesList=document.getElementById('articles_list');
	articlesList.innerHTML='';
	//for(i=0;i<currentArticlesList.length;i++){
	for(i in currentArticlesList){
		var newLi = document.createElement("li");
		var newLink = document.createElement("a");
		var textNode = document.createTextNode(currentArticlesList[i][0]);
		
		newLink.href='#';
		(function(index){
			newLink.addEventListener('click', function() { 
				addTab(currentArticlesList[index]);
			}); 
		})(i);
		//newLink.addEventListener("click", function(){switchTab.bind(i)});
		newLink.appendChild(textNode);
		newLi.appendChild(newLink);
		articlesList.appendChild(newLi);
	}
// fin liste d'articles
}

function searchTerms(){
	//xDomain Ajax search request
	var inputValue=document.getElementById('search_input').value;
	getArticleData(inputValue);
	
}

window.onload=function(){

//apparition du header
	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('header').outerHeight();
	//console.log(navbarHeight);
	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();
		
		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		
		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('header').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('header').removeClass('nav-up').addClass('nav-down');
			}
		}
		
		lastScrollTop = st;
	}
// fin apparition du header

	setArticlesList(currentArticlesList)
	setTabsList(currentTabsList);

	if(currentTabsList.length>0){
		switchTab(0);
	}
	else{
		getArticleData('Paris');
	}

}