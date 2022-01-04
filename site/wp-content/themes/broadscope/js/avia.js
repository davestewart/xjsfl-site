/* this prevents dom flickering, needs to be outside of dom.ready event: */
document.documentElement.className += 'js_active';
/*end dom flickering =) */



//jQuery.noConflict();
jQuery(document).ready(function(){

	jQuery.browser = jQuery.browser || {}

	//activates the prettyphoto lightbox
	if(jQuery.fn.avia_activate_lightbox)
	jQuery('body').avia_activate_lightbox();

	//activates the hover effect for image links
	if(jQuery.fn.avia_activate_hover_effect)
	jQuery('#main').avia_activate_hover_effect();

	//activates the mega menu javascript
	if(jQuery.fn.aviaMegamenu)
	jQuery(".avia_mega").aviaMegamenu({modify_position:true});

	//activates the broadscope slider
	if(jQuery.fn.broadscopeSlider)
	jQuery(".slideshow_container").broadscopeSlider({ slides:'.featured', convertAttributes: false, appendControlls:avia_slideshow_controlls, autorotation:avia_autoplay , autorotationInterval: (parseInt(avia_autoplay_duration) * 1000) });


	// enhances contact form with ajax capabilities
	if(jQuery.fn.kriesi_ajax_form)
	jQuery('.ajax_form').kriesi_ajax_form();

	// improves comment forms
	if(jQuery.fn.kriesi_empty_input)
	jQuery('input:text').kriesi_empty_input();

	// activates portfolio sorting
	if(jQuery.fn.kriesi_portfolio_sort)
	jQuery('#template-portfolio-overview').kriesi_portfolio_sort({items:'.one_third'});

	//link nudging
	if(jQuery.fn.aviaLinkNudge)
	jQuery('.nudge a').aviaLinkNudge();

	//smooth scrooling
	if(jQuery.fn.avia_smoothscroll)
	jQuery('a[href*=#]').avia_smoothscroll();

	//activates the shortcode content slider
	if(jQuery.fn.aviaContentSlider)
	jQuery(".content_slider").aviaContentSlider();

	//activates the toggle shortcode
	if(jQuery.fn.avia_sc_toggle)
	jQuery('.togglecontainer').avia_sc_toggle();

	//activates the tabs shortcode
	if(jQuery.fn.avia_sc_tabs)
	jQuery('.tabcontainer').avia_sc_tabs();

	avia_cufon_helper();
});


// -------------------------------------------------------------------------------------------
// Tab shortcode javascript
// -------------------------------------------------------------------------------------------
(function($)
{
	$.fn.avia_sc_tabs= function(options)
	{
		var defaults =
		{
			heading: '.tab',
			content:'.tab_content'
		};

		var options = $.extend(defaults, options);

		return this.each(function()
		{
			var container = $(this),
				tabs = $(options.heading, container),
				content = $(options.content, container),
				initialOpen = 1;

			// sort tabs

			if(tabs.length < 2) return;

			if(container.is('.tab_initial_open'))
			{
				var myRegexp = /tab_initial_open__(\d+)/;
				var match = myRegexp.exec(container[0].className);

				if(match != null && parseInt(match[1]) > 0)
				{
					initialOpen = parseInt(match[1]);
				}
			}

			if(!initialOpen || initialOpen > tabs.length) initialOpen = 1;

			tabs.prependTo(container).each(function(i)
			{
				var tab = $(this);

				//set default tab to open
					if(initialOpen == (i+1))
					{
						tab.addClass('active_tab');
						content.filter(':eq('+i+')').addClass('active_tab_content');
					}

				tab.bind('click', function()
				{
					if(!tab.is('.active_tab'))
					{
						$('.active_tab', container).removeClass('active_tab');
						$('.active_tab_content', container).removeClass('active_tab_content');

						tab.addClass('active_tab');
						content.filter(':eq('+i+')').addClass('active_tab_content');
					}
					return false;
				});
			});

		});
	};
})(jQuery);


// -------------------------------------------------------------------------------------------
// Toggle shortcode javascript
// -------------------------------------------------------------------------------------------
(function($)
{
	$.fn.avia_sc_toggle = function(options)
	{
		var defaults =
		{
			heading: '.toggler',
			content: '.toggle_wrap'
		};

		var options = $.extend(defaults, options);

		return this.each(function()
		{
			var container = $(this),
				heading   = $(options.heading, container),
				allContent = $(options.content, container),
				initialOpen = '';

			//check if the container has the class toggle initial open.
			// if thats the case extract the number from the following class and open that toggle
			if(container.is('.toggle_initial_open'))
			{
				var myRegexp = /toggle_initial_open__(\d+)/;
				var match = myRegexp.exec(container[0].className);

				if(match != null && parseInt(match[1]) > 0)
				{
					initialOpen = parseInt(match[1]);
				}
			}

			heading.each(function(i)
			{
				var thisheading =  $(this),
					content = thisheading.next(options.content, container);

				if(initialOpen == (i+1)) { content.css({display:'block'}); }


				if(content.is(':visible'))
				{
					thisheading.addClass('activeTitle');
				}

				thisheading.bind('click', function()
				{
					if(content.is(':visible'))
					{
						content.slideUp(300);
						thisheading.removeClass('activeTitle');
					}
					else
					{
						if(container.is('.toggle_close_all'))
						{
							allContent.slideUp(300);
							heading.removeClass('activeTitle');
						}
						content.slideDown(300);
						thisheading.addClass('activeTitle');
					}
				});
			});
		});
	};
})(jQuery);

