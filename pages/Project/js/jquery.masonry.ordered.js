/**
 * jQuery Masonry Ordered 2.1-beta2
 * http://masonry-ordered.tasuki.org/
 *
 * Enhanced layout strategy for jQuery Masonry:
 * http://masonry.desandro.com/
 *
 * Licensed under the MIT license.
 * Copyleft 2012 Vit 'tasuki' Brunner
 */
!function(a,b,c){b.extend(!0,b.Mason.settings,{layoutPriorities:{upperPosition:1,shelfOrder:1}}),b.Mason.prototype._placeBrick=function(a){var f,g,h,i,d=b(a),e=this.horizontalDirection;if(f=Math.ceil(d.outerWidth(!0)/(this.columnWidth+this.options.gutterWidth)),1===(f=Math.min(f,this.cols)))h=this.colYs;else{g=this.cols+1-f,h=[];for(var j=0;j<g;j++)i=this.colYs.slice(j,j+f),h[j]=Math.max.apply(Math,i)}var k=Math.min.apply(Math,h),l={top:0};l[e]=0;var m=this.styleQueue.slice(-1)[0];if(m!=c){var n=m.$el.outerWidth(!0),o=m.style[e]-this.offset.x;l[e]=o+n,l.top=m.style.top;l[e]+f*this.columnWidth>this.cols*this.columnWidth&&(l[e]=0)}for(var r=this.options.layoutPriorities,s=[],t=0,u=h.length;t<u;t++){var v=Math.abs(l[e]-this.columnWidth*t),w=Math.abs(l.top-h[t]),x=Math.pow(v,2)+Math.pow(w,2),y=Math.round(Math.sqrt(x)),z=r.shelfOrder*y,A=r.upperPosition*(h[t]-k);s[t]=A+z}var B=Math.min.apply(null,s);for(t=0,u=s.length;t<u;t++)if(s[t]===B){shortCol=t;break}var C={top:h[shortCol]+this.offset.y};C[e]=this.columnWidth*shortCol+this.offset.x,this.styleQueue.push({$el:d,style:C});var D=h[shortCol]+d.outerHeight(!0),E=this.cols+1-u;for(t=0;t<E;t++)this.colYs[shortCol+t]=D}}(window,jQuery);