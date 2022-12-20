'use strict';
{
	const titleClickHandler = function(event){
		event.preventDefault();
		const clickedElement = this;
		console.log('Link was clicked!');

		// remove class 'active' from all article links
		const activeLinks = document.querySelectorAll('.titles a.active');

		for(let activeLink of activeLinks){
			activeLink.classList.remove('active');
		}

		// add class 'active' to the clicked link
		console.log('clickedElement:', clickedElement);

		clickedElement.classList.add('active');

		// remove class 'active' from all articles
		const activeArticles = document.querySelectorAll('article.active');

		for(let activeArticle of activeArticles){
			activeArticle.classList.remove('active');
		}

		// get 'href' attribute from the clicked link
		const articleSelector = clickedElement.getAttribute('href');
		
		console.log(articleSelector);

		// find the correct article using the selector (value of 'href' attribute)
		const targetArticle = document.querySelector(articleSelector);

		// add class 'active' to the correct article
		targetArticle.classList.add('active');
	};

	const optArticleSelector = '.post',
		optTitleSelector = '.post-title',
		optTitleListSelector = '.titles',
		optArticleTagsSelector = '.post-tags .list';

	const generateTitleLinks = function(customSelector = ''){
		console.log('Links generated!');
		console.log('customSelector: ' + customSelector);

		// remove contents of titleList
		const titleList = document.querySelector(optTitleListSelector);
		const clearTitleList = function(){
			titleList.innerHTML = '';
		};
		clearTitleList();

		// find all the articles and save them to variable: articles
		const articles = document.querySelectorAll(optArticleSelector + customSelector);

		let html = '';

		// for each article
		for(let article of articles){
			// get the article id
			const articleId = article.getAttribute('id');

			// find the title element & get the title
			const articleTitle = article.querySelector(optTitleSelector).innerHTML;

			// create HTML of the link
			const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
			console.log(linkHTML);

			// insert link into titleList
			html = html + linkHTML;
			/*titleList.insertAdjacentHTML('afterend', linkHTML);*/
			console.log(html);
		}

		titleList.innerHTML = html;

		const links = document.querySelectorAll('.titles a');
		console.log(links);

		for(let link of links){
			link.addEventListener('click', titleClickHandler);
		}
	};

	generateTitleLinks();

	const generateTags = function(){
		// find all articles
		const articles = document.querySelectorAll(optArticleSelector);

		// START LOOP: for every article:
		for(let article of articles){
			// find tags wrapper
			let tagsWrapper = article.querySelector(optArticleTagsSelector);

			// make html variable with empty string
			let html = '';

			// get tags from data-tags attribute
			const articleTags = article.getAttribute('data-tags');

			// split tags into array
			const articleTagsArray = articleTags.split(' ');

			// START LOOP: for each tag
			for(let tag of articleTagsArray){
				// generate HTML of the link
				const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

				// add generated code to html variable
				html = html + linkHTML;
			}
			// END LOOP: for each tag

			// insert HTML of all the links into the tags wrapper
			tagsWrapper = html;
		}
		// END LOOP: for every article:
	};

	generateTags();

	const tagClickHandler = function(event){
		// prevent default action for this event
		event.preventDefault();

		// make new constant named "clickedElement" and give it the value of "this"
		const clickedElement = this;

		// make a new constant "href" and read the attribute "href" of the clicked element 
		const href = clickedElement.getAttribute('href');

		// make a new constant "tag" and extract tag from the "href" constant
		const tag = href.replace('#tag-', '');

		// find all tag links with class active
		const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

		// START LOOP: for each active tag link
		for(let activeTag of activeTags){
			// remove class active
			activeTag.classList.remove('active');
		}
		// END LOOP: for each active tag link

		// find all tag links with "href" attribute equal to the "href" constant
		const hrefTags = document.querySelectorAll('a[href="' + href + '"]');

		// START LOOP: for each found tag link
		for(let hrefTag of hrefTags){
			// add class active
			hrefTag.classList.add('active');
		}
		// END LOOP: for each found tag link

		// execute function "generateTitleLinks" with article selector as argument
		generateTitleLinks('[data-tags~="' + tag + '"]');
	};

	const addClickListenersToTags = function(){
		// find all links to tags


		// START LOOP: for each link
		for(let of ){
			// add tagClickHandler as event listener for that link

		}
		// END LOOP: for each link
	};
	
	addClickListenersToTags();
}