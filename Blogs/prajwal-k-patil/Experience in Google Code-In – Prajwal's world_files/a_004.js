/* Detect-zoom
 * -----------
 * Cross Browser Zoom and Pixel Ratio Detector
 * Version 1.0.4 | Apr 1 2013
 * dual-licensed under the WTFPL and MIT license
 * Maintained by https://github/tombigel
 * Original developer https://github.com/yonran
 */

//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function (root, ns, factory) {
    "use strict";

    if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(ns, root);
    } else if (typeof (define) === 'function' && define.amd) { // AMD
        define("factory", function () {
            return factory(ns, root);
        });
    } else {
        root[ns] = factory(ns, root);
    }

}(window, 'detectZoom', function () {

    /**
     * Use devicePixelRatio if supported by the browser
     * @return {Number}
     * @private
     */
    var devicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };

    /**
     * Fallback function to set default values
     * @return {Object}
     * @private
     */
    var fallback = function () {
        return {
            zoom: 1,
            devicePxPerCssPx: 1
        };
    };
    /**
     * IE 8 and 9: no trick needed!
     * TODO: Test on IE10 and Windows 8 RT
     * @return {Object}
     * @private
     **/
    var ie8 = function () {
        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * For IE10 we need to change our technique again...
     * thanks https://github.com/stefanvanburen
     * @return {Object}
     * @private
     */
    var ie10 = function () {
        var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Mobile WebKit
     * the trick: window.innerWIdth is in CSS pixels, while
     * screen.width and screen.height are in system pixels.
     * And there are no scrollbars to mess up the measurement.
     * @return {Object}
     * @private
     */
    var webkitMobile = function () {
        var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
        var zoom = deviceWidth / window.innerWidth;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Desktop Webkit
     * the trick: an element's clientHeight is in CSS pixels, while you can
     * set its line-height in system pixels using font-size and
     * -webkit-text-size-adjust:none.
     * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
     *
     * Previous trick (used before http://trac.webkit.org/changeset/100847):
     * documentElement.scrollWidth is in CSS pixels, while
     * document.width was in system pixels. Note that this is the
     * layout width of the document, which is slightly different from viewport
     * because document width does not include scrollbars and might be wider
     * due to big elements.
     * @return {Object}
     * @private
     */
    var webkit = function () {
        var important = function (str) {
            return str.replace(/;/g, " !important;");
        };

        var div = document.createElement('div');
        div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
        div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));

        // The container exists so that the div will be laid out in its own flow
        // while not impacting the layout, viewport size, or display of the
        // webpage as a whole.
        // Add !important and relevant CSS rule resets
        // so that other rules cannot affect the results.
        var container = document.createElement('div');
        container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
        container.appendChild(div);

        document.body.appendChild(container);
        var zoom = 1000 / div.clientHeight;
        zoom = Math.round(zoom * 100) / 100;
        document.body.removeChild(container);

        return{
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
     * (Note that this is a different interpretation than Webkit's device
     * pixel ratio, which is the ratio device dpi / system dpi).
     *
     * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
     *
     * @return {Object}
     * @private
     */
    var firefox4 = function () {
        var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom
        };
    };

    /**
     * Firefox 18.x
     * Mozilla added support for devicePixelRatio to Firefox 18,
     * but it is affected by the zoom level, so, like in older
     * Firefox we can't tell if we are in zoom mode or in a device
     * with a different pixel ratio
     * @return {Object}
     * @private
     */
    var firefox18 = function () {
        return {
            zoom: firefox4().zoom,
            devicePxPerCssPx: devicePixelRatio()
        };
    };

    /**
     * works starting Opera 11.11
     * the trick: outerWidth is the viewport width including scrollbars in
     * system px, while innerWidth is the viewport width including scrollbars
     * in CSS px
     * @return {Object}
     * @private
     */
    var opera11 = function () {
        var zoom = window.top.outerWidth / window.top.innerWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Use a binary search through media queries to find zoom level in Firefox
     * @param property
     * @param unit
     * @param a
     * @param b
     * @param maxIter
     * @param epsilon
     * @return {Number}
     */
    var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);

            div = document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            document.body.appendChild(div);

            matchMedia = function (query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {matches: matched};
            };
        }
        var ratio = binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
            document.body.removeChild(div);
        }
        return ratio;

        function binarySearch(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return binarySearch(mid, b, maxIter - 1);
            } else {
                return binarySearch(a, mid, maxIter - 1);
            }
        }
    };

    /**
     * Generate detection function
     * @private
     */
    var detectFunction = (function () {
        var func = fallback;
        //IE8+
        if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
            func = ie8;
        }
        // IE10+ / Touch
        else if (window.navigator.msMaxTouchPoints) {
            func = ie10;
        }
        //Mobile Webkit
        else if ('orientation' in window && typeof document.body.style.webkitMarquee === 'string') {
            func = webkitMobile;
        }
        //WebKit
        else if (typeof document.body.style.webkitMarquee === 'string') {
            func = webkit;
        }
        //Opera
        else if (navigator.userAgent.indexOf('Opera') >= 0) {
            func = opera11;
        }
        //Last one is Firefox
        //FF 18.x
        else if (window.devicePixelRatio) {
            func = firefox18;
        }
        //FF 4.0 - 17.x
        else if (firefox4().zoom > 0.001) {
            func = firefox4;
        }

        return func;
    }());


    return ({

        /**
         * Ratios.zoom shorthand
         * @return {Number} Zoom level
         */
        zoom: function () {
            return detectFunction().zoom;
        },

        /**
         * Ratios.devicePxPerCssPx shorthand
         * @return {Number} devicePxPerCssPx level
         */
        device: function () {
            return detectFunction().devicePxPerCssPx;
        }
    });
}));

var wpcom_img_zoomer = {
	zoomed: false,
	timer: null,
	interval: 1000, // zoom polling interval in millisecond

	// Should we apply width/height attributes to control the image size?
	imgNeedsSizeAtts: function( img ) {
		// Do not overwrite existing width/height attributes.
		if ( img.getAttribute('width') !== null || img.getAttribute('height') !== null )
			return false;
		// Do not apply the attributes if the image is already constrained by a parent element.
		if ( img.width < img.naturalWidth || img.height < img.naturalHeight )
			return false;
		return true;
	},

	init: function() {
		var t = this;
		try{
			t.zoomImages();
			t.timer = setInterval( function() { t.zoomImages(); }, t.interval );
		}
		catch(e){
		}
	},

	stop: function() {
		if ( this.timer )
			clearInterval( this.timer );
	},

	getScale: function() {
		var scale = detectZoom.device();
		// Round up to 1.5 or the next integer below the cap.
		if      ( scale <= 1.0 ) scale = 1.0;
		else if ( scale <= 1.5 ) scale = 1.5;
		else if ( scale <= 2.0 ) scale = 2.0;
		else if ( scale <= 3.0 ) scale = 3.0;
		else if ( scale <= 4.0 ) scale = 4.0;
		else                     scale = 5.0;
		return scale;
	},

	shouldZoom: function( scale ) {
		var t = this;
		// Do not operate on hidden frames.
		if ( "innerWidth" in window && !window.innerWidth )
			return false;
		// Don't do anything until scale > 1
		if ( scale == 1.0 && t.zoomed == false )
			return false;
		return true;
	},

	zoomImages: function() {
		var t = this;
		var scale = t.getScale();
		if ( ! t.shouldZoom( scale ) ){
			return;
		}
		t.zoomed = true;
		// Loop through all the <img> elements on the page.
		var imgs = document.getElementsByTagName("img");

		for ( var i = 0; i < imgs.length; i++ ) {
			// Wait for original images to load
			if ( "complete" in imgs[i] && ! imgs[i].complete )
				continue;

			// For browsers that support srcset and sizes attributes,
			// skip images that have them.
			if ( imgs[i].hasAttribute('srcset') && imgs[i].hasAttribute('sizes') && ( 'sizes' in imgs[i] ) ) {
				continue;
			}

			// Skip images that don't need processing.
			var imgScale = imgs[i].getAttribute("scale");
			if ( imgScale == scale || imgScale == "0" )
				continue;

			// Skip images that have already failed at this scale
			var scaleFail = imgs[i].getAttribute("scale-fail");
			if ( scaleFail && scaleFail <= scale )
				continue;

			// Skip images that have no dimensions yet.
			if ( ! ( imgs[i].width && imgs[i].height ) )
				continue;

			// Skip images from Lazy Load plugins
			if ( ! imgScale && imgs[i].getAttribute("data-lazy-src") && (imgs[i].getAttribute("data-lazy-src") !== imgs[i].getAttribute("src")))
				continue;

			if ( t.scaleImage( imgs[i], scale ) ) {
				// Mark the img as having been processed at this scale.
				imgs[i].setAttribute("scale", scale);
			}
			else {
				// Set the flag to skip this image.
				imgs[i].setAttribute("scale", "0");
			}
		}
	},

	scaleImage: function( img, scale ) {
		var t = this;
		var newSrc = img.src;

		// Skip slideshow images
		if ( img.parentNode.className.match(/slideshow-slide/) )
			return false;

		// Scale gravatars that have ?s= or ?size=
		if ( img.src.match( /^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/ ) ) {
			newSrc = img.src.replace( /([?&](s|size)=)(\d+)/, function( $0, $1, $2, $3 ) {
				// Stash the original size
				var originalAtt = "originals",
				originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $3;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(img.clientWidth * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go larger than the service supports
				targetSize = Math.min( targetSize, 512 );
				return $1 + targetSize;
			});
		}

		// Scale resize queries (*.files.wordpress.com) that have ?w= or ?h=
		else if ( img.src.match( /^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/ ) ) {
			if ( img.src.match( /[?&]crop/ ) )
				return false;
			var changedAttrs = {};
			var matches = img.src.match( /([?&]([wh])=)(\d+)/g );
			for ( var i = 0; i < matches.length; i++ ) {
				var lr = matches[i].split( '=' );
				var thisAttr = lr[0].replace(/[?&]/g, '' );
				var thisVal = lr[1];

				// Stash the original size
				var originalAtt = 'original' + thisAttr, originalSize = img.getAttribute( originalAtt );
				if ( originalSize === null ) {
					originalSize = thisVal;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = thisAttr == 'w' ? img.clientWidth : img.clientHeight;
				var naturalSize = ( thisAttr == 'w' ? img.naturalWidth : img.naturalHeight );
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= naturalSize )
					targetSize = thisVal;
				// Don't try to go bigger if the image is already smaller than was requested
				if ( naturalSize < thisVal )
					targetSize = thisVal;
				if ( targetSize != thisVal )
					changedAttrs[ thisAttr ] = targetSize;
			}
			var w = changedAttrs.w || false;
			var h = changedAttrs.h || false;

			if ( w ) {
				newSrc = img.src.replace(/([?&])w=\d+/g, function( $0, $1 ) {
					return $1 + 'w=' + w;
				});
			}
			if ( h ) {
				newSrc = newSrc.replace(/([?&])h=\d+/g, function( $0, $1 ) {
					return $1 + 'h=' + h;
				});
			}
		}

		// Scale mshots that have width
		else if ( img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/) ) {
			newSrc = img.src.replace( /([?&]w=)(\d+)/, function($0, $1, $2) {
				// Stash the original size
				var originalAtt = 'originalw', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalWidth )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});

			// Update height attribute to match width
			newSrc = newSrc.replace( /([?&]h=)(\d+)/, function($0, $1, $2) {
				if ( newSrc == img.src ) {
					return $0;
				}
				// Stash the original size
				var originalAtt = 'originalh', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
				}
				// Get the height of the image in CSS pixels
				var size = img.clientHeight;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalHeight )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});
		}

		// Scale simple imgpress queries (s0.wp.com) that only specify w/h/fit
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/) ) {
			var imgpressSafeFunctions = ["zoom", "url", "h", "w", "fit", "filter", "brightness", "contrast", "colorize", "smooth", "unsharpmask"];
			// Search the query string for unsupported functions.
			var qs = RegExp.$3.split('&');
			for ( var q in qs ) {
				q = qs[q].split('=')[0];
				if ( imgpressSafeFunctions.indexOf(q) == -1 ) {
					return false;
				}
			}
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale LaTeX images or Photon queries (i#.wp.com)
		else if (
			img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/) ||
			img.src.match(/^https?:\/\/i[\d]{1}\.wp\.com\/(.+)/)
		) {
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 ) {
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			} else {
				newSrc = img.src;

				var url_var = newSrc.match( /\?w=(\d+)/ );
				if ( url_var !== null && url_var[1] ) {
					newSrc = newSrc.replace( new RegExp( 'w=' + url_var[1] ), 'w=' + img.width );
				}

				url_var = newSrc.match( /\?h=(\d+)/ );
				if ( url_var !== null && url_var[1] ) {
					newSrc = newSrc.replace( new RegExp( 'h=' + url_var[1] ), 'h=' + img.height );
				}

				var zoom_arg = '&zoom=2';
				if ( !newSrc.match( /\?/ ) ) {
					zoom_arg = '?zoom=2';
				}
				img.setAttribute( 'srcset', newSrc + zoom_arg + ' ' + scale + 'x' );
			}
		}

		// Scale static assets that have a name matching *-1x.png or *@1x.png
		else if ( img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/) ) {
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			var currentSize = RegExp.$1, newSize = currentSize;
			if ( scale <= 1 )
				newSize = 1;
			else
				newSize = 2;
			if ( currentSize != newSize )
				newSrc = img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/, '$1'+newSize+'x.$2$3');
		}

		else {
			return false;
		}

		// Don't set img.src unless it has changed. This avoids unnecessary reloads.
		if ( newSrc != img.src ) {
			// Store the original img.src
			var prevSrc, origSrc = img.getAttribute("src-orig");
			if ( !origSrc ) {
				origSrc = img.src;
				img.setAttribute("src-orig", origSrc);
			}
			// In case of error, revert img.src
			prevSrc = img.src;
			img.onerror = function(){
				img.src = prevSrc;
				if ( img.getAttribute("scale-fail") < scale )
					img.setAttribute("scale-fail", scale);
				img.onerror = null;
			};
			// Finally load the new image
			img.src = newSrc;
		}

		return true;
	}
};

wpcom_img_zoomer.init();
;
/* global pm, wpcom_reblog */

var jetpackLikesWidgetQueue = [];
var jetpackLikesWidgetBatch = [];
var jetpackLikesMasterReady = false;

function JetpackLikespostMessage( message, target ) {
	if ( 'string' === typeof message ){
		try {
			message = JSON.parse( message );
		} catch(e) {
			return;
		}
	}

	pm( {
		target: target,
		type: 'likesMessage',
		data: message,
		origin: '*'
	} );
}

function JetpackLikesBatchHandler() {
	var requests = [];
	jQuery( 'div.jetpack-likes-widget-unloaded' ).each( function() {
		if ( jetpackLikesWidgetBatch.indexOf( this.id ) > -1 ) {
			return;
		}
		jetpackLikesWidgetBatch.push( this.id );
		var regex = /like-(post|comment)-wrapper-(\d+)-(\d+)-(\w+)/,
			match = regex.exec( this.id ),
			info;

		if ( ! match || match.length !== 5 ) {
			return;
		}

		info = {
			blog_id: match[2],
			width:   this.width
		};

		if ( 'post' === match[1] ) {
			info.post_id = match[3];
		} else if ( 'comment' === match[1] ) {
			info.comment_id = match[3];
		}

		info.obj_id = match[4];

		requests.push( info );
	});

	if ( requests.length > 0 ) {
		JetpackLikespostMessage( { event: 'initialBatch', requests: requests }, window.frames['likes-master'] );
	}
}

function JetpackLikesMessageListener( event, message ) {
	var allowedOrigin, $container, $list, offset, rowLength, height, scrollbarWidth;

	if ( 'undefined' === typeof event.event ) {
		return;
	}

	// We only allow messages from one origin
	allowedOrigin = window.location.protocol + '//widgets.wp.com';
	if ( allowedOrigin !== message.origin ) {
		return;
	}

	if ( 'masterReady' === event.event ) {
		jQuery( document ).ready( function() {
			jetpackLikesMasterReady = true;

			var stylesData = {
					event: 'injectStyles'
				},
				$sdTextColor = jQuery( '.sd-text-color' ),
				$sdLinkColor = jQuery( '.sd-link-color' );

			if ( jQuery( 'iframe.admin-bar-likes-widget' ).length > 0 ) {
				JetpackLikespostMessage( { event: 'adminBarEnabled' }, window.frames[ 'likes-master' ] );

				stylesData.adminBarStyles = {
					background: jQuery( '#wpadminbar .quicklinks li#wp-admin-bar-wpl-like > a' ).css( 'background' ),
					isRtl: ( 'rtl' === jQuery( '#wpadminbar' ).css( 'direction' ) )
				};
			}

			if ( ! window.addEventListener ) {
				jQuery( '#wp-admin-bar-admin-bar-likes-widget' ).hide();
			}

			stylesData.textStyles = {
				color:          $sdTextColor.css( 'color' ),
				fontFamily:     $sdTextColor.css( 'font-family' ),
				fontSize:       $sdTextColor.css( 'font-size' ),
				direction:      $sdTextColor.css( 'direction' ),
				fontWeight:     $sdTextColor.css( 'font-weight' ),
				fontStyle:      $sdTextColor.css( 'font-style' ),
				textDecoration: $sdTextColor.css('text-decoration')
			};

			stylesData.linkStyles = {
				color:          $sdLinkColor.css('color'),
				fontFamily:     $sdLinkColor.css('font-family'),
				fontSize:       $sdLinkColor.css('font-size'),
				textDecoration: $sdLinkColor.css('text-decoration'),
				fontWeight:     $sdLinkColor.css( 'font-weight' ),
				fontStyle:      $sdLinkColor.css( 'font-style' )
			};

			JetpackLikespostMessage( stylesData, window.frames[ 'likes-master' ] );

			JetpackLikesBatchHandler();

			jQuery( document ).on( 'inview', 'div.jetpack-likes-widget-unloaded', function() {
				jetpackLikesWidgetQueue.push( this.id );
			});
		});
	}

	if ( 'showLikeWidget' === event.event ) {
		jQuery( '#' + event.id + ' .post-likes-widget-placeholder'  ).fadeOut( 'fast', function() {
			jQuery( '#' + event.id + ' .post-likes-widget' ).fadeIn( 'fast', function() {
				JetpackLikespostMessage( { event: 'likeWidgetDisplayed', blog_id: event.blog_id, post_id: event.post_id, obj_id: event.obj_id }, window.frames['likes-master'] );
			});
		});
	}

	if ( 'clickReblogFlair' === event.event ) {
		wpcom_reblog.toggle_reblog_box_flair( event.obj_id );
	}

	if ( 'showOtherGravatars' === event.event ) {
		$container = jQuery( '#likes-other-gravatars' );
		$list = $container.find( 'ul' );

		$container.hide();
		$list.html( '' );

		$container.find( '.likes-text span' ).text( event.total );

		jQuery.each( event.likers, function( i, liker ) {
			var element = jQuery( '<li><a><img /></a></li>' );
			element.addClass( liker.css_class );

			element.find( 'a' ).
				attr({
					href: liker.profile_URL,
					rel: 'nofollow',
					target: '_parent'
				}).
				addClass( 'wpl-liker' );

			element.find( 'img' ).
				attr({
					src: liker.avatar_URL,
					alt: liker.name
				}).
				css({
					width: '30px',
					height: '30px',
					paddingRight: '3px'
				});

			$list.append( element );
		} );

		offset = jQuery( '[name=\'' + event.parent + '\']' ).offset();

		$container.css( 'left', offset.left + event.position.left - 10 + 'px' );
		$container.css( 'top', offset.top + event.position.top - 33 + 'px' );

		rowLength = Math.floor( event.width / 37 );
		height = ( Math.ceil( event.likers.length / rowLength ) * 37 ) + 13;
		if ( height > 204 ) {
			height = 204;
		}

		$container.css( 'height', height + 'px' );
		$container.css( 'width', rowLength * 37 - 7 + 'px' );

		$list.css( 'width', rowLength * 37 + 'px' );

		$container.fadeIn( 'slow' );

		scrollbarWidth = $list[0].offsetWidth - $list[0].clientWidth;
		if ( scrollbarWidth > 0 ) {
			$container.width( $container.width() + scrollbarWidth );
			$list.width( $list.width() + scrollbarWidth );
		}
	}
}

pm.bind( 'likesMessage', JetpackLikesMessageListener );

jQuery( document ).click( function( e ) {
	var $container = jQuery( '#likes-other-gravatars' );

	if ( $container.has( e.target ).length === 0 ) {
		$container.fadeOut( 'slow' );
	}
});

