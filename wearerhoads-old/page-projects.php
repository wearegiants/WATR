<?php /* Template Name: Project Index */ ?>

<?php get_header(); ?>
<?php the_post(); ?>

<div id="video" class="video projects rows index wrapper">
<?php $paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1; // setup pagination

$the_query = new WP_Query( array( 
'post_type'      => 'page',
'paged'          => $paged,
'orderby'        => 'menu_order',
'post_parent'    => $post->ID,
'posts_per_page' => 20) 
); ?>

<?php while ( $the_query->have_posts() ) : $the_query->the_post(); $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'large'); ?>
<figure class="item">
  <a href="<?php the_permalink();?>">
    <span class="thumb"><img src="<?php echo $image[0]; ?>" alt="<?php the_title(); ?>" /></span>
    <h3><?php the_title();?></h3>
  </a>
</figure>
<?php endwhile; wp_reset_postdata(); // Rest Data ?>

</div>

<?php get_footer(); ?>
