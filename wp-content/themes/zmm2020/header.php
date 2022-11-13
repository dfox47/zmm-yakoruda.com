<?php
$themeDir       = '/wp-content/themes/zmm2020';
$i              = $themeDir . '/images';
$iconsDir       = $i . '/icons';
$faviconDir     = $iconsDir . '/favicon';
?>



<!DOCTYPE html>

<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />

	<title><?php the_title(); ?> | ZMM Maschines</title>

	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<?php wp_head(); ?>



	<link rel="apple-touch-icon" sizes="36x36" href="<?php echo $faviconDir; ?>/apple-icon-36x36.png" />
	<link rel="apple-touch-icon" sizes="48x48" href="<?php echo $faviconDir; ?>/apple-icon-48x48.png" />
	<link rel="apple-touch-icon" sizes="57x57" href="<?php echo $faviconDir; ?>/apple-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="<?php echo $faviconDir; ?>/apple-icon-60x60.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo $faviconDir; ?>/apple-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="<?php echo $faviconDir; ?>/apple-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="96x96" href="<?php echo $faviconDir; ?>/apple-icon-96x96.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo $faviconDir; ?>/apple-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="<?php echo $faviconDir; ?>/apple-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="<?php echo $faviconDir; ?>/apple-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="<?php echo $faviconDir; ?>/apple-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo $faviconDir; ?>/apple-icon-180x180.png" />

	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo $faviconDir; ?>/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo $faviconDir; ?>/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="<?php echo $faviconDir; ?>/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="<?php echo $faviconDir; ?>/android-icon-192x192.png" />

	<meta name="msapplication-TileColor" content="#ffffff" />
	<meta name="msapplication-TileImage" content="<?php echo $faviconDir; ?>/ms-icon-144x144.png" />
	<meta name="theme-color" content="#ffffff" />



	<link rel="stylesheet" href="<?php echo $themeDir; ?>/styles.min.css?v<?php echo(date("YmdHis")); ?>" />

	<script src="<?php echo $themeDir; ?>/js/phone.js"></script>
	<script src="<?php echo $themeDir; ?>/js/owl.carousel.min.js"></script>
	<script src="<?php echo $themeDir; ?>/js/main.js?v<?php echo(date("YmdHis")); ?>"></script>
</head>



<body <?php body_class(); ?>>
<div class="header">
	<div class="header_wrap">
		<div class="header_left">
			<div class="header_mobile_menu__toggle js-toggle-mobile-menu">
				<span></span>
				<span></span>
				<span></span>
			</div>

			<div class="logo_wrap">
				<a class="logo" href="/"></a>

				<div class="logo_partner">
					<img class="logo_partner__img" src="<?php echo $iconsDir; ?>/sicar.svg" alt="" />
					<p class="logo_partner__status">Official partner</p>
				</div>
			</div>
		</div>

		<?php wp_nav_menu( [
			'after'             => '',
			'before'            => '<span class="header_menu_arrow js-show-submenu hidden"><span></span></span>',
			'container'         => '',
			'container_class'   => '',
			'container_id'      => '',
			'depth'             => 2,
			'items_wrap'        => '<ul class="%2$s">%3$s</ul>',
			'link_after'        => '',
			'link_before'       => '',
			'menu'              => 'topmenu2',
			'menu_class'        => 'header_menu',
			'menu_id'           => '',
			'walker'            => '',
		] ); ?>

		<div class="header_right">
			<span class="header_phone"><a class="js-phone" href="tel:+359884555900">+359 884 555 900</a> | <a href="//chat/?number=%2B359884555900" target="_blank">Viber</a> | <a href="//wa.me/359884555900" target="_blank">Whatsapp</a></span>

			<div class="header_social">
				<a class="header_social__icon_youtube" href="//www.youtube.com/channel/UC-L6MDqnzU9W5aVdM86b_SA" target="_blank"></a>
				<a class="header_social__icon_facebook" href="//www.facebook.com/%D0%97%D0%9C%D0%9C-%D0%AF%D0%BA%D0%BE%D1%80%D1%83%D0%B4%D0%B0-%D0%94%D1%8A%D1%80%D0%B2%D0%BE%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B2%D0%B0%D1%89%D0%B8-%D0%9C%D0%B5%D1%82%D0%B0%D0%BB%D0%BE%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B2%D0%B0%D1%89%D0%B8-%D0%9C%D0%B0%D1%88%D0%B8%D0%BD%D0%B8-1475447752474135/" target="_blank"></a>
				<a class="header_social__icon_instagram" href="//www.instagram.com/zmm_yakoruda/" target="_blank"></a>
			</div>

			<a class="header_search_icon" href="javascript:void(0);"></a>
		</div>
	</div>
</div>

<?php // Breadcrumbs
if ( !is_front_page() ) {
	if (function_exists('bcn_display')) { ?>
		<div class="wrap2">
			<div class="woocommerce-breadcrumb">
				<?php bcn_display(); ?>
			</div>
		</div>
	<?php }
} ?>

<div class="search_wrap">
	<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('search-widget') ) : endif; ?>
</div>

<?php if ( is_front_page() ) { ?>
	<?php // Home slider
	include_once('template-parts/homeSlider.php'); ?>

	<?php // Product links
	include_once('template-parts/productsLinks.php'); ?>

	<?php // About us
	include_once('template-parts/aboutUs.php'); ?>

	<?php // Advantages
	include_once('template-parts/advantages.php'); ?>

	<?php // Offers
	include_once('template-parts/homeOffers.php'); ?>
<?php } ?>


