<?php get_header(); ?>

<?php the_post(); ?>

<h1 class="title"><span><?php the_title(); ?></span></h1>
<div id="about" class="wrapper"><div>
	<div class="clients description">
		<?php the_content(); ?>	
	</div>
</div></div>

<div id="bgImg"><div><div>
	<?php the_post_thumbnail(); ?>
</div></div></div>

<?php get_footer(); ?>