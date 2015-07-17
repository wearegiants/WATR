<div class="wrapper">
<div class="header">
	<h3>Share this Project:</h3>
</div>
<div class="container">
	<div class="section">
		<div class="permalink">
		<label>Permalink</label>
		<form>
			<input class="TextField" type="text" value="<?php echo current_page_url(); ?>">
		</form>
		</div>
		<div class="main">
			<?php email_form(true); ?>
		</div><!-- Main -->
		<div class="share">
			<h3>Social</h3>
			<a rel="nofollow" href="http://www.facebook.com/share.php?u=<?php echo current_page_url(); ?>" onclick="return fbs_click()" target="_blank" class=" facebookfb_share_link facebook"><span></span>Facebook</a>
			<a href="#" class="twitter" target="blank"><span></span>Twitter</a>
		</div>
	</div>
</div>
</div>
<div id="overlay"></div>

<script>function fbs_click() {u=location.href;t=document.title;window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;}</script><style> html .fb_share_link { padding:2px 0 0 20px; height:16px; background:url(http://static.ak.facebook.com/images/share/facebook_share_icon.gif?6:26981) no-repeat top left; }</style>