// -------------------------------------------------------------------------------------------
// Smooth scrooling when clicking on anchor links
// -------------------------------------------------------------------------------------------

function avia_cufon_helper()
{
	var elString = 'h1, h2, h3, h4, h5, h6, .custom_button, ul.avia_mega > li > a';

	if(jQuery.browser.msie && jQuery.browser.version < 9)
	{
		elString = '#main h1, h2, h3, h4, h5, h6, .custom_button, ul.avia_mega > li > a';
	}

	var els = jQuery(elString);
	els.addClass('cufon_headings');
}



(function($)
{
	$.fn.avia_smoothscroll = function(variables)
	{
		return this.each(function()
		{
			$(this).click(function() {

			   var newHash=this.hash;

			   if(newHash != '' && newHash != '#' )
			   {
				  // var container = $(this.hash);
				   var container = jQuery('a[name="' + this.hash.substr(1) + '"]');

				   if(container.length)
				   {
					   var target = container.offset().top,
						   oldLocation=window.location.href.replace(window.location.hash, ''),
						   newLocation=this,
						   duration=800,
						   easing='easeOutQuint';

					   // make sure it's the same location
					   if(oldLocation+newHash==newLocation)
					   {
					      // animate to target and set the hash to the window.location after the animation
					      $('html:not(:animated),body:not(:animated)').animate({ scrollTop: target }, duration, easing, function() {

					         // add new hash to the browser location
					         window.location.href=newLocation;
					      });

					      // cancel default click action
					      return false;
					   }
					}
				}
			});
		});
	};
})(jQuery);


// -------------------------------------------------------------------------------------------
// Ligthbox activation
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.avia_activate_lightbox = function(variables)
	{
		var defaults =
		{
			autolinkElements: 'a[rel^="prettyPhoto"], a[rel^="lightbox"], a[href$=jpg], a[href$=png], a[href$=gif], a[href$=jpeg], a[href$=".mov"] , a[href$=".swf"] , a[href*="vimeo.com"] , a[href*="youtube.com"]'
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var elements = $(options.autolinkElements, this),
				lastParent = "",
				counter = 0;

			elements.each(function()
			{
				var el = $(this),
					parentPost = el.parents('.post-entry:eq(0)'),
					group = 'auto_group';

				if(parentPost.get(0) != lastParent)
				{
					lastParent = parentPost.get(0);
					counter ++;
				}

				if((el.attr('rel') == undefined || el.attr('rel') == '') && !el.hasClass('noLightbox'))
				{
					el.attr('rel','lightbox['+group+counter+']');
				}
			});

			if($.fn.prettyPhoto)
			elements.prettyPhoto({ "theme": 'premium_photo', 'slideshow': 5000 }); /* facebook /light_rounded / dark_rounded / light_square / dark_square */
		});
	};
})(jQuery);




// -------------------------------------------------------------------------------------------
// Hover effect activation
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.avia_activate_hover_effect = function(variables)
	{
		var defaults =
		{
			autolinkElements: 'a[rel^="prettyPhoto"], a[rel^="lightbox"], a[href$=jpg], a[href$=png], a[href$=gif], a[href$=jpeg], a[href$=".mov"] , a[href$=".swf"] , a[href*="vimeo.com"] , a[href*="youtube.com"]'
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			$(options.autolinkElements, this).contents('img').each(function()
			{
				var img = $(this),
					a = img.parent(),
					$newclass = 'lightbox_video';

				if(a.attr('href').match(/(jpg|gif|jpeg|png|tif)/)) $newclass = 'lightbox_image';

				var bg = $("<span class='"+$newclass+" '></span>").appendTo(a);

				//bind
				img.hover(function()
				{
					var height = img.outerHeight(), width = img.outerWidth(), pos =  img.position();
					bg.css({height:height, width:width, top:pos.top, left:pos.left, display:'block'});

					if (img.css('opacity') >= 0.1) { a.removeClass('preloading'); }
					img.stop().animate({opacity:0.5},400);
				},
				function()
				{
					img.stop().animate({opacity:1},400);
				});
			});
		});
	};
})(jQuery);













