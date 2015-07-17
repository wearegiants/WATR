<?php
/*
Template Name: Video Page
*/
?>
<?php get_header(); ?>
<?php the_post(); ?>
<!--<script type="text/javascript"> 
$(window).load(function(){  
    var vidWidth = 20;
	$('#video .item').each(function(){
	    vidWidth += $(this).outerWidth();
	});
    $("#video").width(vidWidth);
    
});
</script>-->
<h1 class="title"><span><?php the_title(); ?></span></h1>
<div id="video" class="rows">
	<div class="container">
	<?php
 		$args = array( 'post_type' => 'videos', 'posts_per_page' => 100 );
		$loop = new WP_Query( $args );
		while ( $loop->have_posts() ) : $loop->the_post();
		?>
		<div class="item one-third column" id="post_<?php the_ID(); ?>">
			<a href="" class="videoInfo" data-video="<?php echo get_post_meta($post->ID, 'vimeo', true); ?>">
				<span class="play">Play</span>
				<?php the_post_thumbnail();?>
			</a>
        </div>
    <?PHP endwhile; ?>
	</div>
</div><!-- #front -->


<?php get_footer(); ?>