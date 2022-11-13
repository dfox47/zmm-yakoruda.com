<?php // Remove p tags from simple content
remove_filter( 'the_content', 'wpautop' );

// allow menus
add_theme_support( 'menus' );

// allow thumbnails
add_theme_support( 'post-thumbnails' );



function specialWidgets() {
	register_sidebar( array(
		'after_widget'      => '',
		'before_widget'     => '',
		'class'             => '',
		'name'              => __('Search widget'),
		'id'                => 'search-widget',
	) );
}



// Change tabs names at product page [START]
add_filter( 'woocommerce_product_tabs', 'woocust_rename_tabs', 98 );

function woocust_rename_tabs( $tabs ) {
	$tabs['additional_information']['title'] = 'Технически данни';
	$tabs['description']['title']            = 'Описание';
//	$tabs['reviews']['title']                = 'Другие Отзывы';

	return $tabs;
}
// Change tabs names at product page [END]



function woo_video_product_tab_content() {
	// The new tab content
	global $product;

	echo '<div class="product_single__video"><iframe width="560" height="315" src="https://www.youtube.com/embed/' . $product->get_attribute( 'video' ) . '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
}



// Short title at news pages | archive
add_filter( 'get_the_archive_title', function ( $title ) {
	if ( is_category() ) {
		$title = single_cat_title( '', false );
	}

	return $title;
});


// Woocommerce
// Hide "read more" & "buy it" buttons at category page
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart');
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart');



// Hide prices [START]
add_filter( 'woocommerce_get_price_html', 'QuadLayers_remove_price');

function QuadLayers_remove_price($price) {
	return ;
}
// Hide prices [END]

  add_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_single_excerpt', 10 );
 

  add_action( 'woocommerce_after_shop_loop_item_title', 'more', 9 );
  function more() {
	  echo '<button class="btn btn_main mb20">Повече</button>';
   }