// -------------------------------------------------------------------------------------------
// content slider
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.aviaContentSlider = function(variables, callback)
	{
		var defaults =
		{
			slidePadding: 40,
			appendControlls: {'h1':'pos_h1', 'h2':'pos_h2', 'h3':'pos_h3', 'h4':'pos_h4', 'h5':'pos_h5', 'h6':'pos_h6'},
			controllContainerClass: 'contentSlideControlls',
			transitionDuration: 800,								//how fast should images crossfade
			autorotation: true,										//autorotation true or false? (this setting gets overwritten by the class autoslide_true and autoslide_false if applied to the container. easier for shortcode management)
			autorotationInterval: 3000,								//interval between transition if autorotation is active ()also gets overwritten by autoslidedelay__(number)
			transitionEasing: 'easeOutQuint'
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var container = $(this),
				slides = $('.single_slide', container),
				slideCount = slides.length,
				firstSlide = slides.filter(':eq(0)'),
				followslides = $('.single_slide:not(:first)', container),
				innerContainer = "",
				innerContainerWidth = (container.width() * slideCount) + (options.slidePadding * slideCount),
				i = 0,
				interval = "",
				controlls = $();

			container.methods =
			{
				preload: function()
				{
					followslides.css({display:"none"});

					if(!slideCount)
					{
						container.methods.init();
					}
					else
					{
						container.aviaImagePreloader(container.methods.init);
					}
				},

				init: function()
				{
					if(slideCount > 1)
					{
						//set container height to match the first slide
						container.height(firstSlide.height());

						//wrap additional container arround slides and align slides within that container
						slides.wrapAll('<div class="inner_slide_container" />').css({float:'left',
																					 width:container.width(),
																					 display:'block',
																					 paddingRight:options.slidePadding
																					 });

						innerContainer = $('.inner_slide_container', container).width(innerContainerWidth);

						//attach controll elements
						container.methods.appenControlls();

						//start autoslide
						container.methods.autoRotation();
					}
				},

				change: function()
				{
					//move inner container
					var moveTo = ((-i * container.width()) - (i * options.slidePadding));
					innerContainer.stop().animate({left: moveTo}, options.transitionDuration, options.transitionEasing);

					//change height of outer container
					var nextSlideHeight = slides.filter(':eq('+i+')').height();
					container.stop().animate({height: nextSlideHeight}, options.transitionDuration, options.transitionEasing);

					//change active state of controlls
					var controllLinks = $('a', controlls);
					controllLinks.removeClass('activeItem');
					controllLinks.filter(':eq('+i+')').addClass('activeItem');
				},

				setSlideNumber: function(event)
				{

					var stop = false;

					if(event)
					{
						clearInterval(interval);

						if(event.data.show == 'next') i++;
						if(event.data.show == 'prev') i--;
						if(typeof(event.data.show) == 'number')
						{
							//check if next slide is the same as current slide
							if(i != event.data.show)
							{
								i = event.data.show;
							}
							else
							{
								stop = true;
							}
						}
					}
					else
					{
						i++;
					}

					if(i+1 > slideCount) { i = 0; } else
					if(i < 0) {i = slideCount-1; }

					if(!stop) // prevents transition if the next slide and the current slide are the same
					{
					    container.methods.change();
					}



					return false;
				},

				appenControlls: function()
				{
					//if controlls should be added by javascript and we got more than 1 slide
					if(options.appendControlls && slideCount > 1)
					{
						//check where to position the controll element, depending on the first element within the slide
						var positioningClass = '';

						for (var key in options.appendControlls)
						{
							if(!positioningClass)
							{
								if($(':first', firstSlide).is(key))
								{
									positioningClass = options.appendControlls[key];
								}

							}
						}


						//append the controlls
						var firstClass = 'class="activeItem"';

						controlls = $('<div></div>').addClass(options.controllContainerClass)
													.addClass(positioningClass)
													.css({visibility:'hidden', opacity:0});

							if(positioningClass)
							{
								controlls.appendTo(container);
							}
							else
							{
								controlls.insertAfter(container);
							}

						slides.each(function(i)
						{
							var link = $('<a '+firstClass+' href="#"></a>').appendTo(controlls); firstClass = "";
								link.bind('click', {show: i}, container.methods.setSlideNumber);
						});

						controlls.css({visibility:'visible', opacity:0}).animate({opacity:1},400);
					}
				},

				autoRotation: function()
				{
					if(container.is('.autoslide_true'))
					{
						options.autorotation = true;

					var myRegexp = /autoslidedelay__(\d+)/g;
					var match = myRegexp.exec(container[0].className);

					if(parseInt(match[1]) > 0)
					{
						options.autorotationInterval = parseInt(match[1]) * 1000;
					}



					}
					else if(container.is('.autoslide_false'))
					{
						options.autorotation = false;
					}


					if(options.autorotation)
					{
						interval = setInterval(function()
						{
							container.methods.setSlideNumber();
						},
						options.autorotationInterval);
					}
				}
			};


			container.methods.preload();
		});
	};
})(jQuery);



