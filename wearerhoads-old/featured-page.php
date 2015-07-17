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
<div id="front" class="grid index isotope wrapper">
<img id="loading" src="<?php bloginfo('stylesheet_directory'); ?>/images/loading.gif" />
<?php
$query_images = new WP_Query( $query_images_args );
$images = array();
foreach ( $query_images->posts as $attachment) {
    $meta = get_post_meta($attachment->ID);
    if(isset($meta['_isFeatured']) && $meta['_isFeatured'][0] == 1) {
        //$images[]= wp_get_attachment_url( $image->ID );
        $medSrcArr = wp_get_attachment_image_src($attachment->ID, 'medium');
        // Does this attachment belong to a parent
        $parent = false;
        if($attachment->post_parent > 0) {
            $parent = get_post($attachment->post_parent);
        }
        // do parents exist?
        ?>
        <div class="item">
			<span class="thumb">
                <?php
                if(false !== $parent) {
                    ?>
                        <a href='<?php echo get_permalink($parent); ?>?redirFrom=<?php echo $attachment->ID; ?>'><img class="small" src="<?php echo $medSrcArr[0]; ?>" /></a>
                    <?php
                } else { 
                    ?>
				<img class="small clickToLarge" src="<?php echo $medSrcArr[0]; ?>" />
                <?php } ?>
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
</div>

<div id="switcher">
	<a id="btnRows" href="#"><span class="grid active">Grid</span><span id="toggle-layout" class="rows">Rows</span></a>
</div>

<div id="emailBox">
	<a href="#" id="emailClose">Close</a>
	<?php include (TEMPLATEPATH . '/snippets/email.php'); ?>
</div>

<?php get_footer(); ?>