function JetpackLikesWidgetQueueHandler() {
	var $wrapper, wrapperID, found;
	if ( ! jetpackLikesMasterReady ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	if ( jetpackLikesWidgetQueue.length > 0 ) {
		// We may have a widget that needs creating now
		found = false;
		while( jetpackLikesWidgetQueue.length > 0 ) {
			// Grab the first member of the queue that isn't already loading.
			wrapperID = jetpackLikesWidgetQueue.splice( 0, 1 )[0];
			if ( jQuery( '#' + wrapperID ).hasClass( 'jetpack-likes-widget-unloaded' ) ) {
				found = true;
				break;
			}
		}
		if ( ! found ) {
			setTimeout( JetpackLikesWidgetQueueHandler, 500 );
			return;
		}
	} else if ( jQuery( 'div.jetpack-likes-widget-unloaded' ).length > 0 ) {
		// Grab any unloaded widgets for a batch request
		JetpackLikesBatchHandler();

		// Get the next unloaded widget
		wrapperID = jQuery( 'div.jetpack-likes-widget-unloaded' ).first()[0].id;
		if ( ! wrapperID ) {
			// Everything is currently loaded
			setTimeout( JetpackLikesWidgetQueueHandler, 500 );
			return;
		}
	}

	if ( 'undefined' === typeof wrapperID ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	$wrapper = jQuery( '#' + wrapperID );
	$wrapper.find( 'iframe' ).remove();

	if ( $wrapper.hasClass( 'slim-likes-widget' ) ) {
		$wrapper.find( '.post-likes-widget-placeholder' ).after( '<iframe class="post-likes-widget jetpack-likes-widget" name="' + $wrapper.data( 'name' ) + '" height="22px" width="68px" frameBorder="0" scrolling="no" src="' + $wrapper.data( 'src' ) + '"></iframe>' );
	} else {
		$wrapper.find( '.post-likes-widget-placeholder' ).after( '<iframe class="post-likes-widget jetpack-likes-widget" name="' + $wrapper.data( 'name' ) + '" height="55px" width="100%" frameBorder="0" src="' + $wrapper.data( 'src' ) + '"></iframe>' );
	}

	$wrapper.removeClass( 'jetpack-likes-widget-unloaded' ).addClass( 'jetpack-likes-widget-loading' );

	$wrapper.find( 'iframe' ).load( function( e ) {
		var $iframe = jQuery( e.target );
		$wrapper.removeClass( 'jetpack-likes-widget-loading' ).addClass( 'jetpack-likes-widget-loaded' );

		JetpackLikespostMessage( { event: 'loadLikeWidget', name: $iframe.attr( 'name' ), width: $iframe.width() }, window.frames[ 'likes-master' ] );

		if ( $wrapper.hasClass( 'slim-likes-widget' ) ) {
			$wrapper.find( 'iframe' ).Jetpack( 'resizeable' );
		}
	});
	setTimeout( JetpackLikesWidgetQueueHandler, 250 );
}
JetpackLikesWidgetQueueHandler();
;
/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
*/

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution
  
  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {

    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length < 2) options.continuous = false;

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';

    container.style.visibility = 'visible';

  }

  function prev() {

    if (options.continuous) slide(index-1);
    else if (index) slide(index-1);

  }

  function next() {

    if (options.continuous) slide(index+1);
    else if (index < slides.length - 1) slide(index+1);

  }

  function circle(index) {

    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;

  }

  function slide(to, slideSpeed) {

    // do nothing if already on requested slide
    if (index == to) return;
    
    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

      // get the actual position of the slide
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width;

        // if going forward but to < index, use to = slides.length + to
        // if going backward but to > index, use to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

      // move all the slides between index and to in the right direction
      while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);
            
      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place
      
    } else {     
      
      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
      //no fallback for a circular continuous if the browser does not accept transitions
    }

    index = to;
    offloadFn(options.callback && options.callback(index, slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist;

  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) return;

    style.webkitTransitionDuration = 
    style.MozTransitionDuration = 
    style.msTransitionDuration = 
    style.OTransitionDuration = 
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform = 
    style.MozTransform = 
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

    // if not an animation, just reposition
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }
    
    var start = +new Date;
    
    var timer = setInterval(function() {

      var timeElap = +new Date - start;
      
      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }


  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;      

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup.call()); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };
      
      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {

        // prevent native scrolling 
        event.preventDefault();

        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x = 
            delta.x / 
              ( (!index && delta.x > 0               // if first slide and sliding left
                || index == slides.length - 1        // or if last slide and sliding right
                && delta.x < 0                       // and if sliding at all
              ) ?                      
              ( Math.abs(delta.x) / width + 1 )      // determine resistance level
              : 1 );                                 // no resistance if false
          
          // translate 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

      // measure duration
      var duration = +new Date - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide = 
            Number(duration) < 250               // if slide duration is less than 250ms
            && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
            || Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds = 
            !index && delta.x > 0                            // if first slide and slide amt is greater than 0
            || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

      if (options.continuous) isPastBounds = false;
      
      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index-1), -width, 0);
              move(circle(index+2), width, 0);

            } else {
              move(index-1, -width, 0);
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);  
                      
          } else {
            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          options.callback && options.callback(index, slides[index]);

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
        
        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }

    }

  }

  // trigger setup
  setup();

  // start auto slideshow if applicable
  if (delay) begin();


  // add event listeners
  if (browser.addEventListener) {
    
    // set touchstart event on element    
    if (browser.touch) element.addEventListener('touchstart', events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup() }; // to play nice with old IE

  }

  // expose the Swipe API
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {
      
      // cancel slideshow
      stop();
      
      slide(to, speed);

    },
    prev: function() {

      // cancel slideshow
      stop();

      prev();

    },
    next: function() {

      // cancel slideshow
      stop();

      next();

    },
    getPos: function() {

      // return current index position
      return index;

    },
    getNumSlides: function() {
      
      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();

      // reset element
      element.style.width = 'auto';
      element.style.left = 0;

      // reset slides
      var pos = slides.length;
      while(pos--) {

        var slide = slides[pos];
        slide.style.width = '100%';
        slide.style.left = 0;

        if (browser.transitions) translate(pos, 0, 0);

      }

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
}
;
/**
 * Comment Likes - JavaScript
 *
 * This handles liking and unliking comments, as well as viewing who has
 * liked a particular comment.
 *
 * @dependency  jQuery
 * @dependency  Swipe
 *
 * @package     Comment_Likes
 * @subpackage  JavaScript
 */
jQuery( function() {
	var $ = jQuery;
	var extWin;
	var extWinCheck;
	var commentLikeEvent;

	// The O2 theme re-injects this script into the DOM when somebody
	// creates a new thread and the page is already open, but we don't
	// want to run this script a second time.
	if ( window.comment_likes_loaded ) return;
	window.comment_likes_loaded = true;

	// Client-side cache of who liked a particular comment to avoid
	// having to hit the server multiple times for the same data.
	var comment_like_cache = {};

	/**
	 * Parse the comment ID from a comment like link.
	 */
	var get_comment_id = function( $link ) {
		var comment_id = $link.attr( 'href' ).split( 'like_comment=' );
		return comment_id[1].split( '&_wpnonce=' )[0];
	};

	/**
	 * Handle an ajax action on the comment like link.
	 */
	var handle_link_action = function( $link, action, comment_id, callback ) {
		var nonce = $link.attr( 'href' ).split( '_wpnonce=' )[1];

		$.post( '/wp-admin/admin-ajax.php', {
			'action': action,
			'_wpnonce': nonce,
			'like_comment': comment_id,
			'blog_id': Number( $link.data( 'blog' ) )
		}, callback, 'json' );
	};

	// Overlay used for displaying comment like info.
	var overlay = {

		// Overlay element.
		$el: $( '<div/>' )
			.appendTo( 'body' )
			.addClass( 'comment-likes-overlay' )
			.hide()
			.mouseenter( function() {
				// Don't hide the overlay if the user is mousing over it.
				overlay.cancel_hide();
			} ).mouseleave( function() {
				overlay.request_hide();
			} ),

		// Inner contents of overlay.
		$inner: null,

		// Instance of the Swipe library.
		swipe: null,

		// Initialise the overlay for use, removing any old content.
		clear: function() {
			// Unload any previous instance of Swipe (to avoid leaking a global
			// event handler). This is done before clearing the contents of the
			// overlay because Swipe expects the slides to still be present.
			if ( this.swipe ) {
				this.swipe.kill();
				this.swipe = null;
			}
			this.$el.html( '' );
			this.$inner = $( '<div/>' ).addClass( 'inner' ).appendTo( this.$el );
		},

		/**
		 * Construct a list (<ul>) of user (gravatar, name) details.
		 *
		 * @param  data     liker data returned from the server
		 * @param  klass    CSS class to apply to the <ul> element
		 * @param  start    index of user to start at
		 * @param  length   number of users to include in the list
		 *
		 * @return          HTML for the list
		 */
		get_user_bits: function( data, klass, start, length ) {
			start = start || 0;
			var last = start + ( length || data.length );
			last = ( last > data.length ) ? data.length : last;
			var html = '<div class="liker-list"><ul class="' + ( klass || '' ) + '">';
			for ( var i = start; i < last; ++i ) {
				var user = data[ i ];
				html += '<li>';
				html += '<a rel="nofollow" title="' + user.display_name_esc + '" href="' + user.profile_url_esc + '"><img src="' + user.avatar_url_esc + '" alt="' + user.display_name_esc + '"  /> <span class="user-name">' + user.display_name_esc + '</span></a>';
				html += '</li>';
			}
			html += '</ul></div>';
			return html;
		},

		/**
		 * Render the display of who has liked this comment. The type of
		 * display depends on how many people have liked the comment.
		 * If more than 10 people have liked the comment, this function
		 * renders navigation controls and sets up the Swipe library for
		 * changing between pages.
		 *
		 * @param link  the element over which the user is hovering
		 * @param data  the results retrieved from the server
		 */
		show_likes: function( $link, data ) {
			this.clear();

			$link.data( 'likeCount', data.length );
			if ( 0 === data.length ) {
				// No likers after all.
				return this.$el.hide();
			}

			this.$inner.css( 'padding', 12 );

			if ( data.length < 6 ) {
				// Only one column needed.
				this.$inner.css( 'max-width', 200 );
				this.$inner.html( this.get_user_bits( data, 'single' ) );

			} else if ( data.length < 11 ) {
				// Two columns, but only one page.
				this.$inner.html( this.get_user_bits( data, 'double' ) );

			} else {
				// Multiple pages.
				this.render_likes_with_pagination( data );
			}

			// Move the overlay into the correct position and then show it.
			this.set_position( $link );
		},

		/**
		 * Render multiple pages of likes with pagination controls.
		 * This function is intended to be called by `show_likes` above.
		 *
		 * @param data  the results retrieved from the server
		 */
		render_likes_with_pagination: function( data ) {
			var page_count = Math.ceil( data.length / 10 );
			// Swipe requires two nested containers.
			var $swipe = $( '<div/>' ).addClass( 'swipe' ).appendTo( this.$inner );
			var $div = $( '<div/>' ).addClass( 'swipe-wrap' ).appendTo( $swipe );
			for ( var i = 0; i < page_count; ++i ) {
				$( this.get_user_bits( data, 'double', i * 10, 10 ) ).appendTo( $div );
			}

			/** Navigation controls.
			 *  This is based on the Newdash controls found in
			 *    reader/recommendations-templates.php
			 */
			var nav_html = '<nav class="slider-nav"><a href="#" class="prev"><span class="noticon noticon-previous" title="Previous" alt="<"></span></a><span class="position">';
			for ( var i = 0; i < page_count; ++i ) {
				nav_html += '<em data-page="' + i + '" class="' + ( ( i === 0 ) ? 'on' : '' ) + '">&bull;</em>';
			}
			nav_html += '</span><a href="#" class="next"><span class="noticon noticon-next" title="Next" alt=">"></span></a></nav>';
			var $nav = $( nav_html ).appendTo( this.$inner );

			/** Set up Swipe. **/

			// Swipe cannot be set up successfully unless its container
			// is visible, so we show it now.
			this.$el.show();

			var swipe = this.swipe = new Swipe( $swipe[0], {
				callback: function( pos ) {
					// Update the pagination indicators.
					//
					// If there are exactly two pages, Swipe has a weird
					// special case where it duplicates both pages and
					// can return index 2 and 3 even though those aren't
					// real pages (see swipe.js, line 47). To deal with
					// this, we use the expression `pos % page_count`.
					pos = pos % page_count;
					$nav.find( 'em' ).each( function() {
						var page = Number( $( this ).data( 'page' ) );
						$( this ).attr( 'class', ( pos === page ) ? 'on' : '' );
					} );
				}
			} );
			$nav.find( 'em' ).on( 'click', function( $e ) {
				// Go to the page corresponding to the indicator clicked.
				swipe.slide( Number( $( this ).data( 'page' ) ) );
				$e.preventDefault();
			} );
			// Previous and next buttons.
			$nav.find( '.prev' ).on( 'click', function( $e ) {
				swipe.prev();
				$e.preventDefault();
			} );
			$nav.find( '.next' ).on( 'click', function( $e ) {
				swipe.next();
				$e.preventDefault();
			} );
		},

		/**
		 * Open the overlay and show a loading message.
		 */
		show_loading_message: function( $link ) {
			this.clear();
			this.$inner.text( comment_like_text.loading );
			this.set_position( $link );
		},

		/**
		 * Position the overlay near the current comment.
		 *
		 * @param $link  element near which to position the overlay
		 */
		set_position: function( $link ) {
			// Prepare a down arrow icon for the bottom of the overlay.
			var $icon = $( '<span/>' )
				.appendTo( this.$el )
				.addClass( 'icon noticon noticon-downarrow' )
				.css( 'text-shadow', '0px 1px 1px rgb(223, 223, 223)' );

			var offset = $link.offset();
			var left = offset.left - ( this.$el.width() - $link.width() ) / 2;
			left = left < 5 ? 5 : left;
			var top = offset.top - this.$el.height() + 5;

			// Check if the overlay would appear off the screen.
			if ( top < ( $( window ).scrollTop() + ( $( '#wpadminbar' ).height() || 0 ) ) ) {
				// We'll display the overlay beneath the link instead.
				top = offset.top + $link.height();
				// Instead of using the down arrow icon, use an up arrow.
				$icon.remove().prependTo( this.$el )
					.removeClass( 'noticon-downarrow')
					.addClass( 'noticon-uparrow' )
					.css( {
						'text-shadow': '0px -1px 1px rgb(223, 223, 223)',
						'vertical-align': 'bottom'
					} );
			}

			this.$el.css( { 'left': left, 'top': top } ).show();

			$icon.css( {
				// The height of the arrow icon differs slightly between browsers,
				// so we compute the margin here to make sure it isn't disjointed
				// from the overlay.
				'margin-top': $icon[0].scrollHeight - 26,
				'margin-bottom': 20 - $icon[0].scrollHeight,

				// Position the arrow to be horizontally centred on the link.
				'padding-left': offset.left - left + ( $link.width() - $icon[0].scrollWidth ) / 2
			} );
		},

		/**
		 * Return whether the overlay is visible.
		 */
		is_visible: function() {
			return ( 'none' !== this.$el.css( 'display' ) );
		},

		// Timeout used for hiding the overlay.
		hide_timeout: null,

		/**
		 * Request that the overlay be hidden after a short delay.
		 */
		request_hide: function() {
			if ( null !== this.hide_timeout ) {
				return;
			}
			var self = this;
			this.hide_timeout = setTimeout( function() {
				self.$el.hide();
				self.clear();
			}, 300 );
		},

		/**
		 * Cancel a request to hide the overlay.
		 */
		cancel_hide: function() {
			if ( null !== this.hide_timeout ) {
				clearTimeout( this.hide_timeout );
				this.hide_timeout = null;
			}
		}
	};

	// The most recent comment for which the user has requested to see
	// who liked it.
	var relevant_comment;

	// Precache after this timeout.
	var precache_timeout = null;

	/**
	 * Fetch the like data for a particular comment.
	 */
	var fetch_like_data = function( $link, comment_id ) {
		comment_like_cache[ comment_id ] = null;

		var $star = $link.parent().parent().find( 'a.comment-like-link' );
		handle_link_action( $star, 'view_comment_likes', comment_id, function( data ) {
			// Populate the cache.
			comment_like_cache[ comment_id ] = data;

			// Only show the overlay if the user is interested.
			if ( overlay.is_visible() && ( relevant_comment === comment_id ) ) {
				overlay.show_likes( $link, data );
			}
		} );
	};

	function readCookie( c ) {
		var nameEQ = c + '=',
			cookieStrings = document.cookie.split( ';' ),
			i, cookieString, num, chunk, pairs, pair, cookie_data;
		for ( i = 0; i < cookieStrings.length; i++ ) {
			cookieString = cookieStrings[ i ];
			while ( cookieString.charAt( 0 ) === ' ' ) {
				cookieString = cookieString.substring( 1, cookieString.length );
			}
			if ( cookieString.indexOf( nameEQ ) === 0 ) {
				chunk = cookieString.substring( nameEQ.length, cookieString.length );
				pairs = chunk.split( '&' );
				cookie_data = {};
				for ( num = pairs.length - 1; num >= 0; num-- ) {
					pair = pairs[ num ].split( '=' );
					cookie_data[ pair[0] ] = decodeURIComponent( pair[1] );
				}
				return cookie_data;
			}
		}
		return null;
	}

	function getServiceData() {
		var data = readCookie( 'wpc_wpc' );
		if ( null === data || 'undefined' === typeof data.access_token || ! data.access_token ) {
			return false;
		}
		return data;
	}

	function readMessage( event ) {
		if ( 'undefined' == typeof event.event ) {
			return;
		}

		if ( 'login' == event.event && event.success ) {
			extWinCheck = setInterval( function() {
				if ( ! extWin || extWin.closed ) {
					clearInterval( extWinCheck );
					if ( getServiceData() ) {

						// Load page in an iframe to get the current comment nonce
						var nonceIframe = document.createElement( 'iframe' );
						nonceIframe.id = 'wp-login-comment-nonce-iframe';
						nonceIframe.style.display = 'none';
						nonceIframe.src = commentLikeEvent + '';
						document.body.appendChild( nonceIframe );

						var commentLikeId = ( commentLikeEvent + '' ).split( 'like_comment=' )[1].split( '&_wpnonce=' )[0];
						var c = false;

						// Set a 5 second timeout to redirect to the comment page without doing the Like as a fallback
						var commentLikeTimeout = setTimeout( function() {
							window.location = commentLikeEvent;
						}, 5000 );

						// Check for a new nonced redirect and use that if available before timing out
						var commentLikeCheck = setInterval( function() {
							c = $( '#wp-login-comment-nonce-iframe' ).contents().find( '#comment-like-' + commentLikeId + ' .comment-like-link' );
							if ( 'undefined' !== typeof c && 'undefined' !== typeof c[0] && 'undefined' !== typeof c[0].href ) {
								clearTimeout( commentLikeTimeout );
								clearInterval( commentLikeCheck );
								window.location = c[0].href;
							}
						}, 100 );
					}
				}
			}, 100 );

			if ( extWin ) {
				if ( ! extWin.closed ) {
					extWin.close();
				}
				extWin = false;
			}

			$( '#wp-login-polling-iframe' ).remove();
		}
	}

	if ( 'undefined' != typeof window.pm ) {
		pm.bind( 'loginMessage', function( e ) { readMessage( e ); } );
	}

	$( 'body' ).on( 'click', 'a.comment-like-link', function( $e ) {
		if ( $( $e.target ).hasClass( 'needs-login' ) ) {
			$e.preventDefault();
			commentLikeEvent = $e.target;
			if ( extWin ) {
				if ( ! extWin.closed ) {
					extWin.close();
				}
				extWin = false;
			}

			$( '#wp-login-polling-iframe' ).remove();

			var url = 'https://wordpress.com/public.api/connect/?action=request&service=wordpress';
			extWin = window.open( url, 'likeconn', 'status=0,toolbar=0,location=1,menubar=0,directories=0,resizable=1,scrollbars=1,height=560,width=500' );

			// Append cookie polling login iframe to this window to wait for user to finish logging in (or cancel)
			var loginIframe = $( "<iframe id='wp-login-polling-iframe'></iframe>" );
			loginIframe.attr( "src", "https://wordpress.com/public.api/connect/?iframe=true" );
			loginIframe.css( "display", "none" );
			$( document.body ).append( loginIframe );

			return false;
		}

		// Record that the user likes or does not like this comment.
		var $star = $( this );
		var comment_id = get_comment_id( $star );
		$star.addClass( 'loading' );
		// Determine whether to like or unlike based on whether the comment is
		// currently liked.
		var action = ( $( 'p#comment-like-' + comment_id ).data( 'liked' ) === 'comment-liked' ) ? 'unlike_comment' : 'like_comment';
		handle_link_action( $star, action, comment_id, function( data ) {
			// Invalidate the like cache for this comment.
			delete comment_like_cache[ comment_id ];

			$( '#comment-like-count-' + data.context ).html( data.display );

			if ( 'like_comment' === action ) {
				$( 'p#comment-like-' + data.context ).removeClass( 'comment-not-liked' )
					.addClass( 'comment-liked' )
					.data( 'liked', 'comment-liked' );
			} else {
				$( 'p#comment-like-' + data.context ).removeClass( 'comment-liked' )
					.addClass( 'comment-not-liked' )
					.data( 'liked', 'comment-not-liked' );
			}

			// Prefetch new data for this comment (if there are likers left).
			var $link = $star.parent().find( 'a.view-likers' );
			if ( 0 !== $link.length ) {
				fetch_like_data( $link, comment_id );
			}

			$star.removeClass( 'loading' );
		} );
		$e.preventDefault();
		$e.stopPropagation();

	} ).on( 'click', 'p.comment-not-liked', function() {
		// When a comment hasn't been liked, make the text clickable, too
		$( this ).find( 'a.comment-like-link' ).click();

	} ).on( 'mouseenter', 'p.comment-likes a.view-likers', function() {
		// Show the user a list of who has liked this comment.

		var $link = $( this );
		if ( 0 === Number( $link.data( 'likeCount' ) || 0 ) ) {
			// No one has liked this comment.
			return;
		}

		// Don't hide the overlay.
		overlay.cancel_hide();

		// Get the comment ID.
		var $star = $link.parent().parent().find( 'a.comment-like-link' );
		var comment_id = relevant_comment = get_comment_id( $star );

		// Check if the list of likes for this comment is already in
		// the cache.
		if ( comment_id in comment_like_cache ) {
			var entry = comment_like_cache[ comment_id ];
			// Only display the likes if the ajax request is
			// actually done.
			if ( null !== entry ) {
				overlay.show_likes( $link, entry );
			} else {
				// Make sure the overlay is visible (in case
				// the user moved the mouse away while loading
				// but then came back before it finished
				// loading).
				overlay.show_loading_message( $link );
			}
			return;
		}

		// Position the "Loading..." overlay.
		overlay.show_loading_message( $link );

		// Fetch the data.
		fetch_like_data( $link, comment_id );

	} ).on( 'mouseleave', 'p.comment-likes a.view-likers', function() {
		// User has moved cursor away - hide the overlay.
		overlay.request_hide();

	} ).on( 'click', 'p.comment-likes a.view-likers', function( $e ) {
		// Don't do anything when clicking on the text.
		$e.preventDefault();

	} ).on( 'mouseenter', '.comment:has(a.comment-like-link)', function() {
		// User is moving over a comment - precache the comment like data.
		if ( null !== precache_timeout ) {
			clearTimeout( precache_timeout );
			precache_timeout = null;
		}

		var $star = $( this ).find( 'a.comment-like-link' );
		var $link = $star.parent().find( 'a.view-likers' );
		if ( 0 === Number( $link.data( 'likeCount' ) || 0 ) ) {
			// No likes.
			return;
		}
		var comment_id = get_comment_id( $star );
		if ( comment_id in comment_like_cache ) {
			// Already in cache.
			return;
		}

		precache_timeout = setTimeout( function() {
			precache_timeout = null;
			if ( comment_id in comment_like_cache ) {
				// Was cached in the interim.
				return;
			}
			fetch_like_data( $link, comment_id );
		}, 1000 );
	} );
} );
;
/*!
Waypoints - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var n in t){var r=t[n];for(var s in this.waypoints[n]){var a,l,h,p,u,c=this.waypoints[n][s],d=c.options.offset,f=c.triggerPoint,w=0,y=null==f;c.element!==c.element.window&&(w=c.adapter.offset()[r.offsetProp]),"function"==typeof d?d=d.apply(c):"string"==typeof d&&(d=parseFloat(d),c.options.offset.indexOf("%")>-1&&(d=Math.ceil(r.contextDimension*d/100))),a=r.contextScroll-r.contextOffset,c.triggerPoint=w+a-d,l=f<r.oldScroll,h=c.triggerPoint>=r.oldScroll,p=l&&h,u=!l&&!h,!y&&p?(c.queueTrigger(r.backward),o[c.group.id]=c.group):!y&&u?(c.queueTrigger(r.forward),o[c.group.id]=c.group):y&&r.oldScroll>=c.triggerPoint&&(c.queueTrigger(r.forward),o[c.group.id]=c.group)}}for(var g in o)o[g].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();;
/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
( function( $ ) {
	var container, moreMenu, menu, button, links, subMenus;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	// Here, we're going to look for the priority plus menu item to determine if we're on a small screen
	moreMenu = document.getElementById( 'more-menu' );
	if ( ! moreMenu ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// If menu is empty, return early.
	if ( 'undefined' === typeof menu ) {
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );
	subMenus = menu.getElementsByTagName( 'ul' );

	// Set menu items with submenus to aria-haspopup="true".
	for ( var i = 0, len = subMenus.length; i < len; i++ ) {
		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
	}

	$( document ).ready( function() {

		// Open and close our sub-menus when needed
		$( '#site-navigation .menu-item-has-children > a' ).on( 'click' , function( e ) {

			// If our sub-menu is already open, we need to figure out what to do if the user clicks the parent item again
			if ( $( this ).parent( '#site-navigation .menu-item-has-children' ).hasClass( 'focus' ) &&
				$( this ).parent().attr( 'id' ) === $( e.target ).parent().attr( 'id' ) ) {

				// If our parent item links somewhere, let's go there!
				if ( $( this ).attr( 'href' ).length && '#' !== $( this ).attr( 'href' ) ) {
					return true;

				// If our link doesn't go anywhere, we're just going to remove the focus class and close the menu
				} else if ( $( this ).attr( 'href' ).length && '#' === $( this ).attr( 'href' ) ) {
					$( '#site-navigation .menu-item-has-children' ).removeClass( 'focus' );
					e.preventDefault();
					return false;
				}
			}

			// If this is a menu item with sub-menus, but it's already inside a sub-menu itself,
			// let's go to the link (so long as there actually IS a link)
			if ( $( this ).closest( 'ul' ).hasClass( 'sub-menu' ) &&
				$( this ).attr( 'href' ).length && '#' !== $( this ).attr( 'href' ) ) {
				return true;
			}

			// Close any other menus that might be open
			$( '#site-navigation .menu-item-has-children' ).removeClass( 'focus' );

			// Open/close the menu we've clicked on
			$( this ).parent( '#site-navigation .menu-item-has-children' ).toggleClass( 'focus' );

			// Open our child menus too!
			$( this ).children( '.menu-item-has-children' ).toggleClass( 'focus' );

			// Block our default link behaviour
			e.preventDefault();
		});

		// When clicking on the document, close any open menus
		$( document ).click(function( e ) {
			if ( ! $( e.target ).closest( '#site-navigation .menu-item' ).length) {
				$( '#site-navigation .menu-item-has-children' ).removeClass( 'focus' );
			}
		});

		// Get current window width
		var $windowWidth = $(window).width();

		// When the window is resized, close all menus
		$( window ).on( 'resize', function() {

			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        	if ( $windowWidth !== $(window).width() ) {
				$( '#site-navigation-wrapper .menu-item-has-children' ).removeClass( 'focus' );

				// Update the window width for next time
            	$windowWidth = $( window ).width();
			}
		});

	});

} )( jQuery );
;
( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' ) > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' ) > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();
;
/**
 * Header enhancements for more intelligent dynamic headers.
 *
 * This sets the masthead to the height of an uploaded image and applies sticky navigation.
 */