// -------------------------------------------------------------------------------------------
// image preloader
// -------------------------------------------------------------------------------------------


(function($)
{
	$.fn.aviaImagePreloader = function(variables, callback)
	{
		var defaults =
		{
			fadeInSpeed: 800,
			maxLoops: 10
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var container 	= $(this),
				//images		= $('img', this).css({opacity:0, visibility:'visible', display:'block'}),
				images		= $('img', this).css({opacity:1, visibility:'visible', display:'block'}),
				parent = images.parent(),
				imageCount = images.length,
				interval = '',
				allImages = images ;


			var methods =
			{
				checkImage: function()
				{
					images.each(function(i)
					{
						if(this.complete == true) images = images.not(this);
					});

					if(images.length && options.maxLoops >= 0)
					{
						options.maxLoops--;
						setTimeout(methods.checkImage, 500);
					}
					else
					{
						methods.showImages();
					}
				},

				showImages: function()
				{
					allImages.each(function(i)
					{
						var currentImage = $(this);
						currentImage.animate({opacity:1}, options.fadeInSpeed, function()
						{
							if(allImages.length == i+1) methods.callback(i);
						});
					});
				},

				callback: function()
				{
					if (variables instanceof Function) { callback = variables; }
					if (callback  instanceof Function) { callback.call(this);  }
				}
			};

			if(!imageCount) { methods.callback(); return }
			methods.checkImage();

		});
	};
})(jQuery);


// -------------------------------------------------------------------------------------------
// Main Slideshow
// -------------------------------------------------------------------------------------------


