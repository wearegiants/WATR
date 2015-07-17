<?php
/*
Template Name: Lightbox Page
*/
?>
<?php get_header(); ?>

<div id="lightbox">

<script type="text/javascript">
$(function() {
    $(".image-container span").click(function() {
        
        var $img = $(this).parent().find('img')
        var src = $img.attr('src');
        var conf = confirm('Are you sure you wish to delete this image from your lightbox?');
        if(conf === true) {
            var cookie = $.cookie('lightbox');
            var items = cookie ? cookie.split(/,/) : new Array();
            var index = items.indexOf(src);
            var $el = $(this);
            if(index !== -1) {
                items.splice(index, 1);
                $.cookie('lightbox', items.join(','));
                $(this).parent().remove();
            }
        }
        $('#lightbox').isotope('reLayout');
	});
});
</script>
<!--<style>
    #image-container {
        width: 100%;
    }
    
    #image-container img{
        width: 100%;
        height: auto;
    }
    #image-container span{
        cursor: pointer;
    }
</style>-->
<?php
$items = isset($_COOKIE['lightbox']) ? explode(',',$_COOKIE['lightbox']) : array();

if(count($items) == 0 || (count($items) == 1 && strlen($items[0]) === 0)) {
    echo "<div class='not-found'><h2><span>Your Lightbox is currently empty.</span></h2><p>Go back to the galleries and find images to add.</p></div>";
} else {
    ?>
    
    <h1><a href="/pdf.php">Download PDF</a></h1>
    <?php
    foreach($items as $item) {
        echo "<div class='image-container item'><img class='lightbox-item' src='$item' /><span>Delete</span></div>";
    }
    
    ?>
    <?php
}
?>

</div>

<?php get_footer(); ?>