( function( $ ) {

	// Fit header into the available space
	function fitHeader() {
		var windowWidth = $( window ).width();
		var headerHeight = $( '#pique-header-image' ).height();
		var navHeight = $( '#primary-menu' ).height();
		var brandingHeight = $( '.site-branding' ).height();

		// Make sure we're not on the homepage, since that handles stuff differently
		if ( ! $( 'body' ).hasClass( 'pique-frontpage' )) {
			if ( 0 < $( '#pique-header-image' ).length ) {
				// Add the height of our header image and the height of our nav
				console.log('header');
				$( '#masthead' ).css( 'height', headerHeight + navHeight );
			} else {
				// Give enough room for our branding
				console.log('no header');
				$( '#masthead' ).css( 'height', brandingHeight + navHeight + 40 );
			}
		}
	};

	// Priority+ navigation, whee!
	function priorityNav() {
		// Make sure we have a menu and that the more-more item is present
		if ( 0 < $( '#site-navigation' ).length && 0 < $( '#more-menu' ).length ) {
			var navWidth = 0;
			var firstMoreElement = $( '#more-menu li' ).first();

			// Calculate the width of our "more" containing element
			var moreWidth = $( '#more-menu' ).outerWidth( true );

			// Calculate the current width of our navigation
			$( '#site-navigation .menu > li' ).each( function() {
				navWidth += $( this ).outerWidth( true );
			});

			// Calculate our available space
			var availableSpace = $( '#site-navigation' ).outerWidth( true ) - moreWidth;

			// If our nav is wider than our available space, we're going to move items
			if (navWidth > availableSpace) {
				var lastItem = $( '#site-navigation .menu > li:not(#more-menu)' ).last();
				lastItem.attr( 'data-width', lastItem.outerWidth( true ) );
				lastItem.prependTo( $( '#more-menu .sub-menu' ).eq( 0 ) );
				priorityNav(); // Rerun this function!

				// But if we have the extra space, we should add the items back to our menu
			} else if (navWidth + firstMoreElement.data( 'width' ) < availableSpace) {
				// Check to be sure there's enough space for our extra element
				firstMoreElement.insertBefore( $( '#site-navigation .menu > li' ).last() );
				priorityNav();
			}

			// Hide our more-menu entirely if there's nothing in it
			if ($( '#more-menu li' ).length > 0) {
				$( '#more-menu' ).addClass( 'visible' );
			} else {
				$( '#more-menu' ).removeClass( 'visible' );
			}
		} // check for body class
	}; // function priorityNav

	// Okay, now we want to stick-ify our menu when we reach it
	function stickyNav() {
		var nav_container = $( '#site-navigation-wrapper' );
		var nav = $( '#site-navigation' );

		nav_container.waypoint( {
			handler: function(direction) {
				nav.toggleClass( 'sticky', direction == 'down' );

				// Ensure we don't have an awkward jump when the menu sticks
				if ('down' === direction) {
					nav_container.css( { 'height':nav.outerHeight() } );
				} else {
					nav_container.css( { 'height':'auto' } );
				}
			}
		});
	};

	// Run our functions once the window has loaded fully
	$( window ).on( 'load', function() {
		priorityNav();
		fitHeader();
		stickyNav();
	});

	// Annnnnd also every time the window resizes
	var isResizing = false;
	$( window ).on('resize', function() {
		if (isResizing) {
			return;
		}

		isResizing = true;
		setTimeout(function() {
			priorityNav();
			fitHeader();
			isResizing = false;
		}, 150);
	});

} )( jQuery );
;
var addComment={moveForm:function(a,b,c,d){var e,f,g,h,i=this,j=i.I(a),k=i.I(c),l=i.I("cancel-comment-reply-link"),m=i.I("comment_parent"),n=i.I("comment_post_ID"),o=k.getElementsByTagName("form")[0];if(j&&k&&l&&m&&o){i.respondId=c,d=d||!1,i.I("wp-temp-form-div")||(e=document.createElement("div"),e.id="wp-temp-form-div",e.style.display="none",k.parentNode.insertBefore(e,k)),j.parentNode.insertBefore(k,j.nextSibling),n&&d&&(n.value=d),m.value=b,l.style.display="",l.onclick=function(){var a=addComment,b=a.I("wp-temp-form-div"),c=a.I(a.respondId);if(b&&c)return a.I("comment_parent").value="0",b.parentNode.insertBefore(c,b),b.parentNode.removeChild(b),this.style.display="none",this.onclick=null,!1};try{for(var p=0;p<o.elements.length;p++)if(f=o.elements[p],h=!1,"getComputedStyle"in window?g=window.getComputedStyle(f):document.documentElement.currentStyle&&(g=f.currentStyle),(f.offsetWidth<=0&&f.offsetHeight<=0||"hidden"===g.visibility)&&(h=!0),"hidden"!==f.type&&!f.disabled&&!h){f.focus();break}}catch(q){}return!1}},I:function(a){return document.getElementById(a)}};;
jQuery( document ).ready( function( $, wpcom ) {
	var masterbar,
		menupops = $( 'li#wp-admin-bar-blog.menupop, li#wp-admin-bar-newdash.menupop, li#wp-admin-bar-my-account.menupop' ),
		newmenu = $( '#wp-admin-bar-new-post-types' );

	// Unbind hoverIntent, we want clickable menus.
	menupops
		.unbind( 'mouseenter mouseleave' )
		.removeProp( 'hoverIntent_t' )
		.removeProp( 'hoverIntent_s' )
		.on( 'mouseover', function(e) {
			var li = $(e.target).closest( 'li.menupop' );
			menupops.not(li).removeClass( 'ab-hover' );
			li.toggleClass( 'ab-hover' );
		} )
		.on( 'click touchstart', function(e) {
			var $target = $( e.target );

			if ( masterbar.focusSubMenus( $target ) ) {
				return;
			}

			e.preventDefault();
			masterbar.toggleMenu( $target );
		} );

	masterbar = {
		focusSubMenus: function( $target ) {
			// Handle selection of menu items
			if ( ! $target.closest( 'ul' ).hasClass( 'ab-top-menu' ) ) {
				$target
					.closest( 'li' );

				return true;
			}

			return false;
		},

		toggleMenu: function( $target ) {
			var $li = $target.closest( 'li.menupop' ),
				$html = $( 'html' );

			$( 'body' ).off( 'click.ab-menu' );
			$( '#wpadminbar li.menupop' ).not($li).removeClass( 'ab-active wpnt-stayopen wpnt-show' );

			if ( $li.hasClass( 'ab-active' ) ) {
				$li.removeClass( 'ab-active' );
				$html.removeClass( 'ab-menu-open' );
			} else {
				$li.addClass( 'ab-active' );
				$html.addClass( 'ab-menu-open' );

				$( 'body' ).on( 'click.ab-menu', function( e ) {
					if ( ! $( e.target ).parents( '#wpadminbar' ).length ) {
						e.preventDefault();
						masterbar.toggleMenu( $li );
						$( 'body' ).off( 'click.ab-menu' );
					}
				} );
			}
		}
	};
} );;
var wpcom = window.wpcom || {};
wpcom.actionbar = {};
wpcom.actionbar.data = actionbardata;

