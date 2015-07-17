<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>

<meta charset="utf-8">
<title><?php bloginfo('name'); ?></title></title>
<meta name="description" content="">
<meta name="author" content="">

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/stylesheets/base.css">
<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/stylesheets/skeleton.css">
<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/stylesheets/layout.css">
<link type="text/css" rel="stylesheet" href="http://fast.fonts.com/cssapi/b4536772-c013-4a38-9bd1-55bdc006019b.css"/>

<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<?php wp_head(); ?>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/jquery-ui-1.8.23.custom.min.js"></script>
<script src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/jquery.isotope.min.js"></script>
<script src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/jquery.cookie.js"></script>
<script src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/app.js"></script>

<link rel="shortcut icon" href="<?php bloginfo('stylesheet_directory'); ?>/images/favicon.ico">
<link rel="apple-touch-icon" href="<?php bloginfo('stylesheet_directory'); ?>/images/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="72x72" href="<?php bloginfo('stylesheet_directory'); ?>/images/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('stylesheet_directory'); ?>/images/apple-touch-icon-114x114.png">

</head>
<body <?php body_class(); ?>>

	<div id="wrapper" class="hfeed">
		
		<div id="header">
	
		<h1 id="logo"><a href="/">We Are The Rhoads</a></h1>
		
<!--		<select id="mobileMenu"> 
			<option value="" selected="selected">Navigation</option> 
			<option value="/">Home</option> 
			<option value="/collections/all">Books</option> 
			<option value="/blogs/five-simple-steps-blog">Blog</option> 
			<option value="/pages/about-us">About Us</option> 
			<option value="/pages/support">Support</option> 
		</select> -->
		
		<a href="#" id="btnNavdrop">
			<span></span>
			<span></span>
			<span></span>
		</a>
		  
		<div id="navigation">
			
			<nav id="secondary" class="lower">
				<ul>
					<?php wp_nav_menu( array( 'theme_location' => 'secondary-menu', 'items_wrap' => '%3$s' ) ); ?>
					<li id="btnSearch">Search</li>
					<li><a href="/lightbox">Lightbox</a></li>
					<li id="searchBox">
						<div><form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>"><input type="text" name="s" placeholder="kinfolk, summer, nike, etc. " id="s" /></form></div>
					</li>
				</ul>
			</nav>
		</div><!-- Navigation -->
		
		</div><!--Header-->
		
		<div id="content-wrapper">
		
			<div id="navDrop">
				<nav id="main" class="upper">
					<div class="left column">
						<h2>Galleries</h2>
						<ul>
							<?php wp_nav_menu( array( 'theme_location' => 'main-menu', 'items_wrap' => '%3$s' ) ); ?>
							<li><a href="/advertising/">Advertising</a></li>
							<li><a href="/video">Video</a></li>
						</ul>
					</div>			
					<div class="middle column">
						<h2>Projects</h2>
						<ul class="menuSub">
							<?php query_posts('cat=1'); while ( have_posts() ) : the_post(); ?>
								<li><a href="<?php the_permalink(); ?> "><?php the_title(); ?></a></li>
							<?php endwhile; wp_reset_query(); ?>
						</ul>
					</div>
					<div class="right column">
						<li><a href="http://blog.wearetherhoads.com" target="blank">Blog</a></li>
						<?php wp_nav_menu( array( 'theme_location' => 'secondary-menu', 'items_wrap' => '%3$s' ) ); ?>
					</div>
				</nav>
<!--				<nav id="secondary" class="lower">
					<ul>
						<?php wp_nav_menu( array( 'theme_location' => 'secondary-menu', 'items_wrap' => '%3$s' ) ); ?>
						<li id="btnSearch">Search</li>
						<li><a href="/lightbox">Lightbox</a></li>
						<li id="searchBox">
							<div><form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>"><input type="text" name="s" placeholder="kinfolk, summer, nike, etc. " id="s" /></form></div>
						</li>
					</ul>
				</nav>-->
			</div>
			
			<div id="content">