(function($)
{
	$.fn.broadscopeSlider = function(variables)
	{
		var defaults =
		{
			slides:'li',											//which elements should serve as slide
			transitionDuration: 800,								//how fast should images crossfade
			autorotation: false,									//autorotation true or false?
			autorotationInterval: 3000,								//interval between transition if autorotation is active
			transitionEasing: 'easeOutQuint',						//easing for the container movement if images got different sizes
			appendControlls: true,									//attach controlls via javascript (set to false if JS should not add them)
			appendAutoSlideshowControlls: 'autoslidecontrolls',		//attach play pause fwd and back bitton for the dia show (set to false if you dont want to add them)
			controllContainerClass:'slidecontrolls',				//container class for slidecontrolls. <a> tags within this container serve as slide controll
			appendCaption: 'feature_excerpt',						//caption div class name. change to false if you dont want to display caption
			convertAttributes: true,								// should the image title and alt tag be converted into caption and headlines?
			firstFadeInOfElements: 800								// after preloading how fast should elements be displayed
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var slider = $(this),
				slides = $(options.slides, slider),
				slideCount = slides.length,
				currentSlide = slides.filter(':eq(0)'),
				currentImage = currentSlide.find('img'),
				currentImageHeight = "",
				nextSlide = "",
				animatingTimeout ="",
				interval = "",
				animating = false,
				i = 0,
				movingPointer = $(),
				captions = $(),
				controlls = $(),
				slideControlls = $();


				slider.methods = {

					preload: function()
					{
						if($.fn.aviaImagePreloader)
						{
							slider.aviaImagePreloader({fadeInSpeed: options.firstFadeInOfElements}, slider.methods.init);
						}
						else
						{
							slider.methods.init();
						}
					},

					init: function()
					{
						//prepare slides
						slides.css({display:"none", zIndex:1,position:'absolute'});
						currentSlide.css({display:"block", zIndex:3});

						//check and add slider Controll functionality
						slider.methods.appendControlls();

						//check and add slideshow Captions
						slider.methods.appendCaption();

						//set container height
						currentImageHeight = currentImage.height();
						if(currentImageHeight>1)
						{
							slider.height(currentImageHeight);
						}

						//show appended elemens
						slider.methods.showAppended();

						//init autorotation
						slider.methods.autoRotation();
					},

					appendControlls: function()
					{

						//if controlls should be added by javascript and we got more than 1 slide
						if(slideCount > 1)
						{
							var firstClass = 'class="activeItem"';

							controlls = $('<div></div>').appendTo(slider)
														.addClass(options.controllContainerClass)
														.css({visibility:'hidden', opacity:0});

							movingPointer = $('<span></span>').appendTo(controlls).addClass('moving_pointer');

							slides.each(function(i){ $('<a '+firstClass+' href="#"></a>').appendTo(controlls); firstClass = ""; });
						}

						if(!options.appendControlls)
						{
							controlls.css({display:'none'});
						}

						//if we got controlls (either added by js above, or already available within the html source code add the click behaviour:
						if(options.controllContainerClass)
						{
							var links = $('.'+options.controllContainerClass, slider).find('a');
							links.each(function(i)
							{
								$(this).bind('click', {show: i}, slider.methods.setSlideNumber);
							});
						}

						//slideshow controll buttons
						if(options.appendAutoSlideshowControlls && options.appendControlls && slideCount > 1)
						{
							slideControlls = $('<div></div>').appendTo(slider)
															 .addClass(options.appendAutoSlideshowControlls)
															 .css({visibility:'hidden', opacity:0});
							var	status = 'ctrl_pause';

							if(options.autorotation) status += ' ctrl_play';

							slideControlls.html('<a class="ctrl_fwd" href=""></a><a class="'+status+'" href=""></a><a class="ctrl_back" href=""></a>');

							$('.ctrl_back', slideControlls).bind('click', {show: 'prev'}, slider.methods.setSlideNumber);
							$('.ctrl_fwd', slideControlls).bind('click', {show: 'next'}, slider.methods.setSlideNumber);
							$('.ctrl_pause, .ctrl_play', slideControlls).bind('click', slider.methods.toggleAutoRotation);
						}

					},

					appendCaption: function()
					{
						if(options.appendCaption && jQuery.fn.aviaConvertAttribute2HTML)
						{
							if(options.convertAttributes) // if we want to use the image data convert it, otherwise check if there is already a caption available and hide it
							{
								slides.aviaConvertAttribute2HTML({newContainerClass: options.appendCaption});
							}
							captions = $('.'+options.appendCaption).css({visibility:'hidden', opacity:0});
						}
					},

					showAppended: function()
					{
						var opa = 1;
						if(jQuery.browser.msie && $.browser.version < 9) opa = 0.8;

						$('.'+options.appendCaption+', .'+ options.appendAutoSlideshowControlls+ ', .'+options.controllContainerClass).css('visibility','visible').animate({opacity:opa}, options.firstFadeInOfElements );
					},

					setSlideNumber: function(event)
					{
						if(slider.is(':hidden')) return false;


						var stop = false;
						if(event) slider.methods.toggleAutoRotation('deactivate');

						if(!animating) //prevents transition if slides are already changing
						{
							var restore = i;

							if(event)
							{
								if(event.data.show == 'next') i++;
								if(event.data.show == 'prev') i--;
								if(typeof(event.data.show) == 'number')
								{
									//check if next slide is the same as current slide
									if(i != event.data.show)
									{
										i = event.data.show;
									}
									else
									{
										stop = true;
									}
								}
							}
							else
							{
								i++;
							}

							if(i+1 > slideCount) { i = 0; } else
							if(i < 0) {i = slideCount-1};

							//check if next Slide is animating, if so stop and reset i
							if(slides.filter(':eq('+(i)+')').is(':animated')) { stop = true; i = restore;}


							if(!stop) // prevents transition if the next slide and the current slide are the same
							{
								animating = true;
								animatingTimeout = setTimeout(slider.methods.newChangePossible, (options.transitionDuration + 100)/(slideCount-1));

								slider.methods.change();
							}
						}
						return false;
					},

					change: function()
					{
						//set controll status
						var activeControll= controlls.find('a:eq('+(i)+')');
						$('.activeItem', controlls).removeClass('activeItem');
						activeControll.addClass('activeItem');

						//move arrow
						var moveTo = activeControll.position();
						if(moveTo)
						{
							movingPointer.animate({left:moveTo.left-1}, options.transitionDuration, options.transitionEasing);
						}

						//prepare slides
						nextSlide = slides.filter(':eq('+(i)+')');
						nextSlide.css({display:"block", zIndex:2});
						nextSlideImageHeight = nextSlide.find('img').height();

						//prepare container and animate slide: opera bug occurs when the images are loaded for the first time:
						//then we need to fade in the imges first and then change the height of the container
						if( nextSlideImageHeight < 20)
						{
							currentSlide.css({display:"block", zIndex:3}).fadeOut( options.transitionDuration,  function()
							{
								nextSlideImageHeight = nextSlide.find('img').height();
								if(nextSlideImageHeight > 1)
								{
									slider.stop().animate({height: nextSlideImageHeight}, options.transitionDuration, options.transitionEasing);
								}
							});
						}
						else
						{
							slider.stop().animate({height: nextSlideImageHeight}, options.transitionDuration, options.transitionEasing);
							currentSlide.css({display:"block", zIndex:3}).fadeOut( options.transitionDuration );
						}



						currentSlide = nextSlide;

					},

					autoRotation: function()
					{
						if(options.autorotation && slideCount > 1)
						{
							interval = setInterval(function()
							{
								slider.methods.setSlideNumber();
							},
							options.autorotationInterval);
						}
					},

					toggleAutoRotation: function(deactivate)
					{
						var button = $('.ctrl_play, .ctrl_pause', slideControlls);
						if (button.is('.ctrl_play') || deactivate == 'deactivate')
						{
							clearInterval(interval);
							button.removeClass('ctrl_play');
						}
						else
						{
							options.autorotation = true;
							slider.methods.setSlideNumber();
							slider.methods.autoRotation();
							button.addClass('ctrl_play');
						}
						return false;
					},

					newChangePossible: function()
					{
						animating = false;
					}

				};

				slider.methods.preload();


		});
	};
})(jQuery);


