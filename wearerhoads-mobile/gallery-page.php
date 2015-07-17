<?php
/*
Template Name: Gallery Page
*/
?>
<?php get_header(); ?>
<?php the_post(); ?>

<div id="front" class="grid index wrapper container">
<!--	<h1 class="title item one-third column"><span><?php the_title(); ?></span></h1>-->
	<?php if($post->post_content=="") : ?>
	
	<!-- Do stuff with empty posts (or leave blank to skip empty posts) -->
	
	<?php else : ?>
	
	  <div class="item description one-third column">
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
		    	     $largeSrcArr = wp_get_attachment_image_src($attachment->ID, 'large');		    	 
                     ?>
		    		
		    		<div class="item one-third column">
		    		
		    				<span class="thumb">
		    					<img class="small clickToLarge" src="<?php echo $largeSrcArr[0]; ?>" />
		    				</span>
		    				
		    				<div class="meta">
		    					<a href="#" class="add">Add to Lightbox</a>
		    					<a target="blank" href="<?php echo $largeSrcArr[0]; ?>" class="download">Download</a>
		    					<a href="#" class="share">Email</a>
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
	<a id="btnRows" href="#"><span class="grid active">Grid</span><span id="toggle-layout" class="rows">Rows</span></a>
</div>

<div id="emailBox">
	<a href="#" id="emailClose">Close</a>
	<?php include (TEMPLATEPATH . '/snippets/email.php'); ?>
</div>

<?php get_footer(); ?>