// This might be better in another file, but is here for now
(function($){
	var fbd = wpcom.actionbar.data,
			d = document,
			docHeight = $( d ).height(),
			b = d.getElementsByTagName( 'body' )[0],
			lastScrollTop = 0,
			lastScrollDir, fb, fhtml, fbhtml, slkhtml,
			followingbtn, followbtn, fbdf, action,
			slkhtml = '', foldhtml = '', reporthtml = '',
			customizeIcon, editIcon, themeHtml = '', signupHtml = '', loginHtml = '',
			viewReaderHtml = '', editSubsHtml = '', editFollowsHtml = '',
			toggleactionbar, $actionbar;

	// Don't show actionbar when iframed
	if ( window != window.top ) {
		return;
	}

	fhtml = '<ul>';

	// Customize Icon
	customizeIcon = '<svg class="gridicon gridicon__customize" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M2 6c0-1.505.78-3.08 2-4 0 .845.69 2 2 2 1.657 0 3 1.343 3 3 0 .386-.08.752-.212 1.09.74.594 1.476 1.19 2.19 1.81L8.9 11.98c-.62-.716-1.214-1.454-1.807-2.192C6.753 9.92 6.387 10 6 10c-2.21 0-4-1.79-4-4zm12.152 6.848l1.34-1.34c.607.304 1.283.492 2.008.492 2.485 0 4.5-2.015 4.5-4.5 0-.725-.188-1.4-.493-2.007L18 9l-2-2 3.507-3.507C18.9 3.188 18.225 3 17.5 3 15.015 3 13 5.015 13 7.5c0 .725.188 1.4.493 2.007L3 20l2 2 6.848-6.848c1.885 1.928 3.874 3.753 5.977 5.45l1.425 1.148 1.5-1.5-1.15-1.425c-1.695-2.103-3.52-4.092-5.448-5.977z" data-reactid=".2.1.1:0.1b.0"></path></g></svg>'

	if ( fbd.canCustomizeSite ) {
		fhtml += '<li class="actnbr-btn actnbr-customize"><a href="'+ fbd.customizeLink +'">' + customizeIcon + '<span>' + fbd.i18n.customize + '<span></a></li>';
	}

	// Edit Icon
	editIcon = '<svg class="gridicon gridicon__pencil" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path></g></svg>'

	if ( fbd.canEditPost ) {
		fhtml += '<li class="actnbr-btn actnbr-edit"><a href="'+ fbd.editLink +'">' + editIcon + '<span>' + fbd.i18n.edit + '</span></a></li>';
	}

	// Follow/Unfollow Icon
	followingbtn = '<svg class="gridicon gridicon__following" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M23 13.482L15.508 21 12 17.4l1.412-1.388 2.106 2.188 6.094-6.094L23 13.482zm-7.455 1.862L20 10.89V2H2v14c0 1.1.9 2 2 2h4.538l4.913-4.832 2.095 2.176zM8 13H4v-1h4v1zm3-2H4v-1h7v1zm0-2H4V8h7v1zm7-3H4V4h14v2z"/></g></svg>';
	followbtn = '<svg class="gridicon gridicon__follow" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M23 16v2h-3v3h-2v-3h-3v-2h3v-3h2v3h3zM20 2v9h-4v3h-3v4H4c-1.1 0-2-.9-2-2V2h18zM8 13v-1H4v1h4zm3-3H4v1h7v-1zm0-2H4v1h7V8zm7-4H4v2h14V4z"/></g></svg>';

	fbhtml = '<a class="actnbr-action actnbr-actn-follow" href="">' + followbtn + '<span>' + fbd.i18n.follow + '</span></a>';
	if ( fbd.isFollowing ) {
		fbhtml = '<a class="actnbr-action actnbr-actn-following" href="">' + followingbtn + '<span>' + fbd.i18n.following + '</span></a>';
	}

	// Show follow/unfollow icon on top level, when this is not your own site
	if ( fbd.canFollow ) {
		fhtml += '<li class="actnbr-btn actnbr-hidden"> \
			    	' + fbhtml + ' \
			    	<div class="actnbr-popover tip tip-top-left actnbr-notice"> \
			    		<div class="tip-arrow"></div> \
			    		<div class="tip-inner actnbr-follow-bubble"></div> \
			    	</div> \
			    </li>';
	}

	if ( ! fbd.canCustomizeSite && fbd.isLoggedIn ) {
		// Report Link
		reporthtml = '<li class="flb-report"><a href="http://en.wordpress.com/abuse/">' + fbd.i18n.report + '</a></li>';
	}

	// Show shortlink on single posts
	if ( fbd.isSingular ) {
		slkhtml = '<li class="actnbr-shortlink"><a href="' + fbd.shortlink + '">' + fbd.i18n.shortlink + '</a></li>'
	}

	// Set up fold/unfold menu item
	foldhtml = '<li class="actnbr-fold"><a href="">' + fbd.i18n.foldBar + '</a></li>'
	if ( fbd.isFolded ) {
		foldhtml = '<li class="actnbr-fold"><a href="">' + fbd.i18n.unfoldBar + '</a></li>'
	}

	if ( fbd.isLoggedIn ) {
		if ( '' != fbd.themeURL ) {
			themeHtml = '<li class="actnbr-theme"><a href="' + fbd.themeURL + '">' + fbd.i18n.themeInfo.replace( /{theme}/, fbd.themeName ) + '</a></li>';
		}
		viewReaderHtml = '<li class="actnbr-reader"><a href="https://wordpress.com/read/blogs/' + fbd.siteID + '">' + fbd.i18n.viewReader + '</a></li>';
		editFollowsHtml = '<li class="actnbr-follows"><a href="https://wordpress.com/following/edit">' + fbd.i18n.editFollows + '</a></li>';
	} else {
		loginHtml += '<li class="actnbr-login"><a href="' + fbd.loginURL + '">' + fbd.i18n.login + '</a></li>';
		signupHtml = '<li class="actnbr-signup"><a href="' + fbd.signupURL + '">' + fbd.i18n.signup + '</a></li>';
		editSubsHtml = '<li class="actnbr-subs"><a href="https://subscribe.wordpress.com/">' + fbd.i18n.editSubs + '</a></li>';
	}

	// Ellipsis Menu
	fhtml += '<li class="actnbr-ellipsis actnbr-hidden"> \
			  <svg class="gridicon gridicon__ellipsis" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><circle cx="5" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="12" r="2"/></g></svg> \
			  <div class="actnbr-popover tip tip-top-left actnbr-more"> \
			  	<div class="tip-arrow"></div> \
			  	<div class="tip-inner"> \
				  <ul> \
				    <li class="actnbr-sitename"><a href="' + fbd.siteURL + '">' + fbd.icon + ' ' + actionBarEscapeHtml( fbd.siteName ) + '</a></li> \
				   	<li class="actnbr-folded-customize"><a href="'+ fbd.customizeLink +'">' + customizeIcon + '<span>' + fbd.i18n.customize + '<span></a></li> \
				    <li class="actnbr-folded-follow">' + fbhtml + '</li> \
						' + signupHtml + ' \
				    ' + loginHtml + ' \
				    ' + themeHtml + ' \
				    ' + slkhtml + ' \
				    ' + reporthtml + ' \
				    ' + viewReaderHtml + ' \
				    ' + editFollowsHtml + ' \
				    ' + editSubsHtml + ' \
				    ' + foldhtml + ' \
			      </ul> \
			    </div> \
		      </div> \
		    </li> \
	      </ul>';

	fbdf = d.createElement( 'div' );
	fbdf.id = 'actionbar';
	fbdf.innerHTML = fhtml;
	b.appendChild( fbdf );

	$actionbar = $( '#actionbar' ).addClass( 'actnbr-' + fbd.themeSlug.replace( '/', '-' ) );

	// Add classes based on contents
	if ( fbd.canCustomizeSite ) {
		$actionbar.addClass( 'actnbr-has-customize' );
	}

	if ( fbd.canEditPost ) {
		$actionbar.addClass( 'actnbr-has-edit' );
	}

	if ( ! fbd.canCustomizeSite ) {
		$actionbar.addClass( 'actnbr-has-follow' );
	}

	if ( fbd.isFolded ) {
		$actionbar.addClass( 'actnbr-folded' );
	}

	// Show status message if available

	if ( fbd.statusMessage ) {
			showActionBarStatusMessage( fbd.statusMessage );
	}

	// *** Actions *****************

	// Follow Site
	$actionbar.on(  'click', '.actnbr-actn-follow', function(e) {
		e.preventDefault();

		if ( fbd.isLoggedIn ) {
			showActionBarStatusMessage( '<div class="actnbr-reader">' + fbd.i18n.followedText + '</div>' );
			bumpStat( 'followed' );
			request( 'ab_subscribe_to_blog' );
		} else {
			showActionBarFollowForm();
		}
	} )

	// UnFollow Site
	.on(  'click', '.actnbr-actn-following', function(e) {
		e.preventDefault();
		$( '#actionbar .actnbr-actn-following' ).replaceWith( '<a class="actnbr-action actnbr-actn-follow" href="">' + followbtn + '<span>' + fbd.i18n.follow + '</span></a>' );

		bumpStat( 'unfollowed' );
		request( 'ab_unsubscribe_from_blog' );
	} )

	// Show shortlink prompt
	.on( 'click', '.actnbr-shortlink a', function(e) {
		e.preventDefault();
		window.prompt( "Shortlink: ", fbd.shortlink );
	} )

	// Toggle more menu
	.on( 'click', '.actnbr-ellipsis', function(e) {
		if ( $( e.target ).closest( 'a' ).hasClass( 'actnbr-action' ) ) {
			return false;
		}

		var popoverLi = $( '#actionbar .actnbr-ellipsis' );
		popoverLi.toggleClass( 'actnbr-hidden' );

		setTimeout( function() {
			if ( ! popoverLi.hasClass( 'actnbr-hidden' ) ) {
				$( document ).on( 'click.actnbr-body-click', function(e) {
					popoverLi.addClass( 'actnbr-hidden' );
					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	})

	// Fold/Unfold
	.on( 'click', '.actnbr-fold', function(e) {
		e.preventDefault();

		if ( $( '#actionbar' ).hasClass( 'actnbr-folded' ) ) {
			$( '.actnbr-fold a' ).html( fbd.i18n.foldBar );
			$( '#actionbar' ).removeClass( 'actnbr-folded' );

			$.post( fbd.xhrURL, { 'action': 'unfold_actionbar' } );
		} else {
			$( '.actnbr-fold a' ).html( fbd.i18n.unfoldBar );
			$( '#actionbar' ).addClass( 'actnbr-folded' );

			$.post( fbd.xhrURL, { 'action': 'fold_actionbar' } );
		}
	})

	// Record stats for clicks
	.on( 'click', '.actnbr-sitename a', function(e) {
		bumpStat( 'clicked_site_title' );
	})
	.on( 'click', '.actnbr-customize a', function(e) {
		bumpStat( 'customized' );
	})
	.on( 'click', '.actnbr-folded-customize a', function(e) {
		bumpStat( 'customized' );
	})
	.on( 'click', '.actnbr-theme a', function(e) {
		bumpStat( 'explored_theme' );
	})
	.on( 'click', '.actnbr-edit a', function(e) {
		bumpStat( 'edited' );
	})
	.on( 'click', '.flb-report a', function(e) {
		bumpStat( 'reported_content' );
	})
	.on( 'click', '.actnbr-follows a', function(e) {
		bumpStat( 'managed_following' );
	})
	.on( 'click', '.actnbr-shortlink a', function(e) {
		bumpStat( 'copied_shortlink' );
	})
	.on( 'click', '.actnbr-reader a', function(e) {
		bumpStat( 'view_reader' );
	})
	.on( 'submit', '.actnbr-follow-bubble form', function ( e ) {
		$( '#actionbar .actnbr-follow-bubble form button' ).attr( 'disabled', true );
	});


	// Make Follow/Unfollow requests
	var request = function( action ) {
		$.post( fbd.xhrURL, {
			'action': action,
			'_wpnonce': fbd.nonce,
			'source': 'actionbar',
			'blog_id': fbd.siteID
		});
	};

	// Show/Hide actionbar on scroll
	fb = $('#actionbar');
	toggleactionbar = function() {
		var st = $(window).scrollTop(),
			topOffset = 0;

		if ( $(window).scrollTop() < 0 ) {
			return;
		}

		// Still
		if ( lastScrollTop == 0 || ( ( st == lastScrollTop ) && lastScrollDir == 'up' ) ) {
			fb.removeClass( 'actnbr-hidden' );

		// Moving
		} else {
			 // Scrolling Up
		    if ( st < lastScrollTop ){
				fb.removeClass( 'actnbr-hidden' );
				lastScrollDir = 'up';

			// Scrolling Down
			} else {
				// check if there are any popovers open, and only hide action bar if not
				if ( $( '#actionbar > ul > li:not(.actnbr-hidden) > .actnbr-popover' ).length === 0 ) {
					fb.addClass( 'actnbr-hidden' )
					lastScrollDir = 'down';

					// Hide any menus
					$( '#actionbar li' ).addClass( 'actnbr-hidden' );
				}
			}
		}

		lastScrollTop = st;
	}
	setInterval( toggleactionbar, 100 );

	// Bump stats
	var bumpStat = function( stat ) {
		$.post( fbd.xhrURL, {
			'action': 'actionbar_stats',
			'stat': stat
		});
	}

	function actionBarEscapeHtml(string) {
		return String(string).replace(/[&<>"'\/]/g, function (s) {
			var entityMap = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': '&quot;',
				"'": '&#39;',
				"/": '&#x2F;'
			};
			return entityMap[s];
		});
	};

	function showActionBarStatusMessage( message ) {
		$( '#actionbar .actnbr-actn-follow' ).replaceWith( '<a class="actnbr-action actnbr-actn-following" href="">' + followingbtn + '<span>' + fbd.i18n.following + '</span></a>' );
		$( '#actionbar .actnbr-follow-bubble' ).html( ' \
			<ul> \
				<li class="actnbr-sitename"><a href="' + fbd.siteURL + '">' + fbd.icon + ' ' + actionBarEscapeHtml( fbd.siteName ) + '</a></li> \
				<li class="actnbr-message">' + message + '</li> \
			</ul> \
		');

		var btn = $( '#actionbar .actnbr-btn' );
		btn.removeClass( 'actnbr-hidden' );

		setTimeout( function() {
			if ( ! btn.hasClass( 'actnbr-hidden' ) ) {
				$( '#actionbar .actnbr-email-field' ).focus();
				$( document ).on( 'click.actnbr-body-click', function(e) {
					if ( $( e.target ).closest( '.actnbr-popover' )[0] ) {
						return;
					}
					btn.addClass( 'actnbr-hidden' );
					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	}

	function showActionBarFollowForm() {
		var btn = $( '#actionbar .actnbr-btn' );
		btn.toggleClass( 'actnbr-hidden' );

		var form = $('<form>');
		if ( fbd.i18n.followers )
			form.append($('<div class="actnbr-follow-count">').html(fbd.i18n.followers));
		form.append($('<div>').append($('<input>').attr({"type": "email", "name": "email", "placeholder": fbd.i18n.enterEmail, "class": "actnbr-email-field"})));
		form.append($('<input type="hidden" name="action" value="subscribe"/>'));
		form.append($('<input type="hidden" name="blog_id">').attr('value', fbd.siteID));
		form.append($('<input type="hidden" name="source">').attr('value', fbd.referer));
		form.append($('<input type="hidden" name="sub-type" value="actionbar-follow"/>'));
		form.append($(fbd.subscribeNonce));
		form.append($('<div class="actnbr-button-wrap">').append($('<button type="submit">').attr('value', fbd.i18n.subscribe).html(fbd.i18n.subscribe)));
		form.attr('method', 'post');
		form.attr('action', 'https://subscribe.wordpress.com');
		form.attr('accept-charset', 'utf-8');

		var html = $('<ul/>');
		html.append($('<li class="actnbr-sitename">').append($('<a>').attr('href', fbd.siteURL).append($(fbd.icon)).append(' ' + actionBarEscapeHtml( fbd.siteName ))))
		html.append($('<li>').append(form));
		html.append($('<li class="actnbr-login-nudge">').append($('<div>').html(fbd.i18n.alreadyUser)))

		$( '#actionbar .actnbr-follow-bubble' ).empty().append(html);

		setTimeout( function() {
			if ( ! btn.hasClass( 'actnbr-hidden' ) ) {
				$( '#actionbar .actnbr-email-field' ).focus();
				$( document ).on( 'click.actnbr-body-click', function(e) {
					if ( $( e.target ).closest( '.actnbr-popover' )[0] ) {
						return;
					}
					btn.addClass( 'actnbr-hidden' );
					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	}
})(jQuery);
;
//fgnass.github.com/spin.js#v1.3

/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    if(s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    if (typeof this == 'undefined') return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: o.color, opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));
;
/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */

/*

Basic Usage:
============

$('#el').spin(); // Creates a default Spinner using the text color of #el.
$('#el').spin({ ... }); // Creates a Spinner using the provided options.

$('#el').spin(false); // Stops and removes the spinner.

Using Presets:
==============

$('#el').spin('small'); // Creates a 'small' Spinner using the text color of #el.
$('#el').spin('large', '#fff'); // Creates a 'large' white Spinner.

Adding a custom preset:
=======================

$.fn.spin.presets.flower = {
  lines: 9
  length: 10
  width: 20
  radius: 0
}

$('#el').spin('flower', 'red');

*/

(function(factory) {

  if (typeof exports == 'object') {
    // CommonJS
    factory(require('jquery'), require('spin'))
  }
  else if (typeof define == 'function' && define.amd) {
    // AMD, register as anonymous module
    define(['jquery', 'spin'], factory)
  }
  else {
    // Browser globals
    if (!window.Spinner) throw new Error('Spin.js not present')
    factory(window.jQuery, window.Spinner)
  }

}(function($, Spinner) {

  $.fn.spin = function(opts, color) {

    return this.each(function() {
      var $this = $(this),
        data = $this.data();

      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (opts !== false) {
        opts = $.extend(
          { color: color || $this.css('color') },
          $.fn.spin.presets[opts] || opts
        )
        // Begin WordPress Additions
        // To use opts.right, you need to have specified a length, width, and radius.
        if ( typeof opts.right !== 'undefined' && typeof opts.length !== 'undefined'
          && typeof opts.width !== 'undefined' && typeof opts.radius !== 'undefined' ) {
          var pad = $this.css( 'padding-left' );
          pad = ( typeof pad === 'undefined' ) ? 0 : parseInt( pad, 10 );
          opts.left = $this.outerWidth() - ( 2 * ( opts.length + opts.width + opts.radius ) ) - pad - opts.right;
          delete opts.right;
        }
        // End WordPress Additions
        data.spinner = new Spinner(opts).spin(this)
      }
    })
  }

  $.fn.spin.presets = {
    tiny: { lines: 8, length: 2, width: 2, radius: 3 },
    small: { lines: 8, length: 4, width: 3, radius: 5 },
    large: { lines: 10, length: 8, width: 4, radius: 8 }
  }

}));

// Jetpack Presets Overrides:
(function($){
	$.fn.spin.presets.wp = { trail: 60, speed: 1.3 };
	$.fn.spin.presets.small  = $.extend( { lines:  8, length: 2, width: 2, radius: 3 }, $.fn.spin.presets.wp );
	$.fn.spin.presets.medium = $.extend( { lines:  8, length: 4, width: 3, radius: 5 }, $.fn.spin.presets.wp );
	$.fn.spin.presets.large  = $.extend( { lines: 10, length: 6, width: 4, radius: 7 }, $.fn.spin.presets.wp );
	$.fn.spin.presets['small-left']   = $.extend( { left:  5 }, $.fn.spin.presets.small );
	$.fn.spin.presets['small-right']  = $.extend( { right: 5 }, $.fn.spin.presets.small );
	$.fn.spin.presets['medium-left']  = $.extend( { left:  5 }, $.fn.spin.presets.medium );
	$.fn.spin.presets['medium-right'] = $.extend( { right: 5 }, $.fn.spin.presets.medium );
	$.fn.spin.presets['large-left']   = $.extend( { left:  5 }, $.fn.spin.presets.large );
	$.fn.spin.presets['large-right']  = $.extend( { right: 5 }, $.fn.spin.presets.large );
})(jQuery);
;
/* jshint sub: true, onevar: false, multistr: true, devel: true, smarttabs: true */
/* global jetpackCarouselStrings, DocumentTouch */

// @start-hide-in-jetpack
if (typeof wpcom === 'undefined') {
	var wpcom = {};
}
wpcom.carousel = (function(/*$*/) {
	var prebuilt_widths = jetpackCarouselStrings.widths;
	var pageviews_stats_args = jetpackCarouselStrings.stats_query_args;

	var findFirstLargeEnoughWidth = function(original_w, original_h, dest_w, dest_h) {
		var inverse_ratio = original_h / original_w;

		for ( var i = 0; i < prebuilt_widths.length; ++i ) {
			if ( prebuilt_widths[i] >= dest_w || prebuilt_widths[i] * inverse_ratio >= dest_h ) {
				return prebuilt_widths[i];
			}
		}

		return original_w;
	};

	var addWidthToImageURL = function(url, width) {
		width = parseInt(width, 10);
		// Give devices with a higher devicePixelRatio higher-res images (Retina display = 2, Android phones = 1.5, etc)
		if ('undefined' !== typeof window.devicePixelRatio && window.devicePixelRatio > 1) {
			width = Math.round( width * window.devicePixelRatio );
		}
		url = addArgToURL(url, 'w', width);
		url = addArgToURL(url, 'h', '');
		return url;
	};

	var addArgToURL = function(url, arg, value) {
		var re = new RegExp(arg+'=[^?&]+');
		if ( url.match(re) ) {
			return url.replace(re, arg + '=' + value);
		} else {
			var divider = url.indexOf('?') !== -1 ? '&' : '?';
			return url + divider + arg + '=' + value;
		}
	};

	var stat = function ( names ) {
		if ( typeof names !== 'string' ) {
			names = names.join( ',' );
		}

		new Image().src = window.location.protocol +
			'//pixel.wp.com/g.gif?v=wpcom-no-pv' +
			'&x_carousel=' + names +
			'&baba=' + Math.random();
	};

	var pageview = function ( post_id ) {
		new Image().src = window.location.protocol +
			'//pixel.wp.com/g.gif?host=' + encodeURIComponent( window.location.host ) +
			'&ref=' + encodeURIComponent( document.referrer ) +
			'&rand=' + Math.random() +
			'&' + pageviews_stats_args +
			'&post=' + encodeURIComponent( post_id );
	};


	return {
		findFirstLargeEnoughWidth: findFirstLargeEnoughWidth,
		addWidthToImageURL: addWidthToImageURL,
		stat: stat,
		pageview: pageview
	};

})(jQuery);
// @end-hide-in-jetpack

jQuery(document).ready(function($) {

	// gallery faded layer and container elements
	var overlay, comments, gallery, container, nextButton, previousButton, info, transitionBegin,
	caption, resizeTimeout, photo_info, close_hint, commentInterval, lastSelectedSlide,
	screenPadding = 110, originalOverflow = $('body').css('overflow'), originalHOverflow = $('html').css('overflow'), proportion = 85,
	last_known_location_hash = '', imageMeta, titleAndDescription, commentForm, leftColWrapper, scrollPos;

	if ( window.innerWidth <= 760 ) {
		screenPadding = Math.round( ( window.innerWidth / 760 ) * 110 );

		if ( screenPadding < 40 && ( ( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch ) ) {
			screenPadding = 0;
		}
	}

	// Adding a polyfill for browsers that do not have Date.now
	if ( 'undefined' === typeof Date.now ) {
		Date.now = function now() {
			return new Date().getTime();
		};
	}

	var keyListener = function(e){
		switch(e.which){
			case 38: // up
				e.preventDefault();
				container.scrollTop(container.scrollTop() - 100);
				break;
			case 40: // down
				e.preventDefault();
				container.scrollTop(container.scrollTop() + 100);
				break;
			case 39: // right
				e.preventDefault();
				gallery.jp_carousel('next');
				break;
			case 37: // left
			case 8: // backspace
				e.preventDefault();
				gallery.jp_carousel('previous');
				break;
			case 27: // escape
				e.preventDefault();
				container.jp_carousel('close');
				break;
			default:
				// making jslint happy
				break;
		}
	};

	var resizeListener = function(/*e*/){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){
			gallery
				.jp_carousel('slides')
				.jp_carousel('fitSlide', true);
			gallery.jp_carousel('updateSlidePositions', true);
			gallery.jp_carousel('fitMeta', true);
		}, 200);
	};

	var prepareGallery = function( /*dataCarouselExtra*/ ){
		if (!overlay) {
			overlay = $('<div></div>')
				.addClass('jp-carousel-overlay')
				.css({
					'position' : 'absolute',
					'top'      : 0,
					'right'    : 0,
					'bottom'   : 0,
					'left'     : 0
				});

			var buttons  = '<a class="jp-carousel-commentlink" href="#">' + jetpackCarouselStrings.comment + '</a>';
			if ( 1 === Number( jetpackCarouselStrings.is_logged_in ) ) {
// @start-hide-in-jetpack
				if ( 1 === Number( jetpackCarouselStrings.is_public && 1 === Number( jetpackCarouselStrings.reblog_enabled ) ) ) {
					buttons += '<a class="jp-carousel-reblog" href="#">' + jetpackCarouselStrings.reblog + '</a>';
				}
// @end-hide-in-jetpack
			}

			buttons  = $('<div class="jp-carousel-buttons">' + buttons + '</div>');

			caption    = $('<h2 itemprop="caption description"></h2>');
			photo_info = $('<div class="jp-carousel-photo-info"></div>').append(caption);

			imageMeta = $('<div></div>')
				.addClass('jp-carousel-image-meta')
				.css({
					'float'      : 'right',
					'margin-top' : '20px',
					'width'      :  '250px'
				});

			imageMeta
				.append( buttons )
				.append( '<ul class=\'jp-carousel-image-exif\' style=\'display:none;\'></ul>' )
				.append( '<a class=\'jp-carousel-image-download\' style=\'display:none;\'></a>' )
				.append( '<div class=\'jp-carousel-image-map\' style=\'display:none;\'></div>' );

			titleAndDescription = $('<div></div>')
				.addClass('jp-carousel-titleanddesc')
				.css({
					'width'      : '100%',
					'margin-top' : imageMeta.css('margin-top')
				});

			var commentFormMarkup = '<div id="jp-carousel-comment-form-container">';

			if ( jetpackCarouselStrings.local_comments_commenting_as && jetpackCarouselStrings.local_comments_commenting_as.length ) {
				// Comments not enabled, fallback to local comments

				if ( 1 !== Number( jetpackCarouselStrings.is_logged_in ) && 1 === Number( jetpackCarouselStrings.comment_registration ) ) {
					commentFormMarkup += '<div id="jp-carousel-comment-form-commenting-as">' + jetpackCarouselStrings.local_comments_commenting_as + '</div>';
				} else {
					commentFormMarkup += '<form id="jp-carousel-comment-form">';
					commentFormMarkup += '<textarea name="comment" class="jp-carousel-comment-form-field jp-carousel-comment-form-textarea" id="jp-carousel-comment-form-comment-field" placeholder="' + jetpackCarouselStrings.write_comment + '"></textarea>';
					commentFormMarkup += '<div id="jp-carousel-comment-form-submit-and-info-wrapper">';
					commentFormMarkup += '<div id="jp-carousel-comment-form-commenting-as">' + jetpackCarouselStrings.local_comments_commenting_as + '</div>';
					commentFormMarkup += '<input type="submit" name="submit" class="jp-carousel-comment-form-button" id="jp-carousel-comment-form-button-submit" value="'+jetpackCarouselStrings.post_comment+'" />';
					commentFormMarkup += '<span id="jp-carousel-comment-form-spinner">&nbsp;</span>';
					commentFormMarkup += '<div id="jp-carousel-comment-post-results"></div>';
					commentFormMarkup += '</div>';
					commentFormMarkup += '</form>';
				}
			}
			commentFormMarkup += '</div>';

			commentForm = $(commentFormMarkup)
				.css({
					'width'      : '100%',
					'margin-top' : '20px',
					'color'      : '#999'
				});

			comments = $('<div></div>')
				.addClass('jp-carousel-comments')
				.css({
					'width'      : '100%',
					'bottom'     : '10px',
					'margin-top' : '20px'
				});

			var commentsLoading = $('<div id="jp-carousel-comments-loading"><span>'+jetpackCarouselStrings.loading_comments+'</span></div>')
				.css({
					'width'      : '100%',
					'bottom'     : '10px',
					'margin-top' : '20px'
				});

			var leftWidth = ( $(window).width() - ( screenPadding * 2 ) ) - (imageMeta.width() + 40);
			leftWidth += 'px';

			leftColWrapper = $('<div></div>')
				.addClass('jp-carousel-left-column-wrapper')
				.css({
					'width' : Math.floor( leftWidth )
				})
				.append(titleAndDescription)
				.append(commentForm)
				.append(comments)
				.append(commentsLoading);

			var fadeaway = $('<div></div>')
				.addClass('jp-carousel-fadeaway');

			info = $('<div></div>')
				.addClass('jp-carousel-info')
				.css({
					'top'   : Math.floor( ($(window).height() / 100) * proportion ),
					'left'  : screenPadding,
					'right' : screenPadding
				})
				.append(photo_info)
				.append(imageMeta);

			if ( window.innerWidth <= 760 ) {
				photo_info.remove().insertAfter( titleAndDescription );
				info.prepend( leftColWrapper );
			}
			else {
				info.append( leftColWrapper );
			}

			var targetBottomPos = ( $(window).height() - parseInt( info.css('top'), 10 ) ) + 'px';

			nextButton = $('<div><span></span></div>')
				.addClass('jp-carousel-next-button')
				.css({
					'right'    : '15px'
				})
				.hide();

			previousButton = $('<div><span></span></div>')
				.addClass('jp-carousel-previous-button')
				.css({
					'left'     : 0
				})
				.hide();

			nextButton.add( previousButton ).css( {
				'position' : 'fixed',
				'top' : '40px',
				'bottom' : targetBottomPos,
				'width' : screenPadding
			} );

			gallery = $('<div></div>')
				.addClass('jp-carousel')
				.css({
					'position' : 'absolute',
					'top'      : 0,
					'bottom'   : targetBottomPos,
					'left'     : 0,
					'right'    : 0
				});

			close_hint = $('<div class="jp-carousel-close-hint"><span>&times;</span></div>')
				.css({
					position : 'fixed'
				});

			container = $('<div></div>')
				.addClass('jp-carousel-wrap')
				.addClass( 'jp-carousel-transitions' );
			if ( 'white' === jetpackCarouselStrings.background_color ) {
				 container.addClass('jp-carousel-light');
			}

			container.attr('itemscope', '');

			container.attr('itemtype', 'https://schema.org/ImageGallery');

			container.css({
					'position'   : 'fixed',
					'top'        : 0,
					'right'      : 0,
					'bottom'     : 0,
					'left'       : 0,
					'z-index'    : 2147483647,
					'overflow-x' : 'hidden',
					'overflow-y' : 'auto',
					'direction'  : 'ltr'
				})
				.hide()
				.append(overlay)
				.append(gallery)
				.append(fadeaway)
				.append(info)
				.append(nextButton)
				.append(previousButton)
				.append(close_hint)
				.appendTo($('body'))
				.click(function(e){
					var target = $(e.target), wrap = target.parents('div.jp-carousel-wrap'), data = wrap.data('carousel-extra'),
						slide = wrap.find('div.selected'), attachment_id = slide.data('attachment-id');
					data = data || [];

					if ( target.is(gallery) || target.parents().add(target).is(close_hint) ) {
						container.jp_carousel('close');
// @start-hide-in-jetpack
					} else if ( target.hasClass('jp-carousel-reblog') ) {
						e.preventDefault();
						e.stopPropagation();
						if ( !target.hasClass('reblogged') ) {
							target.jp_carousel('show_reblog_box');
							wpcom.carousel.stat('reblog_show_box');
						}
					} else if ( target.parents('#carousel-reblog-box').length ) {
						if ( target.is('a.cancel') ) {
							e.preventDefault();
							e.stopPropagation();
							target.jp_carousel('hide_reblog_box');
							wpcom.carousel.stat('reblog_cancel');
						} else if ( target.is( 'input[type="submit"]' ) ) {
							e.preventDefault();
							e.stopPropagation();

							var note = $('#carousel-reblog-box textarea').val();
							if ( jetpackCarouselStrings.reblog_add_thoughts === note ) {
								note = '';
							}

							$('#carousel-reblog-submit').val( jetpackCarouselStrings.reblogging );
							$('#carousel-reblog-submit').prop('disabled', true);
							$( '#carousel-reblog-box div.submit span.canceltext' ).spin( 'small' );

							$.post( jetpackCarouselStrings.ajaxurl, {
								'action': 'post_reblog',
								'reblog_source': 'carousel',
								'original_blog_id': $('#carousel-reblog-box input#carousel-reblog-blog-id').val(),
								'original_post_id': $('.jp-carousel div.selected').data('attachment-id'),
								'blog_id': $('#carousel-reblog-box select').val(),
								'blog_url': $('#carousel-reblog-box input#carousel-reblog-blog-url').val(),
								'blog_title': $('#carousel-reblog-box input#carousel-reblog-blog-title').val(),
								'post_url': $('#carousel-reblog-box input#carousel-reblog-post-url').val(),
								'post_title': slide.data( 'caption' ) || $('#carousel-reblog-box input#carousel-reblog-post-title').val(),
								'note': note,
								'_wpnonce': $('#carousel-reblog-box #_wpnonce').val()
							},
							function(/*result*/) {
								$('#carousel-reblog-box').css({ 'height': $('#carousel-reblog-box').height() + 'px' }).slideUp('fast');
								$('a.jp-carousel-reblog').html( jetpackCarouselStrings.reblogged ).removeClass( 'reblog' ).addClass( 'reblogged' );
								$( '#carousel-reblog-box div.submit span.canceltext' ).spin( false );
								$('#carousel-reblog-submit').val( jetpackCarouselStrings.post_reblog );
								$('div.jp-carousel-info').children().not('#carousel-reblog-box').fadeIn('fast');
								slide.data('reblogged', 1);
								$('div.gallery').find('img[data-attachment-id="' + slide.data('attachment-id') + '"]').data('reblogged', 1);


							}, 'json' );
							wpcom.carousel.stat('reblog_submit');
						}
					} else if ( target.hasClass( 'jp-carousel-image-download' ) ) {
						wpcom.carousel.stat( 'download_original_click' );
// @end-hide-in-jetpack
					} else if ( target.hasClass('jp-carousel-commentlink') ) {
						e.preventDefault();
						e.stopPropagation();
						$(window).unbind('keydown', keyListener);
						container.animate({scrollTop: parseInt(info.position()['top'], 10)}, 'fast');
						$('#jp-carousel-comment-form-submit-and-info-wrapper').slideDown('fast');
						$('#jp-carousel-comment-form-comment-field').focus();
					} else if ( target.hasClass('jp-carousel-comment-login') ) {
						var url = jetpackCarouselStrings.login_url + '%23jp-carousel-' + attachment_id;

						window.location.href = url;
					} else if ( target.parents('#jp-carousel-comment-form-container').length ) {
						var textarea = $('#jp-carousel-comment-form-comment-field')
							.blur(function(){
								$(window).bind('keydown', keyListener);
							})
							.focus(function(){
								$(window).unbind('keydown', keyListener);
							});

						var emailField = $('#jp-carousel-comment-form-email-field')
							.blur(function(){
								$(window).bind('keydown', keyListener);
							})
							.focus(function(){
								$(window).unbind('keydown', keyListener);
							});

						var authorField = $('#jp-carousel-comment-form-author-field')
							.blur(function(){
								$(window).bind('keydown', keyListener);
							})
							.focus(function(){
								$(window).unbind('keydown', keyListener);
							});

						var urlField = $('#jp-carousel-comment-form-url-field')
							.blur(function(){
								$(window).bind('keydown', keyListener);
							})
							.focus(function(){
								$(window).unbind('keydown', keyListener);
							});

						if ( textarea && textarea.attr('id') === target.attr('id')) {
							// For first page load
							$(window).unbind('keydown', keyListener);
							$('#jp-carousel-comment-form-submit-and-info-wrapper').slideDown('fast');
						} else if ( target.is( 'input[type="submit"]' ) ) {
							e.preventDefault();
							e.stopPropagation();

							$('#jp-carousel-comment-form-spinner').spin('small', 'white');

							var ajaxData = {
								action: 'post_attachment_comment',
								nonce:   jetpackCarouselStrings.nonce,
								blog_id: data['blog_id'],
								id:      attachment_id,
								comment: textarea.val()
							};

							if ( ! ajaxData['comment'].length ) {
								gallery.jp_carousel('postCommentError', {'field': 'jp-carousel-comment-form-comment-field', 'error': jetpackCarouselStrings.no_comment_text});
								return;
							}

							if ( 1 !== Number( jetpackCarouselStrings.is_logged_in ) ) {
								ajaxData['email']  = emailField.val();
								ajaxData['author'] = authorField.val();
								ajaxData['url']    = urlField.val();

								if ( 1 === Number( jetpackCarouselStrings.require_name_email ) ) {
									if ( ! ajaxData['email'].length || ! ajaxData['email'].match('@') ) {
										gallery.jp_carousel('postCommentError', {'field': 'jp-carousel-comment-form-email-field', 'error': jetpackCarouselStrings.no_comment_email});
										return;
									} else if ( ! ajaxData['author'].length ) {
										gallery.jp_carousel('postCommentError', {'field': 'jp-carousel-comment-form-author-field', 'error': jetpackCarouselStrings.no_comment_author});
										return;
									}
								}
							}

							$.ajax({
								type:       'POST',
								url:        jetpackCarouselStrings.ajaxurl,
								data:       ajaxData,
								dataType:   'json',
								success: function(response/*, status, xhr*/) {
									if ( 'approved' === response.comment_status ) {
										$('#jp-carousel-comment-post-results').slideUp('fast').html('<span class="jp-carousel-comment-post-success">' + jetpackCarouselStrings.comment_approved + '</span>').slideDown('fast');
									} else if ( 'unapproved' === response.comment_status ) {
										$('#jp-carousel-comment-post-results').slideUp('fast').html('<span class="jp-carousel-comment-post-success">' + jetpackCarouselStrings.comment_unapproved + '</span>').slideDown('fast');
									} else {
										// 'deleted', 'spam', false
										$('#jp-carousel-comment-post-results').slideUp('fast').html('<span class="jp-carousel-comment-post-error">' + jetpackCarouselStrings.comment_post_error + '</span>').slideDown('fast');
									}
									gallery.jp_carousel('clearCommentTextAreaValue');
									gallery.jp_carousel('getComments', {attachment_id: attachment_id, offset: 0, clear: true});
									$('#jp-carousel-comment-form-button-submit').val(jetpackCarouselStrings.post_comment);
									$('#jp-carousel-comment-form-spinner').spin(false);
								},
								error: function(/*xhr, status, error*/) {
									// TODO: Add error handling and display here
									gallery.jp_carousel('postCommentError', {'field': 'jp-carousel-comment-form-comment-field', 'error': jetpackCarouselStrings.comment_post_error});
									return;
								}
							});
						}
					} else if ( ! target.parents( '.jp-carousel-info' ).length ) {
						container.jp_carousel('next');
					}
				})
				.bind('jp_carousel.afterOpen', function(){
					$(window).bind('keydown', keyListener);
					$(window).bind('resize', resizeListener);
					gallery.opened = true;

					resizeListener();
				})
				.bind('jp_carousel.beforeClose', function(){
					var scroll = $(window).scrollTop();

					$(window).unbind('keydown', keyListener);
					$(window).unbind('resize', resizeListener);
					$(window).scrollTop(scroll);
					gallery.jp_carousel( 'hide_reblog_box' ); // @hide-in-jetpack
				})
				.bind('jp_carousel.afterClose', function(){
					if ( window.location.hash && history.back ) {
						history.back();
					}
					last_known_location_hash = '';
					gallery.opened = false;
				})
				.on( 'transitionend.jp-carousel ', '.jp-carousel-slide', function ( e ) {
					// If the movement transitions take more than twice the allotted time, disable them.
					// There is some wiggle room in the 2x, since some of that time is taken up in
					// JavaScript, setting up the transition and calling the events.
					if ( 'transform' === e.originalEvent.propertyName ) {
						var transitionMultiplier = ( ( Date.now() - transitionBegin ) / 1000 ) / e.originalEvent.elapsedTime;

						container.off( 'transitionend.jp-carousel' );

						if ( transitionMultiplier >= 2 ) {
							$( '.jp-carousel-transitions' ).removeClass( 'jp-carousel-transitions' );
						}
					}
				} );

				$( '.jp-carousel-wrap' ).touchwipe( {
					wipeLeft : function ( e ) {
						e.preventDefault();
						gallery.jp_carousel( 'next' );
					},
					wipeRight : function ( e ) {
						e.preventDefault();
						gallery.jp_carousel( 'previous' );
					},
					preventDefaultEvents : false
				} );

			nextButton.add(previousButton).click(function(e){
				e.preventDefault();
				e.stopPropagation();
				if ( nextButton.is(this) ) {
					gallery.jp_carousel('next');
				} else {
					gallery.jp_carousel('previous');
				}
			});
		}
	};

	var methods = {
		testForData: function(gallery) {
			gallery = $( gallery ); // make sure we have it as a jQuery object.
			return !( ! gallery.length || ! gallery.data( 'carousel-extra' ) );
		},

		testIfOpened: function() {
			return !!( 'undefined' !== typeof(gallery) && 'undefined' !== typeof(gallery.opened) && gallery.opened );
		},

		openOrSelectSlide: function( index ) {
			// The `open` method triggers an asynchronous effect, so we will get an
			// error if we try to use `open` then `selectSlideAtIndex` immediately
			// after it. We can only use `selectSlideAtIndex` if the carousel is
			// already open.
			if ( ! $( this ).jp_carousel( 'testIfOpened' ) ) {
				// The `open` method selects the correct slide during the
				// initialization.
				$( this ).jp_carousel( 'open', { start_index: index } );
			} else {
				gallery.jp_carousel( 'selectSlideAtIndex', index );
			}
		},

		open: function(options) {
			var settings = {
				'items_selector' : '.gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id]',
				'start_index': 0
			},
			data = $(this).data('carousel-extra');

			if ( !data ) {
				return; // don't run if the default gallery functions weren't used
			}

			prepareGallery( data );

			if ( gallery.jp_carousel( 'testIfOpened' ) ) {
				return; // don't open if already opened
			}

			// make sure to stop the page from scrolling behind the carousel overlay, so we don't trigger
			// infiniscroll for it when enabled (Reader, theme infiniscroll, etc).
			originalOverflow = $('body').css('overflow');
			$('body').css('overflow', 'hidden');
			// prevent html from overflowing on some of the new themes.
			originalHOverflow = $('html').css('overflow');
			$('html').css('overflow', 'hidden');
			scrollPos = $( window ).scrollTop();

			container.data('carousel-extra', data);
// @start-hide-in-jetpack
			wpcom.carousel.stat( ['open', 'view_image'] );
// @end-hide-in-jetpack

			return this.each(function() {
				// If options exist, lets merge them
				// with our default settings
				var $this = $(this);

				if ( options ) {
					$.extend( settings, options );
				}
				if ( -1 === settings.start_index ) {
					settings.start_index = 0; //-1 returned if can't find index, so start from beginning
				}

				container.trigger('jp_carousel.beforeOpen').fadeIn('fast',function(){
					container.trigger('jp_carousel.afterOpen');
					gallery
						.jp_carousel('initSlides', $this.find(settings.items_selector), settings.start_index)
						.jp_carousel('selectSlideAtIndex', settings.start_index);
				});
				gallery.html('');
			});
		},

		selectSlideAtIndex : function(index){
			var slides = this.jp_carousel('slides'), selected = slides.eq(index);

			if ( 0 === selected.length ) {
				selected = slides.eq(0);
			}

			gallery.jp_carousel('selectSlide', selected, false);
			return this;
		},

		close : function(){
			// make sure to let the page scroll again
			$('body').css('overflow', originalOverflow);
			$('html').css('overflow', originalHOverflow);
			this.jp_carousel( 'clearCommentTextAreaValue' );
			return container
				.trigger('jp_carousel.beforeClose')
				.fadeOut('fast', function(){
					container.trigger('jp_carousel.afterClose');
					$( window ).scrollTop( scrollPos );
				});

		},

		next : function(){
			var slide = gallery.jp_carousel( 'nextSlide' );
			container.animate({scrollTop:0}, 'fast');
			gallery.jp_carousel( 'hide_reblog_box' ); // @hide-in-jetpack

			if ( slide ) {
				this.jp_carousel('selectSlide', slide);
				wpcom.carousel.stat( ['next', 'view_image'] ); // @hide-in-jetpack
			}
		},

		previous : function(){
			var slide = gallery.jp_carousel( 'prevSlide' );
			container.animate({scrollTop:0}, 'fast');
			gallery.jp_carousel( 'hide_reblog_box' ); // @hide-in-jetpack

			if ( slide ) {
				this.jp_carousel('selectSlide', slide);
				wpcom.carousel.stat( ['previous', 'view_image'] ); // @hide-in-jetpack
			}
		},

		// @start-hide-in-jetpack
		resetButtons : function(current) {
			if ( current.data( 'reblogged' ) ) {
				$('.jp-carousel-buttons a.jp-carousel-reblog').addClass( 'reblogged' ).text( jetpackCarouselStrings.reblogged );
			} else {
				$('.jp-carousel-buttons a.jp-carousel-reblog').removeClass( 'reblogged' ).text( jetpackCarouselStrings.reblog );
			}

			// Must also take care of reblog/reblogged here
		},
		// @end-hide-in-jetpack

		selectedSlide : function(){
			return this.find('.selected');
		},

		setSlidePosition : function(x) {
			transitionBegin = Date.now();

			return this.css({
					'-webkit-transform':'translate3d(' + x + 'px,0,0)',
					'-moz-transform':'translate3d(' + x + 'px,0,0)',
					'-ms-transform':'translate(' + x + 'px,0)',
					'-o-transform':'translate(' + x + 'px,0)',
					'transform':'translate3d(' + x + 'px,0,0)'
			});
		},

		updateSlidePositions : function(animate) {
			var current = this.jp_carousel( 'selectedSlide' ),
				galleryWidth = gallery.width(),
				currentWidth = current.width(),
				previous = gallery.jp_carousel( 'prevSlide' ),
				next = gallery.jp_carousel( 'nextSlide' ),
				previousPrevious = previous.prev(),
				nextNext = next.next(),
				left = Math.floor( ( galleryWidth - currentWidth ) * 0.5 );

			current.jp_carousel( 'setSlidePosition', left ).show();

			// minimum width
			gallery.jp_carousel( 'fitInfo', animate );

			// prep the slides
			var direction = lastSelectedSlide.is( current.prevAll() ) ? 1 : -1;

			// Since we preload the `previousPrevious` and `nextNext` slides, we need
			// to make sure they technically visible in the DOM, but invisible to the
			// user. To hide them from the user, we position them outside the edges
			// of the window.
			//
			// This section of code only applies when there are more than three
			// slides. Otherwise, the `previousPrevious` and `nextNext` slides will
			// overlap with the `previous` and `next` slides which must be visible
			// regardless.
			if ( 1 === direction ) {
				if ( ! nextNext.is( previous ) ) {
					nextNext.jp_carousel( 'setSlidePosition', galleryWidth + next.width() ).show();
				}

				if ( ! previousPrevious.is( next ) ) {
					previousPrevious.jp_carousel( 'setSlidePosition', -previousPrevious.width() - currentWidth ).show();
				}
			} else {
				if ( ! nextNext.is( previous ) ) {
					nextNext.jp_carousel( 'setSlidePosition', galleryWidth + currentWidth ).show();
				}
			}

			previous.jp_carousel( 'setSlidePosition', Math.floor( -previous.width() + ( screenPadding * 0.75 ) ) ).show();
			next.jp_carousel( 'setSlidePosition', Math.ceil( galleryWidth - ( screenPadding * 0.75 ) ) ).show();
		},

		selectSlide : function(slide, animate){
			lastSelectedSlide = this.find( '.selected' ).removeClass( 'selected' );

			var slides = gallery.jp_carousel( 'slides' ).css({ 'position': 'fixed' }),
				current = $( slide ).addClass( 'selected' ).css({ 'position': 'relative' }),
				attachmentId = current.data( 'attachment-id' ),
				previous = gallery.jp_carousel( 'prevSlide' ),
				next = gallery.jp_carousel( 'nextSlide' ),
				previousPrevious = previous.prev(),
				nextNext = next.next(),
				animated,
				captionHtml;

			// center the main image
			gallery.jp_carousel( 'loadFullImage', current );

			caption.hide();

			if ( next.length === 0 && slides.length <= 2 ) {
				$( '.jp-carousel-next-button' ).hide();
			} else {
				$( '.jp-carousel-next-button' ).show();
			}

			if ( previous.length === 0 && slides.length <= 2 ) {
				$( '.jp-carousel-previous-button' ).hide();
			} else {
				$( '.jp-carousel-previous-button' ).show();
			}

			animated = current
				.add( previous )
				.add( previousPrevious )
				.add( next )
				.add( nextNext )
				.jp_carousel( 'loadSlide' );

			// slide the whole view to the x we want
			slides.not( animated ).hide();

			gallery.jp_carousel( 'updateSlidePositions', animate );

			gallery.jp_carousel( 'resetButtons', current ); // @hide-in-jetpack
			container.trigger( 'jp_carousel.selectSlide', [current] );

			gallery.jp_carousel( 'getTitleDesc', {
				title: current.data( 'title' ),
				desc: current.data( 'desc' )
			});

			var imageMeta = current.data( 'image-meta' );
			gallery.jp_carousel( 'updateExif', imageMeta );
			gallery.jp_carousel( 'updateFullSizeLink', current );
			gallery.jp_carousel( 'updateMap', imageMeta );
			gallery.jp_carousel( 'testCommentsOpened', current.data( 'comments-opened' ) );
			gallery.jp_carousel( 'getComments', {
				'attachment_id': attachmentId,
				'offset': 0,
				'clear': true
			});
			$( '#jp-carousel-comment-post-results' ).slideUp();

			// $('<div />').text(sometext).html() is a trick to go to HTML to plain
			// text (including HTML entities decode, etc)
			if ( current.data( 'caption' ) ) {
				captionHtml = $( '<div />' ).text( current.data( 'caption' ) ).html();

				if ( captionHtml === $( '<div />' ).text( current.data( 'title' ) ).html() ) {
					$( '.jp-carousel-titleanddesc-title' ).fadeOut( 'fast' ).empty();
				}

				if ( captionHtml === $( '<div />' ).text( current.data( 'desc' ) ).html() ) {
					$( '.jp-carousel-titleanddesc-desc' ).fadeOut( 'fast' ).empty();
				}

				caption.html( current.data( 'caption' ) ).fadeIn( 'slow' );
			} else {
				caption.fadeOut( 'fast' ).empty();
			}

			wpcom.carousel.pageview( attachmentId ); // @hide-in-jetpack

			// Load the images for the next and previous slides.
			$( next ).add( previous ).each( function() {
				gallery.jp_carousel( 'loadFullImage', $( this ) );
			});

			window.location.hash = last_known_location_hash = '#jp-carousel-' + attachmentId;
		},

		slides : function(){
			return this.find('.jp-carousel-slide');
		},

		slideDimensions : function(){
			return {
				width: $(window).width() - (screenPadding * 2),
				height: Math.floor( $(window).height() / 100 * proportion - 60 )
			};
		},

		loadSlide : function() {
			return this.each(function(){
				var slide = $(this);
				slide.find('img')
					.one('load', function(){
						// set the width/height of the image if it's too big
						slide
							.jp_carousel('fitSlide',false);
					});
			});
		},

		bestFit : function(){
			var max        = gallery.jp_carousel('slideDimensions'),
			    orig       = this.jp_carousel('originalDimensions'),
			    orig_ratio = orig.width / orig.height,
			    w_ratio    = 1,
			    h_ratio    = 1,
			    width, height;

			if ( orig.width > max.width ) {
				w_ratio = max.width / orig.width;
			}
			if ( orig.height > max.height ) {
				h_ratio = max.height / orig.height;
			}

			if ( w_ratio < h_ratio ) {
				width = max.width;
				height = Math.floor( width / orig_ratio );
			} else if ( h_ratio < w_ratio ) {
				height = max.height;
				width = Math.floor( height * orig_ratio );
			} else {
				width = orig.width;
				height = orig.height;
			}

			return {
				width: width,
				height: height
			};
		},

		fitInfo : function(/*animated*/){
			var current = this.jp_carousel('selectedSlide'),
				size = current.jp_carousel('bestFit');

			photo_info.css({
				'left'  : Math.floor( (info.width() - size.width) * 0.5 ),
				'width' : Math.floor( size.width )
			});

			return this;
		},

		fitMeta : function(animated){
			var newInfoTop   = { top: Math.floor( $(window).height() / 100 * proportion + 5 ) + 'px' };
			var newLeftWidth = { width: ( info.width() - (imageMeta.width() + 80) ) + 'px' };

			if (animated) {
				info.animate(newInfoTop);
				leftColWrapper.animate(newLeftWidth);
			} else {
				info.animate(newInfoTop);
				leftColWrapper.css(newLeftWidth);
			}
		},

		fitSlide : function(/*animated*/){
			return this.each(function(){
				var $this      = $(this),
				    dimensions = $this.jp_carousel('bestFit'),
				    method     = 'css',
				    max        = gallery.jp_carousel('slideDimensions');

				dimensions.left = 0;
				dimensions.top = Math.floor( (max.height - dimensions.height) * 0.5 ) + 40;
				$this[method](dimensions);
			});
		},

		texturize : function(text) {
				text = '' + text; // make sure we get a string. Title "1" came in as int 1, for example, which did not support .replace().
				text = text.replace(/'/g, '&#8217;').replace(/&#039;/g, '&#8217;').replace(/[\u2019]/g, '&#8217;');
				text = text.replace(/"/g, '&#8221;').replace(/&#034;/g, '&#8221;').replace(/&quot;/g, '&#8221;').replace(/[\u201D]/g, '&#8221;');
				text = text.replace(/([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g, '$1="$2"'); // untexturize allowed HTML tags params double-quotes
				return $.trim(text);
		},

		initSlides : function(items, start_index){
			if ( items.length < 2 ) {
				$( '.jp-carousel-next-button, .jp-carousel-previous-button' ).hide();
			} else {
				$( '.jp-carousel-next-button, .jp-carousel-previous-button' ).show();
			}

			// Calculate the new src.
			items.each(function(/*i*/){
				var src_item  = $(this),
					orig_size = src_item.data('orig-size') || '',
					max       = gallery.jp_carousel('slideDimensions'),
					parts     = orig_size.split(','),
					medium_file     = src_item.data('medium-file') || '',
					large_file      = src_item.data('large-file') || '',
					src;
				orig_size = {width: parseInt(parts[0], 10), height: parseInt(parts[1], 10)};

// @start-hide-in-jetpack
				if ( 'undefined' !== typeof wpcom ) {
					src = src_item.attr('src') || src_item.attr('original') || src_item.data('original') || src_item.data('lazy-src');
					if (src.indexOf('imgpress') !== -1) {
						src = src_item.data('orig-file');
					}
					src = wpcom.carousel.addWidthToImageURL( src, wpcom.carousel.findFirstLargeEnoughWidth( orig_size.width, orig_size.height, max.width, max.height ) );
				} else {
// @end-hide-in-jetpack
					src = src_item.data('orig-file');

					src = gallery.jp_carousel('selectBestImageSize', {
						orig_file   : src,
						orig_width  : orig_size.width,
						orig_height : orig_size.height,
						max_width   : max.width,
						max_height  : max.height,
						medium_file : medium_file,
						large_file  : large_file
					});
// @start-hide-in-jetpack
				} // end else of if ( 'undefined' != typeof wpcom )
// @end-hide-in-jetpack

				// Set the final src
				$(this).data( 'gallery-src', src );
			});

			// If the start_index is not 0 then preload the clicked image first.
			if ( 0 !== start_index ) {
				$('<img/>')[0].src = $(items[start_index]).data('gallery-src');
			}

			var useInPageThumbnails = items.first().closest( '.tiled-gallery.type-rectangular' ).length > 0;

			// create the 'slide'
			items.each(function(i){
				var src_item        = $(this),
					reblogged       = src_item.data( 'reblogged' ) || 0, // @hide-in-jetpack
					attachment_id   = src_item.data('attachment-id') || 0,
					comments_opened = src_item.data('comments-opened') || 0,
					image_meta      = src_item.data('image-meta') || {},
					orig_size       = src_item.data('orig-size') || '',
					thumb_size      = { width : src_item[0].naturalWidth, height : src_item[0].naturalHeight },
					title           = src_item.data('image-title') || '',
					description     = src_item.data('image-description') || '',
					caption         = src_item.parents('.gallery-item').find('.gallery-caption').html() || '',
					src		= src_item.data('gallery-src') || '',
					medium_file     = src_item.data('medium-file') || '',
					large_file      = src_item.data('large-file') || '',
					orig_file	= src_item.data('orig-file') || '';

				var tiledCaption = src_item.parents('div.tiled-gallery-item').find('div.tiled-gallery-caption').html();
				if ( tiledCaption ) {
					caption = tiledCaption;
				}

				if ( attachment_id && orig_size.length ) {
					title       = gallery.jp_carousel('texturize', title);
					description = gallery.jp_carousel('texturize', description);
					caption     = gallery.jp_carousel('texturize', caption);

					// Initially, the image is a 1x1 transparent gif.  The preview is shown as a background image on the slide itself.
					var image = $( '<img/>' )
						.attr( 'src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' )
						.css( 'width', '100%' )
						.css( 'height', '100%' );

					var slide = $('<div class="jp-carousel-slide" itemprop="associatedMedia" itemscope itemtype="https://schema.org/ImageObject"></div>')
							.hide()
							.css({
								//'position' : 'fixed',
								'left'     : i < start_index ? -1000 : gallery.width()
							})
							.append( image )
							.appendTo(gallery)
							.data('src', src )
							.data('title', title)
							.data('desc', description)
							.data('caption', caption)
							.data('attachment-id', attachment_id)
							.data('permalink', src_item.parents('a').attr('href'))
							.data('orig-size', orig_size)
							.data('comments-opened', comments_opened)
							.data('image-meta', image_meta)
							.data('medium-file', medium_file)
							.data('large-file', large_file)
							.data('orig-file', orig_file)
							.data('thumb-size', thumb_size)
							.data( 'reblogged', reblogged ) // @hide-in-jetpack
							;

						if ( useInPageThumbnails ) {
							// Use the image already loaded in the gallery as a preview.
							slide
								.data( 'preview-image', src_item.attr( 'src' ) )
								.css( {
									'background-image' : 'url("' + src_item.attr( 'src' ) + '")',
									'background-size' : '100% 100%',
									'background-position' : 'center center'
								} );
						}

						slide.jp_carousel( 'fitSlide', false );
				}
			});
			return this;
		},

		selectBestImageSize: function(args) {
			if ( 'object' !== typeof args ) {
				args = {};
			}

			if ( 'undefined' === typeof args.orig_file ) {
				return '';
			}

			if ( 'undefined' === typeof args.orig_width || 'undefined' === typeof args.max_width ) {
				return args.orig_file;
			}

			if ( 'undefined' === typeof args.medium_file || 'undefined' === typeof args.large_file ) {
				return args.orig_file;
			}

			// Check if the image is being served by Photon (using a regular expression on the hostname).

			var imageLinkParser = document.createElement( 'a' );
			imageLinkParser.href = args.large_file;

			var isPhotonUrl = ( imageLinkParser.hostname.match( /^i[\d]{1}.wp.com$/i ) != null );

			var medium_size_parts	= gallery.jp_carousel( 'getImageSizeParts', args.medium_file, args.orig_width, isPhotonUrl );
			var large_size_parts	= gallery.jp_carousel( 'getImageSizeParts', args.large_file, args.orig_width, isPhotonUrl );

			var large_width       = parseInt( large_size_parts[0], 10 ),
				large_height      = parseInt( large_size_parts[1], 10 ),
				medium_width      = parseInt( medium_size_parts[0], 10 ),
				medium_height     = parseInt( medium_size_parts[1], 10 );

			// Assign max width and height.
			args.orig_max_width  = args.max_width;
			args.orig_max_height = args.max_height;

			// Give devices with a higher devicePixelRatio higher-res images (Retina display = 2, Android phones = 1.5, etc)
			if ( 'undefined' !== typeof window.devicePixelRatio && window.devicePixelRatio > 1 ) {
				args.max_width  = args.max_width * window.devicePixelRatio;
				args.max_height = args.max_height * window.devicePixelRatio;
			}

			if ( large_width >= args.max_width || large_height >= args.max_height ) {
				return args.large_file;
			}

			if ( medium_width >= args.max_width || medium_height >= args.max_height ) {
				return args.medium_file;
			}

			return args.orig_file;
		},
// @start-hide-in-jetpack
		show_reblog_box: function() {
			$('#carousel-reblog-box textarea').val(jetpackCarouselStrings.reblog_add_thoughts);
			//t.addClass('selected');
			$('#carousel-reblog-box p.response').remove();
			$('#carousel-reblog-box div.submit, #carousel-reblog-box div.submit span.canceltext').show();
			$('#carousel-reblog-box div.submit input[type=submit]').prop('disabled', false);

			var current = $('.jp-carousel div.selected');
			$('#carousel-reblog-box input#carousel-reblog-post-url').val( current.data('permalink') );
			$('#carousel-reblog-box input#carousel-reblog-post-title').val( $('div.jp-carousel-info').children('h2').text() );

			$('div.jp-carousel-info').append( $('#carousel-reblog-box') ).children().fadeOut('fast');
			$('#carousel-reblog-box').fadeIn('fast');
		},

		hide_reblog_box: function () {
			$( 'div.jp-carousel-info' ).children().not( '#carousel-reblog-box' ).fadeIn( 'fast' );
			$( '#carousel-reblog-box' ).fadeOut( 'fast' );
		},
// @end-hide-in-jetpack

		originalDimensions: function() {
			var splitted = $(this).data('orig-size').split(',');
			return {width: parseInt(splitted[0], 10), height: parseInt(splitted[1], 10)};
		},

		format: function( args ) {
			if ( 'object' !== typeof args ) {
				args = {};
			}
			if ( ! args.text || 'undefined' === typeof args.text ) {
				return;
			}
			if ( ! args.replacements || 'undefined' === typeof args.replacements ) {
				return args.text;
			}
			return args.text.replace(/{(\d+)}/g, function( match, number ) {
				return typeof args.replacements[number] !== 'undefined' ? args.replacements[number] : match;
			});
		},

		/**
		 * Returns a number in a fraction format that represents the shutter speed.
		 * @param Number speed
		 * @return String
		 */
		shutterSpeed: function( speed ) {
			var denominator;

			// round to one decimal if value > 1s by multiplying it by 10, rounding, then dividing by 10 again
			if ( speed >= 1 ) {
				return Math.round( speed * 10 ) / 10 + 's';
			}

			// If the speed is less than one, we find the denominator by inverting
			// the number. Since cameras usually use rational numbers as shutter
			// speeds, we should get a nice round number. Or close to one in cases
			// like 1/30. So we round it.
			denominator = Math.round( 1 / speed );

			return '1/' + denominator + 's';
		},

		parseTitleDesc: function( value ) {
			if ( !value.match(' ') && value.match('_') ) {
				return '';
			}
			// Prefix list originally based on http://commons.wikimedia.org/wiki/MediaWiki:Filename-prefix-blacklist
			$([
				'CIMG',                   // Casio
				'DSC_',                   // Nikon
				'DSCF',                   // Fuji
				'DSCN',                   // Nikon
				'DUW',                    // some mobile phones
				'GEDC',                   // GE
				'IMG',                    // generic
				'JD',                     // Jenoptik
				'MGP',                    // Pentax
				'PICT',                   // misc.
				'Imagen',                 // misc.
				'Foto',                   // misc.
				'DSC',                    // misc.
				'Scan',                   // Scanners
				'SANY',                   // Sanyo
				'SAM',                    // Samsung
				'Screen Shot [0-9]+'      // Mac screenshots
			])
			.each(function(key, val){
				var regex = new RegExp('^' + val);
				if ( regex.test(value) ) {
					value = '';
					return;
				}
			});
			return value;
		},

		getTitleDesc: function( data ) {
			var title ='', desc = '', markup = '', target;

			target = $( 'div.jp-carousel-titleanddesc', 'div.jp-carousel-wrap' );
			target.hide();

			title = gallery.jp_carousel('parseTitleDesc', data.title) || '';
			desc  = gallery.jp_carousel('parseTitleDesc', data.desc)  || '';

			if ( title.length || desc.length ) {
				// Convert from HTML to plain text (including HTML entities decode, etc)
				if ( $('<div />').html( title ).text() === $('<div />').html( desc ).text() ) {
					title = '';
				}

				markup  = ( title.length ) ? '<div class="jp-carousel-titleanddesc-title">' + title + '</div>' : '';
				markup += ( desc.length )  ? '<div class="jp-carousel-titleanddesc-desc">' + desc + '</div>'   : '';

				target.html( markup ).fadeIn('slow');
			}

			$( 'div#jp-carousel-comment-form-container' ).css('margin-top', '20px');
			$( 'div#jp-carousel-comments-loading' ).css('margin-top', '20px');
		},

		// updateExif updates the contents of the exif UL (.jp-carousel-image-exif)
		updateExif: function( meta ) {
			if ( !meta || 1 !== Number( jetpackCarouselStrings.display_exif ) ) {
				return false;
			}

			var $ul = $( '<ul class=\'jp-carousel-image-exif\'></ul>' );

			$.each( meta, function( key, val ) {
				if ( 0 === parseFloat(val) || !val.length || -1 === $.inArray( key, [ 'camera', 'aperture', 'shutter_speed', 'focal_length' ] ) ) {
					return;
				}

				switch( key ) {
					case 'focal_length':
						val = val + 'mm';
						break;
					case 'shutter_speed':
						val = gallery.jp_carousel('shutterSpeed', val);
						break;
					case 'aperture':
						val = 'f/' + val;
						break;
				}

				$ul.append( '<li><h5>' + jetpackCarouselStrings[key] + '</h5>' + val + '</li>' );
			});

			// Update (replace) the content of the ul
			$( 'div.jp-carousel-image-meta ul.jp-carousel-image-exif' ).replaceWith( $ul );
		},

		// updateFullSizeLink updates the contents of the jp-carousel-image-download link
		updateFullSizeLink: function(current) {
			if(!current || !current.data) {
				return false;
			}
			var original,
				origSize = current.data('orig-size').split(',' ),
				imageLinkParser = document.createElement( 'a' );

			imageLinkParser.href = current.data( 'src' ).replace( /\?.+$/, '' );

			// Is this a Photon URL?
			if ( imageLinkParser.hostname.match( /^i[\d]{1}.wp.com$/i ) !== null ) {
				original = imageLinkParser.href;
			} else {
				original = current.data('orig-file').replace(/\?.+$/, '');
			}

			var permalink = $( '<a>'+gallery.jp_carousel('format', {'text': jetpackCarouselStrings.download_original, 'replacements': origSize})+'</a>' )
				.addClass( 'jp-carousel-image-download' )
				.attr( 'href', original )
				.attr( 'target', '_blank' );

			// Update (replace) the content of the anchor
			$( 'div.jp-carousel-image-meta a.jp-carousel-image-download' ).replaceWith( permalink );
		},

		updateMap: function( meta ) {
			if ( !meta.latitude || !meta.longitude || 1 !== Number( jetpackCarouselStrings.display_geo ) ) {
				return;
			}

			var latitude  = meta.latitude,
				longitude = meta.longitude,
				$metabox  = $( 'div.jp-carousel-image-meta', 'div.jp-carousel-wrap' ),
				$mapbox   = $( '<div></div>' ),
				style     = '&scale=2&style=feature:all|element:all|invert_lightness:true|hue:0x0077FF|saturation:-50|lightness:-5|gamma:0.91';

			$mapbox
				.addClass( 'jp-carousel-image-map' )
				.html( '<img width="154" height="154" src="https://maps.googleapis.com/maps/api/staticmap?\
							center=' + latitude + ',' + longitude + '&\
							zoom=8&\
							size=154x154&\
							sensor=false&\
							markers=size:medium%7Ccolor:blue%7C' + latitude + ',' + longitude + style +'" class="gmap-main" />\
							\
						<div class="gmap-topright"><div class="imgclip"><img width="175" height="154" src="https://maps.googleapis.com/maps/api/staticmap?\
							center=' + latitude + ',' + longitude + '&\
							zoom=3&\
							size=175x154&\
							sensor=false&\
							markers=size:small%7Ccolor:blue%7C' + latitude + ',' + longitude + style + '"c /></div></div>\
							\
						' )
				.prependTo( $metabox );
		},

		testCommentsOpened: function( opened ) {
			if ( 1 === parseInt( opened, 10 ) ) {
// @start-hide-in-jetpack
				if ( 1 === Number( jetpackCarouselStrings.is_logged_in ) ) {
					$('.jp-carousel-commentlink').fadeIn('fast');
				} else {
// @end-hide-in-jetpack
					$('.jp-carousel-buttons').fadeIn('fast');
// @start-hide-in-jetpack
				}
// @end-hide-in-jetpack
				commentForm.fadeIn('fast');
			} else {
// @start-hide-in-jetpack
				if ( 1 === Number( jetpackCarouselStrings.is_logged_in ) ) {
					$('.jp-carousel-commentlink').fadeOut('fast');
				} else {
// @end-hide-in-jetpack
					$('.jp-carousel-buttons').fadeOut('fast');
// @start-hide-in-jetpack
				}
// @end-hide-in-jetpack
				commentForm.fadeOut('fast');
			}
		},

		getComments: function( args ) {
			clearInterval( commentInterval );

			if ( 'object' !== typeof args ) {
				return;
			}

			if ( 'undefined' === typeof args.attachment_id || ! args.attachment_id ) {
				return;
			}

			if ( ! args.offset || 'undefined' === typeof args.offset || args.offset < 1 ) {
				args.offset = 0;
			}

			var comments        = $('.jp-carousel-comments'),
				commentsLoading = $('#jp-carousel-comments-loading').show();

			if ( args.clear ) {
				comments.hide().empty();
			}

			$.ajax({
				type:       'GET',
				url:        jetpackCarouselStrings.ajaxurl,
				dataType:   'json',
				data: {
					action: 'get_attachment_comments',
					nonce:  jetpackCarouselStrings.nonce,
					id:     args.attachment_id,
					offset: args.offset
				},
				success: function(data/*, status, xhr*/) {
					if ( args.clear ) {
						comments.fadeOut('fast').empty();
					}

					$( data ).each(function(){
						var comment = $('<div></div>')
							.addClass('jp-carousel-comment')
							.attr('id', 'jp-carousel-comment-' + this['id'])
							.html(
								  '<div class="comment-gravatar">' +
								    this['gravatar_markup'] +
								  '</div>' +
								  '<div class="comment-author">' +
								    this['author_markup'] +
								  '</div>' +
								  '<div class="comment-date">' +
								    this['date_gmt'] +
								  '</div>' +
								  '<div class="comment-content">' +
								    this['content'] +
								  '</div>'
							);
						comments.append(comment);

						// Set the interval to check for a new page of comments.
						clearInterval( commentInterval );
						commentInterval = setInterval( function() {
							if ( ( $('.jp-carousel-overlay').height() - 150 ) < $('.jp-carousel-wrap').scrollTop() + $(window).height() ) {
								gallery.jp_carousel('getComments',{ attachment_id: args.attachment_id, offset: args.offset + 10, clear: false });
								clearInterval( commentInterval );
							}
						}, 300 );
					});

					// Verify (late) that the user didn't repeatldy click the arrows really fast, in which case the requested
					// attachment id might no longer match the current attachment id by the time we get the data back or a now
					// registered infiniscroll event kicks in, so we don't ever display comments for the wrong image by mistake.
					var current = $('.jp-carousel div.selected');
					if ( current && current.data && current.data('attachment-id') != args.attachment_id ) { // jshint ignore:line
						comments.fadeOut('fast');
						comments.empty();
						return;
					}

					// Increase the height of the background, semi-transparent overlay to match the new length of the comments list.
					$('.jp-carousel-overlay').height( $(window).height() + titleAndDescription.height() + commentForm.height() + ( (comments.height() > 0) ? comments.height() : imageMeta.height() ) + 200 );

					comments.show();
					commentsLoading.hide();
				},
				error: function(xhr, status, error) {
					// TODO: proper error handling
					console.log( 'Comment get fail...', xhr, status, error );
					comments.fadeIn('fast');
					commentsLoading.fadeOut('fast');
				}
			});
		},

		postCommentError: function(args) {
			if ( 'object' !== typeof args ) {
				args = {};
			}
			if ( ! args.field || 'undefined' === typeof args.field ||  ! args.error || 'undefined' === typeof args.error ) {
				return;
			}
			$('#jp-carousel-comment-post-results').slideUp('fast').html('<span class="jp-carousel-comment-post-error">'+args.error+'</span>').slideDown('fast');
			$('#jp-carousel-comment-form-spinner').spin(false);
		},

		setCommentIframeSrc: function(attachment_id) {
			var iframe = $('#jp-carousel-comment-iframe');
			// Set the proper irame src for the current attachment id
			if (iframe && iframe.length) {
				iframe.attr('src', iframe.attr('src').replace(/(postid=)\d+/, '$1'+attachment_id) );
				iframe.attr('src', iframe.attr('src').replace(/(%23.+)?$/, '%23jp-carousel-'+attachment_id) );
			}
		},

		clearCommentTextAreaValue: function() {
			var commentTextArea = $('#jp-carousel-comment-form-comment-field');
			if ( commentTextArea ) {
				commentTextArea.val('');
			}
		},

		nextSlide : function () {
			var slides = this.jp_carousel( 'slides' );
			var selected = this.jp_carousel( 'selectedSlide' );

			if ( selected.length === 0 || ( slides.length > 2 && selected.is( slides.last() ) ) ) {
				return slides.first();
			}

			return selected.next();
		},

		prevSlide : function () {
			var slides = this.jp_carousel( 'slides' );
			var selected = this.jp_carousel( 'selectedSlide' );

			if ( selected.length === 0 || ( slides.length > 2 && selected.is( slides.first() ) ) ) {
				return slides.last();
			}

			return selected.prev();
		},

		loadFullImage : function ( slide ) {
			var image = slide.find( 'img:first' );

			if ( ! image.data( 'loaded' ) ) {
				// If the width of the slide is smaller than the width of the "thumbnail" we're already using,
				// don't load the full image.

				image.on( 'load.jetpack', function () {
					image.off( 'load.jetpack' );
					$( this ).closest( '.jp-carousel-slide' ).css( 'background-image', '' );
				} );

				if ( ! slide.data( 'preview-image' ) || ( slide.data( 'thumb-size' ) && slide.width() > slide.data( 'thumb-size' ).width ) ) {
					image.attr( 'src', image.closest( '.jp-carousel-slide' ).data( 'src' ) ).attr('itemprop', 'image');
				} else {
					image.attr( 'src', slide.data( 'preview-image' ) ).attr('itemprop', 'image');
				}

				image.data( 'loaded', 1 );
			}
		},

		hasMultipleImages : function () {
			return gallery.jp_carousel('slides').length > 1;
		}
	};

	$.fn.jp_carousel = function(method){
		// ask for the HTML of the gallery
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.open.apply( this, arguments );
		} else {
			$.error( 'Method ' +	method + ' does not exist on jQuery.jp_carousel' );
		}

	};

	// register the event listener for starting the gallery
	$( document.body ).on( 'click.jp-carousel', 'div.gallery,div.tiled-gallery, a.single-image-gallery', function(e) {
		if ( ! $(this).jp_carousel( 'testForData', e.currentTarget ) ) {
			return;
		}
		if ( $(e.target).parent().hasClass('gallery-caption') ) {
			return;
		}
		e.preventDefault();

		// Stopping propagation in case there are parent elements
		// with .gallery or .tiled-gallery class
		e.stopPropagation();
		$(this).jp_carousel('open', {start_index: $(this).find('.gallery-item, .tiled-gallery-item').index($(e.target).parents('.gallery-item, .tiled-gallery-item'))});
	});

	// handle lightbox (single image gallery) for images linking to 'Attachment Page'
	if ( 1 === Number( jetpackCarouselStrings.single_image_gallery ) ) {
		// process links that contain img tag with attribute data-attachment-id
		$( 'a img[data-attachment-id]' ).each(function() {
			var container = $( this ).parent();

			// skip if image was already added to gallery by shortcode
			if( container.parent( '.gallery-icon' ).length ) {
				return;
			}

			var valid = false;

			// if link points to 'Media File' and flag is set allow it
			if ( $( container ).attr( 'href' ) === $( this ).attr( 'data-orig-file' ) &&
				1 === Number( jetpackCarouselStrings.single_image_gallery_media_file )
			) {
				valid = true;
			}

			// if link points to 'Attachment Page' allow it
			if( $( container ).attr( 'href' ) === $( this ).attr( 'data-permalink' ) ) {
				valid = true;
			}

			// links to 'Custom URL' or 'Media File' when flag not set are not valid
			if( ! valid ) {
				return;
			}

			// make this node a gallery recognizable by event listener above
			$( container ).addClass( 'single-image-gallery' ) ;
			// blog_id is needed to allow posting comments to correct blog
			$( container ).data( 'carousel-extra', { blog_id: Number( jetpackCarouselStrings.blog_id ) } );
		});
	}

	// Makes carousel work on page load and when back button leads to same URL with carousel hash (ie: no actual document.ready trigger)
	$( window ).on( 'hashchange.jp-carousel', function () {

		var hashRegExp = /jp-carousel-(\d+)/,
			matches, attachmentId, galleries, selectedThumbnail;

		if ( ! window.location.hash || ! hashRegExp.test( window.location.hash ) ) {
			if ( gallery && gallery.opened ) {
				container.jp_carousel( 'close' );
			}

			return;
		}

		if ( ( window.location.hash === last_known_location_hash ) && gallery.opened ) {
			return;
		}

		if ( window.location.hash && gallery && !gallery.opened && history.back) {
			history.back();
			return;
		}

		last_known_location_hash = window.location.hash;
		matches = window.location.hash.match( hashRegExp );
		attachmentId = parseInt( matches[1], 10 );
		galleries = $( 'div.gallery, div.tiled-gallery, a.single-image-gallery' );

		// Find the first thumbnail that matches the attachment ID in the location
		// hash, then open the gallery that contains it.
		galleries.each( function( _, galleryEl ) {
			$( galleryEl ).find('img').each( function( imageIndex, imageEl ) {
				if ( $( imageEl ).data( 'attachment-id' ) === parseInt( attachmentId, 10 ) ) {
					selectedThumbnail = { index: imageIndex, gallery: galleryEl };
					return false;
				}
			});

			if ( selectedThumbnail ) {
				$( selectedThumbnail.gallery )
					.jp_carousel( 'openOrSelectSlide', selectedThumbnail.index );
				return false;
			}
		});
	});

	if ( window.location.hash ) {
		$( window ).trigger( 'hashchange' );
	}
});

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * Version 1.1.1, modified to pass the touchmove event to the callbacks.
 */
(function($) {
$.fn.touchwipe = function(settings) {
	var config = {
			min_move_x: 20,
			min_move_y: 20,
			wipeLeft: function(/*e*/) { },
			wipeRight: function(/*e*/) { },
			wipeUp: function(/*e*/) { },
			wipeDown: function(/*e*/) { },
			preventDefaultEvents: true
	};

	if (settings) {
		$.extend(config, settings);
	}

	this.each(function() {
		var startX;
		var startY;
		var isMoving = false;

		function cancelTouch() {
			this.removeEventListener('touchmove', onTouchMove);
			startX = null;
			isMoving = false;
		}

		function onTouchMove(e) {
			if(config.preventDefaultEvents) {
				e.preventDefault();
			}
			if(isMoving) {
				var x = e.touches[0].pageX;
				var y = e.touches[0].pageY;
				var dx = startX - x;
				var dy = startY - y;
				if(Math.abs(dx) >= config.min_move_x) {
					cancelTouch();
					if(dx > 0) {
						config.wipeLeft(e);
					} else {
						config.wipeRight(e);
					}
				}
				else if(Math.abs(dy) >= config.min_move_y) {
						cancelTouch();
						if(dy > 0) {
							config.wipeDown(e);
						} else {
							config.wipeUp(e);
						}
					}
			}
		}

		function onTouchStart(e)
		{
			if (e.touches.length === 1) {
				startX = e.touches[0].pageX;
				startY = e.touches[0].pageY;
				isMoving = true;
				this.addEventListener('touchmove', onTouchMove, false);
			}
		}
		if ('ontouchstart' in document.documentElement) {
			this.addEventListener('touchstart', onTouchStart, false);
		}
	});

	return this;
};
})(jQuery);
;
/* global WPCOM_sharing_counts, Recaptcha */
var sharing_js_options;
if ( sharing_js_options && sharing_js_options.counts ) {
	var WPCOMSharing = {
		done_urls : [],
		get_counts : function() {
			var url, requests, id, service, service_request;

			if ( 'undefined' === typeof WPCOM_sharing_counts ) {
				return;
			}

			for ( url in WPCOM_sharing_counts ) {
				id = WPCOM_sharing_counts[ url ];

				if ( 'undefined' !== typeof WPCOMSharing.done_urls[ id ] ) {
					continue;
				}

				requests = {
					// LinkedIn actually gets the share count for both the http and https version automatically -- so we don't need to do extra magic
					linkedin: [
						'https://www.linkedin.com/countserv/count/share?format=jsonp&callback=WPCOMSharing.update_linkedin_count&url=' +
							encodeURIComponent( url )
					],
					// Pinterest, like LinkedIn, handles share counts for both http and https
					pinterest: [
						window.location.protocol +
							'//api.pinterest.com/v1/urls/count.json?callback=WPCOMSharing.update_pinterest_count&url=' +
							encodeURIComponent( url )
					],
					// Facebook protocol summing has been shown to falsely double counts, so we only request the current URL
					facebook: [
						window.location.protocol +
							'//graph.facebook.com/?callback=WPCOMSharing.update_facebook_count&ids=' +
							encodeURIComponent( url )
					]
				};

				for ( service in requests ) {
					if ( ! jQuery( 'a[data-shared=sharing-' + service + '-' + id  + ']' ).length ) {
						continue;
					}

					while ( ( service_request = requests[ service ].pop() ) ) {
						jQuery.getScript( service_request );
					}

					WPCOMSharing.bump_sharing_count_stat( service );
				}

				WPCOMSharing.done_urls[ id ] = true;
			}
		},

		// get the version of the url that was stored in the dom (sharing-$service-URL)
		get_permalink: function( url ) {
			if ( 'https:' === window.location.protocol ) {
				url = url.replace( /^http:\/\//i, 'https://' );
			} else {
				url = url.replace( /^https:\/\//i, 'http://' );
			}

			return url;
		},
		update_facebook_count: function( data ) {
			var url, permalink;

			if ( ! data ) {
				return;
			}

			for ( url in data ) {
				if ( ! data.hasOwnProperty( url ) || ! data[ url ].share || ! data[ url ].share.share_count ) {
					continue;
				}

				permalink = WPCOMSharing.get_permalink( url );

				if ( ! ( permalink in WPCOM_sharing_counts ) ) {
					continue;
				}

				WPCOMSharing.inject_share_count( 'sharing-facebook-' + WPCOM_sharing_counts[ permalink ], data[ url ].share.share_count );
			}
		},
		update_linkedin_count : function( data ) {
			if ( 'undefined' !== typeof data.count && ( data.count * 1 ) > 0 ) {
				WPCOMSharing.inject_share_count( 'sharing-linkedin-' + WPCOM_sharing_counts[ data.url ], data.count );
			}
		},
		update_pinterest_count : function( data ) {
			if ( 'undefined' !== typeof data.count && ( data.count * 1 ) > 0 ) {
				WPCOMSharing.inject_share_count( 'sharing-pinterest-' + WPCOM_sharing_counts[ data.url ], data.count );
			}
		},
		inject_share_count : function( id, count ) {
			var $share = jQuery( 'a[data-shared=' + id + '] > span');
			$share.find( '.share-count' ).remove();
			$share.append( '<span class="share-count">' + WPCOMSharing.format_count( count ) + '</span>' );
		},
		format_count : function( count ) {
			if ( count < 1000 ) {
				return count;
			}
			if ( count >= 1000 && count < 10000 ) {
				return String( count ).substring( 0, 1 ) + 'K+';
			}
			return '10K+';
		},
		bump_sharing_count_stat: function( service ) {
			new Image().src = document.location.protocol + '//pixel.wp.com/g.gif?v=wpcom-no-pv&x_sharing-count-request=' + service + '&r=' + Math.random();
		}
	};
}

(function($){
	var $body, $sharing_email;

	$.fn.extend( {
		share_is_email: function() {
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test( this.val() );
		}
	} );

	$body = $( document.body ).on( 'post-load', WPCOMSharing_do );
	$( document ).on( 'ready', function() {
		$sharing_email = $( '#sharing_email' );
		$body.append( $sharing_email );
		WPCOMSharing_do();
	} );

	function WPCOMSharing_do() {
		var $more_sharing_buttons;
		if ( 'undefined' !== typeof WPCOMSharing ) {
			WPCOMSharing.get_counts();
		}
		$more_sharing_buttons = $( '.sharedaddy a.sharing-anchor' );

		$more_sharing_buttons.click( function() {
			return false;
		} );

		$( '.sharedaddy a' ).each( function() {
			if ( $( this ).attr( 'href' ) && $( this ).attr( 'href' ).indexOf( 'share=' ) !== -1 ) {
				$( this ).attr( 'href', $( this ).attr( 'href' ) + '&nb=1' );
			}
		} );

		// Show hidden buttons

		// Touchscreen device: use click.
		// Non-touchscreen device: use click if not already appearing due to a hover event
		$more_sharing_buttons.on( 'click', function() {
			var $more_sharing_button = $( this ),
				$more_sharing_pane = $more_sharing_button.parents( 'div:first' ).find( '.inner' );

			if ( $more_sharing_pane.is( ':animated' ) ) {
				// We're in the middle of some other event's animation
				return;
			}

			if ( true === $more_sharing_pane.data( 'justSlid' ) ) {
				// We just finished some other event's animation - don't process click event so that slow-to-react-clickers don't get confused
				return;
			}

			$sharing_email.slideUp( 200 );

			$more_sharing_pane.css( {
				left: $more_sharing_button.position().left + 'px',
				top: $more_sharing_button.position().top + $more_sharing_button.height() + 3 + 'px'
			} ).slideToggle( 200 );
		} );

		if ( document.ontouchstart === undefined ) {
			// Non-touchscreen device: use hover/mouseout with delay
			$more_sharing_buttons.hover( function() {
				var $more_sharing_button = $( this ),
					$more_sharing_pane = $more_sharing_button.parents( 'div:first' ).find( '.inner' ),
					timer;

				if ( ! $more_sharing_pane.is( ':animated' ) ) {
					// Create a timer to make the area appear if the mouse hovers for a period
					timer = setTimeout( function() {
						var handler_item_leave, handler_item_enter, handler_original_leave, handler_original_enter, close_it;

						$sharing_email.slideUp( 200 );

						$more_sharing_pane.data( 'justSlid', true );
						$more_sharing_pane.css( {
							left: $more_sharing_button.position().left + 'px',
							top: $more_sharing_button.position().top + $more_sharing_button.height() + 3 + 'px'
						} ).slideDown( 200, function() {
							// Mark the item as have being appeared by the hover
							$more_sharing_button.data( 'hasoriginal', true ).data( 'hasitem', false );

							setTimeout( function() {
								$more_sharing_pane.data( 'justSlid', false );
							}, 300 );

							if ( $more_sharing_pane.find( '.share-google-plus-1' ).size() ) {
								// The pane needs to stay open for the Google+ Button
								return;
							}

							$more_sharing_pane.mouseleave( handler_item_leave ).mouseenter( handler_item_enter );
							$more_sharing_button.mouseleave( handler_original_leave ).mouseenter( handler_original_enter );
						} );

						// The following handlers take care of the mouseenter/mouseleave for the share button and the share area - if both are left then we close the share area
						handler_item_leave = function() {
							$more_sharing_button.data( 'hasitem', false );

							if ( $more_sharing_button.data( 'hasoriginal' ) === false ) {
								var timer = setTimeout( close_it, 800 );
								$more_sharing_button.data( 'timer2', timer );
							}
						};

						handler_item_enter = function() {
							$more_sharing_button.data( 'hasitem', true );
							clearTimeout( $more_sharing_button.data( 'timer2' ) );
						};

						handler_original_leave = function() {
							$more_sharing_button.data( 'hasoriginal', false );

							if ( $more_sharing_button.data( 'hasitem' ) === false ) {
								var timer = setTimeout( close_it, 800 );
								$more_sharing_button.data( 'timer2', timer );
							}
						};

						handler_original_enter = function() {
							$more_sharing_button.data( 'hasoriginal', true );
							clearTimeout( $more_sharing_button.data( 'timer2' ) );
						};

						close_it = function() {
							$more_sharing_pane.data( 'justSlid', true );
							$more_sharing_pane.slideUp( 200, function() {
								setTimeout( function() {
									$more_sharing_pane.data( 'justSlid', false );
								}, 300 );
							} );

							// Clear all hooks
							$more_sharing_button.unbind( 'mouseleave', handler_original_leave ).unbind( 'mouseenter', handler_original_enter );
							$more_sharing_pane.unbind( 'mouseleave', handler_item_leave ).unbind( 'mouseenter', handler_item_leave );
							return false;
						};
					}, 200 );

					// Remember the timer so we can detect it on the mouseout
					$more_sharing_button.data( 'timer', timer );
				}
			}, function() {
				// Mouse out - remove any timer
				$more_sharing_buttons.each( function() {
					clearTimeout( $( this ).data( 'timer' ) );
				} );
				$more_sharing_buttons.data( 'timer', false );
			} );
		}

		$( document ).click(function() {

			// Click outside
			// remove any timer
			$more_sharing_buttons.each( function() {
				clearTimeout( $( this ).data( 'timer' ) );
			} );
			$more_sharing_buttons.data( 'timer', false );

			// slide down forcibly
			$( '.sharedaddy .inner' ).slideUp();

		});

		// Add click functionality
		$( '.sharedaddy ul' ).each( function() {

			if ( 'yep' === $( this ).data( 'has-click-events' ) ) {
				return;
			}
			$( this ).data( 'has-click-events', 'yep' );

			var printUrl = function ( uniqueId, urlToPrint ) {
				$( 'body:first' ).append( '<iframe style="position:fixed;top:100;left:100;height:1px;width:1px;border:none;" id="printFrame-' + uniqueId + '" name="printFrame-' + uniqueId + '" src="' + urlToPrint + '" onload="frames[\'printFrame-' + uniqueId + '\'].focus();frames[\'printFrame-' + uniqueId + '\'].print();"></iframe>' );
			};

			// Print button
			$( this ).find( 'a.share-print' ).click( function() {
				var ref = $( this ).attr( 'href' ),
					do_print = function() {
						if ( ref.indexOf( '#print' ) === -1 ) {
							var uid = new Date().getTime();
							printUrl( uid , ref );
						} else {
							print();
						}
					};

				// Is the button in a dropdown?
				if ( $( this ).parents( '.sharing-hidden' ).length > 0 ) {
					$( this ).parents( '.inner' ).slideUp( 0, function() {
						do_print();
					} );
				} else {
					do_print();
				}

				return false;
			} );

			// Press This button
			$( this ).find( 'a.share-press-this' ).click( function() {
				var s = '';

				if ( window.getSelection ) {
					s = window.getSelection();
				} else if( document.getSelection ) {
					s = document.getSelection();
				} else if( document.selection ) {
					s = document.selection.createRange().text;
				}

				if ( s ) {
					$( this ).attr( 'href', $( this ).attr( 'href' ) + '&sel=' + encodeURI( s ) );
				}

				if ( !window.open( $( this ).attr( 'href' ), 't', 'toolbar=0,resizable=1,scrollbars=1,status=1,width=720,height=570' ) ) {
					document.location.href = $( this ).attr( 'href' );
				}

				return false;
			} );

			// Email button
			$( 'a.share-email', this ).on( 'click', function() {
				var url = $( this ).attr( 'href' ), key;

				if ( $sharing_email.is( ':visible' ) ) {
					$sharing_email.slideUp( 200 );
				} else {
					$( '.sharedaddy .inner' ).slideUp();

					$( '#sharing_email .response' ).remove();
					$( '#sharing_email form' ).show();
					$( '#sharing_email form input[type=submit]' ).removeAttr( 'disabled' );
					$( '#sharing_email form a.sharing_cancel' ).show();

					key = '';
					if ( $( '#recaptcha_public_key' ).length > 0 ) {
						key = $( '#recaptcha_public_key' ).val();
					}

					// Update the recaptcha
					Recaptcha.create( key, 'sharing_recaptcha', { lang : sharing_js_options.lang } );

					// Show dialog
					$sharing_email.css( {
						left: $( this ).offset().left + 'px',
						top: $( this ).offset().top + $( this ).height() + 'px'
					} ).slideDown( 200 );

					// Hook up other buttons
					$( '#sharing_email a.sharing_cancel' ).unbind( 'click' ).click( function() {
						$( '#sharing_email .errors' ).hide();
						$sharing_email.slideUp( 200 );
						$( '#sharing_background' ).fadeOut();
						return false;
					} );

					// Submit validation
					$( '#sharing_email input[type=submit]' ).unbind( 'click' ).click( function() {
						var form = $( this ).parents( 'form' );

						// Disable buttons + enable loading icon
						$( this ).prop( 'disabled', true );
						form.find( 'a.sharing_cancel' ).hide();
						form.find( 'img.loading' ).show();

						$( '#sharing_email .errors' ).hide();
						$( '#sharing_email .error' ).removeClass( 'error' );

						if ( ! $( '#sharing_email input[name=source_email]' ).share_is_email() ) {
							$( '#sharing_email input[name=source_email]' ).addClass( 'error' );
						}

						if ( ! $( '#sharing_email input[name=target_email]' ).share_is_email() ) {
							$( '#sharing_email input[name=target_email]' ).addClass( 'error' );
						}

						if ( $( '#sharing_email .error' ).length === 0 ) {
							// AJAX send the form
							$.ajax( {
								url: url,
								type: 'POST',
								data: form.serialize(),
								success: function( response ) {
									form.find( 'img.loading' ).hide();

									if ( response === '1' || response === '2' || response === '3' ) {
										$( '#sharing_email .errors-' + response ).show();
										form.find( 'input[type=submit]' ).removeAttr( 'disabled' );
										form.find( 'a.sharing_cancel' ).show();
										Recaptcha.reload();
									}
									else {
										$( '#sharing_email form' ).hide();
										$sharing_email.append( response );
										$( '#sharing_email a.sharing_cancel' ).click( function() {
											$sharing_email.slideUp( 200 );
											$( '#sharing_background' ).fadeOut();
											return false;
										} );
									}
								}
							} );

							return false;
						}

						form.find( 'img.loading' ).hide();
						form.find( 'input[type=submit]' ).removeAttr( 'disabled' );
						form.find( 'a.sharing_cancel' ).show();
						$( '#sharing_email .errors-1' ).show();

						return false;
					} );
				}

				return false;
			} );
		} );

		$( 'li.share-email, li.share-custom a.sharing-anchor' ).addClass( 'share-service-visible' );
	}
})( jQuery );

// Recaptcha code
/* jshint ignore:start */
var RecaptchaTemplates={};RecaptchaTemplates.VertHtml='<table id="recaptcha_table" class="recaptchatable" > <tr> <td colspan="6" class=\'recaptcha_r1_c1\'></td> </tr> <tr> <td class=\'recaptcha_r2_c1\'></td> <td colspan="4" class=\'recaptcha_image_cell\'><div id="recaptcha_image"></div></td> <td class=\'recaptcha_r2_c2\'></td> </tr> <tr> <td rowspan="6" class=\'recaptcha_r3_c1\'></td> <td colspan="4" class=\'recaptcha_r3_c2\'></td> <td rowspan="6" class=\'recaptcha_r3_c3\'></td> </tr> <tr> <td rowspan="3" class=\'recaptcha_r4_c1\' height="49"> <div class="recaptcha_input_area"> <label for="recaptcha_response_field" class="recaptcha_input_area_text"><span id="recaptcha_instructions_image" class="recaptcha_only_if_image recaptcha_only_if_no_incorrect_sol"></span><span id="recaptcha_instructions_audio" class="recaptcha_only_if_no_incorrect_sol recaptcha_only_if_audio"></span><span id="recaptcha_instructions_error" class="recaptcha_only_if_incorrect_sol"></span></label><br/> <input name="recaptcha_response_field" id="recaptcha_response_field" type="text" /> </div> </td> <td rowspan="4" class=\'recaptcha_r4_c2\'></td> <td><a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="17" /></a></td> <td rowspan="4" class=\'recaptcha_r4_c4\'></td> </tr> <tr> <td><a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="16" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="16" alt=""/></a></td> </tr> <tr> <td><a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a></td> </tr> <tr> <td class=\'recaptcha_r7_c1\'></td> <td class=\'recaptcha_r8_c1\'></td> </tr> </table> ';RecaptchaTemplates.CleanCss=".recaptchatable td img{display:block}.recaptchatable .recaptcha_image_cell center img{height:57px}.recaptchatable .recaptcha_image_cell center{height:57px}.recaptchatable .recaptcha_image_cell{background-color:white;height:57px;padding:7px!important}.recaptchatable,#recaptcha_area tr,#recaptcha_area td,#recaptcha_area th{margin:0!important;border:0!important;border-collapse:collapse!important;vertical-align:middle!important}.recaptchatable *{margin:0;padding:0;border:0;color:black;position:static;top:auto;left:auto;right:auto;bottom:auto;text-align:left!important}.recaptchatable #recaptcha_image{margin:auto;border:1px solid #dfdfdf!important}.recaptchatable a img{border:0}.recaptchatable a,.recaptchatable a:hover{-moz-outline:none;border:0!important;padding:0!important;text-decoration:none;color:blue;background:none!important;font-weight:normal}.recaptcha_input_area{position:relative!important;background:none!important}.recaptchatable label.recaptcha_input_area_text{border:1px solid #dfdfdf!important;margin:0!important;padding:0!important;position:static!important;top:auto!important;left:auto!important;right:auto!important;bottom:auto!important}.recaptcha_theme_red label.recaptcha_input_area_text,.recaptcha_theme_white label.recaptcha_input_area_text{color:black!important}.recaptcha_theme_blackglass label.recaptcha_input_area_text{color:white!important}.recaptchatable #recaptcha_response_field{font-size:11pt}.recaptcha_theme_blackglass #recaptcha_response_field,.recaptcha_theme_white #recaptcha_response_field{border:1px solid gray}.recaptcha_theme_red #recaptcha_response_field{border:1px solid #cca940}.recaptcha_audio_cant_hear_link{font-size:7pt;color:black}.recaptchatable{line-height:1em;border:1px solid #dfdfdf!important}.recaptcha_error_text{color:red}";RecaptchaTemplates.CleanHtml='<table id="recaptcha_table" class="recaptchatable"> <tr height="73"> <td class=\'recaptcha_image_cell\' width="302"><center><div id="recaptcha_image"></div></center></td> <td style="padding: 10px 7px 7px 7px;"> <a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="18" alt="" /></a> <a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="15" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="15" alt=""/></a> <a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a> </td> <td style="padding: 18px 7px 18px 7px;"> <img id=\'recaptcha_logo\' alt="" width="71" height="36" /> </td> </tr> <tr> <td style="padding-left: 7px;"> <div class="recaptcha_input_area" style="padding-top: 2px; padding-bottom: 7px;"> <input style="border: 1px solid #3c3c3c; width: 302px;" name="recaptcha_response_field" id="recaptcha_response_field" type="text" /> </div> </td> <td></td> <td style="padding: 4px 7px 12px 7px;"> <img id="recaptcha_tagline" width="71" height="17" /> </td> </tr> </table> ';RecaptchaTemplates.ContextHtml='<table id="recaptcha_table" class="recaptchatable"> <tr> <td colspan="6" class=\'recaptcha_r1_c1\'></td> </tr> <tr> <td class=\'recaptcha_r2_c1\'></td> <td colspan="4" class=\'recaptcha_image_cell\'><div id="recaptcha_image"></div></td> <td class=\'recaptcha_r2_c2\'></td> </tr> <tr> <td rowspan="6" class=\'recaptcha_r3_c1\'></td> <td colspan="4" class=\'recaptcha_r3_c2\'></td> <td rowspan="6" class=\'recaptcha_r3_c3\'></td> </tr> <tr> <td rowspan="3" class=\'recaptcha_r4_c1\' height="49"> <div class="recaptcha_input_area"> <label for="recaptcha_response_field" class="recaptcha_input_area_text"><span id="recaptcha_instructions_context" class="recaptcha_only_if_image recaptcha_only_if_no_incorrect_sol"></span><span id="recaptcha_instructions_audio" class="recaptcha_only_if_no_incorrect_sol recaptcha_only_if_audio"></span><span id="recaptcha_instructions_error" class="recaptcha_only_if_incorrect_sol"></span></label><br/> <input name="recaptcha_response_field" id="recaptcha_response_field" type="text" /> </div> </td> <td rowspan="4" class=\'recaptcha_r4_c2\'></td> <td><a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="17" /></a></td> <td rowspan="4" class=\'recaptcha_r4_c4\'></td> </tr> <tr> <td><a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="16" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="16" alt=""/></a></td> </tr> <tr> <td><a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a></td> </tr> <tr> <td class=\'recaptcha_r7_c1\'></td> <td class=\'recaptcha_r8_c1\'></td> </tr> </table> ';RecaptchaTemplates.VertCss=".recaptchatable td img{display:block}.recaptchatable .recaptcha_r1_c1{background:url(IMGROOT/sprite.png) 0 -63px no-repeat;width:318px;height:9px}.recaptchatable .recaptcha_r2_c1{background:url(IMGROOT/sprite.png) -18px 0 no-repeat;width:9px;height:57px}.recaptchatable .recaptcha_r2_c2{background:url(IMGROOT/sprite.png) -27px 0 no-repeat;width:9px;height:57px}.recaptchatable .recaptcha_r3_c1{background:url(IMGROOT/sprite.png) 0 0 no-repeat;width:9px;height:63px}.recaptchatable .recaptcha_r3_c2{background:url(IMGROOT/sprite.png) -18px -57px no-repeat;width:300px;height:6px}.recaptchatable .recaptcha_r3_c3{background:url(IMGROOT/sprite.png) -9px 0 no-repeat;width:9px;height:63px}.recaptchatable .recaptcha_r4_c1{background:url(IMGROOT/sprite.png) -43px 0 no-repeat;width:171px;height:49px}.recaptchatable .recaptcha_r4_c2{background:url(IMGROOT/sprite.png) -36px 0 no-repeat;width:7px;height:57px}.recaptchatable .recaptcha_r4_c4{background:url(IMGROOT/sprite.png) -214px 0 no-repeat;width:97px;height:57px}.recaptchatable .recaptcha_r7_c1{background:url(IMGROOT/sprite.png) -43px -49px no-repeat;width:171px;height:8px}.recaptchatable .recaptcha_r8_c1{background:url(IMGROOT/sprite.png) -43px -49px no-repeat;width:25px;height:8px}.recaptchatable .recaptcha_image_cell center img{height:57px}.recaptchatable .recaptcha_image_cell center{height:57px}.recaptchatable .recaptcha_image_cell{background-color:white;height:57px}#recaptcha_area,#recaptcha_table{width:318px!important}.recaptchatable,#recaptcha_area tr,#recaptcha_area td,#recaptcha_area th{margin:0!important;border:0!important;padding:0!important;border-collapse:collapse!important;vertical-align:middle!important}.recaptchatable *{margin:0;padding:0;border:0;font-family:helvetica,sans-serif;font-size:8pt;color:black;position:static;top:auto;left:auto;right:auto;bottom:auto;text-align:left!important}.recaptchatable #recaptcha_image{margin:auto}.recaptchatable img{border:0!important;margin:0!important;padding:0!important}.recaptchatable a,.recaptchatable a:hover{-moz-outline:none;border:0!important;padding:0!important;text-decoration:none;color:blue;background:none!important;font-weight:normal}.recaptcha_input_area{position:relative!important;width:146px!important;height:45px!important;margin-left:20px!important;margin-right:5px!important;margin-top:4px!important;background:none!important}.recaptchatable label.recaptcha_input_area_text{margin:0!important;padding:0!important;position:static!important;top:auto!important;left:auto!important;right:auto!important;bottom:auto!important;background:none!important;height:auto!important;width:auto!important}.recaptcha_theme_red label.recaptcha_input_area_text,.recaptcha_theme_white label.recaptcha_input_area_text{color:black!important}.recaptcha_theme_blackglass label.recaptcha_input_area_text{color:white!important}.recaptchatable #recaptcha_response_field{width:145px!important;position:absolute!important;bottom:7px!important;padding:0!important;margin:0!important;font-size:10pt}.recaptcha_theme_blackglass #recaptcha_response_field,.recaptcha_theme_white #recaptcha_response_field{border:1px solid gray}.recaptcha_theme_red #recaptcha_response_field{border:1px solid #cca940}.recaptcha_audio_cant_hear_link{font-size:7pt;color:black}.recaptchatable{line-height:1em}#recaptcha_instructions_error{color:red!important}";var RecaptchaStr_en={visual_challenge:"Get a visual challenge",audio_challenge:"Get an audio challenge",refresh_btn:"Get a new challenge",instructions_visual:"Type the two words:",instructions_context:"Type the words in the boxes:",instructions_audio:"Type what you hear:",help_btn:"Help",play_again:"Play sound again",cant_hear_this:"Download sound as MP3",incorrect_try_again:"Incorrect. Try again."},RecaptchaStr_de={visual_challenge:"Visuelle Aufgabe generieren",audio_challenge:"Audio-Aufgabe generieren",
refresh_btn:"Neue Aufgabe generieren",instructions_visual:"Gib die 2 W\u00f6rter ein:",instructions_context:"",instructions_audio:"Gib die 8 Ziffern ein:",help_btn:"Hilfe",incorrect_try_again:"Falsch. Nochmals versuchen!"},RecaptchaStr_es={visual_challenge:"Obt\u00e9n un reto visual",audio_challenge:"Obt\u00e9n un reto audible",refresh_btn:"Obt\u00e9n un nuevo reto",instructions_visual:"Escribe las 2 palabras:",instructions_context:"",instructions_audio:"Escribe los 8 n\u00fameros:",help_btn:"Ayuda",
incorrect_try_again:"Incorrecto. Otro intento."},RecaptchaStr_fr={visual_challenge:"D\u00e9fi visuel",audio_challenge:"D\u00e9fi audio",refresh_btn:"Nouveau d\u00e9fi",instructions_visual:"Entrez les deux mots:",instructions_context:"",instructions_audio:"Entrez les huit chiffres:",help_btn:"Aide",incorrect_try_again:"Incorrect."},RecaptchaStr_nl={visual_challenge:"Test me via een afbeelding",audio_challenge:"Test me via een geluidsfragment",refresh_btn:"Nieuwe uitdaging",instructions_visual:"Type de twee woorden:",
instructions_context:"",instructions_audio:"Type de acht cijfers:",help_btn:"Help",incorrect_try_again:"Foute invoer."},RecaptchaStr_pt={visual_challenge:"Obter um desafio visual",audio_challenge:"Obter um desafio sonoro",refresh_btn:"Obter um novo desafio",instructions_visual:"Escreva as 2 palavras:",instructions_context:"",instructions_audio:"Escreva os 8 numeros:",help_btn:"Ajuda",incorrect_try_again:"Incorrecto. Tenta outra vez."},RecaptchaStr_ru={visual_challenge:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443",
audio_challenge:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0437\u0432\u0443\u043a\u043e\u0432\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443",refresh_btn:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443",instructions_visual:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0432\u0430 \u0441\u043b\u043e\u0432\u0430:",instructions_context:"",instructions_audio:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u043e\u0441\u0435\u043c\u044c \u0447\u0438\u0441\u0435\u043b:",
help_btn:"\u041f\u043e\u043c\u043e\u0449\u044c",incorrect_try_again:"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e."},RecaptchaStr_tr={visual_challenge:"G\u00f6rsel deneme",audio_challenge:"\u0130\u015fitsel deneme",refresh_btn:"Yeni deneme",instructions_visual:"\u0130ki kelimeyi yaz\u0131n:",instructions_context:"",instructions_audio:"Sekiz numaray\u0131 yaz\u0131n:",help_btn:"Yard\u0131m (\u0130ngilizce)",incorrect_try_again:"Yanl\u0131\u015f. Bir daha deneyin."},RecaptchaStr_it=
{visual_challenge:"Modalit\u00e0 visiva",audio_challenge:"Modalit\u00e0 auditiva",refresh_btn:"Chiedi due nuove parole",instructions_visual:"Scrivi le due parole:",instructions_context:"",instructions_audio:"Trascrivi ci\u00f2 che senti:",help_btn:"Aiuto",incorrect_try_again:"Scorretto. Riprova."},RecaptchaLangMap={en:RecaptchaStr_en,de:RecaptchaStr_de,es:RecaptchaStr_es,fr:RecaptchaStr_fr,nl:RecaptchaStr_nl,pt:RecaptchaStr_pt,ru:RecaptchaStr_ru,tr:RecaptchaStr_tr,it:RecaptchaStr_it};var RecaptchaStr=RecaptchaStr_en,RecaptchaOptions,RecaptchaDefaultOptions={tabindex:0,theme:"red",callback:null,lang:"en",custom_theme_widget:null,custom_translations:null,includeContext:false},Recaptcha={widget:null,timer_id:-1,style_set:false,theme:null,type:"image",ajax_verify_cb:null,$:function(a){return typeof a=="string"?document.getElementById(a):a},create:function(a,b,c){Recaptcha.destroy();if(b)Recaptcha.widget=Recaptcha.$(b);Recaptcha._init_options(c);Recaptcha._call_challenge(a)},destroy:function(){var a=
Recaptcha.$("recaptcha_challenge_field");a&&a.parentNode.removeChild(a);Recaptcha.timer_id!=-1&&clearInterval(Recaptcha.timer_id);Recaptcha.timer_id=-1;if(a=Recaptcha.$("recaptcha_image"))a.innerHTML="";if(Recaptcha.widget){if(Recaptcha.theme!="custom")Recaptcha.widget.innerHTML="";else Recaptcha.widget.style.display="none";Recaptcha.widget=null}},focus_response_field:function(){var a=Recaptcha.$;a=a("recaptcha_response_field");a.focus()},get_challenge:function(){if(typeof RecaptchaState=="undefined")return null;
return RecaptchaState.challenge},get_response:function(){var a=Recaptcha.$;a=a("recaptcha_response_field");if(!a)return null;return a.value},ajax_verify:function(a){Recaptcha.ajax_verify_cb=a;a=Recaptcha._get_api_server()+"/ajaxverify?c="+encodeURIComponent(Recaptcha.get_challenge())+"&response="+encodeURIComponent(Recaptcha.get_response());Recaptcha._add_script(a)},_ajax_verify_callback:function(a){Recaptcha.ajax_verify_cb(a)},_get_api_server:function(){var a=window.location.protocol,b;b=typeof _RecaptchaOverrideApiServer!=
"undefined"?_RecaptchaOverrideApiServer:"www.google.com/recaptcha/api";return a+"//"+b},_call_challenge:function(a){a=Recaptcha._get_api_server()+"/challenge?k="+a+"&ajax=1&cachestop="+Math.random();if(typeof RecaptchaOptions.extra_challenge_params!="undefined")a+="&"+RecaptchaOptions.extra_challenge_params;if(RecaptchaOptions.includeContext)a+="&includeContext=1";Recaptcha._add_script(a)},_add_script:function(a){var b=document.createElement("script");b.type="text/javascript";b.src=a;Recaptcha._get_script_area().appendChild(b)},
_get_script_area:function(){var a=document.getElementsByTagName("head");return a=!a||a.length<1?document.body:a[0]},_hash_merge:function(a){var b={};for(var c in a)for(var d in a[c])b[d]=a[c][d];if(b.theme=="context")b.includeContext=true;return b},_init_options:function(a){RecaptchaOptions=Recaptcha._hash_merge([RecaptchaDefaultOptions,a||{}])},challenge_callback:function(){Recaptcha._reset_timer();RecaptchaStr=Recaptcha._hash_merge([RecaptchaStr_en,RecaptchaLangMap[RecaptchaOptions.lang]||{},RecaptchaOptions.custom_translations||
{}]);window.addEventListener&&window.addEventListener("unload",function(){Recaptcha.destroy()},false);Recaptcha._is_ie()&&window.attachEvent&&window.attachEvent("onbeforeunload",function(){});if(navigator.userAgent.indexOf("KHTML")>0){var a=document.createElement("iframe");a.src="about:blank";a.style.height="0px";a.style.width="0px";a.style.visibility="hidden";a.style.border="none";var b=document.createTextNode("This frame prevents back/forward cache problems in Safari.");a.appendChild(b);document.body.appendChild(a)}Recaptcha._finish_widget()},
_add_css:function(a){var b=document.createElement("style");b.type="text/css";if(b.styleSheet)if(navigator.appVersion.indexOf("MSIE 5")!=-1)document.write("<style type='text/css'>"+a+"</style>");else b.styleSheet.cssText=a;else if(navigator.appVersion.indexOf("MSIE 5")!=-1)document.write("<style type='text/css'>"+a+"</style>");else{a=document.createTextNode(a);b.appendChild(a)}Recaptcha._get_script_area().appendChild(b)},_set_style:function(a){if(!Recaptcha.style_set){Recaptcha.style_set=true;Recaptcha._add_css(a+
"\n\n.recaptcha_is_showing_audio .recaptcha_only_if_image,.recaptcha_isnot_showing_audio .recaptcha_only_if_audio,.recaptcha_had_incorrect_sol .recaptcha_only_if_no_incorrect_sol,.recaptcha_nothad_incorrect_sol .recaptcha_only_if_incorrect_sol{display:none !important}")}},_init_builtin_theme:function(){var a=Recaptcha.$,b=RecaptchaStr,c=RecaptchaState,d,e;c=c.server;if(c[c.length-1]=="/")c=c.substring(0,c.length-1);var f=c+"/img/"+Recaptcha.theme;if(Recaptcha.theme=="clean"){c=RecaptchaTemplates.CleanCss;
d=RecaptchaTemplates.CleanHtml;e="png"}else{if(Recaptcha.theme=="context"){c=RecaptchaTemplates.VertCss;d=RecaptchaTemplates.ContextHtml}else{c=RecaptchaTemplates.VertCss;d=RecaptchaTemplates.VertHtml}e="gif"}c=c.replace(/IMGROOT/g,f);Recaptcha._set_style(c);Recaptcha.widget.innerHTML="<div id='recaptcha_area'>"+d+"</div>";a("recaptcha_reload").src=f+"/refresh."+e;a("recaptcha_switch_audio").src=f+"/audio."+e;a("recaptcha_switch_img").src=f+"/text."+e;a("recaptcha_whatsthis").src=f+"/help."+e;if(Recaptcha.theme==
"clean"){a("recaptcha_logo").src=f+"/logo."+e;a("recaptcha_tagline").src=f+"/tagline."+e}a("recaptcha_reload").alt=b.refresh_btn;a("recaptcha_switch_audio").alt=b.audio_challenge;a("recaptcha_switch_img").alt=b.visual_challenge;a("recaptcha_whatsthis").alt=b.help_btn;a("recaptcha_reload_btn").href="javascript:Recaptcha.reload ();";a("recaptcha_reload_btn").title=b.refresh_btn;a("recaptcha_switch_audio_btn").href="javascript:Recaptcha.switch_type('audio');";a("recaptcha_switch_audio_btn").title=b.audio_challenge;
a("recaptcha_switch_img_btn").href="javascript:Recaptcha.switch_type('image');";a("recaptcha_switch_img_btn").title=b.visual_challenge;a("recaptcha_whatsthis_btn").href=Recaptcha._get_help_link();a("recaptcha_whatsthis_btn").target="_blank";a("recaptcha_whatsthis_btn").title=b.help_btn;a("recaptcha_whatsthis_btn").onclick=function(){Recaptcha.showhelp();return false};a("recaptcha_table").className="recaptchatable recaptcha_theme_"+Recaptcha.theme;a("recaptcha_instructions_image")&&a("recaptcha_instructions_image").appendChild(document.createTextNode(b.instructions_visual));
a("recaptcha_instructions_context")&&a("recaptcha_instructions_context").appendChild(document.createTextNode(b.instructions_context));a("recaptcha_instructions_audio")&&a("recaptcha_instructions_audio").appendChild(document.createTextNode(b.instructions_audio));a("recaptcha_instructions_error")&&a("recaptcha_instructions_error").appendChild(document.createTextNode(b.incorrect_try_again))},_finish_widget:function(){var a=Recaptcha.$,b=RecaptchaState,c=RecaptchaOptions,d=c.theme;switch(d){case "red":case "white":case "blackglass":case "clean":case "custom":case "context":break;
default:d="red";break}if(!Recaptcha.theme)Recaptcha.theme=d;Recaptcha.theme!="custom"?Recaptcha._init_builtin_theme():Recaptcha._set_style("");d=document.createElement("span");d.id="recaptcha_challenge_field_holder";d.style.display="none";a("recaptcha_response_field").parentNode.insertBefore(d,a("recaptcha_response_field"));a("recaptcha_response_field").setAttribute("autocomplete","off");a("recaptcha_image").style.width="300px";a("recaptcha_image").style.height="57px";Recaptcha.should_focus=false;
Recaptcha._set_challenge(b.challenge,"image");if(c.tabindex){a("recaptcha_response_field").tabIndex=c.tabindex;if(Recaptcha.theme!="custom"){a("recaptcha_whatsthis_btn").tabIndex=c.tabindex;a("recaptcha_switch_img_btn").tabIndex=c.tabindex;a("recaptcha_switch_audio_btn").tabIndex=c.tabindex;a("recaptcha_reload_btn").tabIndex=c.tabindex}}if(Recaptcha.widget)Recaptcha.widget.style.display="";c.callback&&c.callback()},switch_type:function(a){var b=Recaptcha;b.type=a;b.reload(b.type=="audio"?"a":"v")},
reload:function(a){var b=Recaptcha,c=RecaptchaState;if(typeof a=="undefined")a="r";c=c.server+"reload?c="+c.challenge+"&k="+c.site+"&reason="+a+"&type="+b.type+"&lang="+RecaptchaOptions.lang;if(RecaptchaOptions.includeContext)c+="&includeContext=1";if(typeof RecaptchaOptions.extra_challenge_params!="undefined")c+="&"+RecaptchaOptions.extra_challenge_params;if(b.type=="audio")c+=RecaptchaOptions.audio_beta_12_08?"&audio_beta_12_08=1":"&new_audio_default=1";b.should_focus=a!="t";b._add_script(c)},finish_reload:function(a,
b){RecaptchaState.is_incorrect=false;Recaptcha._set_challenge(a,b)},_set_challenge:function(a,b){var c=Recaptcha,d=RecaptchaState,e=c.$;d.challenge=a;c.type=b;e("recaptcha_challenge_field_holder").innerHTML="<input type='hidden' name='recaptcha_challenge_field' id='recaptcha_challenge_field' value='"+d.challenge+"'/>";if(b=="audio")e("recaptcha_image").innerHTML=Recaptcha.getAudioCaptchaHtml();else if(b=="image"){var f=d.server+"image?c="+d.challenge;e("recaptcha_image").innerHTML="<img style='display:block;' height='57' width='300' src='"+
f+"'/>"}Recaptcha._css_toggle("recaptcha_had_incorrect_sol","recaptcha_nothad_incorrect_sol",d.is_incorrect);Recaptcha._css_toggle("recaptcha_is_showing_audio","recaptcha_isnot_showing_audio",b=="audio");c._clear_input();c.should_focus&&c.focus_response_field();c._reset_timer()},_reset_timer:function(){var a=RecaptchaState;clearInterval(Recaptcha.timer_id);Recaptcha.timer_id=setInterval("Recaptcha.reload('t');",(a.timeout-300)*1E3)},showhelp:function(){window.open(Recaptcha._get_help_link(),"recaptcha_popup",
"width=460,height=570,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes")},_clear_input:function(){var a=Recaptcha.$("recaptcha_response_field");a.value=""},_displayerror:function(a){var b=Recaptcha.$;b("recaptcha_image").innerHTML="";b("recaptcha_image").appendChild(document.createTextNode(a))},reloaderror:function(a){Recaptcha._displayerror(a)},_is_ie:function(){return navigator.userAgent.indexOf("MSIE")>0&&!window.opera},_css_toggle:function(a,b,c){var d=Recaptcha.widget;
if(!d)d=document.body;var e=d.className;e=e.replace(RegExp("(^|\\s+)"+a+"(\\s+|$)")," ");e=e.replace(RegExp("(^|\\s+)"+b+"(\\s+|$)")," ");e+=" "+(c?a:b);d.className=e},_get_help_link:function(){var a=RecaptchaOptions.lang;return"http://recaptcha.net/popuphelp/"+(a=="en"?"":a+".html")},playAgain:function(){var a=Recaptcha.$;a("recaptcha_image").innerHTML=Recaptcha.getAudioCaptchaHtml()},getAudioCaptchaHtml:function(){var a=Recaptcha,b=RecaptchaState,c=b.server+"image?c="+b.challenge;if(c.indexOf("https://")==
0)c="http://"+c.substring(8);b=b.server+"/img/audiocaptcha.swf?v2";a=a._is_ie()?'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="audiocaptcha" width="0" height="0" codebase="https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="'+b+'" /><param name="quality" value="high" /><param name="bgcolor" value="#869ca7" /><param name="allowScriptAccess" value="always" /></object><br/>':'<embed src="'+b+'" quality="high" bgcolor="#869ca7" width="0" height="0" name="audiocaptcha" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer"></embed> ';
c=(Recaptcha.checkFlashVer()?'<br/><a class="recaptcha_audio_cant_hear_link" href="#" onclick="Recaptcha.playAgain(); return false;">'+RecaptchaStr.play_again+"</a>":"")+'<br/><a class="recaptcha_audio_cant_hear_link" target="_blank" href="'+c+'">'+RecaptchaStr.cant_hear_this+"</a>";return a+c},gethttpwavurl:function(){var a=RecaptchaState;if(Recaptcha.type=="audio"){a=a.server+"image?c="+a.challenge;if(a.indexOf("https://")==0)a="http://"+a.substring(8);return a}return""},checkFlashVer:function(){var a=
navigator.appVersion.indexOf("MSIE")!=-1?true:false,b=navigator.appVersion.toLowerCase().indexOf("win")!=-1?true:false,c=navigator.userAgent.indexOf("Opera")!=-1?true:false,d=-1;if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){a=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";a=navigator.plugins["Shockwave Flash"+a].description;a=a.split(" ");a=a[2].split(".");d=a[0]}}else if(a&&b&&!c)try{var e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
f=e.GetVariable("$version");d=f.split(" ")[1].split(",")[0]}catch(g){}return d>=9},getlang:function(){return RecaptchaOptions.lang}};
/* jshint ignore:end */
;
