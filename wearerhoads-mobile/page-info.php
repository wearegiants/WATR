<?php /* Template Name: Info */ ?>

<?php get_header(); ?>

<div id="info-page" class="main-content mobile">

  <div class="contact">
    <div class="column twenty"><?php the_field('contact_name');?></div>
    <div class="column forty"><?php the_field('contact_email');?></div>
    <div class="column twenty"><?php the_field('contact_phone');?></div>
    <div class="column twenty text-right social"><?php the_field('contact_social');?></div>
  </div>

  <div class="main text-left"><?php the_content(); ?></div>
  
  <div class="representation text-left">
    <h4><span>Representation</span></h4>
    <?php while ( have_rows('info_bottom_columns') ) : the_row(); ?>
    <div class="column">
      <?php the_sub_field('column'); ?>
    </div>
    <?php endwhile; ?>
  </div>

</div>

<?php get_footer(); ?>