// -------------------------------------------------------------------------------------------
// Slideshow supporting function that adds captions
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.aviaConvertAttribute2HTML = function(variables)
	{
		var defaults =
		{
			elements: 'img',
			newContainer:'div',
			newContainerClass: 'feature_excerpt',
			sets: {title: 'h1', alt: 'p'},
			split: '::',
			splitWrap: 'h1'
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var container = $(this),
				elements = $(options.elements, container);

			elements.each(function()
			{
				var element = $(this),
					newContainer = $('<'+options.newContainer+'>').addClass(options.newContainerClass).appendTo(container);

				for (var key in options.sets)
				{
					var description = "";

					//check if the attribute got a value
					if(element.attr(key))
					{
						description = element.attr(key);
					}

					//if value is set and wrapping element is defined
					if(options.sets[key] && description)
					{
						description = '<'+options.sets[key]+'>'+description+'</'+options.sets[key]+'>';
					}

					//split option
					var splitdesc = description.split(options.split);

					if(splitdesc[0] != "" )
					{
						if(splitdesc[1] != undefined )
						{
							description = "<"+options.splitWrap+">"+splitdesc[0] +"</"+options.splitWrap+">"+splitdesc[1];
						}
						else
						{
							description = splitdesc[0];
						}
					}

					newContainer.html(newContainer.html() + description);
				}

			});

		});

	};

})(jQuery);


// -------------------------------------------------------------------------------------------
// Mega Menu
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.aviaMegamenu = function(variables)
	{
		var defaults =
		{
			modify_position:true,
			delay:300
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var menu = $(this),
				menuItems = menu.find(">li"),
				megaItems = menuItems.find(">div").parent().css({overflow:'hidden'}),
				dropdownItems = menuItems.find(">ul").parent(),
				parentContainerWidth = menu.parent().width(),
				delayCheck = {},
				ie7fix = 0,
				mWidth = menu.width();


			//correct position
			menuItems.each(function()
			{
				var item = $(this),
					pos = item.position(),
					megaDiv = item.find("div:first").css({opacity:0, display:"none"}),
					normalDropdown = "";

				if(!megaDiv.length)
				{
					normalDropdown = item.find(">ul").css({display:"none"});
				}


				if(megaDiv.length || normalDropdown.length)
				{
					var link = item.find('>a');
					link.html("<span class='dropdown_link'>"+link.html()+"</span>").append('<span class="dropdown_available"></span>');
					ie7fix = ie7fix + 10;

					if(typeof link.attr('href') != 'string'){ link.css('cursor','default'); }
				}

				menu.width(mWidth + ie7fix+1);

				if(options.modify_position && megaDiv.length)
				{
					if(megaDiv.width() > pos.left)
					{
						megaDiv.css({left: (Math.round(pos.left) * -1)});
					}
					else if(pos.left + megaDiv.width() > parentContainerWidth)
					{
						megaDiv.css({left: (megaDiv.width() - pos.left) * -1 });
					}
				}
			});


			function megaDivShow(i)
			{
				if(delayCheck[i] == true)
				{
					var item = megaItems.filter(':eq('+i+')').css({overflow:'visible'}).find("div:first"),
						link = megaItems.filter(':eq('+i+')').find("a:first");


						item.stop().css('display','block').animate({opacity:1},300);

						if(item.length)
						{
							link.addClass('open-mega-a');
							megaItems.filter(':eq('+i+')').find(">a").stop().animate({paddingBottom:0},200);
						}
				}
			}

			function megaDivHide (i)
			{
				if(delayCheck[i] == false)
				{
					megaItems.filter(':eq('+i+')').find(">a").stop().animate({paddingBottom:0},200, function()
																									{$(this).removeClass('open-mega-a');});

					var listItem = megaItems.filter(':eq('+i+')'),
						item = listItem.find("div:first");

					item.stop().css('display','block').animate({opacity:0},300, function()
					{
						$(this).css('display','none');
						listItem.css({overflow:'hidden'});
					});
				}
			}


			//bind event for mega menu
			megaItems.each(function(i){

				$(this).hover(

					function()
					{
						delayCheck[i] = true;
						setTimeout(function(){megaDivShow(i); },options.delay);
					},

					function()
					{
						delayCheck[i] = false;
						setTimeout(function(){megaDivHide(i); },options.delay);
					}
				);
			});


			// bind events for dropdown menu
			dropdownItems.find('li').andSelf().each(function()
			{
				var currentItem = $(this),
					sublist = currentItem.find('ul:first');

				currentItem.hover(function()
				{
					sublist.fadeIn();
				},
				function()
				{
					sublist.fadeOut();
				});
			});

		});
	};
})(jQuery);



