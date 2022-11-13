


<?php get_header(); ?>



<div class="wrap2">
	<div class="content_wrap">
		<?php // title
		the_archive_title( '<h1>', '</h1>' ); ?>

		<?php // Display optional category description
		if ( category_description() ) : ?>
			<div class="archive_meta"><?php echo category_description(); ?></div>
		<?php endif; ?>

		<?php // The Loop
		while ( have_posts() ) : the_post(); ?>
			<div class="archive_post">
				<?php // thumbnail
				if (has_post_thumbnail()) { ?>
					<div class="post_img">
						<?php the_post_thumbnail(); ?>
					</div>
				<?php } ?>

				<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>

				<p class="post_meta"><?php the_time('F jS, Y') ?></p>

				<div class="archive_content_short">
					<?php echo wp_trim_words( get_the_content(), 15 ); ?>
				</div>
			</div>
		<?php endwhile; ?>
	</div>
</div>



<?php get_footer(); ?>


