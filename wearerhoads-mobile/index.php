<?php get_header(); ?>

<div id="front" class="grid index wrapper">

	<?php query_posts(); while ( have_posts() ) : the_post(); ?>
	
		<div class="item">
			<a href="/projects/WATR/images/front/rhoads.01a.jpg" class="zoom" rel="group">
				<span class="thumb">
					<img class="small" src="/projects/WATR/images/front/rhoads.01b.jpg">
				</span>
			</a>
			<?php include (TEMPLATEPATH . 'snippets/projectShare.php'); ?>
		</div>
	
	<?php endwhile; wp_reset_query(); ?>

</div><!-- #front -->

<div id="switcher">
	<a id="btnRows" href="#"><span class="grid active">Grid</span><span class="rows">Rows</span></a>
</div>

<div id="emailBox"></div>

<div id="shareBox">
	<a href="#" id="shareClose">Close</a>
	<?php include (TEMPLATEPATH . 'snippets/shareBox.php'); ?>
</div>

<?php get_footer(); ?>