<?php $images = get_field('home_gallery'); if( $images ): ?>
<?php foreach( $images as $image ): ?>


<div class="item">
<span class="thumb">
<img class="small clickToLarge" src="<?php echo $image['sizes']['medium']; ?>" />
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

<?php endforeach; ?>
<?php endif; ?>