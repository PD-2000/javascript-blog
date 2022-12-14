'use strict';
{
const titleClickHandler = function(event){
	event.preventDefault();
	const clickedElement = this;
	console.log('Link was clicked!');

	/* remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll('.titles a.active');

	for(let activeLink of activeLinks){
		activeLink.classList.remove('active');
	}

	/* add class 'active' to the clicked link */
	console.log('clickedElement:', clickedElement);

	clickedElement.classList.add('active');

	/* remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll('article.active');

	for(let activeArticle of activeArticles){
		activeArticle.classList.remove('active');
	}

	/* get 'href' attribute from the clicked link */
	const articleSelector = clickedElement.getAttribute('href');

	console.log(articleSelector);

	/* find the correct article using the selector (value of 'href' attribute) */
	const targetArticle = document.querySelector(articleSelector);

	/* add class 'active' to the correct article */
	targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
	link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
	optTitleSelector = '.post-title',
	optTitleListSelector = '.titles';

const generateTitleLinks = function(){
	console.log('Links generated!');

	/* remove contents of titleList */
	const titleList = document.querySelector(optTitleListSelector);
	const clearTitleList = function(){
		titleList.innerHTML = '';
	}
	clearTitleList();

	/* for each article */
	for(let article of articles){
		/* get the article id */


		/* find the title element */


		/* get the title from the title element */


		/* create HTML of the link */


		/* insert link into titleList */

	}
}

generateTitleLinks();
}