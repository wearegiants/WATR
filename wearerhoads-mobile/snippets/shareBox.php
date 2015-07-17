<div>
	<div class="section">
		<div class="permalink">
		<h3>Permalink</h3>
		<form>
		<div class="emailbtn"><?php if(function_exists('wp_email')) { email_link(); } ?></div>
			<input type="text" value="<?php echo current_page_url(); ?>">
		</form>
		</div>
		<div class="main">
			<h3>Email</h3>
			<div class="name">
				<label>Your Name</label>
				<input type="text"></input>
			</div>
			<div class="email">
				<label>Your Email</label>
				<input type="text"></input>
			</div>
			<div class="email">
				<label>Recipient Name</label>
				<input type="text"></input>
			</div>
			<div class="email">
				<label>Recipient Email</label>
				<input type="text"></input>
			</div>
			<div class="message">
				<label>Your Message</label>
				<textarea type="text"></textarea>
			</div>
		</div><!-- Main -->
		<div class="share">
			<h3>Social</h3>
			<a rel="nofollow" href="http://www.facebook.com/share.php?u=<;url>" onclick="return fbs_click()" target="_blank" class=" facebookfb_share_link"><span><img src="<?php bloginfo('stylesheet_directory'); ?>/images/1354633005_facebook.png"></span>Facebook</a>
			<a href="#" class="twitter"><span><img src="<?php bloginfo('stylesheet_directory'); ?>/images/1354633012_twitter.png"></span>Twitter</a>
		</div>
	</div>
</div>

<script>function fbs_click() {u=location.href;t=document.title;window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;}</script><style> html .fb_share_link { padding:2px 0 0 20px; height:16px; background:url(http://static.ak.facebook.com/images/share/facebook_share_icon.gif?6:26981) no-repeat top left; }</style>