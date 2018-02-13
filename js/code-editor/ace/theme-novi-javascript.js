define("ace/theme/novi-javascript",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

  exports.isDark = true;
  exports.cssClass = "ace-novi-javascript";
  exports.cssText = ".ace-novi-javascript .ace_gutter {\
background: #181D27;\
color: #6E778A;\
}\
.ace-novi-javascript .ace_print-margin {\
width: 1px;\
background: #555651\
}\
.ace-novi-javascript {\
background-color: #181D27;\
color: #F8F8F2\
}\
.ace-novi-javascript .ace_cursor {\
color: #F8F8F0\
}\
.ace-novi-javascript .ace_marker-layer .ace_selection {\
background: #536280;\
}\
.ace-novi-javascript.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #272822;\
}\
.ace-novi-javascript .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-novi-javascript .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid ##424b57;\
}\
.ace-novi-javascript .ace_marker-layer .ace_active-line {\
background: #272F3F;\
}\
.ace-novi-javascript .ace_gutter-active-line {\
background-color: #272F3F;\
}\
.ace-novi-javascript .ace_marker-layer .ace_selected-word {\
border: 1px solid #424b57\
}\
.ace-novi-javascript .ace_invisible {\
color: #52524d\
}\
.ace-novi-javascript .ace_entity.ace_name.ace_tag,\
.ace-novi-javascript .ace_keyword,\
.ace-novi-javascript .ace_meta.ace_tag,\
.ace-novi-javascript .ace_storage {\
color: #3B77CB\
}\
.ace-novi-javascript .ace_keyword.ace_operator{\
color: #FFFFFF\
}\
.ace-novi-javascript .ace_punctuation,\
.ace-novi-javascript .ace_punctuation.ace_tag {\
color: #FFFFFF\
}\
.ace-novi-javascript .ace_constant.ace_character,\
.ace-novi-javascript .ace_constant.ace_language,\
.ace-novi-javascript .ace_constant.ace_numeric,\
.ace-novi-javascript .ace_constant.ace_other {\
color: #FFFFFF\
}\
.ace-novi-javascript .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.ace-novi-javascript .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.ace-novi-javascript .ace_support.ace_constant,\
.ace-novi-javascript .ace_support.ace_function {\
color: #7BFBE1\
}\
.ace-novi-javascript .ace_storage.ace_type,\
.ace-novi-javascript .ace_support.ace_class,\
.ace-novi-javascript .ace_support.ace_type {\
font-style: italic;\
color: #3974CF\
}\
.ace-novi-javascript .ace_entity.ace_name.ace_function,\
.ace-novi-javascript .ace_entity.ace_other,\
.ace-novi-javascript .ace_entity.ace_other.ace_attribute-name,\
.ace-novi-javascript .ace_variable {\
color: #53CA66\
}\
.ace-novi-javascript .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F\
}\
.ace-novi-javascript .ace_string {\
color: #FCDA82\
}\
.ace-novi-javascript .ace_comment {\
color: #777e88;\
}\
.ace-novi-javascript .ace_indent-guide {\
-webkit-box-shadow: 1px 0 0 0 #283040;\
box-shadow: 1px 0 0 0 #283040;\
padding-top: 6px;\
padding-bottom: 6px;\
}";

  var dom = require("../lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});