// -------------------------------------------------------------------------------------------
// input field improvements
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.kriesi_empty_input = function(options)
	{
		return this.each(function()
		{
			var currentField = $(this);
			currentField.methods =
			{
				startingValue:  currentField.val(),

				resetValue: function()
				{
					var currentValue = currentField.val();
					if(currentField.methods.startingValue == currentValue) currentField.val('');
				},

				restoreValue: function()
				{
					var currentValue = currentField.val();
					if(currentValue == '') currentField.val(currentField.methods.startingValue);
				}
			};

			currentField.bind('focus',currentField.methods.resetValue);
			currentField.bind('blur',currentField.methods.restoreValue);
		});
	};
})(jQuery);


// -------------------------------------------------------------------------------------------
// contact form ajax improvements
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.kriesi_ajax_form = function(variables)
	{
		var defaults =
		{
			sendPath: 'send.php',
			responseContainer: '#ajaxresponse'
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var form = $(this),
				form_sent = false,
				send =
				{
					formElements: form.find('textarea, select, input[type=text], input[type=hidden]'),
					validationError:false,
					button : form.find('input:submit'),
					dataObj : {}
				};

			responseContainer = $(options.responseContainer+":eq(0)");

			send.button.bind('click', checkElements);

			function send_ajax_form()
			{
				if(form_sent){ return false; }

				form_sent = true;
				send.button.fadeOut(300);

				responseContainer.load(form.attr('action')+' '+options.responseContainer, send.dataObj, function()
				{
					responseContainer.find('.hidden').css({display:"block"});
					form.slideUp(400, function(){responseContainer.slideDown(400); send.formElements.val('');});
				});


			}

			function checkElements()
			{
				// reset validation var and send data
				send.validationError = false;
				send.datastring = 'ajax=true';

				send.formElements.each(function(i)
				{
					var currentElement = $(this),
						surroundingElement = currentElement.parent(),
						value = currentElement.val(),
						name = currentElement.attr('name'),
					 	classes = currentElement.attr('class'),
					 	nomatch = true;

					 	send.dataObj[name] = encodeURIComponent(value);

					 	if(classes.match(/is_empty/))
						{
							if(value == '')
							{
								surroundingElement.attr("class","").addClass("error");
								send.validationError = true;
							}
							else
							{
								surroundingElement.attr("class","").addClass("valid");
							}
							nomatch = false;
						}

						if(classes.match(/is_email/))
						{
							if(!value.match(/^\w[\w|\.|\-]+@\w[\w|\.|\-]+\.[a-zA-Z]{2,4}$/))
							{
								surroundingElement.attr("class","").addClass("error");
								send.validationError = true;
							}
							else
							{
								surroundingElement.attr("class","").addClass("valid");
							}
							nomatch = false;
						}

						if(nomatch && value != '')
						{
							surroundingElement.attr("class","").addClass("valid");
						}
				});

				if(send.validationError == false)
				{
					send_ajax_form();
				}
				return false;
			}
		});
	};
})(jQuery);


// -------------------------------------------------------------------------------------------
// portfolio sorting
// -------------------------------------------------------------------------------------------


