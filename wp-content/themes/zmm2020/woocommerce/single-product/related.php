<?php if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $related_products ) : ?>
	<section class="related products">
		<h2>Подобни продукти</h2>

		<?php woocommerce_product_loop_start(); ?>

		<?php foreach ( $related_products as $related_product ) : ?>
			<?php $post_object = get_post( $related_product->get_id() );

			setup_postdata( $GLOBALS['post'] =& $post_object ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited, Squiz.PHP.DisallowMultipleAssignments.Found

			wc_get_template_part( 'content', 'product' ); ?>

		<?php endforeach; ?>

		<?php woocommerce_product_loop_end(); ?>
	</section>
<?php
endif;

wp_reset_postdata();
