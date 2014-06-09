;
(function($, window, document, undefined) {

    /*global jQuery, console*/

    'use strict';

    var pluginName = 'SimpleTree';

    var SimpleTree = function(element, options) {

        this.$element = $(element);
        this._element = element;
        this._elementId = this._element.id;
        this._styleId = this._elementId + '-style';

        this._init(options);
    };

    SimpleTree.defaults = {
        levels: 2
    };

    SimpleTree.prototype = {
        _init: function(options) {
            this.$element.addClass("simpleTree");
            
            this.$element.find('li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            
            if (options.levels >= 0) {
                var levelSelector = ".simpleTree>ul>li>ul>li";
                for (var x = 0; x<options.levels; x++) {
                    levelSelector = levelSelector + ">ul>li";
                }
                $(levelSelector).hide('fast');
            }

            this.$element.find('li.parent_li > span').on('click', function(e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('fast');
                    $(this).attr('title', 'Expand').find(' > i').addClass('glyphicon-plus-sign').removeClass('glyphicon-minus-sign');
                } else {
                    children.show('fast');
                    $(this).attr('title', 'Collapse').find(' > i').addClass('glyphicon-minus-sign').removeClass('glyphicon-plus-sign');
                }
                e.stopPropagation();
            });
        }
    };

    // Prevent against multiple instantiations,
    // handle updates and method calls
    $.fn[pluginName] = function(options, args) {
        return this.each(function() {
            var self = $.data(this, 'plugin_' + pluginName);
            if (typeof options === 'string') {
                if (!self) {
                    console.logg('Not initialized, can not call method : ' + options);
                }
                else if (!$.isFunction(self[options]) || options.charAt(0) === '_') {
                    console.log('No such method : ' + options);
                }
                else {
                    if (typeof args === 'string') {
                        args = [args];
                    }
                    self[options].apply(self, args);
                }
            }
            else {
                if (!self) {
                    $.data(this, 'plugin_' + pluginName, new SimpleTree(this, $.extend(true, {}, options)));
                }
                else {
                    self._init(options);
                }
            }
        });
    };

})(jQuery, window, document);