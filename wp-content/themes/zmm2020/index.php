


<?php get_header(); ?>



<div class="wrap2">
	<div class="content_wrap">
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post();
			the_content();
		endwhile; endif; ?>
	</div>
</div>



<?php get_footer(); ?>


