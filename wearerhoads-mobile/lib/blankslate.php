<?php
add_action( 'after_setup_theme', 'gridded_setup' );
function gridded_setup()
{
load_theme_textdomain( 'gridded', get_template_directory() . '/languages' );
add_theme_support( 'automatic-feed-links' );
add_theme_support( 'post-thumbnails' );
global $content_width;
if ( ! isset( $content_width ) ) $content_width = 640;
register_nav_menus(
array( 'main-menu' => __( 'Main Menu', 'gridded' ) )
);
register_nav_menus(
array( 'socl-menu' => __( 'Social Menu', 'gridded' ) )
);
}
add_action( 'wp_enqueue_scripts', 'gridded_load_scripts' );
function gridded_load_scripts()
{
wp_enqueue_script( 'jquery' );
}
add_action( 'comment_form_before', 'gridded_enqueue_comment_reply_script' );
function gridded_enqueue_comment_reply_script()
{
if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
}
add_filter( 'the_title', 'gridded_title' );
function gridded_title( $title ) {
if ( $title == '' ) {
return '&rarr;';
} else {
return $title;
}
}
add_filter( 'wp_title', 'gridded_filter_wp_title' );
function gridded_filter_wp_title( $title )
{
return $title . esc_attr( get_bloginfo( 'name' ) );
}
add_action( 'widgets_init', 'gridded_widgets_init' );
function gridded_widgets_init()
{
register_sidebar( array (
'name' => __( 'Blog Widget Area', 'gridded' ),
'id' => 'primary-widget-area',
'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
'after_widget' => "</li>",
'before_title' => '<h3 class="widget-title">',
'after_title' => '</h3>',
) );

register_sidebar( array (
'name' => __( 'Event Widget Area', 'gridded' ),
'id' => 'event-widget-area',
'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
'after_widget' => "</li>",
'before_title' => '<h3 class="widget-title">',
'after_title' => '</h3>',
) );

register_sidebar( array (
'name' => __( 'General Widget', 'gridded' ),
'id' => 'general-widget-area',
'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
'after_widget' => "</li>",
'before_title' => '<h3 class="widget-title">',
'after_title' => '</h3>',
) );

}
function gridded_custom_pings( $comment )
{
$GLOBALS['comment'] = $comment;
?>
<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
<?php 
}
add_filter( 'get_comments_number', 'gridded_comments_number' );
function gridded_comments_number( $count )
{
if ( !is_admin() ) {
global $id;
$comments_by_type = &separate_comments( get_comments( 'status=approve&post_id=' . $id ) );
return count( $comments_by_type['comment'] );
} else {
return $count;
}
}



function removeRecentComments() {  
global $wp_widget_factory;  
remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );  
}  
add_action( 'widgets_init', 'removeRecentComments' );

// Image Sizes

add_image_size( 'large-cropped', 993, 780, true );
add_image_size( 'homepage-thumb', 400, 400, true );
add_image_size( 'header-bg', 1280, 600, array('center', 'top'), true );
add_image_size( 'footer-module-image', 600, 335, true );
add_image_size( 'event-bio', 700, 375, true );
add_image_size( 'whatwefund', 700, 550, true );
add_image_size( 'archive-small', 700, 450, true );
add_image_size( 'whatwefund-twothirds', 1200, 455, true );
add_image_size( 'event-gallery-full', 1200, 1200, false );

add_action('after_setup_theme', 'remove_admin_bar');

function remove_admin_bar() {
if (!is_admin()) {
  show_admin_bar(true);
}
}

// Remove Admin Bar
//add_filter('show_admin_bar', '__return_false');

// Adding some Page Support
add_action('init', 'page_support');
function page_support() {
    add_post_type_support( 'page', 'excerpt' );
}



// Check if page is direct child
function is_child($page_id) { 
    global $post; 
    if( is_page() && ($post->post_parent == $page_id) ) {
       return true;
    } else { 
       return false; 
    }
}

// Check if page is an ancestor
function is_ancestor($post_id) {
    global $wp_query;
    $ancestors = $wp_query->post->ancestors;
    if ( in_array($post_id, $ancestors) ) {
        return true;
    } else {
        return false;
    }
}

function excerpt($limit) {
    return wp_trim_words(get_the_excerpt(), $limit);
}


add_action( 'wp_dashboard_setup', function()
{
    remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_primary', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_browser_nag', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
} );