(function($)
{
	$.fn.kriesi_portfolio_sort = function(variables)
	{
		var defaults =
		{
			items: '.items',
			linkContainer:'#js_sort_items',
			linkContainer:'#js_sort_items .sort_by_cat',
			filterItems: '.sort_by_cat',
			sortItems:'sort_by_val'

		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var container		= $(this),
				linkContainer	= $(options.linkContainer),
				links			= linkContainer.find('a'),
				items			= container.find(options.items),
				itemLinks		= items.find('a'),
				itemPadding		= parseInt(items.css('paddingBottom')),
				itemSelection	= '',
				columns			= 0,
				rows			= 0,
				coordinates		= new Array(),
				animationArray	= new Array(),
				columnPlus		= new Array();

			container.methods = {

				preloadingDone: function()
				{

					if(linkContainer.length > 0 && !(jQuery.browser.msie && $.browser.version < 7))
					{
						//set container height, get all items and save coordinates
						container.css('height',container.height());
						items.each(function()
						{
							var item = $(this),
								itemPos = item.position();

							//margin modification
							itemPos.margin = 0;parseInt(item.css('marginLeft'));
							item.css('marginLeft',0);

							coordinates.push(itemPos);
						});

						//set columns
						for(i = 0; i < coordinates.length; i++)
						{
							if(coordinates[i].top == coordinates[0].top) columns ++;
						}

						//set coordinates without margin
						for(i = 0; i < coordinates.length; i++)
						{
							var marginMultiplier = i % columns,
								newPosLeft = (coordinates[i].margin * marginMultiplier) + coordinates[i].left;

							coordinates[i].left = newPosLeft;
						}



						//position items
						items.each(function(i)
						{
							var item = $(this);
							item.css({position:'absolute', top: coordinates[i].top+'px', left: coordinates[i].left+'px'});
						});





						//show controlls
						//linkContainer.css({opacity:0, visibility:"visible"}).animate({opacity:1});

						// bind action to click events
						container.methods.bindfunctions();

					}
				},

				bindfunctions: function()
				{
					links.click(function()
					{
						var clickedElement = $(this),
							elementFilter = this.id;

							animationArray = new Array();

						//apply active state
						clickedElement.parent().find('.active_sort').removeClass('active_sort');
						this.className += ' active_sort';

						// if we need to filter items
						if(clickedElement.parent().is(options.filterItems))
						{
							var arrayIndex = 0,
								columnIndex = 0;

							columnPlus = new Array();

							items.each(function(i)
							{
								var item = $(this);

								if(item.is('.'+elementFilter))
								{
									animationArray.push(
									{
                                        element: item,
                                        animation:
                                        {
                                             opacity: 1,
                                             top: coordinates[arrayIndex].top,
                                             left: coordinates[arrayIndex].left
                                        },
                                        height: item.height()
                                    });

                                    if(columnTop < coordinates[arrayIndex].top)  columnTop = coordinates[arrayIndex].top;

                                    columnIndex++;
                                    arrayIndex++;

								}
								else
								{
									animationArray.push(
                                    {
                                        element: item,
                                        animation:
                                        {
                                             opacity: 0
                                        },
                                        callback: true
                                    });
								}



								if(items.length == i+1 || columnIndex == columns)
                                {
 									var columnTop = 0;

                                	for (x = 0; x < columnIndex; x++)
                                	{
                                		if(animationArray[i-x].height)
                                		{
                                			if(columnTop < animationArray[i-x].height) columnTop = animationArray[i-x].height;
                                		}
                                		else
                                		{
                                			columnIndex++;
                                		}

                                	}
                                	columnPlus.push(columnTop);
                                	columnIndex = 0;
                                }

								if(i+1 == items.length) container.methods.startAnimation();
							});

						}
						else // if we need to sort items first
						{
							var sortitems = items.get(),
								reversed = false;

							if(clickedElement.is('.reversed')) reversed = true;

							sortitems.sort(function(a, b)
							{
								var compA = $(a).find('.'+elementFilter).text().toUpperCase();
								var compB = $(b).find('.'+elementFilter).text().toUpperCase();
								if (reversed)
								{
									return (compA < compB) ? 1 : (compA > compB) ? -1 : 0;
								}
								else
								{
									return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
								}
							});

							items = $(sortitems);
							$(options.filterItems).find('.active_sort').trigger('click');

						}

						return false;
					});
				},

				startAnimation: function()
				{
					var heightmodifier = coordinates[0].top,
						visibleElement = 0,
						currentCol = 0;



					for (i = 0; i < animationArray.length; i++)
					{
						if(animationArray[i].animation.top)
						{
							if(visibleElement % columns == 0)
							{
								heightmodifier += columnPlus[currentCol] + itemPadding;
								currentCol ++;
							}
							visibleElement++;
						}

						animationArray[i].animation.top = heightmodifier;

             			animationArray[i].element.css('display','block').animate(animationArray[i].animation, 800, "easeInOutQuint", (function(i)
             			{
							return function()
							{
								if(animationArray[i].callback == true)
	             				{
	             					animationArray[i].element.css({display:"none"});
	             				}
							};
             			})(i));
            		}


            		var newContainerHeight = coordinates[0].top;

					for(z = 0; z < columnPlus.length; z++ )
					{
						newContainerHeight += columnPlus[z] + itemPadding;
					}

					container.animate({height:newContainerHeight}, 800, "easeInOutQuint");
				}

			};



			container.aviaImagePreloader(container.methods.preloadingDone);

		});
	};
})(jQuery);



// -------------------------------------------------------------------------------------------
// LINK NUDGE
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.aviaLinkNudge = function(variables)
	{
		var defaults =
		{
			movement: 10,
			time: 400
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var elements = $(this);

			elements.hover(
				function()
				{
					$(this).stop().animate({ 'paddingLeft': options.movement }, options.time);
				},
				function()
				{
					$(this).stop().animate({ 'paddingLeft' : 0}, options.time);
				});
		});
	};
})(jQuery);




jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});


function avia_console(text) {
  ((window.console && console.log) ||
   (window.opera && opera.postError) ||
   window.alert).call(this, text);
}


