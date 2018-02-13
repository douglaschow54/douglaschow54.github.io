define("ace/theme/novi-html",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

  exports.isDark = true;
  exports.cssClass = "ace-novi-html";
  exports.cssText = ".ace-novi-html .ace_gutter {\
background: #181D27;\
color: #6E778A;\
}\
.ace-novi-html .ace_print-margin {\
width: 1px;\
background: #555651\
}\
.ace-novi-html {\
background-color: #181D27;\
color: #F8F8F2\
}\
.ace-novi-html .ace_cursor {\
color: #F8F8F0\
}\
.ace-novi-html .ace_marker-layer .ace_selection {\
background: #536280;\
}\
.ace-novi-html.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #272822;\
}\
.ace-novi-html .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-novi-html .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid ##424b57;\
}\
.ace-novi-html .ace_marker-layer .ace_active-line {\
background: #272F3F;\
}\
.ace-novi-html .ace_gutter-active-line {\
background-color: #272F3F;\
}\
.ace-novi-html .ace_marker-layer .ace_selected-word {\
border: 1px solid #424b57\
}\
.ace-novi-html .ace_invisible {\
color: #52524d\
}\
.ace-novi-html .ace_entity.ace_name.ace_tag,\
.ace-novi-html .ace_keyword,\
.ace-novi-html .ace_storage {\
color: #FFFFFF\
}\
\
.ace-novi-html .ace_meta.ace_tag{\
color: #4A90E2\
}\
.ace-novi-html .ace_punctuation,\
.ace-novi-html .ace_punctuation.ace_tag {\
color: #4A90E2\
}\
.ace-novi-html .ace_constant.ace_character,\
.ace-novi-html .ace_constant.ace_language,\
.ace-novi-html .ace_constant.ace_numeric,\
.ace-novi-html .ace_constant.ace_other {\
color: #FFFFFF\
}\
.ace-novi-html .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.ace-novi-html .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.ace-novi-html .ace_support.ace_constant,\
.ace-novi-html .ace_support.ace_function {\
color: #FFFFFF\
}\
.ace-novi-html .ace_storage.ace_type,\
.ace-novi-html .ace_support.ace_class,\
.ace-novi-html .ace_support.ace_type {\
font-style: italic;\
color: #3974CF\
}\
.ace-novi-html .ace_entity.ace_name.ace_function,\
.ace-novi-html .ace_entity.ace_other,\
.ace-novi-html .ace_entity.ace_other.ace_attribute-name,\
.ace-novi-html .ace_variable {\
color: #7FFCE7\
}\
.ace-novi-html .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F\
}\
.ace-novi-html .ace_string {\
color: #FCDA82\
}\
.ace-novi-html .ace_comment {\
color: #777e88;\
}\
.ace-novi-html .ace_indent-guide {\
-webkit-box-shadow: 1px 0 0 0 #283040;\
box-shadow: 1px 0 0 0 #283040;\
padding-top: 6px;\
padding-bottom: 6px;\
}";

  var dom = require("../lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});