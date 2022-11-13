<?php if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $upsells ) : ?>
	<section class="up-sells upsells products">
		<h2>Може да харесате още…</h2>

		<?php woocommerce_product_loop_start(); ?>
			<?php foreach ( $upsells as $upsell ) : ?>
				<?php $post_object = get_post( $upsell->get_id() );

				setup_postdata( $GLOBALS['post'] =& $post_object ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited, Squiz.PHP.DisallowMultipleAssignments.Found

				wc_get_template_part( 'content', 'product' ); ?>
			<?php endforeach; ?>
		<?php woocommerce_product_loop_end(); ?>
	</section>

	<?php
endif;

wp_reset_postdata();
