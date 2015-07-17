<?php get_header(); ?>
<?php get_header(); ?>


<div id="front" class="grid index wrapper">
<img id="loading" src="<?php bloginfo('stylesheet_directory'); ?>/images/loading.gif" />
	<!--<div class="item"><h1 class="title"><span><?php the_title(); ?></span></h1></div>-->

	<?php if($post->post_content=="") : ?>
	
	<!-- Do stuff with empty posts (or leave blank to skip empty posts) -->
	
	<?php else : ?>
	
	  <div class="item description">
	  	<?php the_content(); ?>
	  </div>
	
	<?php endif; ?>
		
		<?php 
		
		    $args = array(
		    	'post_type' => 'attachment',
		    	'posts_per_page' => -1,
		    	'orderby' => 'menu_order',
		    	'numberposts' => null,
		    	'post_status' => null,
		    	'post_parent' => $post->ID
		    ); 
		    $attachments = get_posts($args);
		    if ($attachments) {
		    	foreach ($attachments as $attachment) {
		    	     $medSrcArr = wp_get_attachment_image_src($attachment->ID, 'medium');
		    		 ?>
		    		
		    		<div class="item">
	    				<span class="thumb">
	    					<img class="small clickToLarge" src="<?php echo $medSrcArr[0]; ?>" />
	    				</span>
						<div class="meta">
							<a href="#" class="add icon-plus-sign"></a>
							<a target="blank" href="<?php echo $largeSrcArr[0]; ?>" class="download icon-download"></a>
							<a href="#" class="share icon-envelope"></a>
							<div class="titles">
								<span class="add">Add to Lightbox</span>
								<span class="download">Download</span>
								<span class="share">Email</span>
							</div>
						</div>
		    		</div>
		    		
		    		<?php
		    	}
		    } ?>
	

</div><!-- #front -->

<div id="switcher">
	<a id="btnRows" href="#"><span class="grid active">Grid</span><span class="rows">Rows</span></a>
</div>

<div id="emailBox">
	<a href="#" id="emailClose">Close</a>
	<?php include (TEMPLATEPATH . '/snippets/email.php'); ?>
</div>


<?php get_footer(); ?>
<?php get_footer(); ?>