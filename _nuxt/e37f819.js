(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{324:function(t,e,n){"use strict";var r=n(2),o=n(89).find,l=n(141),d="find",c=!0;d in[]&&Array(1)[d]((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),l(d)},343:function(t,e,n){var content=n(352);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(44).default)("07075887",content,!0,{sourceMap:!1})},351:function(t,e,n){"use strict";n(343)},352:function(t,e,n){var r=n(43)((function(i){return i[1]}));r.push([t.i,".slider{margin-bottom:50px;margin-top:50px;position:relative}.slider .tns-nav{bottom:0;left:50%;position:absolute;transform:translateX(-50%)}.slider .tns-nav button{background:#fff;border:1px solid var(--active);border-radius:10px;border-radius:50%;display:inline-block;height:10px;margin:0 6px;padding:0;width:10px}.slider .tns-nav button.tns-nav-active{background:var(--active)}.slider-item{background:#000;border-radius:15px;color:#fff;padding:30px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.slider-list{list-style:disc;padding-left:15px}.slider-list li{font-size:12px;line-height:1.4;margin-bottom:10px}@media(min-width:1200px){.slider-list li{font-size:14px}}.slider h3{font-size:30px}.slider h3,.slider h4{color:var(--active);margin-bottom:30px}.slider h4{font-size:26px}.slider h5{color:var(--active);font-size:14px}",""]),r.locals={},t.exports=r},366:function(t,e,n){"use strict";n.r(e);n(16),n(29),n(46),n(324);var r={head:function(){return{link:[{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.1/tiny-slider.css"}]}},props:["campaignId"],computed:{eventInfo:function(){var t,e=this,n=this.$store.getters["global/eventsList"];return Object.keys(n).forEach((function(r){n[r].find((function(t){return t.campignId==e.campaignId}))&&(t=n[r].find((function(t){return t.campignId==e.campaignId})))})),t}},data:function(){return{tinySliderOptions:{mouseDrag:!0,items:1,swipeAngle:45,gutter:15,loop:!1,controls:!1,nav:!0,responsive:{768:{items:2},992:{items:3}}}}}},o=(n(351),n(15)),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return t.campaignId?e("div",{staticClass:"slider"},[e("vue-tiny-slider",t._b({},"vue-tiny-slider",t.tinySliderOptions,!1),t._l(t.eventInfo.schedule,(function(n){return e("div",{key:n.title,staticClass:"item"},[e("div",{staticClass:"slider-item"},[e("h3",[t._v(t._s(n.title))]),t._v(" "),n.subtitle?e("h4",[t._v(t._s(n.subtitle))]):t._e(),t._v(" "),e("ul",{staticClass:"slider-list"},t._l(n.list,(function(n){return e("li",{key:n,domProps:{innerHTML:t._s(n)}})})),0),t._v(" "),n.listsub?e("h5",[t._v(t._s(n.listsub))]):t._e()])])})),0)],1):t._e()}),[],!1,null,null,null);e.default=component.exports}}]);