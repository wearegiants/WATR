<?php get_header(); ?>
<h1 class="title"><span><?php printf( __( 'Search Results for: %s', 'twentyeleven' ), '' . get_search_query() . '' ); ?></span></h1>

<?php

$query_images_args = array(
    'post_type' => 'attachment', 
    'post_mime_type' =>'image', 
    'post_status' => 'inherit', 
    'posts_per_page' => -1,
	'customexcerpt' => get_search_query()
);
$query_images = new WP_Query( $query_images_args );
$images = array();




if(count($query_images->posts) == 0 ) {
	echo '<div>No results.';
} else {
	?>
	<div id="front" class="grid index wrapper">
	<img id="loading" src="<?php bloginfo('stylesheet_directory'); ?>/images/loading.gif" />
	<?php 
	foreach ( $query_images->posts as $attachment) {
		$medSrcArr = wp_get_attachment_image_src($attachment->ID, 'medium');
		$largeSrcArr = wp_get_attachment_image_src($attachment->ID, 'large');
		?>
		    		
	 	<div class="item<?php echo $redirFrom == $attachment->ID ? ' redirTo': ''; ?>">
	    		
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
}
?>
			
		
			
		
	
	</div><!-- #front -->
	
	<div id="switcher">
		<a id="btnRows" href="#"><span class="grid active">Grid</span><span id="toggle-layout" class="rows">Rows</span></a>
	</div>
	
	<div id="emailBox">
		<a href="#" id="emailClose">Close</a>
		<?php include (TEMPLATEPATH . '/snippets/email.php'); ?>
	</div>
	
	<?php get_footer(); ?>