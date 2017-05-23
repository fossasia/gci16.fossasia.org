/**
 * jQuery Bar Rating Plugin v1.1.2
 *
 * http://github.com/antennaio/jquery-bar-rating
 *
 * Copyright (c) 2012-2015 Kazik Pietruszewski
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // browser globals
        factory(jQuery);
    }
}(function ($) {

    var BarRating = (function() {

        function BarRating() {
            var self = this;

            // wrap element in a wrapper div
            var wrapElement = function() {
                var classes = [self.options.wrapperClass];

                if (self.options.theme !== '') {
                    classes.push('br-theme-' + self.options.theme);
                }
                
                self.$elem.wrap($('<div />', {
                    'class': classes.join(' ')
                }));
            };

            // unwrap element
            var unwrapElement = function() {
                self.$elem.unwrap();
            };

            // return initial option
            var findInitialOption = function() {
                var option;

                if (self.options.initialRating) {
                    option = $('option[value="' + self.options.initialRating  + '"]', self.$elem);
                } else {
                    option = $('option:selected', self.$elem);
                }

                return option;
            };

            // save data on element
            var saveDataOnElement = function() {
                var $opt = findInitialOption();

                self.$elem.data('barrating', {

                    userOptions: self.options,

                    // initial rating based on the OPTION value
                    currentRatingValue: $opt.val(),
                    currentRatingText: ($opt.data('html')) ? $opt.data('html') : $opt.text(),

                    // rating will be restored by calling clear method
                    originalRatingValue: $opt.val(),
                    originalRatingText: ($opt.data('html')) ? $opt.data('html') : $opt.text()

                });

                // first OPTION empty - allow deselecting of ratings
                self.$elem.data('barrating').deselectable =
                    (!self.$elem.find('option:first').val()) ? true : false;
            };

            // remove data on element
            var removeDataOnElement = function() {
                self.$elem.removeData('barrating');
            };

            // build widget and return jQuery element
            var buildWidget = function() {
                var $w = $('<div />', { 'class': 'br-widget' });

                // create A elements that will replace OPTIONs
                self.$elem.find('option').each(function() {
                    var val, text, html, $a, $span;

                    val = $(this).val();

                    // create ratings - but only if val is defined
                    if (val) {
                        text = $(this).text();
                        html = $(this).data('html');
                        if (html) { text = html; }

                        $a = $('<a />', { 'href': '#', 'data-rating-value': val, 'data-rating-text': text });
                        $span = $('<span />', { 'html': (self.options.showValues) ? text : '' });

                        $w.append($a.append($span));
                    }

                });

                // append .br-current-rating div to the widget
                if (self.options.showSelectedRating) {
                    $w.append($('<div />', { 'text': '', 'class': 'br-current-rating' }));
                }

                // additional classes for the widget
                if (self.options.reverse) {
                    $w.addClass('br-reverse');
                }

                if (self.options.readonly) {
                    $w.addClass('br-readonly');
                }

                return $w;
            };

            // return a jQuery function name depending on the 'reverse' setting
            var nextAllorPreviousAll = function() {
                if (self.options.reverse) {
                    return 'nextAll';
                } else {
                    return 'prevAll';
                }
            };

            // set the value of the select field
            var setSelectFieldValue = function(value) {
                // change selected OPTION in the select field (hidden)
                self.$elem.find('option[value="' + value + '"]').prop('selected', true);
                self.$elem.change();
            };

            // display the currently selected rating
            var showSelectedRating = function(text) {
                // text undefined?
                text = text ? text : self.$elem.data('barrating').currentRatingText;

                // update .br-current-rating div
                if (self.options.showSelectedRating) {
                    self.$elem.parent().find('.br-current-rating').text(text);
                }
            };

            // apply style by setting classes on elements
            var applyStyle = function($w) {
                // remove classes
                $w.find('a').removeClass('br-selected br-current');

                // add classes
                $w.find('a[data-rating-value="' + self.$elem.data('barrating').currentRatingValue + '"]')
                    .addClass('br-selected br-current')[nextAllorPreviousAll()]()
                    .addClass('br-selected');
            };

            // handle click events
            var attachClickHandler = function($all) {
                $all.on('click', function(event) {
                    var $a = $(this),
                        value,
                        text;

                    event.preventDefault();

                    $all.removeClass('br-active br-selected');
                    $a.addClass('br-selected')[nextAllorPreviousAll()]()
                        .addClass('br-selected');

                    value = $a.attr('data-rating-value');
                    text = $a.attr('data-rating-text');

                    // is current and deselectable?
                    if ($a.hasClass('br-current') && self.$elem.data('barrating').deselectable) {
                        $a.removeClass('br-selected br-current')[nextAllorPreviousAll()]()
                            .removeClass('br-selected br-current');
                        value = ''; text = '';
                    } else {
                        $all.removeClass('br-current');
                        $a.addClass('br-current');
                    }

                    // remember selected rating
                    self.$elem.data('barrating').currentRatingValue = value;
                    self.$elem.data('barrating').currentRatingText = text;

                    setSelectFieldValue(value);
                    showSelectedRating(text);

                    // onSelect callback
                    self.options.onSelect.call(
                        this,
                        self.$elem.data('barrating').currentRatingValue,
                        self.$elem.data('barrating').currentRatingText
                    );

                    return false;
                });
            };

            // handle mouseenter events
            var attachMouseEnterHandler = function($all) {
                $all.on({
                    mouseenter: function() {
                        var $a = $(this);

                        $all.removeClass('br-active br-selected');
                        $a.addClass('br-active')[nextAllorPreviousAll()]()
                            .addClass('br-active');

                        showSelectedRating($a.attr('data-rating-text'));
                    }
                });
            };

            // handle mouseleave events
            var attachMouseLeaveHandler = function($all, $widget) {
                $widget.on({
                    mouseleave: function() {
                        $all.removeClass('br-active');
                        showSelectedRating();
                        applyStyle($widget);
                    }
                });
            };

            // somewhat primitive way to remove 300ms click delay on touch devices
            // for a more advanced solution consider setting `fastClicks` option to false
            // and using a library such as fastclick (https://github.com/ftlabs/fastclick)
            var fastClicks = function($all) {
                $all.on('touchstart', function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $(this).click();
                });
            };

            // disable clicks
            var disableClicks = function($all) {
                $all.on('click', function(event) {
                    event.preventDefault();
                });
            };

            this.show = function() {
                var $widget, $all;

                // run only once
                if (self.$elem.data('barrating')) return;

                // wrap element
                wrapElement();

                // save data
                saveDataOnElement();

                // build & append widget to the DOM
                $widget = buildWidget();
                $widget.insertAfter(self.$elem);
                applyStyle($widget);

                showSelectedRating();

                $all = $widget.find('a');

                if (self.options.fastClicks) {
                    fastClicks($all);
                }

                if (self.options.readonly) {

                    // do not react to click events if rating is read-only
                    disableClicks($all);

                } else {

                    // attach click event handler
                    attachClickHandler($all);

                    if (self.options.hoverState) {
                        // attach mouseenter event handler
                        attachMouseEnterHandler($all);

                        // attach mouseleave event handler
                        attachMouseLeaveHandler($all, $widget);
                    }

                }

                // hide the select field
                self.$elem.hide();
            };

            this.set = function(value) {
                if (!this.$elem.find('option[value="' + value + '"]').val()) return;

                // set data
                this.$elem.data('barrating').currentRatingValue = value;
                this.$elem.data('barrating').currentRatingText = this.$elem.find('option[value="' + value + '"]').text();

                setSelectFieldValue(this.$elem.data('barrating').currentRatingValue);
                showSelectedRating(this.$elem.data('barrating').currentRatingText);

                applyStyle(this.$widget);

                // onSelect callback
                this.$elem.data('barrating').userOptions.onSelect.call(
                    this,
                    this.$elem.data('barrating').currentRatingValue,
                    this.$elem.data('barrating').currentRatingText
                );
            };

            this.clear = function() {
                // restore original data
                this.$elem.data('barrating').currentRatingValue = this.$elem.data('barrating').originalRatingValue;
                this.$elem.data('barrating').currentRatingText = this.$elem.data('barrating').originalRatingText;

                setSelectFieldValue(this.$elem.data('barrating').currentRatingValue);
                showSelectedRating(this.$elem.data('barrating').currentRatingText);

                applyStyle(this.$widget);

                // onClear callback
                this.$elem.data('barrating').userOptions.onClear.call(
                    this,
                    this.$elem.data('barrating').currentRatingValue,
                    this.$elem.data('barrating').currentRatingText
                );
            };

            this.destroy = function() {
                var value = this.$elem.data('barrating').currentRatingValue;
                var text = this.$elem.data('barrating').currentRatingText;
                var options = this.$elem.data('barrating').userOptions;

                this.$widget.off().remove();

                // remove data
                removeDataOnElement();

                // unwrap the element
                unwrapElement();

                // show the element
                this.$elem.show();

                // onDestroy callback
                options.onDestroy.call(
                    this,
                    value,
                    text
                );
            };
        }

        BarRating.prototype.init = function (options, elem) {
            this.$elem = $(elem);
            this.options = $.extend({}, $.fn.barrating.defaults, options);

            return this.options;
        };

        return BarRating;
    })();

    $.fn.barrating = function (method, options) {
        return this.each(function () {
            var plugin = new BarRating();

            // plugin works with select fields
            if (!$(this).is('select')) {
                $.error('Sorry, this plugin only works with select fields.');
            }

            // method supplied
            if (plugin.hasOwnProperty(method)) {
                plugin.init(options, this);
                if (method === 'show') {
                    return plugin.show(options);
                } else {
                    // plugin exists?
                    if (plugin.$elem.data('barrating')) {
                        plugin.$widget = $(this).next('.br-widget');
                        return plugin[method](options);
                    }
                }

            // no method supplied or only options supplied
            } else if (typeof method === 'object' || !method) {
                options = method;
                plugin.init(options, this);
                return plugin.show();

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.barrating');
            }
        });
    };

    $.fn.barrating.defaults = {
        theme:'',
        initialRating:null, // initial rating
        showValues:false, // display rating values on the bars?
        showSelectedRating:true, // append a div with a rating to the widget?
        reverse:false, // reverse the rating?
        readonly:false, // make the rating ready-only?
        fastClicks:true, // remove 300ms click delay on touch devices?
        hoverState:true, // change state on hover?
        wrapperClass:'br-wrapper', // class applied to wrapper div
        onSelect:function (value, text) {
        }, // callback fired when a rating is selected
        onClear:function (value, text) {
        }, // callback fired when a rating is cleared
        onDestroy:function (value, text) {
        } // callback fired when a widget is destroyed
    };

    $.fn.barrating.BarRating = BarRating;

}));
