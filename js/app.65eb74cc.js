(function(e){function t(t){for(var i,r,o=t[0],c=t[1],l=t[2],d=0,h=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&h.push(s[r][0]),s[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);u&&u(t);while(h.length)h.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,o=1;o<n.length;o++){var c=n[o];0!==s[c]&&(i=!1)}i&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var i={},s={app:0},a=[];function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/RAF-to-css-animation-demo/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"6f97":function(e,t,n){"use strict";n("d62d")},"9c0c":function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i,s=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("SidebarMenu",{attrs:{"is-hidden":e.isHidden},on:{"close-menu":e.closeMenu}},[e._v(" This is menu content ")]),n("div",{staticStyle:{"text-align":"center"}},[n("p",[e._v("Look at this at mobile phone or emulator")]),n("p",[e._v("Open sidebar menu then swipe to left.")]),n("p",[e._v(" Swipe will affect RAF. After swipe end, CSS animation starts from last position passed via CSS variable ")]),n("button",{attrs:{type:"button"},on:{click:e.showMenu}},[e._v("Show menu")]),e._m(0)])],1)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("a",{attrs:{href:"https://github.com/random1911/RAF-to-css-animation-demo"}},[e._v("source code")])])}],o=n("d4ec"),c=n("bee2"),l=n("262e"),u=n("2caf"),d=n("9ab4"),h=n("1b40"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"holder",class:e.holderClass},[n("div",{ref:"inner",staticClass:"sidebar-menu-wrapper__inner",on:{click:function(t){return t.target!==t.currentTarget?null:e.closeMenu(t)}}},[n("aside",{ref:"sidebar",class:e.menuClass,style:e.transformStyle,on:{animationend:e.handleAnimationEnd}},[e.showCross?n("div",{staticClass:"sidebar-menu__cross"}):e._e(),n("div",{staticClass:"sidebar-menu__content",on:{scroll:e.handleInnerScroll}},[e._t("default")],2)])])])},p=[],b=n("ade3"),g=(n("a9e3"),n("03f7")),v=n.n(g);(function(e){e["HIDDEN"]="hidden",e["VISIBLE"]="visible",e["LEAVING"]="leaving",e["ENTERING"]="entering"})(i||(i={}));var y=function(e){Object(l["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.displayState=e.isHidden?i.HIDDEN:i.VISIBLE,e.isScrolling=!1,e.rightOffset=0,e.lastKnownOffset=0,e.isDragging=!1,e.isAnimating=!1,e}return Object(c["a"])(n,[{key:"isVisibleState",get:function(){return this.displayState===i.VISIBLE}},{key:"isHiddenState",get:function(){return this.displayState===i.HIDDEN}},{key:"isLeaving",get:function(){return this.displayState===i.LEAVING}},{key:"isEntering",get:function(){return this.displayState===i.ENTERING}},{key:"holderClass",get:function(){var e,t="sidebar-menu-wrapper";return e={},Object(b["a"])(e,t,!0),Object(b["a"])(e,"".concat(t,"--is-hidden"),this.isHiddenState),Object(b["a"])(e,"".concat(t,"--is-entering"),this.isEntering),Object(b["a"])(e,"".concat(t,"--is-leaving"),this.isLeaving),Object(b["a"])(e,"".concat(t,"--is-blurred"),!this.isHiddenState),e}},{key:"menuClass",get:function(){var e,t="sidebar-menu";return e={},Object(b["a"])(e,t,!0),Object(b["a"])(e,"".concat(t,"--is-entering"),this.isEntering),Object(b["a"])(e,"".concat(t,"--is-leaving"),this.isLeaving),Object(b["a"])(e,"".concat(t,"--is-hidden"),this.isHiddenState),Object(b["a"])(e,"".concat(t,"--is-dragging"),this.isDragging),e}},{key:"transformStyle",get:function(){return!this.isDragging||this.isHiddenState||this.rightOffset>0?{}:{transform:"translate(".concat(this.rightOffset||0,"px, 0")}}},{key:"showCross",get:function(){return!this.isDragging&&this.isVisibleState}},{key:"mounted",value:function(){this.syncTransformCssVar(),this.enableSwiper(),this.isHidden||this.disableScroll()}},{key:"beforeDestroy",value:function(){this.enableScroll(),this.swipeListener&&this.swipeListener.destroy()}},{key:"syncTransformCssVar",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=this.$refs.sidebar;t&&t.style.setProperty("--transformLeft","".concat(e,"px"))}},{key:"handleReturn",value:function(){this.isDragging=!1,this.rightOffset=0,this.syncTransformCssVar()}},{key:"handleDragStart",value:function(){this.isScrolling?this.handleReturn():this.isDragging=!0}},{key:"onAnimationFrame",value:function(){if(this.isAnimating){var e=this.lastKnownOffset;this.rightOffset=e,e<=0&&this.syncTransformCssVar(e),this.isAnimating=!1}}},{key:"handleDragEnd",value:function(e,t){var n=t.deltaX;this.isDragging=!1,this.isScrolling?this.handleReturn():(e.stopImmediatePropagation(),e.cancelable&&e.preventDefault(),-n>=this.offsetToHide?this.closeMenu():this.handleReturn())}},{key:"handleDrag",value:function(e,t){var n=t.deltaX,i=t.absX,s=t.absY,a=s>i&&i<50;if(a||this.isScrolling)return this.handleReturn(),void(this.lastKnownOffset=0);e.stopPropagation(),this.lastKnownOffset=n,this.isAnimating||(this.isAnimating=!0,window.requestAnimationFrame(this.onAnimationFrame.bind(this)))}},{key:"enableSwiper",value:function(){var e=this.$refs,t=e.holder,n=e.inner;t&&n&&!Object({NODE_ENV:"production",BASE_URL:"/RAF-to-css-animation-demo/"}).VUE_APP_RENDERING_SSR&&(this.swipeListener=new v.a({element:t,target:n,onSwiping:this.handleDrag,onSwiped:this.handleDragEnd,onSwipeStart:this.handleDragStart,mouseTrackingEnabled:!0,delta:20}),this.swipeListener.init())}},{key:"onLeave",value:function(){this.displayState=i.LEAVING}},{key:"onEnter",value:function(){this.displayState=i.ENTERING,this.disableScroll()}},{key:"handleAppears",value:function(){if(this.isHidden){if(this.isVisibleState)return void this.onLeave();if(this.isLeaving)return void this.closeMenu()}!this.isHidden&&this.isHiddenState&&this.onEnter()}},{key:"handleAnimationEnd",value:function(){this.isEntering&&(this.displayState=i.VISIBLE),this.isLeaving&&(this.displayState=i.HIDDEN,this.enableScroll())}},{key:"closeMenu",value:function(){this.enableScroll(),this.$emit("close-menu")}},{key:"disableScroll",value:function(){}},{key:"enableScroll",value:function(){}},{key:"handleInnerScroll",value:function(){}}]),n}(h["c"]);Object(d["a"])([Object(h["b"])({type:Boolean,default:!0})],y.prototype,"isHidden",void 0),Object(d["a"])([Object(h["b"])({type:Number,default:80})],y.prototype,"offsetToHide",void 0),Object(d["a"])([Object(h["d"])("isHidden",{immediate:!0})],y.prototype,"handleAppears",null),y=Object(d["a"])([Object(h["a"])({name:"SidebarMenuContainer"})],y);var m=y,S=m,O=(n("6f97"),n("2877")),j=Object(O["a"])(S,f,p,!1,null,"b4e7ac5a",null),w=j.exports,E=function(e){Object(l["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.isHidden=!0,e}return Object(c["a"])(n,[{key:"showMenu",value:function(){this.isHidden=!1}},{key:"closeMenu",value:function(){this.isHidden=!0}}]),n}(h["c"]);E=Object(d["a"])([Object(h["a"])({components:{SidebarMenu:w}})],E);var k=E,_=k,D=(n("5c0b"),Object(O["a"])(_,a,r,!1,null,null,null)),A=D.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(A)}}).$mount("#app")},d62d:function(e,t,n){}});
//# sourceMappingURL=app.65eb74cc.js.map