jQuery(document).ready(function($) {
  var si = $('#slider').royalSlider({
    addActiveClass: true,
    controlNavigation: 'none',
    autoScaleSlider: true, 
    keyboardNavEnabled: true,
    navigateByClick: false,
    arrowsNav: false,
    imageScalePadding: 0,
    autoScaleSliderWidth: 1200,     
    autoScaleSliderHeight: 800,
    fadeinLoadedSlide: false,
    globalCaption: true,
    keyboardNavEnabled: true,
    video: {
		// video options go gere
		autoHideBlocks: false,
		autoHideArrows: false
    },
    visibleNearby: {
          enabled: true,
          centerArea: 0,
          center: true,
          breakpoint: 650,
          breakpointCenterArea: 0,
        }
  }).data('royalSlider');

  // link to fifth slide from slider description.
  $('.slide4link').click(function(e) {
    si.goTo(4);
    return false;
  });
});

SmartAjax_load('http://wearegiants.net/projects/WATR/smartajax/', function(){

	$(".zoom").fancybox({
		closeClick : true,
	});
	
	function rows(){
		var totalWidths = 0;
	
	    $('#front.rows .item').each(function(){
	        totalWidths += $(this).outerWidth();
	    });
	
	    console.log(totalWidths);
	    
	    $('#front.rows').css({
	    	width: (totalWidths+20)
	    });
	}
	
	
	$(window).resize(function(){
	    rows();
	    bigImg();
	}).resize();
	
	function bigImg(){
		
		var ox = $(window).width();
		var oy = $(window).height();
		
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
			}
		}
	});
		
	function projectPosition(){
		var collectionHeight = $(window).height();
		$("#project .item img").css({
			height: collectionHeight - 135
		});
		$("#front.rows .item img").css({
			height: collectionHeight - 135
		});
		$("#front.rows").css({
			height: collectionHeight - 135
		});
		$("#front.single img").css({
			height: collectionHeight - 135
		});
		
	}
	
	projectPosition();
	
	$(window).resize(function(){
		projectPosition();
	});
	
	function horizontalScroll(){
		$("body").mousewheel(function(event, delta) {
			this.scrollLeft -= (delta * 85);
			event.preventDefault();
		});
	}
		
	function randomFunctions(){
		$(".meta .share").click(function(){
			$("#shareBox").addClass('visible');
		});

		$("#shareBox #shareClose").click(function(){
			$("#shareBox").removeClass('visible');
		});
		
		$(".meta .add").hover(
			function() {
				$(".meta .titles .add").stop(true, true).addClass("on");
			},
			function() {
				$(".meta .titles .add").stop(true, true).removeClass("on");
			}
		);
		
		$(".meta .download").hover(
			function() {
				$(".meta .titles .download").stop(true, true).addClass("on");
			},
			function() {
				$(".meta .titles .download").stop(true, true).removeClass("on");
			}
		);
		
		$(".meta .share").hover(
			function() {
				$(".meta .titles .share").stop(true, true).addClass("on");
			},
			function() {
				$(".meta .titles .share").stop(true, true).removeClass("on");
			}
		);
		
		$(".meta .add").toggle(
			function() {
				$(this).parent().find(".titles .add").html("added!");
			},
			function() {
				$(this).parent().find(".titles .add").html("removed!");
				// I need to figure out how to make this revert back to "Add to lightbox" after 1 second. 
			}
		);
		
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
		$(".item img").css("opacity", 0);
//		$("#front").css("opacity", 0);

		$(".item img").load(function(evt){
//			$("#front").animate({opacity:1});
			$(".item img").delay(200).each(function(index) { 
				$(this).delay(200*index).animate({
					opacity: 1
				}); 
			});
		});
				
		$("#front .item nav").hide();

		$("#front .item img").load(function(evt){
			$(".item nav").delay(200).each(function(index) { 
				$(this).delay(100*index).fadeIn(500); 
			});
		});
		
		 $("#btnRows").toggle(
			function(){
				$("#front").animate({
					opacity: 0,
				}, 400, function(){
					$("#front").addClass('rows');
					$("#front").removeClass('grid');
					$('#front').isotope('destroy');
					projectPosition();
					rows();
					horizontalScroll();
					//$("#front .item img").attr("src", function(index, old) {
					  //  return old.replace('b.jpg', 'a.jpg');
					//});
					$("#front").delay(400).animate({opacity:1});
					$("#switcher .grid").removeClass('active');
					$("#switcher .rows").addClass('active');
				});
			},
			function(){
				$("#front").animate({
					opacity: 0,
				}, 500, function(){
					$("#front").addClass('grid');
					$("#front").removeClass('rows');
					//$("#front .item img").attr("src", function(index, old) {
					  //  return old.replace('a.jpg', 'b.jpg');
					//});
					isodopeness();					
					$("#front").delay(400).animate({opacity:1});
					$("#switcher .rows").removeClass('active');
					$("#switcher .grid").addClass('active');
				});
			}
		); 
		
	}
	
	randomFunctions();
	
	function scrollingnonsense(){
		$("#project > div").smoothDivScroll({
			mousewheelScrolling: "allDirections",
			//manualContinuousScrolling: true,
			//autoScrollingMode: "onStart"
		});
		$("#front.rows").smoothDivScroll({
			mousewheelScrolling: "allDirections",
			//manualContinuousScrolling: true,
			//autoScrollingMode: "onStart"
		});
	}
	
	scrollingnonsense();
	
	function isodopeness(){
	
	// Apply random classes to the front page images. We're using
	// this to make the margin/sizing a bit random.
	var classes = ["one", "two", "three"];

    $("#front.grid img").each(function(){
        $(this).addClass(classes[Math.floor(Math.random()*classes.length)]);
    });
	
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

    var $container = $('#front');

		$container.imagesLoaded( function(){
	    $container.isotope({
	      itemSelector : '.item',
	      masonry : {
	        columnWidth : 10
	      }
	    });
    });
    
    }
    
    isodopeness();
  	 
	
    SmartAjax.isDebug = false;
	SmartAjax.setOptions({
		cache: false,
		reload: false,
		containers:
		[
			{selector: '#content'}
		],
		
		before: function()
		{
			$('#ajax-loader').show();
			
			SmartAjax.proceed();
		},
		success: function()
		{
			$('#content-wrapper').fadeOut(400, SmartAjax.proceed);
		},
		done: function()
		{
			$('#ajax-loader').hide();
			$('#content-wrapper').fadeIn(400);
			projectPosition();
			randomFunctions();
			isodopeness();
			bigImg();
		}
	});
	SmartAjax.bind('a');
}, true);

// Notes:

// 1. When the Grid/Rows button is clicked, it modifies the src of the image to load 
// hi-res version. We'll need to modify it a bit to work properly with Wordpress' featured image.  