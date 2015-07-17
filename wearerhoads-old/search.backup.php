<?php get_header(); ?>
<h1 class="title"><span><?php printf( __( 'Search Results for: %s', 'twentyeleven' ), '' . get_search_query() . '' ); ?></span></h1>

<div id="front" class=" wrapper">
				<?php
		 		$args = array( 'post_type' => 'event', 'posts_per_page' => 100 );
				$loop = new WP_Query( $args );
				while ( $loop->have_posts() ) : $loop->the_post();
				?>
				<div <?php post_class('post item clear'); ?> id="post_<?php the_ID(); ?>">
	
		            <div class="post-category"><?php the_category(' / '); ?></div>
		            <h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
	
		            <div class="post-meta"><span
		                        class="post-date"><?php the_time(__('M j, Y')) ?></span> 
		            </div>
	
		            <div class="post-content">
		                <?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'twentyten' ) ); ?>
						<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'twentyten' ), 'after' => '</div>' ) ); ?>
		            </div>
		        </div>
		    <?PHP endwhile; ?>
	
</div>

<?php get_footer(); ?>