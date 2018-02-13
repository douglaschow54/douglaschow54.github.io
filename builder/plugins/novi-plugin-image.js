module.exports=function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=n(1),r=o(i),a=n(3),u=o(a),l=novi.react.React,c={name:"novi-plugin-image",title:"Novi Image",description:"Novi Image description",version:"1.0.0",dependencies:{plugin:"1.0.0"},defaults:{querySelector:"img[src]"},ui:{editor:[r.default],settings:l.createElement(u.default,null)}};novi.plugins.register(c)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),i=function(e){return e&&e.__esModule?e:{default:e}}(o),r=novi.react.React,a={trigger:r.createElement(i.default,null),tooltip:"Replace Image",closeIcon:"submit"};t.default=a},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=novi.ui.icon,u=novi.ui.icons,l=novi.react.React,c=novi.react.Component,s=novi.modal,p=novi.types.images,f=function(e){function t(){n(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.onClick=e.onClick.bind(e),e.onSubmitClick=e.onSubmitClick.bind(e),e}return i(t,e),r(t,[{key:"render",value:function(){return l.createElement("div",{onClick:this.onClick},l.createElement(a,null,u.ICON_PICTURE))}},{key:"onClick",value:function(){s.fileUpload({path:novi.media.directory,accept:p,messages:{submit:"Upload Image",title:"Upload an image",body:'Click on "Choose File" to upload your image.'},onSubmitClick:this.onSubmitClick})}},{key:"onSubmitClick",value:function(e){novi.element.setAttribute(this.props.element,"src",e)}}]),t}(c);t.default=f},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=novi.react.React,u=novi.react.Component,l=novi.ui.input,c=novi.ui.button,s=function(e){function t(e){n(this,t);var i=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.state={settings:e.settings},i.saveSettings=i.saveSettings.bind(i),i.onChange=i.onChange.bind(i),i}return i(t,e),r(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({settings:e.settings})}},{key:"render",value:function(){return a.createElement("div",null,a.createElement("span",{style:{letterSpacing:"0,0462em"}},"Image Plugin"),a.createElement("div",{style:{fontSize:13,color:"#6E778A",marginTop:21}},"Apply this plugin to elements which are matching selector:"),a.createElement(l,{style:{marginTop:10,width:340},value:this.state.settings.querySelector,onChange:this.onChange}),a.createElement("div",{style:{marginTop:30}},a.createElement(c,{type:"primary",messages:{textContent:"Save Settings"},onClick:this.saveSettings})))}},{key:"onChange",value:function(e){var t=e.target.value;this.setState({settings:{querySelector:t}})}},{key:"saveSettings",value:function(){novi.plugins.settings.update("novi-plugin-image",this.state.settings)}}]),t}(u);t.default=s}]);