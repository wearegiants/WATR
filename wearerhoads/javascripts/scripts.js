SmartAjax_load('/wp-content/themes/wearerhoads/smartajax/', function(){

    var collectionHeight = $(window).height();

	function cookieAction(){
	
	//Need this functionality for the cookie manipulation
	if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function(obj, start) {
	        for (var i = (start || 0), j = this.length; i < j; i++) {
	            if (this[i] === obj) { return i; }
	        }
	        return -1;
	    }
	}
    
    // Read cookie if no cookie present, create it.
    var cookieVal = $.cookie('lightbox');
    //console.log('Cookie val: ' + cookieVal);
    if(cookieVal === null) {
        $.cookie('lightbox', '', { expires: 30, path: '/' });
    } else {
        
        //console.log('should be in making item list');
        var itemList = cookieVal ? cookieVal.split(/,/) : new Array();
        if(itemList.length > 0) {
            $.each($("#front .item"), 
                
                function(index, item) {
                    var src = $(this).find('span img').attr('src');
                    
                    if(itemList.indexOf(src) !== -1) {
                        $(this).find(".titles .add").html("added");
                    }
                    
                }
                
            );
            
        }
        
    }
    
    }
    
    cookieAction();
    
	function rows(){
	
		var totalWidths = 100;
	
	    $('#front.rows .item').each(function(){
	        totalWidths += $(this).outerWidth();
	    });
	    
	    $('#front.rows').css({
	    	width: totalWidths,
	    });
	    
	}
		
	$(window).resize(function(){
	    rows();
	    bigImg();
	}).resize();
	
	function bigImg(){
		
		var ox = $(window).width();
		var oy = $(window).height();
		
		$('#bgImg img').hide();
		
		$('#bgImg img').each(function () {

			var self = this;
			var img = new Image();
			img.onload = function () {
				var cx = this.width;
				var cy = this.height;

				$(self).parent().css({
					'width': ox,
					'height': oy
				});

				$(self).parent().parent().css({
					'width': ox * 5,
					'height': oy
				});

				$(self).parent().parent().parent().css({
					'width': ox,
					'height': oy
				});

				if (ox / oy > cx / cy) {
					$(self).css({
						'width': ox,
						'height': (ox * cy / cx),
						'left': 0,
						'top': 0.5 * (oy - (ox * cy / cx)),
						'position': 'relative'
					});

				} else {
					$(self).css({
						'width': oy * cx / cy,
						'height': oy,
						'top': 0,
						'left': 0.5 * (ox - (oy * cx / cy)),
						'position': 'relative'
					});
				}
			}
			img.src = $(self).attr('src');
		});
		
		$('#bgImg img').fadeIn(250);
	}
	
	bigImg();

	//code for the animation of the collections link in the bottom menu
	var collectionTransition = false;
	$('#menuProjects').click(function() {
		if(!collectionTransition){
			collectionTransition = true;
			var origWidth = $('#btnProjects').height();
			if(!$('.menuSub').hasClass('shown')){ 
				$('#btnProjects').animate({
				    height: origWidth+$('.menuSub').height()+15+'px',
				  }, 350, function() {
				    $('.menuSub').toggleClass('shown');
				    $('#btnProjects').toggleClass('open');
					$('.menuSub').animate({
					    opacity: 1.0,
					  }, 200, function() {
					    // Animation complete.
					    collectionTransition = false;
					});
				  });
//				  $('#switcher').animate({marginTop:origWidth+50},350);
			}else{ 
				$('.menuSub').animate({
				    opacity: 0,
				  }, 200, function() {
				    $('#btnProjects').animate({
					    height: origWidth-$('.menuSub').height()-19+'px',
					  }, 350, function() {
					    // Animation complete.
					    collectionTransition = false;
					  });
					$('.menuSub').toggleClass('shown');
					$('#btnProjects').toggleClass('open');
				});
//				$('#switcher').delay(200).animate({marginTop: "-24px"},350);
			}
		}
	});
		
	function projectPosition(){
		var collectionHeight = $(window).height();
		$("#front.rows, #video.rows").css({
			height: collectionHeight - 60
		});
	
		$("#front .item img, #video .item img, #video .item, #video iframe").css({
			height: collectionHeight - 70
		});
		
		if($(window).height() <= 800) {
		    $("#front.rows .item img").css({
		    	height: collectionHeight - 70,
		    	width: "auto",
		    });
		} else {
		    $("#front.rows .item img").css({
		    	height: 730,
		    	width: "auto",
		    });
		    $("#video .item").css({
		    	height: 730,
		    	width: "auto",
		    });
		    $("#video .item img").css({
		    	height: 730,
		    	width: "auto",
		    });
		}
		
	}
	
	projectPosition();
	
	$(window).resize(function(){
	
		projectPosition();
		    
	}).resize();
	
	function videoRows(){
	
		var videoWidth = 20;
		
		$('#video .item').each(function(){
		    videoWidth += $(this).outerWidth();
		});
				
		$('#video.rows').css({
			width: videoWidth,
		});
	
	}
    
	$(window).resize(function(){
	
		videoRows();
	
	});
	
	function horizontalScroll(){
		$("body").mousewheel(function(event, delta) {
            $el = $(document);
            var sl = $el.scrollLeft() - (delta * 33);
            $el.scrollLeft(sl);
			event.preventDefault();
		});
	}
		
	function randomFunctions(){

		// Video Swapping magic
		var item = $('.item .videoInfo');
	
		item.click(function(e){
			item.fadeIn(1000);
			$('iframe').remove();
			var that = $(this);
			//that.parents('.media').children('a.next, a.prev').addClass('hide');
			var vimeoid = that.attr('data-video');
			var embedcode = '<iframe src="http://player.vimeo.com/video/' + vimeoid + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1" width="' + that.width() + '" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			var ipadembedcode = '<iframe src="http://player.vimeo.com/video/' + vimeoid + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1" width="405" height="540" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			that.fadeOut(400);
			that.parent('.item').append(that.hasClass('ipad') ? ipadembedcode : embedcode);
			e.preventDefault();
			$("#video .item").css({
				height: collectionHeight - 70
			});
		});
			
		$(".item .close").click(function(){
			$("#shareBox").addClass('visible');
		});	
		
		$(".meta .share").click(function(){
			//$("#shareBox").addClass('visible');
			$("#emailBox").addClass('visible');
			return false;
		});

		$("#shareBox #shareClose").click(function(){
			//$("#shareBox").removeClass('visible');
			$("#emailBox").removeClass('visible');
		});
		
		$("#emailClose").click(function(){
			$("#emailBox").removeClass('visible');
		});
		
		$("#main li a:not(#bnProjects)").click(function(){
			$("#main li a").removeClass('current');
			$(this).delay(250).addClass('current');
		});
		
		$("#front.grid .item").hover(
			function() {
				$("img", this).stop(true, true).animate({
					opacity: ".75"
				}, 200);
				$(".meta", this).stop(true, true).animate({
					opacity: 1
				}, 400);
			},
			function() {
				$("img", this).stop(true, true).animate({
					opacity: 1,
				}, 200);
				$(".meta", this).stop(true, true).animate({
					opacity: 0
				}, 400);
			}
		);
		
		$(".meta a.add").hover(
			function() {
				$(".meta .titles .add").stop(true, true).addClass("on");
			},
			function() {
				$(".meta .titles .add").stop(true, true).removeClass("on");
			}
		);
		
		$(".meta a.download").hover(
			function() {
				$(".meta .titles .download").stop(true, true).addClass("on");
			},
			function() {
				$(".meta .titles .download").stop(true, true).removeClass("on");
			}
		);
		
		$(".meta a.share").hover(
			function() {
				$(".meta .titles .share").stop(true, true).addClass("on");
			},
			function() {
				$(".meta .titles .share").stop(true, true).removeClass("on");
			}
		);
		
		$(".meta .download").click(function(e) {
			$img = $(this).parent().parent().find("span img");
            src = $img.attr('src');
            var dashPos = src.lastIndexOf('-');
            var dotPos = src.lastIndexOf('.');
            var ext = src.substr(dotPos);
            if($img.attr('class').indexOf('size-')=== -1) {
                //alter src to remove the dimensions from the image.
                var src = src.substr(0,dashPos) + ext;
            }
            var src = src.substr(src.indexOf('/wp-content'));
            document.location='singlePdf.php?src='+src;
            e.preventDefault();
            return false;
		});
		
        // Toggles adding / removing elements from the lightbox cookie based
        // on if they exist in the cookie already
    	$(".meta .add").click(function() {
            var cookie = $.cookie('lightbox');
            var items = cookie ? cookie.split(/,/) : new Array();
            
            
            
            $img = $(this).parent().parent().find("span img");
            src = $img.attr('src');
            var dashPos = src.lastIndexOf('-');
            var dotPos = src.lastIndexOf('.');
            var ext = src.substr(dotPos);
            if($img.attr('class').indexOf('size-')=== -1) {
                //alter src to remove the dimensions from the image.
                var src = src.substr(0,dashPos) + ext;
            }
            
            $titleEl = $(this).parent().find(".titles .add");
            var index = items.indexOf(src);
            if(index === -1) {
                $titleEl.html("added");
                items.push(src);
                $.cookie('lightbox',items.join(','));
            } else {
                items.splice(index, 1);
                //if(indx!=-1) alert('lol');
                $.cookie('lightbox', items.join(','));
                $titleEl.html('REMOVED');
                setTimeout(function() {
                    $titleEl.html("ADD TO LIGHTBOX");                 
                }, 500);
            }
    	});
		
		$("#btnSearch").toggle(
			function() {
				$(this).addClass("on");
				$("#searchBox").addClass("on");
			},
			function() {
				$(this).removeClass("on");
				$("#searchBox").removeClass("on");
			}
		);
				
		// Fade In
		//$("#front .item img").css("opacity", 0);
//		$("#front").css("opacity", 0);

//		$("#front .item img, #video .item img").load(function(evt){
//			$("#front .item, #video .item").delay(250).animate({opacity:1});
//			$(".item img").delay(0).each(function(index) { 
//				$(this).delay(50*index).animate({
//					opacity: 1
//				}, 200); 
//			});
//		});
		
		$("#btnRows").toggle(
			function(){
				$("#front").animate({
					opacity: 0,
				}, 400, function(){
				    $("#front img.small").each(function(index,el) {
				        $img = $(el);
                        var src = $img.attr('src');
                        var dashPos = src.lastIndexOf('-');
                        var dotPos = src.lastIndexOf('.');
                        var ext = src.substr(dotPos);
                        var cls = "size" + src.substr(dashPos, (dotPos - dashPos));
                        $img.attr('src',src.substr(0,dashPos)+ext)
                            .addClass(cls);
				    });
					$("#front").addClass('rows');
					$("#front").removeClass('grid');
                    $("#front img.small").removeClass('clickToLarge');
					$('#front').isotope('destroy');
                    projectPosition();
					rows();
					horizontalScroll();
					//$("#front .item img").attr("src", function(index, old) {
					//    return old.replace('b.jpg', 'a.jpg');
					//});
					$("#front").delay(400).animate({opacity:1});
					$("#switcher .grid").removeClass('active');
					$("#switcher .rows").addClass('active');
                    $("#front").trigger('straightAcrossComplete');
				});
			},
			function(){
				$("#front").animate({
					opacity: 0,
				}, 500, function(){
                    $("#front img.small").each(function(index,el) {
				        $img = $(el);
                        var classes = $img.attr('class').split(' ');
                        var cl = classes.length;
                        for(var i = 0; i < cl; i ++) {
                            if(classes[i].substr(0,5) == "size-") {
                                $img.removeClass(classes[i]);
                                var s = $img.attr('src');
                                var ext = s.substr(s.lastIndexOf('.'));
                                $img.attr('src', s.replace(ext,classes[i].substr(4)+ext));
                                break;
                            }
                        }
				    });
                    
					$("#front").addClass('grid');
                    $("#front img.small").addClass('clickToLarge');
					$("#front").removeClass('rows');
					//$("#front .item img").attr("src", function(index, old) {
					//    return old.replace('a.jpg', 'b.jpg');
					//});
					isodopeness();					
					$("#front").delay(400).animate({opacity:1});
					$("#switcher .rows").removeClass('active');
					$("#switcher .grid").addClass('active');
                    //$("body").unmousewheel();
                    $(".item").css({
                    	marginTop: 0,
                    });
                    
				});
			}
		);
		
		var articles = $('.item');
		var navWidth = $("#navigation").outerWidth();
		// Find next
		function findnext() {
            var articles = $('.item');
			var scrollPosition = $(document).scrollLeft();
			articles.each(function() {
				var that = $(this);
				artPosition = that.offset().left;
				if (artPosition > (scrollPosition + navWidth + 25)) {
                    $('html, body').scrollLeft(artPosition - navWidth);
					return false;
				}
			});
            return false;
		}
		
		// Find next
		function findprev(){
            var articles = $('.item');
			var scrollPosition = $(document).scrollLeft();
            $(articles.get().reverse()).each(function() {
				var that = $(this);
				artPosition = that.offset().left;
                if (artPosition < (scrollPosition - navWidth - 25)) {
                    $('html, body').scrollLeft(artPosition - navWidth);
					return false;
				}
			});
		}	
        $(document).unbind('keydown');
		$(document).keydown(function(event) {
			if (event.keyCode == 39) {
				event.preventDefault();
				findnext(event);
				return false;
			} else if (event.keyCode == 37) {
				event.preventDefault();
				findprev();
				return false;
			}
		});
		
		$(".clickToLarge").click(function(e) {
		    // Note left margin is how far away from the left margin that the image should scroll
		    var leftMargin = 185;
		    $img = $(this);
		    var src = $img.attr('src');
		    var dashPos = src.lastIndexOf('-');
		    var dotPos = src.lastIndexOf('.');
            var ext = src.substr(dotPos);
		    scrollTo=src.substr(0,dashPos)+ext;
		    $("#btnRows").click();
		    $("#front").bind('straightAcrossComplete',function(evt, data) {
		        var $scrollToImg = $("img[src='"+scrollTo+"']");
                // ONly do this if we get a match
                if($scrollToImg.length == 1) {
                    $('html, body').animate({scrollLeft: $scrollToImg.offset().left-leftMargin}, 400);
                    $("#front").unbind('straightAcrossComplete');
		        }
                
		    });
		});
        
        // If there is a .redir present click it
        $('.redirTo .clickToLarge').click();
		
	}
    
	randomFunctions();
	
	function isodopeness(){
	
	// Apply random classes to the front page images. We're using
	// this to make the margin/sizing a bit random.
//	var classes = ["one", "two", "three"];
//
//    $("#front.grid .item").each(function(){
//        $(this).addClass(classes[Math.floor(Math.random()*classes.length)]);
//    });
	
	$.Isotope.prototype._getCenteredMasonryColumns = function() {
	    this.width = this.element.width();

	    var parentWidth = this.element.parent().width();

	                  // i.e. options.masonry && options.masonry.columnWidth
	    var colW = this.options.masonry && this.options.masonry.columnWidth ||
        // or use the size of the first item
        this.$filteredAtoms.outerWidth(true) ||
        // if there's no items, use size of container
        parentWidth;

	    var cols = Math.floor( parentWidth / colW );
	    cols = Math.max( cols, 1 );

	    // i.e. this.masonry.cols = ....
	    this.masonry.cols = cols;
	    // i.e. this.masonry.columnWidth = ...
	    this.masonry.columnWidth = colW;
	  };

	  $.Isotope.prototype._masonryReset = function() {
	    // layout-specific props
	    this.masonry = {};
	    // FIXME shouldn't have to call this again
	    this._getCenteredMasonryColumns();
	    var i = this.masonry.cols;
	    this.masonry.colYs = [];
	    while (i--) {
	      this.masonry.colYs.push( 0 );
	    }
	  };

	  $.Isotope.prototype._masonryResizeChanged = function() {
	    var prevColCount = this.masonry.cols;
	    // get updated colCount
	    this._getCenteredMasonryColumns();
	    return ( this.masonry.cols !== prevColCount );
	  };

	  $.Isotope.prototype._masonryGetContainerSize = function() {
	    var unusedCols = 0,
	        i = this.masonry.cols;
	    // count unused columns
	    while ( --i ) {
	      if ( this.masonry.colYs[i] !== 0 ) {
	        break;
	      }
	      unusedCols++;
	    }

	    return {
	          height : Math.max.apply( Math, this.masonry.colYs ),
	          // fit container to columns that have been used;
	          width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
	        };
	  };

    var $container = $('#front.grid, #lightbox');

		$container.imagesLoaded( function(){
	    $container.isotope({
	      itemSelector : '.item',
	      masonry : {
	        columnWidth : 10
	      }
	    });
	    $("#loading").fadeOut(250);
	    $("#front .item, #video .item").delay(250).animate({opacity:1});
    });
    
    }
    
    isodopeness();
      	 
    SmartAjax.isDebug = false;
	SmartAjax.setOptions({
		cache: false,
		reload: true,
		containers:
		[
			{selector: '#content'},
		],
		
		before: function()
		{
			$('#ajax-loader').show();
			
			SmartAjax.proceed();
		},
		success: function()
		{
			$('#content-wrapper').fadeOut(200, SmartAjax.proceed);
		},
		done: function()
		{
			$('#ajax-loader').hide();
			$('#content-wrapper').fadeIn(0);
			projectPosition();
			randomFunctions();
			isodopeness();
			bigImg();
			cookieAction();
			
		}
	});
	SmartAjax.bind('a');
	SmartAjax.bind('.emailbtn a', {
	    history: false,
	    containers:
	    [
	        {selector: '#emailBox'}
	    ],
	    before: function()
	    {
	    	SmartAjax.proceed();
	    },
	    success: function()
	    {
	    	SmartAjax.proceed();
	    },
	    done: function()
	    {	    	
	    }
	});
}, true);