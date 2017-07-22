/*! image-scale v2.2 | ©2012-2016 GestiXi | Licensed under the MIT license */
// https://github.com/gestixi/image-scale
(function(l){"function"===typeof define&&define.amd?define(["jquery"],l):"object"===typeof module&&module.exports?module.exports=function(m,a){void 0===a&&(a="undefined"!==typeof window?require("jquery"):require("jquery")(m));l(a);return a}:l(jQuery)})(function(l){l.fn.imageScale=function(a){return this.each(function(){var f=this,d=l(this),b=d.data("imageScale"),g="IMG"===this.tagName?d:d.find("img");if(b)if("string"==typeof a)b[a]();else if("object"==typeof a)b[a.method||"scale"](!1,a);else b.scale();
else{var e=g[0].complete,k=l.extend({},l.fn.imageScale.defaults,"object"==typeof a&&a),h=function(){d.data("imageScale",b=new m(f,k));b.scale(!0,k)};e?h.apply(d[0]):g.on("load",h).attr("src",g.attr("src"))}})};l.fn.imageScale.defaults={scale:"best-fill",align:"center",parent:null,hideParentOverflow:!0,fadeInDuration:0,rescaleOnResize:!1,didScale:function(a,f){},logLevel:0};var m=function(a,f){var d=this;d.options=f;d.element=a;var b=d.$element=l(a),g=d.$img="IMG"===a.tagName?b:b.find("img"),e=d.img=
g[0];d.src=g.attr("src");d.imgWidth=e.naturalWidth||e.width;d.imgHeight=e.naturalHeight||e.height;b=d.$parent=f.parent?f.parent:l(b.parent()[0]);d.parent=b[0];"static"===b.css("position")&&b.css("position","relative");f.rescaleOnResize&&l(window).resize(function(a){d.scheduleScale()})};l.fn.imageScale.Constructor=m;m.prototype={NONE:"none",FILL:"fill",BEST_FILL:"best-fill",BEST_FIT:"best-fit",BEST_FIT_DOWN_ONLY:"best-fit-down",ALIGN_LEFT:"left",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_TOP:"top",
ALIGN_BOTTOM:"bottom",ALIGN_TOP_LEFT:"top-left",ALIGN_TOP_RIGHT:"top-right",ALIGN_BOTTOM_LEFT:"bottom-left",ALIGN_BOTTOM_RIGHT:"bottom-right",constructor:m,element:null,options:null,scale:function(a,f){if(!this._isDestroyed&&!1!==this._canScale){var d=this,b=this.options,g=this.$parent,e=this.element,k=this.$element,h=this.$img;if(a)b.hideParentOverflow&&g.css({overflow:"hidden"});else if(this.src!==h.attr("src")){this.destroy();k.data("imageScale",null);k.imageScale(b);return}this._didScheduleScale=
!1;if(!b.rescaleOnResize||f||this._needUpdate(this.parent)){f=f?f:{};if(h=f.transition)this._canScale=!1,k.css("transition","all "+h+"ms"),setTimeout(function(){d._canScale=null;k.css("transition","null")},h);var h=f.destWidth?f.destWidth:g.outerWidth(),c=f.destHeight?f.destHeight:g.outerHeight(),l=f.destWidth?f.destWidth:g.innerWidth(),n=f.destHeight?f.destHeight:g.innerHeight(),g=h-l,l=c-n,n=k.attr("data-scale"),m=k.attr("data-align"),n=n?n:b.scale,r=m?m:b.align,m=b.fadeInDuration;if(n){this._cacheDestWidth===
h&&this._cacheDestHeight===c&&2<b.logLevel&&console.log("imageScale - DEBUG NOTICE: The parent size hasn't changed: dest width: '"+h+"' - dest height: '"+c+"'.",e);var p=this.imgWidth,q=this.imgHeight;h&&c&&p&&q?(this._cacheDestWidth=h,this._cacheDestHeight=c,e=this._innerFrameForSize(n,r,p,q,h,c),g&&(e.x-=g/2),l&&(e.y-=l/2),k.css({position:"absolute",top:e.y+"px",left:e.x+"px",width:e.width+"px",height:e.height+"px","max-width":"none"}),a&&m&&(k.css({display:"none"}),k.fadeIn(m)),b.didScale.call(this,
a,f)):0<b.logLevel&&console.error("imageScale - DEBUG ERROR: The dimensions are incorrect: source width: '"+p+"' - source height: '"+q+"' - dest width: '"+h+"' - dest height: '"+c+"'.",e)}else 2<b.logLevel&&console.log("imageScale - DEBUG NOTICE: The scale property is null.",e)}}},destroy:function(){this._isDestroyed=!0;this.$element.removeData("imageScale")},_innerFrameForSize:function(a,f,d,b,g,e){var k,h,c;c={x:0,y:0,width:g,height:e};if(a===this.FILL)return c;k=g/d;h=e/b;switch(a){case this.BEST_FIT_DOWN_ONLY:a!==
this.BEST_FIT_DOWN_ONLY&&1<this.options.logLevel&&console.warn("imageScale - DEBUG WARNING: The scale '"+a+"' was not understood.");a=d>g||b>e?k<h?k:h:1;break;case this.BEST_FIT:a=k<h?k:h;break;case this.NONE:a=1;break;default:a=k>h?k:h}d*=a;b*=a;c.width=Math.round(d);c.height=Math.round(b);switch(f){case this.ALIGN_LEFT:c.x=0;c.y=e/2-b/2;break;case this.ALIGN_RIGHT:c.x=g-d;c.y=e/2-b/2;break;case this.ALIGN_TOP:c.x=g/2-d/2;c.y=0;break;case this.ALIGN_BOTTOM:c.x=g/2-d/2;c.y=e-b;break;case this.ALIGN_TOP_LEFT:c.x=
0;c.y=0;break;case this.ALIGN_TOP_RIGHT:c.x=g-d;c.y=0;break;case this.ALIGN_BOTTOM_LEFT:c.x=0;c.y=e-b;break;case this.ALIGN_BOTTOM_RIGHT:c.x=g-d;c.y=e-b;break;default:f!==this.ALIGN_CENTER&&1<this.options.logLevel&&console.warn("imageScale - DEBUG WARNING: The align '"+f+"' was not understood."),c.x=g/2-d/2,c.y=e/2-b/2}return c},_needUpdate:function(a){a=a.clientHeight+" "+a.clientWidth;return this._lastParentSize!==a?(this._lastParentSize=a,!0):!1},scheduleScale:function(){if(!this._didScheduleScale)if(window.requestAnimationFrame){var a=
this;this._didScheduleScale=!0;requestAnimationFrame(function(){setTimeout(function(){a.scale()},0)})}else this.scale()}}});

$(function() {
  $("img.scale").imageScale({
  rescaleOnResize: true,
  align: 'center'
  });
});
