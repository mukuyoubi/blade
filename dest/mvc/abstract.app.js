define([],function(){var a=_.inherit({propertys:function(){this.viewRootPath="app/views/",this.defaultView="index",this.request,this.viewpath,this.mainframe,this.viewport,this.statedom,this.views={},this.curView,this.lastView,this.isCreate=!1,this.history=[],this.stopListening=!1,this.lastHash="",this.lashFullHash="",this.isChangeHash=!1,this.animations={},this.isAnimat=!0,this.animForwardName="slideleft",this.animBackwardName="slideright",this.animNoName="noAnimate",this.animatName=this.animNoName,this.path=[],this.query={},this.viewMapping={},this.container=$("body"),this.interface=["forward","back"]},initialize:function(a){this.propertys(),this.setOption(a),this.createViewPort(),this.buildEvent(),this.pushHistory(),this.onHashChange()},setOption:function(a){_.extend(this,a)},buildEvent:function(){$(window).bind("hashchange",_.bind(this.onHashChange,this))},onHashChange:function(){if(!this.stopListening){var a=decodeURIComponent(location.href).replace(/^[^#]+(#(.+))?/g,"$2").toLowerCase();this._onHashChange(a)}},_onHashChange:function(a,b){a=a.replace(/^#+/i,""),this.localObserver(this.parseHash(a),b)},parseHash:function(a){var b=a,a=a.replace(/([^\|]*)(?:\|.*)?$/gim,"$1"),c=/^([^?&|]*)(.*)?$/i.exec(a),d=c[1]?c[1].split("!"):[],e=(d.shift()||"").replace(/(^\/+|\/+$)/i,""),f=d.length?d.join("!").replace(/(^\/+|\/+$)/i,"").split("/"):this.path;return this.isChangeHash=!(this.lastHash||b!==this.lashFullHash)||!(!this.lastHash||this.lastHash===a),this.lastHash=a,this.lashFullHash=b,{viewpath:e,path:f,query:_.getUrlParam(b),root:location.pathname+location.search,fullhash:b}},localObserver:function(a,b){this.animatName=b?this.animForwardName:this.animBackwardName,this.request=a,this.viewpath=this.request.viewpath||this.defaultView,this.request.viewpath=this.viewpath,this.switchView(this.viewpath)},switchView:function(a){var b=a,c=this.views[b],d=this.curView;if(d&&d!=c&&(this.lastView=d),c){if(c==this.curView&&0==this.isChangeHash)return;this.curView=c;{(d||c).viewname}this.curView.onPreShow()}else this.loadView(a,function(a){if(!($('[page-url="'+b+'"]').length>0)){c=new a(this,b),this.views[b]=c,c.turning=_.bind(function(){this.startAnimation(function(a){$(".sub-viewport").hide(),a.$el.show()})},this),this.curView=c;{"undefined"!=typeof d?d.viewname:null}this.curView.onPreShow()}})},startAnimation:function(a){var b=this.curView,c=this.lastView;c&&c.setScrollPos(window.scrollX,window.scrollY),this.isAnimat||(this.animatName=this.animNoName),this.animations[this.animatName]?this.animations[this.animatName].call(this,b,c,a,this):(c&&c.hide(),b.show(),a&&a.call(this,b,c)),this.isAnimat=!0},loadView:function(a,b){var c=this;requirejs([this.buildUrl(a)],function(a){b&&b.call(c,a)})},buildUrl:function(a){var b=this.viewMapping[a];return b?b:this.viewRootPath+a},createViewPort:function(){if(!this.isCreate){var a=['<div class="main">','<div class="main-viewport"></div>',"</div>"].join("");this.mainframe=$(a),this.viewport=this.mainframe.find(".main-viewport"),this.container.empty(),this.container.append(this.mainframe),this.isCreate=!0}},lastUrl:function(){return this.history.length<2?document.referrer:this.history[this.history.length-2]},startObserver:function(){this.stopListening=!1},endObserver:function(){this.stopListening=!0},forward:function(a,b,c){a=a.toLowerCase(),c&&(this.isAnimat=!1),this.endObserver(),b?window.location.replace(("#"+a).replace(/^#+/,"#")):window.location.href=("#"+a).replace(/^#+/,"#"),this.pushHistory(),this._onHashChange(a,!0),setTimeout(_.bind(this.startObserver,this),1)},back:function(a,b){b&&(this.isAnimat=!1);var c=this.lastUrl();c&&this.history.pop(),!a||c&&0===c.indexOf(a)?(a=this.request.query.refer,a?window.location.href=a:history.back()):window.location.href=("#"+a).replace(/^#+/,"#")},pushHistory:function(){var a=window.location.href;this.history.push(a)}});return a});