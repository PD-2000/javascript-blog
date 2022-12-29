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
		optArticleTagsSelector = '.post-tags .list',
		optArticleAuthorSelector = '.post-author',
		optArticleAuthorsListSelector = '.authors.list';

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

			// make an html variable with empty string
			let html = '';

			// get tags from data-tags attribute
			const articleTags = article.getAttribute('data-tags');

			// split tags into array
			const articleTagsArray = articleTags.split(' ');

			// START LOOP: for each tag
			for(let tag of articleTagsArray){
				// generate HTML of the link
				const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

				// add generated code to html variable
				html = html + linkHTML;
			}
			// END LOOP: for each tag

			// insert HTML of all the links into the tags wrapper
			tagsWrapper.innerHTML = html;
		}
		// END LOOP: for every article:
	};
	generateTags();

	const tagClickHandler = function(event){
		// prevent default action for this event
		event.preventDefault();

		// make a new constant named "clickedElement" and give it the value of "this"
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
		const hrefTags = document.querySelectorAll('a[href="#tag-' + href + '"]');

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
		const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

		// START LOOP: for each link
		for(let tagLink of tagLinks){
			// add tagClickHandler as event listener for that link
			tagLink.addEventListener('click', tagClickHandler);
		}
		// END LOOP: for each link
	};
	addClickListenersToTags();
	
	const generateAuthors = function(){
		// make a new variable allAuthors with an empty list
		let allAuthors = {};

		// find all articles
		const articles = document.querySelectorAll(optArticleSelector);

		// START LOOP: for each article
		for(let article of articles){
			// find authors wrapper
			const authorsWrapper = article.querySelector(optArticleAuthorSelector);

			// get author from data-author
			const articleAuthor = article.getAttribute('data-author');

			// check if this link is not already in allAuthors
			if(!allAuthors[articleAuthor]){
				allAuthors[articleAuthor] = 1;
			}
			else {
				allAuthors[articleAuthor]++;
			}

			// insert HTML of all the links into the authors wrapper
			authorsWrapper.innerHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';

			// make an empty string variable
			let html = '';

			// generate HTML of the link
			const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
			
			// add generated code to html variable
			html = html + linkHTML;

			// insert HTML of all the links into the authors wrapper
			authorsWrapper.innerHTML = html;
		}
		// END LOOP: for each article

		// find authors list in right column
		const authorList = document.querySelector(optArticleAuthorsListSelector);

		// make an empty variable for all links in HTML
		let allAuthorsHTML = '';

		// START LOOP: for each author in allAuthors
		for(let author in allAuthors){
			// generate code of a link and insert it to allAuthorsHTML
			allAuthorsHTML += author + ' (' + allAuthors[author] + ') ';
		}
		// END LOOP: for each author

		// add HTML to authorList from allAuthorsHTML
		authorList.innerHTML = allAuthorsHTML;
	};
	generateAuthors();

	const authorClickHandler = function(event){
		// prevent default action for this event
		event.preventDefault();

		// make a clickedElement constant and initiate it with value this
		const clickedElement = this;

		// make a href constant with href attribute's value of clickedElement
		const href = clickedElement.getAttribute('href');

		// make an author constant and get author from href
		const author = href.replace('#author-', '');

		// find all active author links
		const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

		// START LOOP: for each active author link
		for(let activeAuthor of activeAuthors){
			// remove active
			activeAuthor.classList.remove('active');
		}
		// END LOOP: for each active author link

		// find all author links with href attribute equal to the constant
		const authorLinks = document.querySelectorAll('a[href="#author-' + href + '"]');

		// START LOOP: for each found author link
		for(let authorLink of authorLinks){
			// add active
			authorLink.classList.add('active');
		}
		// END LOOP: for each found author link

		// execute generateTitleLinks with article selector argument
		generateTitleLinks('[data-author="' + author + '"]');
	};

	const addClickListenersToAuthors = function(){
		// find all author links
		const authorLinks = document.querySelectorAll('a[href^="#author-"]');

		// START LOOP: for each found author link
		for(let authorLink of authorLinks){
			// add tagClickHandler as event listener for that link
			authorLink.addEventListener('click', authorClickHandler);
		}
		// END LOOP: for each found author link
	};
	addClickListenersToAuthors();
}