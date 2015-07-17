<?php
/*
Template Name: Featured Page
*/
?>
<?php get_header(); ?>

<?php
// Get all the gallery images
$query_images_args = array(
    'post_type' => 'attachment', 'post_mime_type' =>'image', 'post_status' => 'inherit', 'posts_per_page' => -1,
);
?>
<div id="front" class="grid index isotope container">
<?php
$query_images = new WP_Query( $query_images_args );
$images = array();
foreach ( $query_images->posts as $attachment) {
    $meta = get_post_meta($attachment->ID);
    if(isset($meta['_isFeatured']) && $meta['_isFeatured'][0] == 1) {
        $images[]= wp_get_attachment_url( $image->ID );
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
}

?>
</div>

<div id="switcher">
	<a id="btnRows" href="#"><span class="grid active">Grid</span><span id="toggle-layout" class="rows">Rows</span></a>
</div>

<div id="emailBox">
	<a href="#" id="emailClose">Close</a>
	<?php include (TEMPLATEPATH . '/snippets/email.php'); ?>
</div>

<?php get_footer(); ?>

