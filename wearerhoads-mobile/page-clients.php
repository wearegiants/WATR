<?php /* Template Name: Clients */ ?>

<?php get_header(); ?>

<div id="clients-main" class="main-content">

  <?php while ( have_rows('clients') ) : the_row(); ?>
  <div class="column twenty">
    <h4 class="title"><?php the_sub_field('column_title'); ?></h4>
    <?php the_sub_field('column'); ?>
  </div>
  <?php endwhile; ?>

</div>

<?php get_footer(); ?>
