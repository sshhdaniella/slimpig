<?php 

	// Styles and Scripts
	function stylesAndScripts(){
		// React, React Dom, Babel Core
		wp_enqueue_style("style", get_stylesheet_uri() );
		wp_enqueue_script("jquery", get_template_directory_uri() . '/js/jquery.min.js');
		wp_enqueue_script("react", get_template_directory_uri() . '/js/react.min.js');
		wp_enqueue_script("react-dom", get_template_directory_uri() . '/js/react-dom.min.js', array('react'));
		wp_enqueue_script("babel-core", get_template_directory_uri() . '/js/babel-core.min.js');
		wp_enqueue_script("main", get_template_directory_uri() . '/js/main.js', array('react'));
	}

	add_action('wp_enqueue_scripts','stylesAndScripts');

	// Add text/babel instead of text/javascript
	function babelType($tag, $handle, $src){
		if( $handle !== 'main' ){ return $tag; }
		return '<script src="'. $src .'" type="text/babel"></script>' . "\n";
	}

	add_filter('script_loader_tag', 'babelType', 10, 3);

	//Clean up (remove version number from css/js)
	function remove_wp_version_strings($src){
		global $wp_version;
		parse_str( parse_url($src, PHP_URL_QUERY), $query );
		if(!empty($query['ver']) && $query['ver'] === $wp_version){
			$src = remove_query_arg('ver', $src);
		}
		return $src;
	}

	add_filter('script_loader_src', 'remove_wp_version_strings' );
	add_filter('style_loader_src', 'remove_wp_version_strings' );

	// remove meta tag generator from header
	function remove_meta_version(){
		return '';
	}
	add_filter('the_generator', 'remove_meta_version');

	// Get plain text response
	add_filter( 'rest_prepare_post', 'dt_use_raw_content', 10, 3);
	function dt_use_raw_content($data, $post, $request){
		$data->data['content']['plaintext'] = $post->post_content;
		return $data;
	}

?>
