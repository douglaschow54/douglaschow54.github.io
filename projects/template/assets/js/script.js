/**
 * - script.js
 * File with scripts initialization of all site
 */

jQuery(document).ready(function () {
  "use strict";

  // Init Demo JS
  Demo.init();

  // Init Theme Core
  Core.init();

  D3Charts.init();

  demoHighCharts.init();

  FlotCharts.init();

  runVectorMaps();

  $(window).trigger('resize');

  // Init Sparklines Plugin
  $('.inlinesparkline').sparkline('html', {
    type: 'line',
    height: 30,
    width: 100,
    lineColor: bgInfoDr, // Also tooltip icon color
    fillColor: bgInfoLr,
    spotColor: bgPrimary,
    minSpotColor: bgPrimary,
    maxSpotColor: bgPrimary,
    highlightSpotColor: bgWarningDr,
    highlightLineColor: bgWarningLr
  });
  var barColors = $.range_map({
    '1:6': bgWarning,
    '7:11': bgInfo,
    '12:': bgPrimary
  })
  $('.inlinesparkbar').sparkline('html', {
    type: 'bar',
    height: 25,
    barWidth: 4,
    barSpacing: 1,
    barColor: bgPrimary, // Also tooltip icon color
    fillColor: bgInfoLr,
    colorMap: barColors, // Colors mapped/stored in object above
    spotColor: bgPrimary,
    minSpotColor: bgPrimary,
    maxSpotColor: bgPrimary,
    highlightSpotColor: bgWarningDr,
    highlightLineColor: bgWarningLr
  });
  $('.inlinesparkpie').sparkline('html', {
    type: 'pie',
    width: 30,
    height: 23,
    offset: 90,
    sliceColors: [bgPrimary, bgInfo, bgWarning, bgAlert, bgDanger]
  });
  $('.inlinesparkpie2').sparkline('html', {
    type: 'pie',
    width: 23,
    height: 23,
    offset: -45,
    sliceColors: [bgPrimary, bgSuccess, bgAlert, bgDark, bgDanger]
  });


  // Init FooTable
  $('.footable').footable();


  // Initilize Gmap1 - basic
  if ($('.js-map_canvas1').length) {
    $('.js-map_canvas1').gmap({
      'center': '57.7973333,12.0502107',
      'zoom': 10,
      'disableDefaultUI': true,
      'callback': function () {
        var self = this;
        self.addMarker({
          'position': this.get('map').getCenter()
        }).click(function () {
          self.openInfoWindow({
            'content': 'Hello World!'
          }, this);
        });
      }
    });
  }

  if ($('.js-map_canvas2').length) {
    // Initilize Gmap2 - clickable movements
    $('.js-map_canvas2').each(function (i, el) {
      $(el).gmap({
        'disableDefaultUI': true,
        'callback': function () {
          var self = this;
          $(self.el).parents('.js-map-wrapper').find("[data-gmapping]").each(function (i, el) {
            var data = $(el).data('gmapping');
            var title = $(el).data('title');
            self.addMarker({
              'id': data.id,
              'tags': data.tags,
              'position': new google.maps.LatLng(data.latlng.lat, data.latlng.lng),
              'bounds': true
            }, function (map, marker) {
              $(el).click(function () {
                $(marker).triggerEvent('click');
              });
            }).click(function () {
              self.openInfoWindow({
                'content': title
              }, this);
            });
          });
        }
      });
    });
  }


  // Initilize Gmap3 - Navigation Pager
  $(function () {
    var markers = [{
      'position': '59.32893000000001,18.064910000000054',
      'title': 'Stockholm, Sweden'
    }, {
      'position': '35.6894875,139.69170639999993',
      'title': 'Tokyo, Japan'
    }, {
      'position': '13.7234186, 100.47623190000002',
      'title': 'Bangkok, Thailand'
    }, {
      'position': '51.508129,-0.12800500000003012',
      'title': 'London, Great Britain'
    }, {
      'position': '40.7143528,-74.0059731',
      'title': 'New York, USA'
    }, {
      'position': '48.856614,2.3522219000000177',
      'title': 'Paris, France'
    }, {
      'position': '34.0522342,-118.2436849',
      'title': 'Los Angeles, USA'
    }, {
      'position': '55.75,37.616666699999996',
      'title': 'Moskva, Ryssia'
    }];
    $('.js-map_canvas3').gmap({
      'zoom': 5,
      'disableDefaultUI': true,
      'callback': function () {
        var self = this;
        $.each(markers, function (i, marker) {
          self.addMarker(marker).click(function () {
            self.openInfoWindow({
              'content': this.title
            }, this);
          });
        });
      }
    }).gmap('pagination', 'title');
  });

  // Nestable Output
  var updateOutput = function (e) {
    var list = e.length ? e : $(e.target),
      output = list.data('output');
    if (window.JSON) {
      output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
    } else {
      output.val('JSON browser support required for this demo.');
    }
  };


  // Adjust Map Height so that it matches browser window
  var wHeight = $(window).height();

  $('.js-vector-map').each(function(index, item){
    // $(item).height(wHeight - 60);
    // Init JVectorMap Plugin
    $(item).vectorMap({
      map: 'world_mill_en',
      focusOn: {
        x: 0.5,
        y: 0.5,
        scale: 1.2
      },
      backgroundColor: '#EEE',
      series: {
        regions: [{
          scale: ['#ffdbbb', '#ddb084'],
          normalizeFunction: 'polynomial',
          values: {
            "AF": 16.63,
            "AL": 11.58,
            "DZ": 158.97,
            "AO": 85.81,
            "AG": 1.1,
            "AR": 351.02,
            "AM": 8.83,
            "AU": 1219.72,
            "AT": 366.26,
            "AZ": 52.17,
            "BS": 7.54,
            "BH": 21.73,
            "BD": 105.4,
            "BB": 3.96,
            "BY": 52.89,
            "BE": 461.33,
            "BZ": 1.43,
            "BJ": 6.49,
            "BT": 1.4,
            "BO": 19.18,
            "BA": 16.2,
            "BW": 12.5,
            "BR": 2023.53,
            "BN": 11.96,
            "BG": 44.84,
            "BF": 8.67,
            "BI": 1.47,
            "KH": 11.36,
            "CM": 21.88,
            "CA": 1563.66,
            "CV": 1.57,
            "CF": 2.11,
            "TD": 7.59,
            "CL": 199.18,
            "CN": 5745.13,
            "CO": 283.11,
            "KM": 0.56,
            "CD": 12.6,
            "CG": 11.88,
            "CR": 35.02,
            "CI": 22.38,
            "HR": 59.92,
            "CY": 22.75,
            "CZ": 195.23,
            "DK": 304.56,
            "DJ": 1.14,
            "DM": 0.38,
            "DO": 50.87,
            "EC": 61.49,
            "EG": 216.83,
            "SV": 21.8,
            "GQ": 14.55,
            "ER": 2.25,
            "EE": 19.22,
            "ET": 30.94,
            "FJ": 3.15,
            "FI": 231.98,
            "FR": 2555.44,
            "GA": 12.56,
            "GM": 1.04,
            "GE": 11.23,
            "DE": 3305.9,
            "GH": 18.06,
            "GR": 305.01,
            "GD": 0.65,
            "GT": 40.77,
            "GN": 4.34,
            "GW": 0.83,
            "GY": 2.2,
            "HT": 6.5,
            "HN": 15.34,
            "HK": 226.49,
            "HU": 132.28,
            "IS": 12.77,
            "IN": 1430.02,
            "ID": 695.06,
            "IR": 337.9,
            "IQ": 84.14,
            "IE": 204.14,
            "IL": 201.25,
            "IT": 2036.69,
            "JM": 13.74,
            "JP": 5390.9,
            "JO": 27.13,
            "KZ": 129.76,
            "KE": 32.42,
            "KI": 0.15,
            "KR": 986.26,
            "KW": 117.32,
            "KG": 4.44,
            "LA": 6.34,
            "LV": 23.39,
            "LB": 39.15,
            "LS": 1.8,
            "LR": 0.98,
            "LY": 77.91,
            "LT": 35.73,
            "LU": 52.43,
            "MK": 9.58,
            "MG": 8.33,
            "MW": 5.04,
            "MY": 218.95,
            "MV": 1.43,
            "ML": 9.08,
            "MT": 7.8,
            "MR": 3.49,
            "MU": 9.43,
            "MX": 1004.04,
            "MD": 5.36,
            "MN": 5.81,
            "ME": 3.88,
            "MA": 91.7,
            "MZ": 10.21,
            "MM": 35.65,
            "NA": 11.45,
            "NP": 15.11,
            "NL": 770.31,
            "NZ": 138,
            "NI": 6.38,
            "NE": 5.6,
            "NG": 206.66,
            "NO": 413.51,
            "OM": 53.78,
            "PK": 174.79,
            "PA": 27.2,
            "PG": 8.81,
            "PY": 17.17,
            "PE": 153.55,
            "PH": 189.06,
            "PL": 438.88,
            "PT": 223.7,
            "QA": 126.52,
            "RO": 158.39,
            "RU": 1476.91,
            "RW": 5.69,
            "WS": 0.55,
            "ST": 0.19,
            "SA": 434.44,
            "SN": 12.66,
            "RS": 38.92,
            "SC": 0.92,
            "SL": 1.9,
            "SG": 217.38,
            "SK": 86.26,
            "SI": 46.44,
            "SB": 0.67,
            "ZA": 354.41,
            "ES": 1374.78,
            "LK": 48.24,
            "KN": 0.56,
            "LC": 1,
            "VC": 0.58,
            "SD": 65.93,
            "SR": 3.3,
            "SZ": 3.17,
            "SE": 444.59,
            "CH": 522.44,
            "SY": 59.63,
            "TW": 426.98,
            "TJ": 5.58,
            "TZ": 22.43,
            "TH": 312.61,
            "TL": 0.62,
            "TG": 3.07,
            "TO": 0.3,
            "TT": 21.2,
            "TN": 43.86,
            "TR": 729.05,
            "TM": 0,
            "UG": 17.12,
            "UA": 136.56,
            "AE": 239.65,
            "GB": 2258.57,
            "US": 14624.18,
            "UY": 40.71,
            "UZ": 37.72,
            "VU": 0.72,
            "VE": 285.21,
            "VN": 101.99,
            "YE": 30.02,
            "ZM": 15.69,
            "ZW": 5.57
          }
        }]
      }
    });
  });

  // Init Nestable on list 1
  $('.js-nestable').nestable({
    group: 1
  }).on('change', updateOutput);

  // Init Nestable on list 2
  $('.js-nestable-alt').nestable({
    group: 2
  }).on('change', updateOutput);

  // Init Nestable on list 3
  $('.js-nestable-contextual').nestable({
    group: 3
  }).on('change', updateOutput);

  // nestable serialized output functionality
  if ($('.js-nestable').length){
    updateOutput($('.js-nestable').data('output', $('.js-nestable-output')));
  }

  // nestable menu functionality
  $('#nestable-menu').on('change', function (e) {
    var target = $(e.target),
      action = target.data('action');
    if (action === 'expand-all') {
      $('.dd').nestable('expandAll');
    }
    if (action === 'collapse-all') {
      $('.dd').nestable('collapseAll');
    }
  });


  // Init FancyTree - Default
  $(".js-tree").fancytree({
    icons: false, // Display node icons.
    clickFolderMode: 2, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
  });
  // Init FancyTree - With Icons
  $(".js-tree-2").fancytree({
    clickFolderMode: 2, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
  });
  // Init FancyTree - With Checkboxes
  $(".js-tree-3").fancytree({
    selectMode: 3,
    checkbox: true, // Show checkboxes.
    clickFolderMode: 2, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
  });
  // Init FancyTree - With Checkboxes
  $(".js-tree-4").fancytree({
    selectMode: 1,
    checkbox: true, // Show checkboxes Class added to tree html to convert to radios ".fancytree-radio"
    clickFolderMode: 2, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
  });
  // Init FancyTree - With Childcounter Extension
  $(".js-tree-5").fancytree({
    extensions: ["childcounter"],
    childcounter: {
      deep: true,
      hideZeros: true,
      hideExpanded: true
    },
  });
  // Attach the fancytree widget to an existing <div id="tree"> element
  // and pass the tree options as an argument to the fancytree() function:
  $("#columnview").fancytree({
    extensions: ["columnview"],
    checkbox: true,
    source: {
      url: "plugins/json/ajax-tree-plain2.json"
    },
    lazyLoad: function (event, data) {
      data.result = {
        url: "plugins/json/ajax-sub2.json"
      };
    },
    activate: function (event, data) {
      $("td#preview").text("activate " + data.node);
    },
    select: function (event, data) {
      // create a tag, when node is selected
      var node = data.node;
      $("span#tag-" + node.key).remove();
      if (node.selected) {
        $("<span>", {
          id: "tag-" + node.key,
          text: node.title,
          "class": "selTag"
        })
          .data("key", node.key)
          .appendTo($("td#tags"));
      }
    }
  });
  // Init FancyTree - w/Drag and Drop Functionality
  $(".js-tree-6").fancytree({
    extensions: ["dnd", "edit"],
    // titlesTabbable: true,
    source: {
      url: "plugins/json/ajax-tree-plain.json"
    },
    dnd: {
      autoExpandMS: 400,
      focusOnClick: true,
      preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
      preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
      dragStart: function (node, data) {
        /** This function MUST be defined to enable dragging for the tree.
         *  Return false to cancel dragging of node.
         */
        return true;
      },
      dragEnter: function (node, data) {
        /** data.otherNode may be null for non-fancytree droppables.
         *  Return false to disallow dropping on node. In this case
         *  dragOver and dragLeave are not called.
         *  Return 'over', 'before, or 'after' to force a hitMode.
         *  Return ['before', 'after'] to restrict available hitModes.
         *  Any other return value will calc the hitMode from the cursor position.
         */
        // Prevent dropping a parent below another parent (only sort
        // nodes under the same parent)
        /*           if(node.parent !== data.otherNode.parent){
         return false;
         }
         // Don't allow dropping *over* a node (would create a child)
         return ["before", "after"];
         */
        return true;
      },
      dragDrop: function (node, data) {
        /** This function MUST be defined to enable dropping of items on
         *  the tree.
         */
        data.otherNode.moveTo(node, data.hitMode);
      }
    },
    activate: function (event, data) {
      //        alert("activate " + data.node);
    },
    lazyLoad: function (event, data) {
      data.result = {
        url: "plugins/json/ajax-sub2.json"
      }
    }
  });
  // Init FancyTree - w/Inline Editing Functionality
  $(".js-tree-7").fancytree({
    extensions: ["edit"],
    source: {
      url: "plugins/json/ajax-tree-plain.json"
    },
    lazyLoad: function (event, data) {
      data.result = {
        url: "ajax-sub2.json",
        debugDelay: 1000
      };
    },
    edit: {
      triggerStart: ["f2", "dblclick", "shift+click", "mac+enter"],
      beforeEdit: function (event, data) {
        // Return false to prevent edit mode
      },
      edit: function (event, data) {
        // Editor was opened (available as data.input)
      },
      beforeClose: function (event, data) {
        // Return false to prevent cancel/save (data.input is available)
      },
      save: function (event, data) {
        // Save data.input.val() or return false to keep editor open
        console.log("save...", this, data);
        // Simulate to start a slow ajax request...
        setTimeout(function () {
          $(data.node.span).removeClass("pending");
          // Let's pretend the server returned a slightly modified
          // title:
          data.node.setTitle(data.node.title + "!");
        }, 2000);
        // We return true, so ext-edit will set the current user input
        // as title
        return true;
      },
      close: function (event, data) {
        // Editor was removed
        if (data.save) {
          // Since we started an async request, mark the node as preliminary
          $(data.node.span).addClass("pending");
        }
      }
    }
  });
  // Attach the fancytree widget to an existing <div id="tree"> element
  // and pass the tree options as an argument to the fancytree() function:
  $(".js-tree-8").fancytree({
    extensions: ["filter"],
    quicksearch: true,
    source: {
      url: "plugins/json/ajax-tree-local.json"
    },
    filter: {
      mode: "hide",
      autoApply: true
    },
    activate: function (event, data) {
      //        alert("activate " + data.node);
    },
    lazyLoad: function (event, data) {
      data.result = {
        url: "plugins/json/ajax-sub2.json"
      }
    }
  });

  // select list dropdowns - placeholder like creation
  var selectList = $('.admin-form select');
  selectList.each(function (i, e) {
    $(e).on('change', function () {
      if ($(e).val() == "0") $(e).addClass("empty");
      else $(e).removeClass("empty")
    });
  });
  selectList.each(function (i, e) {
    $(e).change();
  });
  // Init TagsInput plugin
  $("input.tagsinput").tagsinput({
    tagClass: function (item) {
      return 'label bg-primary light';
    }
  });


  // Init Ladda Plugin on buttons
  Ladda.bind('.ladda-button', {
    timeout: 2000
  });

  // Bind progress buttons and simulate loading progress. Note: Button still requires ".ladda-button" class.
  Ladda.bind('.progress-button', {
    callback: function (instance) {
      var progress = 0;
      var interval = setInterval(function () {
        progress = Math.min(progress + Math.random() * 0.1, 1);
        instance.setProgress(progress);
        if (progress === 1) {
          instance.stop();
          clearInterval(interval);
        }
      }, 200);
    }
  });

  // Init Highlight.js Plugin
  $('pre.highlight').each(function (i, block) {
    hljs.highlightBlock(block);
  });

  // Init Summernote Plugin
  $('.summernote').summernote({
    height: 255, //set editable area's height
    focus: false, //set focus editable area after Initialize summernote
    oninit: function () {
    },
    onChange: function (contents, $editable) {
    },
  });

  // Init Inline Summernote Plugin
  $('.summernote-edit').summernote({
    airMode: true,
    focus: false //set focus editable area after Initialize summernote
  });

  // Init MarkDown Editor
  $(".markdown-editor").markdown({
    savable: false,
    onChange: function (e) {
      var content = e.parseContent(),
        content_length = (content.match(/\\n/g) || []).length + content.length
      if (content == '') {
        $('#md-footer').hide()
      } else {
        $('#md-footer').show().html(content)
      }
    }
  });

  //enable / disable xedit
  $('.js-enable').click(function () {
    $(this).toggleClass('active');
    $('.js-editable').editable('toggleDisabled');
  });

  //editables
  $('.js-username').editable({
    type: 'text',
    pk: 1,
    name: 'username',
    title: 'Enter username'
  });

  $('.js-firstname').editable({
    validate: function (value) {
      if ($.trim(value) == '') return 'This field is required';
    }
  });

  $('.js-sex').editable({
    prepend: "not selected",
    source: [{
      value: 1,
      text: 'Male'
    }, {
      value: 2,
      text: 'Female'
    }],
    display: function (value, sourceData) {
      var colors = {
          "": "gray",
          1: "green",
          2: "blue"
        },
        elem = $.grep(sourceData, function (o) {
          return o.value == value;
        });
      if (elem.length) {
        $(this).text(elem[0].text).css("color", colors[value]);
      } else {
        $(this).empty();
      }
    }
  });
  $('.js-status').editable();
  $('.js-group').editable({
    showbuttons: false
  });
  $('.js-vacation').editable({
    datepicker: {
      todayBtn: 'linked'
    }
  });
  $('.js-dob').editable();
  $('.js-event').editable({
    placement: 'right',
    combodate: {
      firstItem: 'name'
    }
  });
  $('.js-meeting_start').editable({
    format: 'yyyy-mm-dd hh:ii',
    viewformat: 'dd/mm/yyyy hh:ii',
    validate: function (v) {
      if (v && v.getDate() == 10) return 'Day cant be 10!';
    },
    datetimepicker: {
      todayBtn: 'linked',
      weekStart: 1
    }
  });
  $('.js-comments').editable({
    showbuttons: 'bottom'
  });
  $('.js-note').editable();
  $('.js-pencil').click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('.js-note').editable('toggle');
  });
  $('.js-state').editable({
    source: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
  });
  $('.js-state2').editable({
    value: 'California',
    typeahead: {
      name: 'state',
      local: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    }
  });
  $('.js-fruits').editable({
    pk: 1,
    limit: 3,
    source: [{
      value: 1,
      text: 'banana'
    }, {
      value: 2,
      text: 'peach'
    }, {
      value: 3,
      text: 'apple'
    }, {
      value: 4,
      text: 'watermelon'
    }, {
      value: 5,
      text: 'orange'
    }]
  });


  // Editable table with address
  // ===

  $('.js-address').editable({
    value: {
      city: "Moscow",
      street: "Lenina",
      building: "12"
    },
    validate: function (value) {
      if (value.city == '') return 'city is required!';
    },
    display: function (value) {
      if (!value) {
        $(this).empty();
        return;
      }
      var html = '<b>' + $('<div>').text(value.city).html() + '</b>, ' + $('<div>').text(value.street).html() + ' st., bld. ' + $('<div>').text(value.building).html();
      $(this).html(html);
    }
  });


  // Editable table
  // ===

  $('.js-editable').on('hidden', function (e, reason) {
    if (reason === 'save' || reason === 'nochange') {
      var $next = $(this).closest('tr').next().find('.editable');
      if ($('.js-autoopen').is(':checked')) {
        setTimeout(function () {
          $next.editable('show');
        }, 300);
      } else {
        $next.focus();
      }
    }
  });


  /* @custom validation method (smartCaptcha)
   ------------------------------------------------------------------ */
  $.validator.methods.smartCaptcha = function (value, element, param) {
    return value == param;
  };

  $(".admin-validation-form").each(function(index, item){
    $(item).validate({
      /* @validation states + elements
       ------------------------------------------- */
      errorClass: "state-error",
      validClass: "state-success",
      errorElement: "em",
      /* @validation rules
       ------------------------------------------ */
      rules: {
        firstname: {
          required: true
        },
        lastname: {
          required: true
        },
        useremail: {
          required: true,
          email: true
        },
        website: {
          required: true,
          url: true
        },
        language: {
          required: true
        },
        upload1: {
          required: true,
          extension: "jpg|png|gif|jpeg|doc|docx|pdf|xls|rar|zip"
        },
        mobileos: {
          required: true
        },
        comment: {
          required: true,
          minlength: 30
        },
        mobile_phone: {
          require_from_group: [1, ".phone-group"]
        },
        home_phone: {
          require_from_group: [1, ".phone-group"]
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 16
        },
        repeatPassword: {
          required: true,
          minlength: 6,
          maxlength: 16,
          equalTo: '#password'
        },
        gender: {
          required: true
        },
        languages: {
          required: true
        },
        verification: {
          required: true,
          smartCaptcha: 19
        },
        applicant_age: {
          required: true,
          min: 16
        },
        licence_no: {
          required: function (element) {
            return $("#applicant_age").val() > 19;
          }
        },
        child_name: {
          required: "#parents:checked"
        }
      },
      /* @validation error messages
       ---------------------------------------------- */
      messages: {
        firstname: {
          required: 'Enter first name'
        },
        lastname: {
          required: 'Enter last name'
        },
        useremail: {
          required: 'Enter email address',
          email: 'Enter a VALID email address'
        },
        website: {
          required: 'Enter your website URL',
          url: 'URL should start with - http://www'
        },
        language: {
          required: 'Choose a language'
        },
        upload1: {
          required: 'Please browse a file',
          extension: 'File format not supported'
        },
        mobileos: {
          required: 'Please select a mobile platform'
        },
        comment: {
          required: 'Oops you forgot to comment',
          minlength: 'Enter at least 30 characters or more'
        },
        mobile_phone: {
          require_from_group: 'Fill at least a mobile contact'
        },
        home_phone: {
          require_from_group: 'Fill at least a home contact'
        },
        password: {
          required: 'Please enter a password'
        },
        repeatPassword: {
          required: 'Please repeat the above password',
          equalTo: 'Password mismatch detected'
        },
        gender: {
          required: 'Please choose specie'
        },
        languages: {
          required: 'Select laguages spoken'
        },
        verification: {
          required: 'Please enter verification code',
          smartCaptcha: 'Oops - enter a correct verification code'
        },
        applicant_age: {
          required: 'Enter applicant age',
          min: 'Must be 16 years and above'
        },
        licence_no: {
          required: 'Enter licence number'
        },
        child_name: {
          required: 'Please enter your childs name'
        }
      },
      /* @validation highlighting + error placement
       ---------------------------------------------------- */
      highlight: function (element, errorClass, validClass) {
        $(element).closest('.field').addClass(errorClass).removeClass(validClass);
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.field').removeClass(errorClass).addClass(validClass);
      },
      errorPlacement: function (error, element) {
        if (element.is(":radio") || element.is(":checkbox")) {
          element.closest('.option-group').after(error);
        } else {
          error.insertAfter(element.parent());
        }
      }
    });
  });

  // Form Wizard
  //   ------------------------------------------------------------------
  var wizardForms = $(".form-wizard");

  wizardForms.each(function(index, item){
    var wizardForm = $(item);

    wizardForm.validate({
      errorPlacement: function errorPlacement(error, element) {
        element.before(error);
      },
      rules: {
        confirm: {
          equalTo: "#password"
        }
      }
    });

    wizardForm.children(".wizard").steps({
      headerTag: ".wizard-section-title",
      bodyTag: ".wizard-section",
      onStepChanging: function (event, currentIndex, newIndex) {
        wizardForm.validate().settings.ignore = ":disabled,:hidden";
        return wizardForm.valid();
      },
      onFinishing: function (event, currentIndex) {
        wizardForm.validate().settings.ignore = ":disabled";
        return wizardForm.valid();
      },
      onFinished: function (event, currentIndex) {
        alert("Submitted!");
      }
    });
  });

  // Demo Wizard Functionality
  var formInnerWizard = $('.wizard');
  var formSteps = formInnerWizard.find('.steps');

  formInnerWizard.parents('.js-wizard').find('.wizard-options .holder-style').on('click', function (e) {
    e.preventDefault();
    var stepStyle = $(this).data('steps-style');
    var stepRight = $(e.target).parents('.wizard-options').find('.holder-style[data-steps-style="steps-right"]');
    var stepLeft = $(e.target).parents('.wizard-options').find('.holder-style[data-steps-style="steps-left"]');
    var stepJustified = $(e.target).parents('.wizard-options').find('.holder-style[data-steps-style="steps-justified"]');
    var currentWizard = $(e.target).parents('.js-wizard').find('.wizard');

    if (stepStyle === "steps-left") {
      stepRight.removeClass('holder-active');
      stepJustified.removeClass('holder-active');
      currentWizard.removeClass('steps-right steps-justified');
    }
    if (stepStyle === "steps-right") {
      stepLeft.removeClass('holder-active');
      stepJustified.removeClass('holder-active');
      currentWizard.removeClass('steps-left steps-justified');
    }
    if (stepStyle === "steps-justified") {
      stepLeft.removeClass('holder-active');
      stepRight.removeClass('holder-active');
      currentWizard.removeClass('steps-left steps-right');
    }
    // Assign new style
    if ($(this).hasClass('holder-active')) {
      currentWizard.removeClass(stepStyle);
    } else {
      currentWizard.addClass(stepStyle);
    }
    // Assign new active holder
    $(this).toggleClass('holder-active');
  });

  /* @time picker
   ------------------------------------------------------------------ */
  $('.inline-tp').timepicker();

  $('.timepicker-type-1').timepicker({
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $('.timepicker-type-2').timepicker({
    showOn: 'both',
    buttonText: '<i class="fa fa-clock-o"></i>',
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $('.timepicker-type-3').timepicker({
    showOn: 'both',
    disabled: true,
    buttonText: '<i class="fa fa-clock-o"></i>',
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  /* @date time picker
   ------------------------------------------------------------------ */
  $('.datetimepicker-type-1').datetimepicker({
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $('.datetimepicker-type-2').datetimepicker({
    showOn: 'both',
    buttonText: '<i class="fa fa-calendar-o"></i>',
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $('.datetimepicker-type-3').datetimepicker({
    showOn: 'both',
    buttonText: '<i class="fa fa-calendar-o"></i>',
    disabled: true,
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $('.inline-dtp').datetimepicker({
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
  });

  /* @date picker
   ------------------------------------------------------------------ */
  $(".datepicker-type-1").datepicker({
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    showButtonPanel: false,
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $('.datepicker-type-2').datepicker({
    numberOfMonths: 1,
    showOn: 'both',
    buttonText: '<i class="fa fa-calendar-o"></i>',
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $('.datepicker-type-3').datepicker({
    showOn: 'both',
    disabled: true,
    buttonText: '<i class="fa fa-calendar-o"></i>',
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $('.inline-dp').datepicker({
    numberOfMonths: 1,
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    showButtonPanel: false
  });

  /* @month picker
   ------------------------------------------------------------------ */
  $(".monthpicker-type-1").monthpicker({
    changeYear: false,
    stepYears: 1,
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    showButtonPanel: true,
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $(".monthpicker-type-2").monthpicker({
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    showOn: 'both',
    buttonText: '<i class="fa fa-calendar-o"></i>',
    showButtonPanel: true,
    beforeShow: function (input, inst) {
      var newclass = 'admin-form';
      var themeClass = $(this).parents('.admin-form').attr('class');
      var smartpikr = inst.dpDiv.parent();
      if (!smartpikr.hasClass(themeClass)) {
        inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
      }
    }
  });

  $(".monthpicker-type-3").monthpicker({
    changeYear: false,
    stepYears: 1,
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    showOn: 'both',
    buttonText: '<i class="fa fa-calendar-o"></i>',
    showButtonPanel: true,
    disabled: true,
  });

  $('.inline-mp').monthpicker({
    prevText: '<i class="fa fa-chevron-left"></i>',
    nextText: '<i class="fa fa-chevron-right"></i>',
    showButtonPanel: false
  });


  /* @color picker
   ------------------------------------------------------------------ */
  var cPicker1 = $(".colorpicker-type-1"),
    cPicker2 = $(".colorpicker-type-2");
  var cContainer1 = cPicker1.parents('.sfcolor').parent(),
    cContainer2 = cPicker2.parents('.sfcolor').parent();
  $(cContainer1).add(cContainer2).addClass('posr');


  cPicker1.each(function (index, item) {
    $(item).spectrum({
      color: bgInfo,
      appendTo: $(item).parents('.sfcolor').parent(),
      containerClassName: 'sp-left'
    });
  });

  cPicker2.each(function (index, item) {
    $(item).spectrum({
      color: bgPrimary,
      appendTo: $(item).parents('.sfcolor').parent(),
      containerClassName: 'sp-left',
      showInput: true,
      showPalette: true,
      palette: [
        [bgPrimary, bgSuccess, bgInfo],
        [bgWarning, bgDanger, bgAlert],
        [bgSystem, bgDark, bgBlack]
      ]
    });
  });


  $(".colorpicker-type-3").spectrum({
    color: bgLightDr,
    showInput: true
  });

  $(".inline-cp").spectrum({
    color: bgInfo,
    showInput: true,
    showPalette: true,
    chooseText: "Select Color",
    flat: true,
    palette: [
      [bgPrimary, bgSuccess, bgInfo, bgWarning,
        bgDanger, bgAlert, bgSystem, bgDark,
        bgSystem, bgDark, bgBlack
      ]
    ]
  });

  $(".colorpicker-type-1, .colorpicker-type-2, .colorpicker-type-3, .inline-cp").show();

  // Init plugins for ".js-calendar-widget"
  // plugins: FullCalendar

  $('.js-calendar-widget').each(function(index, item){
    $(item).fullCalendar({
      header: {
        right: ' prev,next,today,month,agendaWeek,agendaDay'
      },
      editable: true,
      events: [{
        title: 'ALL Day event',
        start: '2016-02-2',
        end: '2016-02-2',
        className: 'fc-event-warning'
      },
        {
          title: 'ALL DAY EVENT',
          start: '2016-03-11',
          end: '2016-03-11',
          className: 'fc-event-warning'
        },
        {
          title: 'Sony Meeting',
          start: '2016-05-2',
          end: '2016-05-2',
          className: 'fc-event-warning'
        },
        {
          title: 'Conference',
          start: '2016-05-11',
          end: '2016-05-13',
          className: 'fc-event-info'
        },
        {
          title: 'LONG EVENT',
          start: '2016-03-21',
          end: '2016-03-23',
          className: 'fc-event-info'
        }
      ],
      eventRender: function (event, element) {
        // create event tooltip using bootstrap tooltips
        $(element).attr("data-original-title", event.title);
        $(element).tooltip({
          container: 'body',
          delay: {
            "show": 100,
            "hide": 200
          }
        });
        // create a tooltip auto close timer
        $(element).on('show.bs.tooltip', function () {
          var autoClose = setTimeout(function () {
            $('.tooltip').fadeOut();
          }, 3500);
        });
      }
    });
  });

  /* @numeric stepper
   ------------------------------------------------------------------ */
  $('.stepper-type-3').stepper({
    wheel_step: 0.1,
    arrow_step: 0.2
  });

  $('.stepper-type-4').stepper({
    UI: false,
    allowWheel: false
  });


  /* @ui slider
   ------------------------------------------------------------------ */
  $(".slider-type-1").slider({
    range: "min",
    min: 0,
    max: 100,
    value: 30,
    slide: function (event, ui) {
      $(".slider-countbox").val("$" + ui.value);
    }
  });

  $(".slider-type-2").slider({
    range: true,
    values: [27, 63]
  });

  $(".slider-type-3").slider({
    range: true,
    values: [7, 53]
  });

  $(".slider-type-4").slider({
    range: true,
    values: [57, 93]
  });
  $(".slider-type-5").slider({
    range: true,
    values: [37, 63]
  });

  // Init plugins for ".task-widget"
  // plugins: Custom Functions + jQuery Sortable
  //
  var taskWidget = $('div.task-widget');
  var taskItems = taskWidget.find('li.task-item');
  var currentItems = taskWidget.find('ul.task-current');
  var completedItems = taskWidget.find('ul.task-completed');
  // Init jQuery Sortable on Task Widget
  taskWidget.sortable({
    items: taskItems, // only init sortable on list items (not labels)
    handle: '.task-menu',
    axis: 'y',
    connectWith: ".task-list",
    update: function (event, ui) {
      var Item = ui.item;
      var ParentList = Item.parent();
      // If item is already checked move it to "current items list"
      if (ParentList.hasClass('task-current')) {
        Item.removeClass('item-checked').find('input[type="checkbox"]').prop('checked', false);
      }
      if (ParentList.hasClass('task-completed')) {
        Item.addClass('item-checked').find('input[type="checkbox"]').prop('checked', true);
      }
    }
  });
  // Custom Functions to handle/assign list filter behavior
  taskItems.on('click', function (e) {
    e.preventDefault();
    var This = $(this);
    var Target = $(e.target);
    if (Target.is('.task-menu') && Target.parents('.task-completed').length) {
      This.remove();
      return;
    }
    if (Target.parents('.task-handle').length) {
      // If item is already checked move it to "current items list"
      if (This.hasClass('item-checked')) {
        This.removeClass('item-checked').find('input[type="checkbox"]').prop('checked', false);
      }
      // Otherwise move it to the "completed items list"
      else {
        This.addClass('item-checked').find('input[type="checkbox"]').prop('checked', true);
      }
    }
  });

  // Init plugins for ".compose-widget"
  // plugins: Summernote
  //
  $('.summernote-quick').summernote({
    height: 179, //set editable area's height
    focus: false, //set focus editable area after Initialize summernote
    toolbar: [
      ['style', ['bold', 'italic', 'underline',]],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
    ]
  });


  var sparkBars = $('.inlinesparkbars');

  var sparkColors = {
    "primary": [bgPrimary, bgPrimaryLr, bgPrimaryDr],
    "info": [bgInfo, bgInfoLr, bgInfoDr],
    "warning": [bgWarning, bgWarningLr, bgWarningDr],
    "success": [bgSuccess, bgSuccessLr, bgSuccessDr],
    "alert": [bgAlert, bgAlertLr, bgAlertDr]
  };
  // Init Sparkbars
  if (sparkBars.length) {

    var sparkbarInit = function () {
      $('.inlinesparkbars').each(function (i, e) {
        var This = $(this);
        var Color = sparkColors["primary"];
        var Height = '120';
        This.children().remove();
        // default color is "primary"
        // Color[0] = default shade
        // Color[1] = light shade
        // Color[2] = dark shade
        //alert('hi')
        // User assigned color and height, else default
        var userColor = This.data('spark-color');
        var userHeight = This.data('spark-height');

        if (userColor) {
          Color = sparkColors[userColor];
        }
        if (userHeight) {
          Height = userHeight;
        }
        $(e).sparkline('html', {
          type: 'bar',
          barWidth: 5,
          barSpacing: 2,
          height: Height,
          zeroAxis: false,
          barColor: Color[0]
        });
      });
    }

    // Refresh Sparklines on Resize
    var refreshSparkbars;

    $(window).resize(function (e) {
      clearTimeout(refreshSparkbars);
      refreshSparkbars = setTimeout(sparkbarInit, 500);
    });

    sparkbarInit();
  }

  var highColors = [bgSystem, bgSuccess, bgWarning, bgPrimary];
  // Chart data
  var seriesData = [{
    name: 'Phones',
    data: [0, 9, 17, 22, 19, 11.5, 5.2, 9, 17, 22, 19, 11.5, 5.2, 9, 17, 22, 19, 11.5, 5.2]
  }];
  var ecomChart = $('.js-ecommerce_chart-1');
  if (ecomChart.length) {
    ecomChart.each(function(index, item){
      $(item).highcharts({
        chart: {
          type: 'areaspline',
          marginTop: 30,
          backgroundColor: 'transparent',
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        yAxis: {
          title: {
            text: ''
          },
          gridLineColor: '#f0f2f6',
          gridLineWidth: 2,
          labels: {
            formatter: function () {
              return this.value;
            },
            style: {
              color: '#d1d4da',
              "textTransform": "uppercase",
              "fontSize": "12px",
              "letterSpacing": 0.02
            }
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            overflow: 'justify',
            style: {
              color: '#d1d4da',
              "textTransform": "uppercase",
              "fontSize": "10px",
              "letterSpacing": 0.02
            },
            y: 30
          },
          lineWidth: 0,
          tickWidth: 0,
          formatter: function () {
            return this.value; // clean, unformatted number for year
          }
        },
        tooltip: {
          valueSuffix: ' $'
        },
        plotOptions: {
          areaspline: {
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            marker: {
              enabled: false
            },
            pointInterval: 86400000, // one day
            pointStart: Date.UTC(2016, 3, 31, 0, 0, 0)
          }
        },
        series: [{
          name: 'Hestavollane',
          showInLegend: false,
          lineColor: 'rgba(0,0,0,0)',
          fillColor: {
            linearGradient: {
              x1: 0, y1: 0,
              x2: 0, y2: 1
            },
            stops: [[0.0, '#5ddcff'],
              [0.5, '#5ddcff'],
              [1.0, '#5cbbe3']]
          },
          data: [0, 850, 900, 1200, 1500, 1000, 1300, 1500, 2300, 2500, 2600, 2200, 3000, 3600, 3500, 2500, 2000, 0]

        }],
        navigation: {
          menuItemStyle: {
            fontSize: '10px'
          }
        }
      });
    });

    $('.load-new-data').click(function (e) {
      e.preventDefault();

      var chart = $($(e.target).parents('.js-load-data-wrapper').find($(e.target).data('load-into'))).highcharts();
      chart.series[0].setData($(e.target).data('load-data'));
    });
  }

  var ecomChart2 = $('.js-ecommerce_chart-2');

  if (ecomChart2.length) {
    ecomChart2.each(function(index, item){
      $(item).highcharts({
        chart: {
          zoomType: 'x',
          backgroundColor: 'transparent',
        },
        credits: false,
        title: {
          text: ''
        },
        yAxis: {
          title: {
            text: ''
          },
          gridLineColor: '#f0f2f6',
          gridLineWidth: 2,
          labels: {
            formatter: function () {
              return this.value;
            },
            style: {
              color: '#d1d4da',
              "textTransform": "uppercase",
              "fontSize": "12px",
              "letterSpacing": 0.02
            }
          }
        },
        xAxis: {
          type: 'datetime',
          categories: ['Jan', 'Feb', 'Mar', 'Apr',
            'May', 'Jun', 'Jul', 'Aug',
            'Sep', 'Oct', 'Nov', 'Dec'
          ],
          tickWidth: 0,
          lineWidth: 0,
          labels: {
            overflow: 'justify',
            style: {
              color: '#d1d4da',
              "textTransform": "uppercase",
              "fontSize": "10px",
              "letterSpacing": 0.02
            },
            y: 30
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, 'rgba(67, 199, 215, .7)'],
                [0.5, 'rgba(67, 199, 215, .3)'],
                [1, 'rgba(67, 199, 215, 0)']
              ]
            },
            marker: {
              radius: 6,
              lineWidth: 4,
              lineColor: '#fff'
            },
            lineWidth: 3,
            threshold: null
          }
        },

        series: [{
          type: 'area',
          name: 'Orders',
          data: [0, 1400, 900, 1200, 1500, 1000, 1300, 1500, 2900, 2500, 2600, 2200],
          color: '#43c7d7'
        }]
      });
    });

    $('.load-new-data-dropdown').each(function(index, item){
      $(item).find('a').click(function (e) {
        e.preventDefault();

        $(item).find('a').removeClass('bg-whitesmoke');
        $(this).addClass('bg-whitesmoke');

        var chart = $($(e.target).parents('.js-load-data-wrapper').find($(e.target).data('load-into'))).highcharts();
        chart.series[0].setData($(e.target).data('load-data'));
      });
    });
  }

  var ecomChart3 = $('.js-ecommerce_chart-3');
  if (ecomChart3.length) {
    ecomChart3.each(function(index, item){
      $(item).highcharts({
        chart: {
          zoomType: 'x',
          backgroundColor: 'transparent',
        },
        credits: false,
        title: {
          text: ''
        },
        yAxis: {
          title: {
            text: ''
          },
          gridLineColor: '#f0f2f6',
          gridLineWidth: 0,
          tickWidth: 0,
          lineWidth: 0,
          labels: {
            enabled: false
          }
        },
        xAxis: {
          labels: {
            enabled: false
          },
          tickWidth: 0,
          lineWidth: 0,
          gridLineWidth: 0
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, 'rgba(67, 199, 215, .7)'],
                [0.5, 'rgba(67, 199, 215, .3)'],
                [1, 'rgba(67, 199, 215, 0)']
              ]
            },
            marker: {
              radius: 3,
              lineWidth: 0,
              lineColor: '#fff'
            },
            lineWidth: 2,
            threshold: null
          }
        },

        series: [{
          type: 'area',
          name: 'Orders',
          data: [0, 1400, 900, 1200, 1500, 1000, 1300, 1500, 2900, 2500, 2600, 2200],
          color: '#43c7d7'
        }]
      });
    });
  }

  var ecomChart4 = $('.js-ecommerce_chart-4');
  if (ecomChart4.length) {
    ecomChart4.each(function(index, item){
      $(item).highcharts({
        credits: false,
        chart: {
          backgroundColor: 'transparent',
          className: '',
          type: 'line',
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          marginTop: 45,
          marginRight: 1,
        },
        title: {
          text: null
        },
        xAxis: {
          gridLineColor: '#eeefef',
          lineColor: '#d7d7d7',
          tickColor: '#d7d7d7',
          categories: ['Jan', 'Feb', 'Mar', 'Apr',
            'May', 'Jun', 'Jul', 'Aug',
            'Sep', 'Oct', 'Nov', 'Dec'
          ],
          tickWidth: 1,
          gridLineWidth: 1
        },
        yAxis: {
          min: 0,
          tickInterval: 5,
          gridLineColor: '#eeefef',
          title: {
            text: null,
          }
        },
        legend: {
          enabled: true,
          floating: false,
          align: 'right',
          verticalAlign: 'top',
          x: -15
        },
        plotOptions: {
          spline: {
            lineWidth: 3,
          },
          line: {
            lineWidth: 3,
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 5,
              states: {
                hover: {
                  enabled: true
                }
              }
            },
            shadow: {
             color: Highcharts.getOptions().colors[0],
             opacity: 0.03,
             width: 30,
             offsetY: 8
            },
            states: {
              hover: {
                lineWidth: 4
              }
            },
            threshold: null
          }
        },
        series: [{
          name: 'Notebooks',
          data: [2.9, 3.2, 4.7, 5.5, 8.9, 12.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
          color: '#fdde3c',
          shadow: {
            enabled: true,
            color: '#fdde3c',
            width:40,
            offsetY: 5,
            opacity: 0.015
          }
        }, {
          name: 'Phones',
          data: [5.0, 9, 17, 22, 19, 11.5, 5.2, 9.5, 11.3, 15.3, 19.9, 24.6],
          color: '#fb6820',
          shadow: {
            enabled: true,
            color: '#fb6820',
            width:40,
            offsetY: 5,
            opacity: 0.015
          }
        }, {
          name: 'Desktops',
          data: [15, 19, 22.7, 29.3, 22.0, 17.0, 23.8, 19.1, 22.1, 14.1, 11.6, 7.5],
          color: '#2ae19e',
          shadow: {
            enabled: true,
            color: '#2ae19e',
            width:40,
            offsetY: 5,
            opacity: 0.015
          }
        }]

      });
    });
  }

  var ecomChart5 = $('.js-ecommerce_chart-5');
  if (ecomChart5.length) {
    ecomChart5.each(function(index, item){
      $(item).highcharts({
          credits: false,
          colors: ['#afc1d9', '#6e93ba', '#36506D', '#6e93ba'],
          chart: {
            backgroundColor: 'transparent',
            className: '',
            type: 'areaspline',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            marginTop: 45,
            marginRight: 0,
            spacingBottom: 0,
            spacingTop: 20,
            spacingLeft: 0,
            spacingRight: 0
          },
          title: {
            text: null
          },
          xAxis: {
            labels: {
              enabled: false
            },
            gridLineColor: "rgba(255, 255, 255, 0)",
            lineColor: "rgba(255, 255, 255, 0)",
            tickColor: "rgba(255, 255, 255, 0)",
          },
          yAxis: {
            labels: {
              enabled: false
            },
            gridLineColor: "rgba(255, 255, 255, 0)",
            title: {
              text: null,
            }
          },
          tooltip: {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
          },
          plotOptions: {
            area: {
              pointStart: 1940,

              marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                  hover: {
                    enabled: true
                  }
                }
              }
            },
            series: {
              marker: {
                enabled: false
              }
            }
          },
          legend: {
            enabled: true,
            floating: false,
            align: 'right',
            verticalAlign: 'top',
            x: -35,
            symbolHeight: 14,
            symbolWidth: 14,
            symbolRadius: 7,
            itemStyle: {
              fontWeight: 400,
              "fontSize": "15px"
            }
          },
          series: [
            {
              name: 'Desktops',
              data: [15, 19, 22.7, 29.3, 22.0, 17.0, 23.8, 19.1, 22.1, 14.1, 11.6, 7.5],
              lineWidth: 0,
            },
            {
              name: 'Notebooks',
              data: [2.9, 3.2, 4.7, 5.5, 8.9, 12.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
              lineWidth: 0,
            },
            {
              name: 'Tablets',
              data: [0.9, 1.9, 2.1, 3.5, 4.5, 3.2, 1.0, 6.6, 9.2, 8.1, 4.2, 1.8],
              lineWidth: 0,
            }]
        });
    });
  }

  // Widget VectorMap
  function runVectorMaps() {
    // Jvector Map Plugin
    var runJvectorMap = function ($item) {
      // Data set
      var mapData = [900, 700, 350, 500];
      // Init Jvector Map
      $item.vectorMap({
        map: 'world_mill_en',
        backgroundColor: 'transparent',
        series: {
          markers: [{
            attribute: 'r',
            scale: [3, 7],
            values: mapData
          }]
        },
        regionStyle: {
          initial: {
            fill: '#eaedf1'
          },
          hover: {
            fill: bgInfo
          }
        },
      });
      // Manual code to alter the Vector map plugin to
      // allow for individual coloring of countries
      var states = ['DE', 'US', 'CA', 'FR', 'HU'];

      var colors = [bgInfo, bgInfo, bgInfo, bgInfo, bgInfo];
      var colors2 = [bgInfo, bgInfo, bgInfo, bgInfo, bgInfo];
      $.each(states, function (i, e) {
        $item.find("path[data-code=" + e + "]").css({
          fill: colors[i]
        });
      });
      $item.find('.jvectormap-marker')
        .each(function (i, e) {
          $(e).css({
            fill: colors2[i],
            stroke: colors2[i]
          });
        });
    }
    if ($('.js-widget-map').length) {
      $('.js-widget-map').each(function(index, item){
        runJvectorMap($(item));
      });
    }

      var visitfromworld = $('.visitfromworld');


      if (visitfromworld.length) {

          visitfromworld.each(function (index, item) {
              jQuery(item).vectorMap({
                  map: 'world_mill_en'
                  , backgroundColor: '#fff'
                  , borderColor: '#ccc'
                  , borderOpacity: 0.9
                  , borderWidth: 1
                  , zoomOnScroll : false
                  , color: '#ddd'
                  , regionStyle: {
                      initial: {
                          fill: '#fff'
                      }
                  }
                  , markerStyle: {
                      initial: {
                          r: 8
                          , 'fill': '#99d683'
                          , 'fill-opacity': 1
                          , 'stroke': '#000'
                          , 'stroke-width': 0
                          , 'stroke-opacity': 1
                      }
                      , }
                  , enableZoom: true
                  , hoverColor: '#99d683'
                  , markers: [{
                      latLng: [21.00, 78.00]
                      , name: 'India : 9347'
                      , style: {fill: '#55ce63'}
                  },
                      {
                          latLng : [-33.00, 151.00],
                          name : 'Australia : 250'
                          , style: {fill: '#45b6ab'}
                      },
                      {
                          latLng : [61.00, 105.00],
                          name : 'Russia : 250'
                          , style: {fill: '#e76462'}
                      },
                      {
                          latLng : [36.77, -119.41],
                          name : 'USA : 250'
                          , style: {fill: '#458ab6'}
                      },
                      {
                          latLng : [55.37, -3.41],
                          name : 'UK   : 250'
                          , style: {fill: '#5a45b6'}
                      },
                      {
                          latLng : [25.20, 55.27],
                          name : 'UAE : 250'
                          , style: {fill: '#ed9d3e'}
                      }]
                  , hoverOpacity: null
                  , normalizeFunction: 'linear'
                  , scaleColors: ['#fff', '#ccc']
                  , selectedColor: '#c9dfaf'
                  , selectedRegions: []
                  , showTooltip: true
              });
          });
      }

    var secondMap = $('.js-widget-map-2');

    if (secondMap.length) {

      secondMap.each(function (index, item) {
        // Data set
        var mapData = [900, 700, 350, 500];

        // Init Jvector Map
        $(item).vectorMap({
          map: 'us_lcc_en',
          //regionsSelectable: true,
          backgroundColor: 'transparent',
          series: {
            markers: [{
              attribute: 'r',
              scale: [3, 7],
              values: mapData
            }]
          },
          regionStyle: {
            initial: {
              fill: '#E8E8E8'
            },
            hover: {
              "fill-opacity": 0.3
            }
          },
          markers: [{
            latLng: [37.78, -122.41],
            name: 'San Francisco,CA'
          }, {
            latLng: [36.73, -103.98],
            name: 'Texas,TX'
          }, {
            latLng: [38.62, -90.19],
            name: 'St. Louis,MO'
          }, {
            latLng: [40.67, -73.94],
            name: 'New York City,NY'
          }],
          markerStyle: {
            initial: {
              fill: '#a288d5',
              stroke: '#b49ae0',
              "fill-opacity": 1,
              "stroke-width": 10,
              "stroke-opacity": 0.3,
              r: 3
            },
            hover: {
              stroke: 'black',
              "stroke-width": 2
            },
            selected: {
              fill: 'blue'
            },
            selectedHover: {}
          }
        });


        // Manual code to alter the Vector map plugin to
        // allow for individual coloring of countries
        var states = ['US-CA', 'US-TX', 'US-MO', 'US-NY'],
          colors = [bgInfo, bgPrimaryLr, bgSuccessLr, bgWarningLr],
          colors2 = [bgInfo, bgPrimary, bgSuccess, bgWarning],
          secondMapMarker = $(item).find('.jvectormap-marker');

        for (var i = 0; i < states.length; i++) {
          var $mapItem =  $(".js-widget-map-2 path[data-code=" + states[i] + "]");
          $mapItem.css({
            fill: colors[i]
          })
        }

        for (i = 0; i < secondMapMarker.length; i++) {
          $(secondMapMarker[i]).css({
            fill: colors2[i],
            stroke: colors2[i]
          })
        }
      });
    }
  }
});


/**
 * D3Charts Demo initialization
 **/
var D3Charts = function () {
  // Init Flot Charts Plugin
  var runD3Charts = function () {

    // Add a series of colors to be used in the charts and pie graphs
    var Colors = [bgPrimary, bgInfo, bgWarning, bgAlert, bgDanger, bgSystem, bgSuccess,];

    // Line Chart
    var chart1 = $('.js-line-chart-d3');

    chart1.each(function(index, item){
      c3.generate({
        bindto: item,
        color: {
          pattern: Colors,
        },
        point: {
          r: 3
        },
        padding: {
          left: 30,
          right: 30,
          top: 0,
          bottom: 0,
        },
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ],
          axes: {
            data1: 'y',
            data2: 'y2',
          }
        },
        axis: {
          x: {
            label: 'X Label'
          },
          y: {
            label: {
              text: 'Y Axis Label',
              position: 'outer-middle'
            }
          },
          y2: {
            show: true,
            label: {
              text: 'Y2 Axis Label',
              position: 'outer-middle'
            }
          }
        }
      });
    });

    var chart2 = $('.js-area-chart-d3');

    chart2.each(function(index, item) {
      // Area Chart
      c3.generate({
        bindto: item,
        color: {
          pattern: Colors,
        },
        padding: {
          left: 30,
          right: 15,
          top: 0,
          bottom: 0,
        },
        data: {
          columns: [
            ['data1', 300, 350, 300, 0, 0, 0],
            ['data2', 130, 100, 140, 200, 150, 50]
          ],
          types: {
            data1: 'area',
            data2: 'area-spline'
          }
        }
      });
    });

    var chart3 = $('.js-step-chart-d3');

    chart3.each(function(index, item) {
      // Step Chart
      c3.generate({
        bindto: item,
        color: {
          pattern: Colors,
        },
        padding: {
          left: 30,
          right: 15,
          top: 0,
          bottom: 0,
        },
        data: {
          columns: [
            ['data1', 300, 350, 300, 0, 0, 100],
            ['data2', 130, 100, 140, 200, 150, 50]
          ],
          types: {
            data1: 'step',
            data2: 'area-step'
          }
        }
      });
    });

    var chart4 = $('.js-bar-chart-d3');

    chart4.each(function(index, item) {
      // Bar Chart
      var chart4 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors,
        },
        padding: {
          left: 30,
          right: 15,
          top: 0,
          bottom: 0,
        },
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 100, 140, 200, 150, 50]
          ],
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
          }
          // or
          //width: 100 // this makes bar width 100px
        }
      });
      setTimeout(function () {
        chart4.load({
          columns: [
            ['data3', 130, -150, 200, 300, -200, 100]
          ]
        });
      }, 1000);
    });

    var chart5 = $('.js-timeseries-chart-d3');
    chart5.each(function(index, item) {
      // TimeSeries Chart
      c3.generate({
        bindto: item,
        color: {
          pattern: Colors,
        },
        padding: {
          left: 30,
          right: 15,
          top: 0,
          bottom: 0,
        },
        data: {
          x: 'x',
          // xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
          columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            // ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 340, 200, 500, 250, 350]
          ]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
      });
    });

    var chart6 = $('.js-scatter-chart-d3');
    chart6.each(function(index, item) {
      // Scatter Chart
      var chart6 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors,
        },
        padding: {
          left: 30,
          right: 15,
          top: 0,
          bottom: 0,
        },
        data: {
          xs: {
            setosa: 'setosa_x',
            versicolor: 'versicolor_x',
          },
          // iris data from R
          columns: [
            ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
            ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
            ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
            ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
          ],
          type: 'scatter'
        },
        axis: {
          x: {
            label: 'Sepal.Width',
            tick: {
              fit: false
            }
          },
          y: {
            label: 'Petal.Width'
          }
        }
      });
    });

    var chart7 = $('.js-spline-chart-d3');

    chart7.each(function(index, item) {
      // Spline Chart
      var chart7 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors
        },
        padding: {
          left: 30,
          right: 15,
          top: 0,
          bottom: 0
        },
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 100, 140, 200, 150, 50]
          ],
          type: 'spline'
        }
      });
    });


    var chart8 = $('.js-subnav-chart-d3');

    chart8.each(function(index, item) {
      // Sub Navigation Chart
      var chart8 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors
        },
        padding: {
          left: 25,
          right: 15,
          top: 0,
          bottom: 0
        },
        data: {
          columns: [
            ['sample', 30, 200, 100, 400, 150, 250]
          ]
        },
        subchart: {
          show: true
        }
      });
    });


    // MouseWheel Zoom

    var chart9 = $('.js-zoom-chart-d3');

    chart9.each(function(index, item) {
      var chart9 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors
        },
        padding: {
          left: 30,
          right: 15,
          top: 0,
          bottom: 0
        },
        data: {
          columns: [
            ['sample', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
          ]
        },
        zoom: {
          enabled: true
        }
      });
    });

    // Donut Chart

    var chart10 = $('.js-donut-chart-d3');

    chart10.each(function(index, item) {
      var chart10 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors
        },
        data: {
          columns: [
            ['data1', 30],
            ['data2', 120]
          ],
          type : 'donut',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
          title: "Iris Petal Width"
        }
      });
    });

    // Guage Chart

    var chart11 = $('.js-guage-chart-d3');

    chart11.each(function(index, item) {
      var chart11 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors,
          threshold: {
            values: [30, 60, 90, 100]
          }
        },
        data: {
          columns: [
            ['data', 91.4]
          ],
          type: 'gauge',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        size: {
          height: 180
        }
      });
    });

    // Pie Chart

    var chart12 = $('.js-pie-chart-d3');

    chart12.each(function(index, item) {
      var chart12 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors
        },
        data: {
          // iris data from R
          columns: [
            ['data1', 30],
            ['data2', 120]
          ],
          type : 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
      });
    });

    // Combination Chart

    var chart13 = $('.js-combo-chart-d3');

    chart13.each(function(index, item) {
      var chart13 = c3.generate({
        bindto: item,
        color: {
          pattern: Colors
        },
        padding: {
          left: 30,
          right: 15,
          top: 0,
          bottom: 0
        },
        data: {
          columns: [
            ['data1', 30, 20, 50, 40, 60, 50],
            ['data2', 200, 130, 90, 240, 130, 220],
            ['data3', 300, 200, 160, 400, 250, 250],
            ['data4', 200, 130, 90, 240, 130, 220],
            ['data5', 130, 120, 150, 140, 160, 150],
            ['data6', 90, 70, 20, 50, 60, 120]
          ],
          type: 'bar',
          types: {
            data3: 'spline',
            data4: 'line',
            data6: 'area'
          },
          groups: [
            ['data1','data2']
          ]
        }
      });
    });

  };

  return {
    init: function () {
      runD3Charts();
    }
  };
}();


/**
 * HighCharts Demo initialization
 **/
var demoHighCharts = function () {

  // Define chart color patterns
  var highColors = [bgInfo, bgPrimary, bgSuccess, bgWarning,
    bgDanger, bgSuccess, bgSystem, bgDark
  ];

  // High Charts Demo
  var demoHighCharts = function() {


    // Column Charts
    var demoHighColumns = function() {

      var column1 = $('.js-high-column-widgets');

      if (column1.length) {
        column1.each(function(index, item){
          // Column Chart type 1
          $(item).highcharts({
            credits: false,
            colors: highColors,
            chart: {
              backgroundColor: 'transparent',
              type: 'column',
              padding: 0,
              margin: 0,
              marginTop: 10
            },
            legend: {
              enabled: false
            },
            title: {
              text: null
            },
            xAxis: {
              lineWidth: 0,
              tickLength: 0,
              minorTickLength: 0,
              title: {
                text: null
              },
              labels: {
                enabled: false
              }
            },
            yAxis: {
              gridLineWidth: 0,
              title: {
                text: null
              },
              labels: {
                enabled: false
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            plotOptions: {
              column: {
                groupPadding: 0.05,
                pointPadding: 0.25,
                borderWidth: 0
              }
            },
            series: [{
              name: 'Behance',
              data: [30]
            }, {
              name: 'Twitter',
              data: [60]
            }, {
              name: 'Facebook',
              data: [90]
            }, {
              name: 'Dribble',
              data: [120]
            }]
          });
        });
      }

      var column2 = $('.js-high-column-widgets-2');

      if (column2.length) {
        column2.each(function(index, item){
          // Column Chart 2
          $(item).highcharts({
            credits: false,
            colors: [bgPrimary, bgPrimary, bgWarning,
              bgWarning, bgInfo, bgInfo
            ],
            chart: {
              padding: 0,
              marginTop: 25,
              marginLeft: 15,
              marginRight: 5,
              marginBottom: 30,
              type: 'column',
            },
            legend: {
              enabled: false
            },
            title: {
              text: null,
            },
            xAxis: {
              lineWidth: 0,
              tickLength: 6,
              title: {
                text: null
              },
              labels: {
                enabled: true
              }
            },
            yAxis: {
              max: 20,
              lineWidth: 0,
              gridLineWidth: 0,
              lineColor: '#EEE',
              gridLineColor: '#EEE',
              title: {
                text: null
              },
              labels: {
                enabled: false,
                style: {
                  fontWeight: '400'
                }
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            plotOptions: {
              column: {
                colorByPoint: true,
              }
            },
            series: [{
              name: 'Tokyo',
              data: [12, 14, 20, 19, 8, 12,
                14, 20, 5, 16, 8, 12,
                14, 20, 19, 5, 16, 8,
                12, 14, 20, 19, 5, 16,
                8
              ]
            }]
          });
        });
      }

      var column3 = $('.js-high-column-widgets-3');

      if (column3.length) {
        column3.each(function(index, item){
          // Column Chart3
          $(item).highcharts({
            credits: false,
            colors: highColors,
            chart: {
              type: 'column',
              padding: 0,
              spacingTop: 10,
              marginTop: 100,
              marginLeft: 30,
              marginRight: 30
            },
            legend: {
              enabled: false
            },
            title: {
              text: '30.8 hrs',
              style: {
                fontSize: 20,
                fontWeight: 600
              }
            },
            subtitle: {
              text: 'Average First response time <br> in past 30 days',
              style: {
                color: '#AAA'
              }
            },
            xAxis: {
              lineWidth: 0,
              tickLength: 0,
              title: {
                text: null
              },
              labels: {
                enabled: true,
                formatter: function() {
                  return this.value + "-" + (
                    this.value + 2) +
                    "<br> hours"; // clean, unformatted number for year
                }
              },
            },
            yAxis: {
              gridLineWidth: 0,
              title: {
                text: null
              },
              labels: {
                enabled: false
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            plotOptions: {
              column: {
                colorByPoint: true,
                colors: [bgPrimary, bgPrimary,
                  bgInfo, bgInfo
                ],
                groupPadding: 0,
                pointPadding: 0.24,
                borderWidth: 0
              }
            },
            series: [{
              name: 'Yahoo',
              data: [7, 6, 9, 14, 18, 21, 25]
            }, {
              visible: false,
              name: 'CNN',
              data: [3, 4.2, 5.7, 8.5, 11.9, 15]
            }, {
              visible: false,
              name: 'Yahoo',
              data: [1, 5, 5, 11, 17, 22, 24]
            }, {
              visible: false,
              name: 'CNN',
              data: [1, 5, 5, 11, 17.0, 22, 24]
            }],
            dataLabels: {
              enabled: true,
              rotation: 0,
              color: '#AAA',
              align: 'center',
              x: 0,
              y: -8,
            }
          });
        });
      }

    }

    var demoHighBars = function() {

      var bars1 = $('.js-high-bars-widgets');

      if (bars1.length) {
        bars1.each(function(index, item){
          // Bar Chart 1
          $(item).highcharts({
            colors: highColors,
            credits: false,
            legend: {
              enabled: false,
              y: -5,
              verticalAlign: 'top',
              useHTML: true
            },
            chart: {
              spacingLeft: 30,
              type: 'bar',
              marginBottom: 0,
              marginTop: 0
            },
            title: {
              text: null
            },
            xAxis: {
              showEmpty: false,
              tickLength: 80,
              lineColor: '#EEE',
              tickColor: '#EEE',
              offset: 1,
              categories: ['TV', 'Radio'],
              title: {
                text: null
              },
              labels: {
                align: 'right',
              }
            },
            yAxis: {
              min: 0,
              gridLineWidth: 0,
              showEmpty: false,
              title: {
                text: null
              },
              labels: {
                enabled: false,
              }
            },
            tooltip: {
              valueSuffix: ' millions'
            },
            plotOptions: {
              bar: {}
            },
            series: [{
              id: 0,
              name: 'Viewers',
              data: [100, 100]
            }, {
              id: 1,
              name: 'Women',
              data: [36, 55]
            }, {
              id: 2,
              name: 'Men',
              data: [65, 45]
            }]
          });
        });
      }
    }

    var demoHighLines = function() {

      var line1 = $('.js-high-line-widgets');

      if (line1.length) {
        line1.each(function(index, item){
          // High Line 1
          $(item).highcharts({
            credits: false,
            colors: highColors,
            chart: {
              type: 'column',
              zoomType: 'x',
              panning: true,
              panKey: 'shift',
              marginRight: 50,
              marginTop: -5,
            },
            title: {
              text: null
            },
            xAxis: {
              gridLineColor: '#EEE',
              lineColor: '#EEE',
              tickColor: '#EEE',
              categories: ['Jan', 'Feb', 'Mar', 'Apr',
                'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec'
              ]
            },
            yAxis: {
              min: -2,
              tickInterval: 5,
              gridLineColor: '#EEE',
              title: {
                text: 'Traffic',
                style: {
                  color: bgInfo,
                  fontWeight: '600'
                }
              }
            },
            plotOptions: {
              spline: {
                lineWidth: 3,
              },
              area: {
                fillOpacity: 0.2
              }
            },
            legend: {
              enabled: false,
            },
            series: [{
              name: 'Yahoo',
              data: [7.0, 6, 9, 14, 18, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
              name: 'CNN',
              data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }, {
              visible: false,
              name: 'Yahoo',
              data: [1, 5, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
              visible: false,
              name: 'Facebook',
              data: [3, 1, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
              visible: false,
              name: 'Facebook',
              data: [7.0, 6, 9, 14, 18, 21.5, 25.2, 26.5, 23.3, 18.3,13.9, 9.6]
            }, {
              visible: false,
              name: 'CNN',
              data: [1, 5, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }]
          });
        });
      }

      var line2 = $('.js-high-line-2-widgets');

      if (line2.length) {
        line2.each(function(index, item){
          // High Line 1
          $(item).highcharts({
            credits: false,
            chart: {
              backgroundColor: 'transparent',
              className: '',
              type: 'line',
              zoomType: 'x',
              panning: true,
              panKey: 'shift',
              marginTop: 45,
              marginRight: 0,
              spacingRight: 0,
            },
            title: {
              text: null
            },
            xAxis: {
              gridLineColor: "rgba(255, 255, 255, 0)",
              lineColor: "rgba(255, 255, 255, 0)",
              tickColor: "rgba(255, 255, 255, 0)",
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              labels: {
                style: {
                  color: 'rgba(255, 255, 255,0.4)',
                  fontWeight: 'normal',
                  fontSize: '12px'
                }
              }
            },
            yAxis: {
              gridLineColor: "rgba(255, 255, 255, 0)",
              lineColor: "rgba(255, 255, 255, 0)",
              tickColor: "rgba(255, 255, 255, 0)",
              title: {
                text: null,
              },
              min: 0,
              tickInterval: 5,
              max: 35,
              labels: {
                style: {
                  color: 'rgba(255, 255, 255,0.4)',
                  fontWeight: 'normal',
                  fontSize: '12px'
                }
              }
            },
            legend: {
              enabled: false,
            },
            plotOptions: {
              spline: {
                lineWidth: 2
              },
              series: {
                marker: {
                  enabled: true,
                  symbol: 'circle',
                  radius: 5,
                  lineColor: "#fff",
                  fillColor: '#1e285c',
                  lineWidth: 2
                }
              },
              line: {
                lineWidth: 2,
                dashStyle: 'Dot',
                color: bgPrimary,
                marker: {
                  enabled: true,
                  symbol: 'circle',
                  radius: 5,
                  states: {
                    hover: {
                      enabled: true
                    }
                  }
                },
                states: {
                  hover: {
                    lineWidth: 2
                  }
                },
                threshold: null
              }
            },
            series: [{
              name: 'Search state',
              data: [5.0, 13.0, 14.0, 15.0, 8.0, 11.5, 9.2, 13.5, 7.3, 16.3, 9.9, 21.6],
            }]
          });
        });
      }

      var line3 = $('.js-high-line-3-widgets');

      if (line3.length) {
        line3.each(function(index, item){
          // High Line 3
          $(item).highcharts({
            credits: false,
            colors: highColors,
            chart: {
              backgroundColor: '#f9f9f9',
              type: 'line',
              zoomType: 'x',
              panning: true,
              panKey: 'shift',
              marginTop: 25,
              marginRight: 1,
            },
            title: {
              text: null
            },
            xAxis: {
              gridLineColor: '#EEE',
              lineColor: '#EEE',
              tickColor: '#EEE',
              categories: ['Jan', 'Feb', 'Mar', 'Apr',
                'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec'
              ]
            },
            yAxis: {
              min: 0,
              tickInterval: 5,
              gridLineColor: '#EEE',
              title: {
                text: null,
              }
            },
            plotOptions: {
              spline: {
                lineWidth: 3,
              },
              area: {
                fillOpacity: 0.2
              }
            },
            legend: {
              enabled: false,
            },
            series: [{
              name: 'Yahoo',
              data: [7.0, 6, 9, 14, 18, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
              name: 'CNN',
              data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
          });
        });
      }

      var line4 = $('.ecommerce-chart-1');

      if (line4.length) {
        line4.each(function(index, item){
          var highColors = [bgSystem, bgSuccess, bgWarning, bgPrimary];

          var seriesData = [{
            name: 'Phones',
            data: [5.0, 9, 17, 22, 19, 11.5, 5.2, 9.5, 11.3, 15.3, 19.9, 24.6]
          }, {
            name: 'Notebooks',
            data: [2.9, 3.2, 4.7, 5.5, 8.9, 12.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          }, {
            name: 'Desktops',
            data: [15, 19, 22.7, 29.3, 22.0, 17.0, 23.8, 19.1, 22.1, 14.1, 11.6, 7.5]
          }, {
            name: 'Music Players',
            data: [11, 6, 5, 15, 17.0, 22.0, 30.8, 24.1, 14.1, 11.1, 9.6, 6.5]
          }];

          $(item).highcharts({
            credits: false,
            colors: highColors,
            chart: {
              backgroundColor: 'transparent',
              className: 'br-r',
              type: 'line',
              zoomType: 'x',
              panning: true,
              panKey: 'shift',
              marginTop: 65,
              marginRight: 1,
            },
            title: {
              text: null
            },
            xAxis: {
              gridLineColor: '#EEE',
              lineColor: '#EEE',
              tickColor: '#EEE',
              categories: ['Jan', 'Feb', 'Mar', 'Apr',
                'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec'
              ]
            },
            yAxis: {
              min: 0,
              tickInterval: 5,
              gridLineColor: '#EEE',
              title: {
                text: null,
              }
            },
            plotOptions: {
              spline: {
                lineWidth: 3,
              },
              area: {
                fillOpacity: 0.2
              }
            },
            legend: {
              enabled: true,
              floating: false,
              align: 'right',
              verticalAlign: 'top',
            },
            series: seriesData
          });
        });
      }

    }

    // Pie Charts
    var demoHighPies = function() {

      var pie1 = $('.js-high-pie-widgets');

      if (pie1.length) {
        pie1.each(function(index, item){

          // Pie Chart1
          $(item).highcharts({
            credits: false,
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
            },
            title: {
              text: null
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                center: ['30%', '50%'],
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: false
                },
                showInLegend: true
              }
            },
            colors: highColors,
            legend: {
              x: 90,
              floating: true,
              verticalAlign: "middle",
              layout: "vertical",
              itemMarginTop: 10
            },
            series: [{
              type: 'pie',
              name: 'Browser share',
              data: [
                ['Firefox', 35.0],
                ['IE', 36.8], {
                  name: 'Chrome',
                  y: 15.8,
                  sliced: true,
                  selected: true
                },
                ['Safari', 18.5],
              ]
            }]
          });
        });
      }
    }

    // Demo High Area Charts
    var demoHighAreas = function() {

      var area1 = $('.js-high-area-widgets');

      if (area1.length) {
        area1.each(function(index, item){

          // Area 1
          $(item).highcharts({
            colors: highColors,
            credits: false,
            chart: {
              type: 'areaspline',
              spacing: 0,
              margin: -5
            },
            title: {
              text: null
            },
            legend: {
              enabled: false
            },
            xAxis: {
              allowDecimals: false,
              tickColor: '#EEE',
              labels: {
                formatter: function() {
                  return this.value; // clean, unformatted number for year
                }
              }
            },
            yAxis: {
              title: {
                text: null
              },
              gridLineColor: 'transparent',
              labels: {
                enabled: false,
              }
            },
            plotOptions: {
              areaspline: {
                fillOpacity: 0.25,
                marker: {
                  enabled: true,
                  symbol: 'circle',
                  radius: 2,
                  states: {
                    hover: {
                      enabled: true
                    }
                  }
                }
              }
            },
            series: [{
              id: 0,
              name: 'USA',
              data: [150, 260, 80, 100, 150,200, 240]
            }, {
              id: 1,
              name: 'Russia',
              data: [10, 20, 40, 120, 240, 180, 160]
            }, {
              id: 2,
              name: 'China',
              data: [60, 100, 180, 110, 100, 20, 40]
            }]
          });
        });
      }
    }

    // Init Chart Types
    demoHighColumns();
    demoHighLines();
    demoHighBars();
    demoHighPies();
    demoHighAreas();

  };

  // High Charts Demo
  var demoHighChartMenus = function() {

    // Create custom menus for charts associated
    // with the ".chart-legend" element
    var chartLegend = $('.chart-legend');

    if (chartLegend.length) {

      $('.chart-legend').each(function(i, ele) {
        var legendID = $(ele).parents('.panel').find($(ele).data('chart-id'));

        $(ele).find('a.legend-item').each(function(
          i, e) {
          var This = $(e);
          var itemID = This.data(
            'chart-id');
          // Use ID of menu to find what chart it belongs to
          // Then use ID of its child menu items to find out what
          // data on the chart it is connected to
          var legend = $(legendID).highcharts()
            .series[itemID];

          // pull legend name from chart and populate menu buttons
          var legendName = legend.name;
          This.html(legendName);
          // assign click handler which toggles legend data
          This.click(function(e) {
            if (This.attr(
                'href')) {
              e.preventDefault();
            }
            if (legend.visible) {
              legend.hide();
              This.toggleClass(
                'active'
              );
            } else {
              legend.show();
              This.toggleClass(
                'active'
              );
            }
          });
        });
      });
    }

    // Create custom menus for table charts
    var tableLegend = $('.table-legend');

    if (tableLegend.length) {

      $('.table-legend').each(function(i, e) {
        var legendID = $(e).parents('.panel').find($(e).data('chart-id'));

        $(e).find('input.legend-switch').each(
          function(i, e) {
            var This = $(e);
            var itemID = This.val();
            // Use ID of menu to find what chart it belongs to
            // Then use ID of its child menu items to find out what
            // data on the chart it is connected to
            var legend = $(legendID).highcharts()
              .series[itemID];
            // pull legend name from chart and populate menu buttons
            var legendName = legend.name;
            This.html(legendName);
            // Toggle checkbox state based on series visability
            if (legend.visible) {
              This.attr('checked', true);
            } else {
              This.attr('checked', false);
            }
            // assign click handler which toggles legend data
            This.on('click', function(i, e) {
              if (legend.visible) {
                legend.hide();
                This.attr(
                  'checked',
                  false);
              } else {
                legend.show();
                This.attr(
                  'checked',
                  true);
              }
            });
          });
      });
    }

  } // End Demo HighChart Menus

  // Advanced HighChart Demo
  var demoHighChartsAdvanced = function(chartItem) {

    // High Chart Data Set
    var data = [
        0.8446, 0.8445, 0.8444, 0.8451,    0.8418, 0.8264,    0.8258, 0.8232,    0.8233, 0.8258,
        0.8283, 0.8278, 0.8256, 0.8292,    0.8239, 0.8239,    0.8245, 0.8265,    0.8261, 0.8269,
        0.8273, 0.8244, 0.8244, 0.8172,    0.8139, 0.8146,    0.8164, 0.82,    0.8269, 0.8269,
        0.8269, 0.8258, 0.8247, 0.8286,    0.8289, 0.8316,    0.832, 0.8333,    0.8352, 0.8357,
        0.8355, 0.8354, 0.8403, 0.8403,    0.8406, 0.8403,    0.8396, 0.8418,    0.8409, 0.8384,
        0.8386, 0.8372, 0.839, 0.84, 0.8389, 0.84, 0.8423, 0.8423, 0.8435, 0.8422,
        0.838, 0.8373, 0.8316, 0.8303,    0.8303, 0.8302,    0.8369, 0.84, 0.8385, 0.84,
        0.8401, 0.8402, 0.8381, 0.8351,    0.8314, 0.8273,    0.8213, 0.8207,    0.8207, 0.8215,
        0.8242, 0.8273, 0.8301, 0.8346,    0.8312, 0.8312,    0.8312, 0.8306,    0.8327, 0.8282,
        0.824, 0.8255, 0.8256, 0.8273, 0.8209, 0.8151, 0.8149, 0.8213, 0.8273, 0.8273,
        0.8261, 0.8252, 0.824, 0.8262, 0.8258, 0.8261, 0.826, 0.8199, 0.8153, 0.8097,
        0.8101, 0.8119, 0.8107, 0.8105,    0.8084, 0.8069,    0.8047, 0.8023,    0.7965, 0.7919,
        0.7921, 0.7922, 0.7934, 0.7918,    0.7915, 0.787, 0.7861, 0.7861, 0.7853, 0.7867,
        0.7827, 0.7834, 0.7766, 0.7751, 0.7739, 0.7767, 0.7802, 0.7788, 0.7828, 0.7816,
        0.7829, 0.783, 0.7829, 0.7781, 0.7811, 0.7831, 0.7826, 0.7855, 0.7855, 0.7845,
        0.7798, 0.7777, 0.7822, 0.7785, 0.7744, 0.7743, 0.7726, 0.7766, 0.7806, 0.785,
        0.7907, 0.7912, 0.7913, 0.7931, 0.7952, 0.7951, 0.7928, 0.791, 0.7913, 0.7912,
        0.7941, 0.7953, 0.7921, 0.7919, 0.7968, 0.7999, 0.7999, 0.7974, 0.7942, 0.796,
        0.7969, 0.7862, 0.7821, 0.7821, 0.7821, 0.7811, 0.7833, 0.7849, 0.7819, 0.7809,
        0.7809, 0.7827, 0.7848, 0.785, 0.7873, 0.7894, 0.7907, 0.7909, 0.7947, 0.7987,
        0.799, 0.7927, 0.79, 0.7878, 0.7878, 0.7907, 0.7922, 0.7937, 0.786, 0.787,
        0.7838, 0.7838, 0.7837, 0.7836, 0.7806, 0.7825, 0.7798, 0.777, 0.777, 0.7772,
        0.7793, 0.7788, 0.7785, 0.7832, 0.7865, 0.7865, 0.7853, 0.7847, 0.7809, 0.778,
        0.7799, 0.78, 0.7801, 0.7765, 0.7785, 0.7811, 0.782, 0.7835, 0.7845, 0.7844,
        0.782, 0.7811, 0.7795, 0.7794, 0.7806, 0.7794, 0.7794, 0.7778, 0.7793, 0.7808,
        0.7824, 0.787, 0.7894, 0.7893, 0.7882, 0.7871, 0.7882, 0.7871, 0.7878, 0.79,
        0.7901, 0.7898, 0.7879, 0.7886, 0.7858, 0.7814, 0.7825, 0.7826, 0.7826, 0.786,
        0.7878, 0.7868, 0.7883, 0.7893, 0.7892, 0.7876, 0.785, 0.787, 0.7873, 0.7901,
        0.7936, 0.7939, 0.7938, 0.7956, 0.7975, 0.7978, 0.7972, 0.7995, 0.7995, 0.7994,
        0.7976, 0.7977, 0.796, 0.7922, 0.7928, 0.7929, 0.7948, 0.797, 0.7953, 0.7907,
        0.7872, 0.7852, 0.7852, 0.786, 0.7862, 0.7836, 0.7837, 0.784, 0.7867, 0.7867,
        0.7869, 0.7837, 0.7827, 0.7825, 0.7779, 0.7791, 0.779, 0.7787, 0.78, 0.7807,
        0.7803, 0.7817, 0.7799, 0.7799, 0.7795, 0.7801, 0.7765, 0.7725, 0.7683, 0.7641,
        0.7639, 0.7616, 0.7608, 0.759, 0.7582, 0.7539, 0.75, 0.75, 0.7507, 0.7505,
        0.7516, 0.7522, 0.7531, 0.7577, 0.7577, 0.7582, 0.755, 0.7542, 0.7576, 0.7616,
        0.7648, 0.7648, 0.7641, 0.7614, 0.757, 0.7587, 0.7588, 0.762, 0.762, 0.7617,
        0.7618, 0.7615, 0.7612, 0.7596, 0.758, 0.758, 0.758, 0.7547, 0.7549, 0.7613,
        0.7655, 0.7693, 0.7694, 0.7688, 0.7678, 0.7708, 0.7727, 0.7749, 0.7741, 0.7741,
        0.7732, 0.7727, 0.7737, 0.7724, 0.7712, 0.772, 0.7721, 0.7717, 0.7704, 0.769,
        0.7711, 0.774, 0.7745, 0.7745, 0.774, 0.7716, 0.7713, 0.7678, 0.7688, 0.7718,
        0.7718, 0.7728, 0.7729, 0.7698, 0.7685, 0.7681, 0.769, 0.769, 0.7698, 0.7699,
        0.7651, 0.7613, 0.7616, 0.7614, 0.7614, 0.7607, 0.7602, 0.7611, 0.7622, 0.7615,
        0.7598, 0.7598, 0.7592, 0.7573, 0.7566, 0.7567, 0.7591, 0.7582, 0.7585, 0.7613,
        0.7631, 0.7615, 0.76, 0.7613, 0.7627, 0.7627, 0.7608, 0.7583, 0.7575, 0.7562,
        0.752, 0.7512, 0.7512, 0.7517, 0.752, 0.7511, 0.748, 0.7509, 0.7531, 0.7531,
        0.7527, 0.7498, 0.7493, 0.7504, 0.75, 0.7491, 0.7491, 0.7485, 0.7484, 0.7492,
        0.7471, 0.7459, 0.7477, 0.7477, 0.7483, 0.7458, 0.7448, 0.743, 0.7399, 0.7395,
        0.7395, 0.7378, 0.7382, 0.7362, 0.7355, 0.7348, 0.7361, 0.7361, 0.7365, 0.7362,
        0.7331, 0.7339, 0.7344, 0.7327, 0.7327, 0.7336, 0.7333, 0.7359, 0.7359, 0.7372,
        0.736, 0.736, 0.735, 0.7365, 0.7384, 0.7395, 0.7413, 0.7397, 0.7396, 0.7385,
        0.7378, 0.7366, 0.74, 0.7411, 0.7406, 0.7405, 0.7414, 0.7431, 0.7431, 0.7438,
        0.7443, 0.7443, 0.7443, 0.7434, 0.7429, 0.7442, 0.744, 0.7439, 0.7437, 0.7437,
        0.7429, 0.7403, 0.7399, 0.7418, 0.7468, 0.748, 0.748, 0.749, 0.7494, 0.7522,
        0.7515, 0.7502, 0.7472, 0.7472, 0.7462, 0.7455, 0.7449, 0.7467, 0.7458, 0.7427,
        0.7427, 0.743, 0.7429, 0.744, 0.743, 0.7422, 0.7388, 0.7388, 0.7369, 0.7345,
        0.7345, 0.7345, 0.7352, 0.7341, 0.7341, 0.734, 0.7324, 0.7272, 0.7264, 0.7255,
        0.7258, 0.7258, 0.7256, 0.7257, 0.7247, 0.7243, 0.7244, 0.7235, 0.7235, 0.7235,
        0.7235, 0.7262, 0.7288, 0.7301, 0.7337, 0.7337, 0.7324, 0.7297, 0.7317, 0.7315,
        0.7288, 0.7263, 0.7263, 0.7242, 0.7253, 0.7264, 0.727, 0.7312, 0.7305, 0.7305,
        0.7318, 0.7358, 0.7409, 0.7454, 0.7437, 0.7424, 0.7424, 0.7415, 0.7419, 0.7414,
        0.7377, 0.7355, 0.7315, 0.7315, 0.732, 0.7332, 0.7346, 0.7328, 0.7323, 0.734,
        0.734, 0.7336, 0.7351, 0.7346, 0.7321, 0.7294, 0.7266, 0.7266, 0.7254, 0.7242,
        0.7213, 0.7197, 0.7209, 0.721, 0.721, 0.721, 0.7209, 0.7159, 0.7133, 0.7105,
        0.7099, 0.7099, 0.7093, 0.7093, 0.7076, 0.707, 0.7049, 0.7012, 0.7011, 0.7019,
        0.7046, 0.7063, 0.7089, 0.7077, 0.7077, 0.7077, 0.7091, 0.7118, 0.7079, 0.7053,
        0.705, 0.7055, 0.7055, 0.7045, 0.7051, 0.7051, 0.7017, 0.7, 0.6995, 0.6994,
        0.7014, 0.7036, 0.7021, 0.7002, 0.6967, 0.695, 0.695, 0.6939, 0.694, 0.6922,
        0.6919, 0.6914, 0.6894, 0.6891, 0.6904, 0.689, 0.6834, 0.6823, 0.6807, 0.6815,
        0.6815, 0.6847, 0.6859, 0.6822, 0.6827, 0.6837, 0.6823, 0.6822, 0.6822, 0.6792,
        0.6746, 0.6735, 0.6731, 0.6742, 0.6744, 0.6739, 0.6731, 0.6761, 0.6761, 0.6785,
        0.6818, 0.6836, 0.6823, 0.6805, 0.6793, 0.6849, 0.6833, 0.6825, 0.6825, 0.6816,
        0.6799, 0.6813, 0.6809, 0.6868, 0.6933, 0.6933, 0.6945, 0.6944, 0.6946, 0.6964,
        0.6965, 0.6956, 0.6956, 0.695, 0.6948, 0.6928, 0.6887, 0.6824, 0.6794, 0.6794,
        0.6803, 0.6855, 0.6824, 0.6791, 0.6783, 0.6785, 0.6785, 0.6797, 0.68, 0.6803,
        0.6805, 0.676, 0.677, 0.677, 0.6736, 0.6726, 0.6764, 0.6821, 0.6831, 0.6842,
        0.6842, 0.6887, 0.6903, 0.6848, 0.6824, 0.6788, 0.6814, 0.6814, 0.6797, 0.6769,
        0.6765, 0.6733, 0.6729, 0.6758, 0.6758, 0.675, 0.678, 0.6833, 0.6856, 0.6903,
        0.6896, 0.6896, 0.6882, 0.6879, 0.6862, 0.6852, 0.6823, 0.6813, 0.6813, 0.6822,
        0.6802, 0.6802, 0.6784, 0.6748, 0.6747, 0.6747, 0.6748, 0.6733, 0.665, 0.6611,
        0.6583, 0.659, 0.659, 0.6581, 0.6578, 0.6574, 0.6532, 0.6502, 0.6514, 0.6514,
        0.6507, 0.651, 0.6489, 0.6424, 0.6406, 0.6382, 0.6382, 0.6341, 0.6344, 0.6378,
        0.6439, 0.6478, 0.6481, 0.6481, 0.6494, 0.6438, 0.6377, 0.6329, 0.6336, 0.6333,
        0.6333, 0.633, 0.6371, 0.6403, 0.6396, 0.6364, 0.6356, 0.6356, 0.6368, 0.6357,
        0.6354, 0.632, 0.6332, 0.6328, 0.6331, 0.6342, 0.6321, 0.6302, 0.6278, 0.6308,
        0.6324, 0.6324, 0.6307, 0.6277, 0.6269, 0.6335, 0.6392, 0.64, 0.6401, 0.6396,
        0.6407, 0.6423, 0.6429, 0.6472, 0.6485, 0.6486, 0.6467, 0.6444, 0.6467, 0.6509,
        0.6478, 0.6461, 0.6461, 0.6468, 0.6449, 0.647, 0.6461, 0.6452, 0.6422, 0.6422,
        0.6425, 0.6414, 0.6366, 0.6346, 0.635, 0.6346, 0.6346, 0.6343, 0.6346, 0.6379,
        0.6416, 0.6442, 0.6431, 0.6431, 0.6435, 0.644, 0.6473, 0.6469, 0.6386, 0.6356,
        0.634, 0.6346, 0.643, 0.6452, 0.6467, 0.6506, 0.6504, 0.6503, 0.6481, 0.6451,
        0.645, 0.6441, 0.6414, 0.6409, 0.6409, 0.6428, 0.6431, 0.6418, 0.6371, 0.6349,
        0.6333, 0.6334, 0.6338, 0.6342, 0.632, 0.6318, 0.637, 0.6368, 0.6368, 0.6383,
        0.6371, 0.6371, 0.6355, 0.632, 0.6277, 0.6276, 0.6291, 0.6274, 0.6293, 0.6311,
        0.631, 0.6312, 0.6312, 0.6304, 0.6294, 0.6348, 0.6378, 0.6368, 0.6368, 0.6368,
        0.636, 0.637, 0.6418, 0.6411, 0.6435, 0.6427, 0.6427, 0.6419, 0.6446, 0.6468,
        0.6487, 0.6594, 0.6666, 0.6666, 0.6678, 0.6712, 0.6705, 0.6718, 0.6784, 0.6811,
        0.6811, 0.6794, 0.6804, 0.6781, 0.6756, 0.6735, 0.6763, 0.6762, 0.6777, 0.6815,
        0.6802, 0.678, 0.6796, 0.6817, 0.6817, 0.6832, 0.6877, 0.6912, 0.6914, 0.7009,
        0.7012, 0.701, 0.7005, 0.7076, 0.7087, 0.717, 0.7105, 0.7031, 0.7029, 0.7006,
        0.7035, 0.7045, 0.6956, 0.6988, 0.6915, 0.6914, 0.6859, 0.6778, 0.6815, 0.6815,
        0.6843, 0.6846, 0.6846, 0.6923, 0.6997, 0.7098, 0.7188, 0.7232, 0.7262, 0.7266,
        0.7359, 0.7368, 0.7337, 0.7317, 0.7387, 0.7467, 0.7461, 0.7366, 0.7319, 0.7361,
        0.7437, 0.7432, 0.7461, 0.7461, 0.7454, 0.7549, 0.7742, 0.7801, 0.7903, 0.7876,
        0.7928, 0.7991, 0.8007, 0.7823, 0.7661, 0.785, 0.7863, 0.7862, 0.7821, 0.7858,
        0.7731, 0.7779, 0.7844, 0.7866, 0.7864, 0.7788, 0.7875, 0.7971, 0.8004, 0.7857,
        0.7932, 0.7938, 0.7927, 0.7918, 0.7919, 0.7989, 0.7988, 0.7949, 0.7948, 0.7882,
        0.7745, 0.771, 0.775, 0.7791, 0.7882, 0.7882, 0.7899, 0.7905, 0.7889, 0.7879,
        0.7855, 0.7866, 0.7865, 0.7795, 0.7758, 0.7717, 0.761, 0.7497, 0.7471, 0.7473,
        0.7407, 0.7288, 0.7074, 0.6927, 0.7083, 0.7191, 0.719, 0.7153, 0.7156, 0.7158,
        0.714, 0.7119, 0.7129, 0.7129, 0.7049, 0.7095
      ],
      detailChart;

    // create the detail chart
    function createDetail(masterChart) {
      // prepare the detail chart
      var detailData = [],
        detailStart = Date.UTC(2008, 7, 1);

      $.each(masterChart.series[0].data, function() {
        if (this.x >= detailStart) {
          detailData.push(this.y);
        }
      });

      // create a detail chart referenced by a global variable
      detailChart = $(masterChart.renderTo).parents('.panel').find('.js-high-datamap-widgets').highcharts({
        chart: {
          type: 'spline',
          backgroundColor: 'transparent',
          reflow: true,
          marginTop: 25,
          marginBottom: 0,
          marginLeft: 35,
          marginRight: 5,
          style: {
            position: 'absolute'
          }
        },
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        xAxis: {
          type: 'datetime',
          minorTickLength: 0,
          tickLength: 0,
          gridLineWidth: 0,
          lineWidth: 0,
          lineColor: '#ddd',
          labels: {
            enabled: false
          },
        },
        yAxis: {
          gridLineColor: '#EEE',
          lineColor: '#EEE',
          tickColor: '#EEE',
          tickLength: 10,
          showFirstLabel: false,
          title: {
            text: null
          },
          labels: {
            x: -5
          },
          maxZoom: 0.1
        },
        tooltip: {
          formatter: function() {
            var point = this.points[
              0];
            return '<b>' +
              point.series.name +
              '</b><br/>' +
              Highcharts.dateFormat(
                '%A %B %e %Y',
                this.x) +
              ':<br/>' +
              '1 USD = ' +
              Highcharts.numberFormat(
                point.y, 2) +
              ' EUR';
          },
          shared: true
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          areaspline: {
            fillOpacity: 0.3,
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          },
          series: {
            marker: {
              enabled: false,
              states: {
                hover: {
                  enabled: true,
                  radius: 3
                }
              }
            }
          }
        },
        series: [{
          name: 'USD to EUR',
          pointStart: detailStart,
          pointInterval: 24 *
          3600 * 1000,
          data: detailData,
        }],
        exporting: {
          enabled: false
        }
      }).highcharts(); // return chart
    }

    // create the sibling chart
    function createMaster() {
      chartItem.highcharts({
        chart: {
          reflow: true,
          backgroundColor: 'transparent',
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 30,
          zoomType: 'x',
          events: {
            // listen to the selection event on the sibling chart to update the
            // extremes of the detail chart
            selection: function(event) {
              var
                extremesObject =
                  event.xAxis[
                    0],
                min =
                  extremesObject
                    .min,
                max =
                  extremesObject
                    .max,
                detailData = [],
                xAxis =
                  this.xAxis[
                    0];
              // reverse engineer the last part of the data
              $.each(this.series[
                  0].data,
                function() {
                  if (
                    this
                      .x >
                    min &&
                    this
                      .x <
                    max
                  ) {
                    detailData
                      .push(
                        [
                          this
                            .x,
                          this
                            .y
                        ]
                      );
                  }
                });
              // move the plot bands to reflect the new detail span
              xAxis.removePlotBand(
                'mask-before'
              );
              xAxis.addPlotBand({
                id: 'mask-before',
                from: min,
                to: max,
                color: 'rgba(0, 0, 0, 0.05)',
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1,
              });
              xAxis.removePlotBand(
                'mask-after'
              );
              detailChart.series[
                0].setData(
                detailData
              );
              return false;
            }
          }
        },
        title: {
          text: null
        },
        xAxis: {
          type: 'datetime',
          showLastTickLabel: true,
          maxZoom: 14 * 24 * 3600000, // fourteen days
          plotBands: [{
            id: 'mask-before',
            from: Date.UTC(
              2008, 0,
              1),
            to: Date.UTC(
              2008, 5,
              1),
            color: 'rgba(0, 0, 0, 0.05)',
          }],
          title: {
            text: null
          },
          showFirstLabel: false,
          showLastLabel: false
        },
        yAxis: {
          gridLineWidth: 0,
          // gridLineColor: '#EEE',
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          min: 0.6,
          showFirstLabel: false
        },
        tooltip: {
          formatter: function() {
            return false;
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            fillColor: {
              linearGradient: [
                '0%', '0%',
                '100%',
                '0%'
              ], // Left Top Right Bot
              stops: [
                [0,
                  'rgba(74,137,220, 0.75)'
                ],
                [1,
                  'rgba(74,137,220, 0.1)'
                ],
              ]
            },
            lineWidth: 1,
            marker: {
              enabled: false
            },
            shadow: false,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            enableMouseTracking: false
          }
        },
        series: [{
          type: 'area',
          name: 'USD to EUR',
          pointInterval: 24 *
          3600 * 1000,
          pointStart: Date.UTC(
            2006, 0, 1),
          data: data
        }],
        exporting: {
          enabled: false
        }
      }, function(masterChart) {
        createDetail(masterChart);
      }).highcharts(); // return chart instance
    }

    // create master and in its callback, create the detail chart
    createMaster();

  } // end HighChartsAdvanced

  // Color Library we used to grab a random color
  var sparkColors = {
    "primary": [bgPrimary, bgPrimaryLr, bgPrimaryDr],
    "info": [bgInfo, bgInfoLr, bgInfoDr],
    "warning": [bgWarning, bgWarningLr, bgWarningDr],
    "success": [bgSuccess, bgSuccessLr, bgSuccessDr],
    "alert": [bgAlert, bgAlertLr, bgAlertDr]
  };

  // Sparklines Demo
  var demoSparklines = function() {

    var sparkLine = $('.inlinesparkline');
    // Init Sparklines
    if (sparkLine.length) {

      var sparklineInit = function() {
        $('.inlinesparkline').each(function(i, e) {
          var This = $(this);
          var Color = sparkColors["primary"];
          var Height = '35';
          var Width = '70%';
          This.children().remove();
          // default color is "primary"
          // Color[0] = default shade
          // Color[1] = light shade
          // Color[2] = dark shade
          //alert('hi')
          // User assigned color and height, else default
          var userColor = This.data('spark-color');
          var userHeight = This.data('spark-height');
          if (userColor) {
            Color = sparkColors[userColor];
          }
          if (userHeight) {
            Height = userHeight;
          }
          $(e).sparkline('html', {
            type: 'line',
            width: Width,
            height: Height,
            enableTagOptions: true,
            lineColor: Color[2], // Also tooltip icon color
            fillColor: Color[1],
            spotColor: Color[0],
            minSpotColor: Color[0],
            maxSpotColor: Color[0],
            highlightSpotColor: bgWarningDr,
            highlightLineColor: bgWarningLr
          });
        });
      }

      // Refresh Sparklines on Resize
      var refreshSparklines;

      $(window).resize(function(e) {
        clearTimeout(refreshSparklines);
        refreshSparklines = setTimeout(sparklineInit, 500);
      });

      sparklineInit();
    }

  }// End Sparklines Demo

  // Circle Graphs Demo
  var demoCircleGraphs = function() {
    var infoCircle = $('.info-circle');
    if (infoCircle.length) {
      // Color Library we used to grab a random color
      var colors = {
        "primary": [bgPrimary, bgPrimaryLr,
          bgPrimaryDr
        ],
        "info": [bgInfo, bgInfoLr, bgInfoDr],
        "warning": [bgWarning, bgWarningLr,
          bgWarningDr
        ],
        "success": [bgSuccess, bgSuccessLr,
          bgSuccessDr
        ],
        "system": [bgSystem, bgSystemLr,
          bgSystemDr
        ],
        "danger": [bgDanger, bgDangerLr,
          bgDangerDr
        ],
        "alert": [bgAlert, bgAlertLr, bgAlertDr]
      };
      // Store all circles
      var circles = [];
      infoCircle.each(function(i, e) {
        // Define default color
        var color = ['#f1f4f8', bgPrimary];
        // Modify color if user has defined one
        var targetColor = $(e).data(
          'circle-color');
        if (targetColor) {
          var color = ['#f1f4f8', colors[
            targetColor][0]]
        }
        // Create all circles
        var circle = Circles.create({
          jsElement: e,
          value: $(e).attr('value'),
          radius: $(e).width() / 2,
          width: 14,
          colors: color,
          text: function(value) {
            var title = $(e).attr('title');
            if (title) {
              return '<h2 class="circle-text-value"> + ' + value + '</h2><p>' + title + '</p>'
            }
            else {
              return '<h2 class="circle-text-value mb5"> + ' + value + '</h2>'
            }
          }
        });
        circles.push(circle);
      });

      // Add debounced responsive functionality
      var rescale = function() {
        infoCircle.each(function(i, e) {
          var getWidth = $(e).width() / 2;
          circles[i].updateRadius(
            getWidth);
        });
        setTimeout(function() {
          // Add responsive font sizing functionality
          $('.info-circle').find('.circle-text-value').fitText(0.55);
        },50);
      }
      var lazyLayout = _.debounce(rescale, 300);
      $(window).resize(lazyLayout);

    }

  } // End Circle Graphs Demo

  // Helper functions used in widgets.js(this file)
  var defineHelpers = function() {



  }

  return {
    init: function () {

      // Init Demo Charts
      demoHighCharts();
      demoHighChartMenus();

      demoSparklines();
      demoCircleGraphs();

      defineHelpers();

      if ($('.js-high-datamap-widgets').length) {
        $('.js-high-siblingmap-widgets').each(function(index, item){
          demoHighChartsAdvanced($(item));
        });
      }

    }
  }
}();


/**
 * FlotCharts Demo initialization
 **/

var FlotCharts = function () {

  // Init Flot Chart Plugins
  var runFlotPlugins = function () {

    // Flot Time Plugin
    (function(e){function n(e,t){return t*Math.floor(e/t)}function r(e,t,n,r){if(typeof e.strftime=="function")return e.strftime(t);var i=function(e,t){return e=""+e,t=""+(t==null?"0":t),e.length==1?t+e:e},s=[],o=!1,u=e.getHours(),a=u<12;n==null&&(n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),r==null&&(r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]);var f;u>12?f=u-12:u==0?f=12:f=u;for(var l=0;l<t.length;++l){var c=t.charAt(l);if(o){switch(c){case"a":c=""+r[e.getDay()];break;case"b":c=""+n[e.getMonth()];break;case"d":c=i(e.getDate());break;case"e":c=i(e.getDate()," ");break;case"h":case"H":c=i(u);break;case"I":c=i(f);break;case"l":c=i(f," ");break;case"m":c=i(e.getMonth()+1);break;case"M":c=i(e.getMinutes());break;case"q":c=""+(Math.floor(e.getMonth()/3)+1);break;case"S":c=i(e.getSeconds());break;case"y":c=i(e.getFullYear()%100);break;case"Y":c=""+e.getFullYear();break;case"p":c=a?"am":"pm";break;case"P":c=a?"AM":"PM";break;case"w":c=""+e.getDay()}s.push(c),o=!1}else c=="%"?o=!0:s.push(c)}return s.join("")}function i(e){function t(e,t,n,r){e[t]=function(){return n[r].apply(n,arguments)}}var n={date:e};e.strftime!=undefined&&t(n,"strftime",e,"strftime"),t(n,"getTime",e,"getTime"),t(n,"setTime",e,"setTime");var r=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"];for(var i=0;i<r.length;i++)t(n,"get"+r[i],e,"getUTC"+r[i]),t(n,"set"+r[i],e,"setUTC"+r[i]);return n}function s(e,t){if(t.timezone=="browser")return new Date(e);if(!t.timezone||t.timezone=="utc")return i(new Date(e));if(typeof timezoneJS!="undefined"&&typeof timezoneJS.Date!="undefined"){var n=new timezoneJS.Date;return n.setTimezone(t.timezone),n.setTime(e),n}return i(new Date(e))}function l(t){t.hooks.processOptions.push(function(t,i){e.each(t.getAxes(),function(e,t){var i=t.options;i.mode=="time"&&(t.tickGenerator=function(e){var t=[],r=s(e.min,i),u=0,l=i.tickSize&&i.tickSize[1]==="quarter"||i.minTickSize&&i.minTickSize[1]==="quarter"?f:a;i.minTickSize!=null&&(typeof i.tickSize=="number"?u=i.tickSize:u=i.minTickSize[0]*o[i.minTickSize[1]]);for(var c=0;c<l.length-1;++c)if(e.delta<(l[c][0]*o[l[c][1]]+l[c+1][0]*o[l[c+1][1]])/2&&l[c][0]*o[l[c][1]]>=u)break;var h=l[c][0],p=l[c][1];if(p=="year"){if(i.minTickSize!=null&&i.minTickSize[1]=="year")h=Math.floor(i.minTickSize[0]);else{var d=Math.pow(10,Math.floor(Math.log(e.delta/o.year)/Math.LN10)),v=e.delta/o.year/d;v<1.5?h=1:v<3?h=2:v<7.5?h=5:h=10,h*=d}h<1&&(h=1)}e.tickSize=i.tickSize||[h,p];var m=e.tickSize[0];p=e.tickSize[1];var g=m*o[p];p=="second"?r.setSeconds(n(r.getSeconds(),m)):p=="minute"?r.setMinutes(n(r.getMinutes(),m)):p=="hour"?r.setHours(n(r.getHours(),m)):p=="month"?r.setMonth(n(r.getMonth(),m)):p=="quarter"?r.setMonth(3*n(r.getMonth()/3,m)):p=="year"&&r.setFullYear(n(r.getFullYear(),m)),r.setMilliseconds(0),g>=o.minute&&r.setSeconds(0),g>=o.hour&&r.setMinutes(0),g>=o.day&&r.setHours(0),g>=o.day*4&&r.setDate(1),g>=o.month*2&&r.setMonth(n(r.getMonth(),3)),g>=o.quarter*2&&r.setMonth(n(r.getMonth(),6)),g>=o.year&&r.setMonth(0);var y=0,b=Number.NaN,w;do{w=b,b=r.getTime(),t.push(b);if(p=="month"||p=="quarter")if(m<1){r.setDate(1);var E=r.getTime();r.setMonth(r.getMonth()+(p=="quarter"?3:1));var S=r.getTime();r.setTime(b+y*o.hour+(S-E)*m),y=r.getHours(),r.setHours(0)}else r.setMonth(r.getMonth()+m*(p=="quarter"?3:1));else p=="year"?r.setFullYear(r.getFullYear()+m):r.setTime(b+g)}while(b<e.max&&b!=w);return t},t.tickFormatter=function(e,t){var n=s(e,t.options);if(i.timeformat!=null)return r(n,i.timeformat,i.monthNames,i.dayNames);var u=t.options.tickSize&&t.options.tickSize[1]=="quarter"||t.options.minTickSize&&t.options.minTickSize[1]=="quarter",a=t.tickSize[0]*o[t.tickSize[1]],f=t.max-t.min,l=i.twelveHourClock?" %p":"",c=i.twelveHourClock?"%I":"%H",h;a<o.minute?h=c+":%M:%S"+l:a<o.day?f<2*o.day?h=c+":%M"+l:h="%b %d "+c+":%M"+l:a<o.month?h="%b %d":u&&a<o.quarter||!u&&a<o.year?f<o.year?h="%b":h="%b %Y":u&&a<o.year?f<o.year?h="Q%q":h="Q%q %Y":h="%Y";var p=r(n,h,i.monthNames,i.dayNames);return p})})})}var t={xaxis:{timezone:null,timeformat:null,twelveHourClock:!1,monthNames:null}},o={second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,quarter:7776e6,year:525949.2*60*1e3},u=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"]],a=u.concat([[3,"month"],[6,"month"],[1,"year"]]),f=u.concat([[1,"quarter"],[2,"quarter"],[1,"year"]]);e.plot.plugins.push({init:l,options:t,name:"time",version:"1.0"}),e.plot.formatDate=r})(jQuery);

    // Flot Tooltip Plugin
    !function(a){var b={tooltip:!1,tooltipOpts:{content:"%s | X: %x | Y: %y",xDateFormat:null,yDateFormat:null,shifts:{x:10,y:20},defaultTheme:!0,onHover:function(){}}},c=function(a){this.tipPosition={x:0,y:0},this.init(a)};c.prototype.init=function(b){function c(a){var b={};b.x=a.pageX,b.y=a.pageY,e.updateTooltipPosition(b)}function d(a,b,c){var d=e.getDomElement();if(c){var f;f=e.stringFormat(e.tooltipOptions.content,c),d.html(f),e.updateTooltipPosition({x:b.pageX,y:b.pageY}),d.css({left:e.tipPosition.x+e.tooltipOptions.shifts.x,top:e.tipPosition.y+e.tooltipOptions.shifts.y}).show(),"function"==typeof e.tooltipOptions.onHover&&e.tooltipOptions.onHover(c,d)}else d.hide().html("")}var e=this;b.hooks.bindEvents.push(function(b,f){if(e.plotOptions=b.getOptions(),e.plotOptions.tooltip!==!1&&"undefined"!=typeof e.plotOptions.tooltip){e.tooltipOptions=e.plotOptions.tooltipOpts;{e.getDomElement()}a(b.getPlaceholder()).bind("plothover",d),a(f).bind("mousemove",c)}}),b.hooks.shutdown.push(function(b,e){a(b.getPlaceholder()).unbind("plothover",d),a(e).unbind("mousemove",c)})},c.prototype.getDomElement=function(){var b;return a("#flotTip").length>0?b=a("#flotTip"):(b=a("<div />").attr("id","flotTip"),b.appendTo("body").hide().css({position:"absolute"}),this.tooltipOptions.defaultTheme&&b.css({background:"#fff","z-index":"100",padding:"0.4em 0.6em","border-radius":"0.5em","font-size":"0.8em",border:"1px solid #111",display:"none","white-space":"nowrap"})),b},c.prototype.updateTooltipPosition=function(b){var c=a("#flotTip").outerWidth()+this.tooltipOptions.shifts.x,d=a("#flotTip").outerHeight()+this.tooltipOptions.shifts.y;b.x-a(window).scrollLeft()>a(window).innerWidth()-c&&(b.x-=c),b.y-a(window).scrollTop()>a(window).innerHeight()-d&&(b.y-=d),this.tipPosition.x=b.x,this.tipPosition.y=b.y},c.prototype.stringFormat=function(a,b){var c=/%p\.{0,1}(\d{0,})/,d=/%s/,e=/%x\.{0,1}(?:\d{0,})/,f=/%y\.{0,1}(?:\d{0,})/,g=b.datapoint[0],h=b.datapoint[1];return"function"==typeof a&&(a=a(b.series.label,g,h,b)),"undefined"!=typeof b.series.percent&&(a=this.adjustValPrecision(c,a,b.series.percent)),"undefined"!=typeof b.series.label&&(a=a.replace(d,b.series.label)),this.isTimeMode("xaxis",b)&&this.isXDateFormat(b)&&(a=a.replace(e,this.timestampToDate(g,this.tooltipOptions.xDateFormat))),this.isTimeMode("yaxis",b)&&this.isYDateFormat(b)&&(a=a.replace(f,this.timestampToDate(h,this.tooltipOptions.yDateFormat))),"number"==typeof g&&(a=this.adjustValPrecision(e,a,g)),"number"==typeof h&&(a=this.adjustValPrecision(f,a,h)),"undefined"!=typeof b.series.xaxis.tickFormatter&&(a=a.replace(e,b.series.xaxis.tickFormatter(g,b.series.xaxis))),"undefined"!=typeof b.series.yaxis.tickFormatter&&(a=a.replace(f,b.series.yaxis.tickFormatter(h,b.series.yaxis))),a},c.prototype.isTimeMode=function(a,b){return"undefined"!=typeof b.series[a].options.mode&&"time"===b.series[a].options.mode},c.prototype.isXDateFormat=function(){return"undefined"!=typeof this.tooltipOptions.xDateFormat&&null!==this.tooltipOptions.xDateFormat},c.prototype.isYDateFormat=function(){return"undefined"!=typeof this.tooltipOptions.yDateFormat&&null!==this.tooltipOptions.yDateFormat},c.prototype.timestampToDate=function(b,c){var d=new Date(b);return a.plot.formatDate(d,c)},c.prototype.adjustValPrecision=function(a,b,c){var d,e=b.match(a);return null!==e&&""!==RegExp.$1&&(d=RegExp.$1,c=c.toFixed(d),b=b.replace(a,c)),b};var d=function(a){new c(a)};a.plot.plugins.push({init:d,options:b,name:"tooltip",version:"0.6.1"})}(jQuery);

    // Flot Navigate Plugin
    (function(e){function t(i){var l,h=this,p=i.data||{};if(p.elem)h=i.dragTarget=p.elem,i.dragProxy=a.proxy||h,i.cursorOffsetX=p.pageX-p.left,i.cursorOffsetY=p.pageY-p.top,i.offsetX=i.pageX-i.cursorOffsetX,i.offsetY=i.pageY-i.cursorOffsetY;else if(a.dragging||p.which>0&&i.which!=p.which||e(i.target).is(p.not))return;switch(i.type){case"mousedown":return e.extend(p,e(h).offset(),{elem:h,target:i.target,pageX:i.pageX,pageY:i.pageY}),o.add(document,"mousemove mouseup",t,p),s(h,!1),a.dragging=null,!1;case!a.dragging&&"mousemove":if(r(i.pageX-p.pageX)+r(i.pageY-p.pageY)<p.distance)break;i.target=p.target,l=n(i,"dragstart",h),l!==!1&&(a.dragging=h,a.proxy=i.dragProxy=e(l||h)[0]);case"mousemove":if(a.dragging){if(l=n(i,"drag",h),u.drop&&(u.drop.allowed=l!==!1,u.drop.handler(i)),l!==!1)break;i.type="mouseup"};case"mouseup":o.remove(document,"mousemove mouseup",t),a.dragging&&(u.drop&&u.drop.handler(i),n(i,"dragend",h)),s(h,!0),a.dragging=a.proxy=p.elem=!1}return!0}function n(t,n,r){t.type=n;var i=e.event.dispatch.call(r,t);return i===!1?!1:i||t.result}function r(e){return Math.pow(e,2)}function i(){return a.dragging===!1}function s(e,t){e&&(e.unselectable=t?"off":"on",e.onselectstart=function(){return t},e.style&&(e.style.MozUserSelect=t?"":"none"))}e.fn.drag=function(e,t,n){return t&&this.bind("dragstart",e),n&&this.bind("dragend",n),e?this.bind("drag",t?t:e):this.trigger("drag")};var o=e.event,u=o.special,a=u.drag={not:":input",distance:0,which:1,dragging:!1,setup:function(n){n=e.extend({distance:a.distance,which:a.which,not:a.not},n||{}),n.distance=r(n.distance),o.add(this,"mousedown",t,n),this.attachEvent&&this.attachEvent("ondragstart",i)},teardown:function(){o.remove(this,"mousedown",t),this===a.dragging&&(a.dragging=a.proxy=!1),s(this,!0),this.detachEvent&&this.detachEvent("ondragstart",i)}};u.dragstart=u.dragend={setup:function(){},teardown:function(){}}})(jQuery),function(e){function t(t){var n=t||window.event,r=[].slice.call(arguments,1),i=0,s=0,o=0,t=e.event.fix(n);return t.type="mousewheel",n.wheelDelta&&(i=n.wheelDelta/120),n.detail&&(i=-n.detail/3),o=i,void 0!==n.axis&&n.axis===n.HORIZONTAL_AXIS&&(o=0,s=-1*i),void 0!==n.wheelDeltaY&&(o=n.wheelDeltaY/120),void 0!==n.wheelDeltaX&&(s=-1*n.wheelDeltaX/120),r.unshift(t,i,s,o),(e.event.dispatch||e.event.handle).apply(this,r)}var n=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks)for(var r=n.length;r;)e.event.fixHooks[n[--r]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var e=n.length;e;)this.addEventListener(n[--e],t,!1);else this.onmousewheel=t},teardown:function(){if(this.removeEventListener)for(var e=n.length;e;)this.removeEventListener(n[--e],t,!1);else this.onmousewheel=null}},e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}(jQuery),function(e){function n(t){function n(e,n){var r=t.offset();r.left=e.pageX-r.left,r.top=e.pageY-r.top,n?t.zoomOut({center:r}):t.zoom({center:r})}function r(e,t){return e.preventDefault(),n(e,t<0),!1}function a(e){if(e.which!=1)return!1;var n=t.getPlaceholder().css("cursor");n&&(i=n),t.getPlaceholder().css("cursor",t.getOptions().pan.cursor),s=e.pageX,o=e.pageY}function f(e){var n=t.getOptions().pan.frameRate;if(u||!n)return;u=setTimeout(function(){t.pan({left:s-e.pageX,top:o-e.pageY}),s=e.pageX,o=e.pageY,u=null},1/n*1e3)}function l(e){u&&(clearTimeout(u),u=null),t.getPlaceholder().css("cursor",i),t.pan({left:s-e.pageX,top:o-e.pageY})}function c(e,t){var i=e.getOptions();i.zoom.interactive&&(t[i.zoom.trigger](n),t.mousewheel(r)),i.pan.interactive&&(t.bind("dragstart",{distance:10},a),t.bind("drag",f),t.bind("dragend",l))}function h(e,t){t.unbind(e.getOptions().zoom.trigger,n),t.unbind("mousewheel",r),t.unbind("dragstart",a),t.unbind("drag",f),t.unbind("dragend",l),u&&clearTimeout(u)}var i="default",s=0,o=0,u=null;t.zoomOut=function(e){e||(e={}),e.amount||(e.amount=t.getOptions().zoom.amount),e.amount=1/e.amount,t.zoom(e)},t.zoom=function(n){n||(n={});var r=n.center,i=n.amount||t.getOptions().zoom.amount,s=t.width(),o=t.height();r||(r={left:s/2,top:o/2});var u=r.left/s,a=r.top/o,f={x:{min:r.left-u*s/i,max:r.left+(1-u)*s/i},y:{min:r.top-a*o/i,max:r.top+(1-a)*o/i}};e.each(t.getAxes(),function(e,t){var n=t.options,r=f[t.direction].min,i=f[t.direction].max,s=n.zoomRange,o=n.panRange;if(s===!1)return;r=t.c2p(r),i=t.c2p(i);if(r>i){var u=r;r=i,i=u}o&&(o[0]!=null&&r<o[0]&&(r=o[0]),o[1]!=null&&i>o[1]&&(i=o[1]));var a=i-r;if(s&&(s[0]!=null&&a<s[0]||s[1]!=null&&a>s[1]))return;n.min=r,n.max=i}),t.setupGrid(),t.draw(),n.preventEvent||t.getPlaceholder().trigger("plotzoom",[t,n])},t.pan=function(n){var r={x:+n.left,y:+n.top};isNaN(r.x)&&(r.x=0),isNaN(r.y)&&(r.y=0),e.each(t.getAxes(),function(e,t){var n=t.options,i,s,o=r[t.direction];i=t.c2p(t.p2c(t.min)+o),s=t.c2p(t.p2c(t.max)+o);var u=n.panRange;if(u===!1)return;u&&(u[0]!=null&&u[0]>i&&(o=u[0]-i,i+=o,s+=o),u[1]!=null&&u[1]<s&&(o=u[1]-s,i+=o,s+=o)),n.min=i,n.max=s}),t.setupGrid(),t.draw(),n.preventEvent||t.getPlaceholder().trigger("plotpan",[t,n])},t.hooks.bindEvents.push(c),t.hooks.shutdown.push(h)}var t={xaxis:{zoomRange:null,panRange:null},zoom:{interactive:!1,trigger:"dblclick",amount:1.5},pan:{interactive:!1,cursor:"move",frameRate:20}};e.plot.plugins.push({init:n,options:t,name:"navigate",version:"1.3"})}(jQuery);

    // Float Selection Plugin
    (function(e){function t(t){function s(e){n.active&&(h(e),t.getPlaceholder().trigger("plotselecting",[a()]))}function o(t){if(t.which!=1)return;document.body.focus(),document.onselectstart!==undefined&&r.onselectstart==null&&(r.onselectstart=document.onselectstart,document.onselectstart=function(){return!1}),document.ondrag!==undefined&&r.ondrag==null&&(r.ondrag=document.ondrag,document.ondrag=function(){return!1}),c(n.first,t),n.active=!0,i=function(e){u(e)},e(document).one("mouseup",i)}function u(e){return i=null,document.onselectstart!==undefined&&(document.onselectstart=r.onselectstart),document.ondrag!==undefined&&(document.ondrag=r.ondrag),n.active=!1,h(e),m()?f():(t.getPlaceholder().trigger("plotunselected",[]),t.getPlaceholder().trigger("plotselecting",[null])),!1}function a(){if(!m())return null;if(!n.show)return null;var r={},i=n.first,s=n.second;return e.each(t.getAxes(),function(e,t){if(t.used){var n=t.c2p(i[t.direction]),o=t.c2p(s[t.direction]);r[e]={from:Math.min(n,o),to:Math.max(n,o)}}}),r}function f(){var e=a();t.getPlaceholder().trigger("plotselected",[e]),e.xaxis&&e.yaxis&&t.getPlaceholder().trigger("selected",[{x1:e.xaxis.from,y1:e.yaxis.from,x2:e.xaxis.to,y2:e.yaxis.to}])}function l(e,t,n){return t<e?e:t>n?n:t}function c(e,r){var i=t.getOptions(),s=t.getPlaceholder().offset(),o=t.getPlotOffset();e.x=l(0,r.pageX-s.left-o.left,t.width()),e.y=l(0,r.pageY-s.top-o.top,t.height()),i.selection.mode=="y"&&(e.x=e==n.first?0:t.width()),i.selection.mode=="x"&&(e.y=e==n.first?0:t.height())}function h(e){if(e.pageX==null)return;c(n.second,e),m()?(n.show=!0,t.triggerRedrawOverlay()):p(!0)}function p(e){n.show&&(n.show=!1,t.triggerRedrawOverlay(),e||t.getPlaceholder().trigger("plotunselected",[]))}function d(e,n){var r,i,s,o,u=t.getAxes();for(var a in u){r=u[a];if(r.direction==n){o=n+r.n+"axis",!e[o]&&r.n==1&&(o=n+"axis");if(e[o]){i=e[o].from,s=e[o].to;break}}}e[o]||(r=n=="x"?t.getXAxes()[0]:t.getYAxes()[0],i=e[n+"1"],s=e[n+"2"]);if(i!=null&&s!=null&&i>s){var f=i;i=s,s=f}return{from:i,to:s,axis:r}}function v(e,r){var i,s,o=t.getOptions();o.selection.mode=="y"?(n.first.x=0,n.second.x=t.width()):(s=d(e,"x"),n.first.x=s.axis.p2c(s.from),n.second.x=s.axis.p2c(s.to)),o.selection.mode=="x"?(n.first.y=0,n.second.y=t.height()):(s=d(e,"y"),n.first.y=s.axis.p2c(s.from),n.second.y=s.axis.p2c(s.to)),n.show=!0,t.triggerRedrawOverlay(),!r&&m()&&f()}function m(){var e=t.getOptions().selection.minSize;return Math.abs(n.second.x-n.first.x)>=e&&Math.abs(n.second.y-n.first.y)>=e}var n={first:{x:-1,y:-1},second:{x:-1,y:-1},show:!1,active:!1},r={},i=null;t.clearSelection=p,t.setSelection=v,t.getSelection=a,t.hooks.bindEvents.push(function(e,t){var n=e.getOptions();n.selection.mode!=null&&(t.mousemove(s),t.mousedown(o))}),t.hooks.drawOverlay.push(function(t,r){if(n.show&&m()){var i=t.getPlotOffset(),s=t.getOptions();r.save(),r.translate(i.left,i.top);var o=e.color.parse(s.selection.color);r.strokeStyle=o.scale("a",.8).toString(),r.lineWidth=1,r.lineJoin=s.selection.shape,r.fillStyle=o.scale("a",.4).toString();var u=Math.min(n.first.x,n.second.x)+.5,a=Math.min(n.first.y,n.second.y)+.5,f=Math.abs(n.second.x-n.first.x)-1,l=Math.abs(n.second.y-n.first.y)-1;r.fillRect(u,a,f,l),r.strokeRect(u,a,f,l),r.restore()}}),t.hooks.shutdown.push(function(t,n){n.unbind("mousemove",s),n.unbind("mousedown",o),i&&e(document).unbind("mouseup",i)})}e.plot.plugins.push({init:t,options:{selection:{mode:null,color:"#e8cfac",shape:"round",minSize:5}},name:"selection",version:"1.1"})})(jQuery);

    // Float Threshold Plugin
    (function(e){function n(t){function n(t,n,r,i,s){var o=r.pointsize,u,a,f,l,c,h=e.extend({},n);h.datapoints={points:[],pointsize:o,format:r.format},h.label=null,h.color=s,h.threshold=null,h.originSeries=n,h.data=[];var p=r.points,d=n.lines.show,v=[],m=[],g;for(u=0;u<p.length;u+=o){a=p[u],f=p[u+1],c=l,f<i?l=v:l=m;if(d&&c!=l&&a!=null&&u>0&&p[u-o]!=null){var y=a+(i-f)*(a-p[u-o])/(f-p[u-o+1]);c.push(y),c.push(i);for(g=2;g<o;++g)c.push(p[u+g]);l.push(null),l.push(null);for(g=2;g<o;++g)l.push(p[u+g]);l.push(y),l.push(i);for(g=2;g<o;++g)l.push(p[u+g])}l.push(a),l.push(f);for(g=2;g<o;++g)l.push(p[u+g])}r.points=m,h.datapoints.points=v;if(h.datapoints.points.length>0){var b=e.inArray(n,t.getData());t.getData().splice(b+1,0,h)}}function r(t,r,i){if(!r.threshold)return;r.threshold instanceof Array?(r.threshold.sort(function(e,t){return e.below-t.below}),e(r.threshold).each(function(e,o){n(t,r,i,o.below,o.color)})):n(t,r,i,r.threshold.below,r.threshold.color)}t.hooks.processDatapoints.push(r)}var t={series:{threshold:null}};e.plot.plugins.push({init:n,options:t,name:"threshold",version:"1.2"})})(jQuery);

  };

  // Init Flot Charts Plugin
  var runFlotCharts = function () {
    // Add a series of colors to be used in the charts and pie graphs
    var Colors = [bgPrimary, bgSuccess, bgInfo, bgWarning, bgDanger, bgAlert, bgSystem];

    // Typical random Number generator
    var randNum = function() {
      return (Math.floor(Math.floor((Math.random() * 5) + 1) + 5));
    };

    // Creates Random data values based on passed quantity and desired deviation
    function dataCreate(num, dev) {
      var dataPlots = [];
      for (var i = 0; i < num; i++) {
        if (i === 0) {
          dataPlots.push([(i + 1), 0]);
        } else {
          dataPlots.push([(i + 1), (randNum() * (i + dev))]);
        }
      }
      return (dataPlots);
    }

    var Grid = {
      grid: {
        show: true,
        aboveData: true,
        color: "#bbbbbb",
        labelMargin: 15,
        axisMargin: 0,
        borderWidth: 0,
        borderColor: null,
        minBorderMargin: 5,
        clickable: true,
        hoverable: true,
        autoHighlight: true,
        mouseActiveRadius: 20,
      },
      tooltip: true,
      //activate tooltip
      tooltipOpts: {
        content: "%x : %y.0",
        shifts: {
          x: -30,
          y: -50
        },
        defaultTheme: false
      }
    }

    var Grid2 = {
      grid: {
        show: true,
        aboveData: true,
        color: "#3f3f3f",
        labelMargin: 5,
        axisMargin: 0,
        borderWidth: 0,
        borderColor: null,
        minBorderMargin: 5,
        clickable: true,
        hoverable: true,
        autoHighlight: true,
        mouseActiveRadius: 20
      }
    }

    $(function() {
      var d1 = [];
      for (var i = 0; i < 14; i += 0.5) {
        d1.push([i, Math.sin(i)]);
      }
      var d2 = [
        [0, 10],
        [4, 8],
        [8, 4],
        [12, 22],
        [16, 25],
        [20, 14],
        [24, 10],
        [28, 16],
        [32, 10],
        [36, 8],
        [40, 10]
      ];
      var d2b = [
        [1, 7],
        [5, 12],
        [9, 19],
        [13, 9],
        [17, 11],
        [21, 33],
        [25, 4],
        [29, 25],
        [33, 7],
        [37, 12],
        [41, 14]
      ];
      var d2c = [
        [2, 12],
        [6, 19],
        [10, 10],
        [14, 4],
        [18, 18],
        [22, 25],
        [26, 18],
        [30, 11],
        [34, 12],
        [38, 19],
        [42, 18]
      ];

      var d3 = [];
      for (var i = 0; i < 14; i += 0.6) {
        d3.push([i, Math.cos(i)]);
      }
      var d3b = [];
      for (var i = 0; i < 14; i += 0.6) {
        d3b.push([i, Math.sin(i)]);
      }

      var d4 = [];
      for (var i = 0; i < 14; i += 0.1) {
        d4.push([i, Math.sqrt(i * 10)]);
      }

      var d5 = [];
      for (var i = 0; i < 14; i += 0.5) {
        d5.push([i, Math.sqrt(i)]);
      }

      var d6 = [];
      for (var i = 0; i < 14; i += 0.5 + Math.random()) {
        d6.push([i, Math.sqrt(2 * i + Math.sin(i) + 5)]);
      }

      var d7 = [
        {data: 5, color: Colors[0]},
        {data: 15, color: Colors[1]},
        {data: 10, color: Colors[2]}
      ]

      var d8 = [
        {data: 6, color: Colors[5]},
        {data: 4, color: Colors[1]},
        {data: 3, color: Colors[2]},
        {data: 4, color: Colors[0]}
      ]


      $(".chart").each(function(index, item){
        $.plot(item, [{
          data: d1,
          lines: {
            show: true,
            fill: true
          },
          color: Colors[1]
        }], Grid);
      });

      $('.chart2').each(function(index, item){
        $.plot(item, [{
          data: d2,
          bars: {
            show: true,
            fill: 1,
            fillColor: {
              colors: [{
                opacity: 0.8
              }, {
                opacity: 1
              }]
            }
          },
          color: Colors[3]
        }, {
          data: d2b,
          bars: {
            show: true,
            fill: 1,
            fillColor: {
              colors: [{
                opacity: 0.8
              }, {
                opacity: 1
              }]
            }
          },
          color: Colors[5]
        }, {
          data: d2c,
          bars: {
            show: true,
            fill: 1,
            fillColor: {
              colors: [{
                opacity: 0.8
              }, {
                opacity: 1
              }]
            }
          },
          color: Colors[2]
        }], Grid);
      });

      $('.chart3').each(function(index, item){
        $.plot(item, [{
          data: d3,
          points: {
            show: true,
            radius: 4
          },
          lines: {
            show: true
          },
          color: Colors[2]
        }, {
          data: d3b,
          points: {
            show: true,
            radius: 4
          },
          lines: {
            show: true
          },
          color: Colors[5],
        }], Grid);
      });

      $('.chart4').each(function(index, item){
        $.plot(item, [{
          data: d4,
          lines: {
            show: true,
            fill: true
          },
          color: Colors[4]
        }], Grid);
      });


      $('.chart5').each(function(index, item){
        $.plot(item, [{
          data: d5,
          lines: {
            show: true
          },
          points: {
            show: true
          },
          color: Colors[5]
        }], Grid);
      });


      $('.chart6').each(function(index, item){
        $.plot(item, [{
          data: d6,
          lines: {
            show: true,
            steps: true
          },
          color: Colors[6]
        }], Grid);
      });


      $('.pie1').each(function(index, item){
        $.plot(item, d7, {
          series: {
            pie: {
              innerRadius: 0.5,
              show: true,
            }
          },
        });
      });

      $('.pie2').each(function(index, item){
        $.plot(item, d8, {
          series: {
            pie: {
              innerRadius: 0,
              show: true,
            }
          },
        });
      });
    });

    $(function() {

      // live update
      var data = [],
        totalPoints = 300;

      function getRandomData() {

        if (data.length > 0)
          data = data.slice(1);

        // Do a random walk

        while (data.length < totalPoints) {

          var prev = data.length > 0 ? data[data.length - 1] : 50,
            y = prev + Math.random() * 10 - 5;

          if (y < 0) {
            y = 0;
          } else if (y > 100) {
            y = 100;
          }

          data.push(y);
        }

        // Zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
          res.push([i, data[i]])
        }

        return res;
      }

      var updateInterval = 400;

      $(".flot-live").each(function(index, item){
        var live = $.plot(item, [ getRandomData() ], {
          series: {
            lines: {
              show: true,
              lineWidth: 1,
              fill: true,
              fillColor: {
                colors: [{
                  opacity: 0.2
                }, {
                  opacity: 0.1
                }]
              }
            },
            shadowSize: 2
          },
          colors: ["#5DDCFF"],
          yaxis: {
            min: 0,
            max: 100
          },
          xaxis: {
            show: false
          },
          grid: {
            tickColor: "#C8EFF3",
            borderWidth: 0
          },
        });

        update(live);
      });

      function update(live) {
        live.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        live.draw();
        setTimeout(function(){
          update(live);
        }, updateInterval);
      }
    });

    function drawArrow(ctx, x, y, radius) {
      ctx.beginPath(), ctx.moveTo(x+radius, y+radius), ctx.lineTo(x, y), ctx.lineTo(x-radius, y+radius), ctx.stroke()
    }

    function drawSemiCircle(ctx, x, y, radius) {
      ctx.beginPath(), ctx.arc(x, y, radius, 0, Math.PI, !1), ctx.moveTo(x-radius, y), ctx.lineTo(x+radius, y), ctx.stroke()
    }

    for(var data1=[[1, 1, .5, .1, .3], [2, 2, .3, .5, .2], [3, 3, .9, .5, .2], [1.5, -.05, .5, .1, .3], [3.15, 1, .5, .1, .3], [2.5, -1, .5, .1, .3]], data1_points= {
      show:!0, radius:5, fillColor:"blue", errorbars:"xy", xerr: {
        show: !0, asymmetric: !0, upperCap: "-", lowerCap: "-"
      }
      , yerr: {
        show: !0, color: "#DA4453", upperCap: "-"
      }
    }
          , data2=[[.7, 3, .2, .4], [1.5, 2.2, .3, .4], [2.3, 1, .5, .2]], data2_points= {
        show:!0, radius:5, errorbars:"y", yerr: {
          show: !0, asymmetric: !0, upperCap: drawArrow, lowerCap: drawSemiCircle
        }
      }
          , data3=[[1, 2, .4], [2, .5, .3], [2.7, 2, .5]], data3_points= {
        radius:0, errorbars:"y", yerr: {
          show: !0, upperCap: "-", lowerCap: "-", radius: 5
        }
      }
          , data4=[[1.3, 1], [1.75, 2.5], [2.5, .5]], data4_errors=[.1, .4, .2], i=0;
        i<data4.length;
        i++)data4_errors[i]=data4[i].concat(data4_errors[i]);

    var data=[ {
      color: "#00BCD4", points: data1_points, data: data1, label: "data1"
    }
      , {
        color: "#E91E63", points: data2_points, data: data2, label: "data2"
      }
      , {
        color:"#009688", lines: {
          show: !0
        }
        , points:data3_points, data:data3, label:"data3"
      }
      , {
        color:"#673AB7", bars: {
          show: !0, align: "center", barWidth: .25
        }
        , data:data4, label:"data4"
      }
      , {
        color: "#673AB7", points: data3_points, data: data4_errors
      }
    ];

    $('.error-bars').each(function(index, item){
      $.plot($(item), data, {
          legend: {
            position: "sw", show: !0
          }
          , series: {
            lines: {
              show: !1
            }
          }
          , xaxis: {
            min: .6, max: 3.1
          }
          , yaxis: {
            min: 0, max: 3.5
          }
          , zoom: {
            interactive: !0
          }
          , pan: {
            interactive: !0
          }
          , grid: {
            borderWidth:1, borderColor:"#e9e9e9", color:"#999", minBorderMargin:20, labelMargin:10, margin: {
              top: 8, bottom: 20, left: 20
            }
          }
        }
      )
    });

    function labelFormatter(label, series) {
      return"<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>"+label+"<br/>"+Math.round(series.percent)+"%</div>"
    }
    var options= {
      series: {
        pie: {
          show:!0, radius:1, tilt:.5, label: {
            show:!0, radius:1, formatter:labelFormatter, background: {
              opacity: .8
            }
          }
          , combine: {
            color: "#999", threshold: .1
          }
        }
      }
      , legend: {
        show: !1
      }
      , colors:["#99B898", "#FECEA8", "#FF847C", "#E84A5F", "#2A363B", "#6C5B7B"]
    }
      , data=[ {
      label: "Series1", data: 50
    }
      , {
        label: "Series2", data: 70
      }
      , {
        label: "Series3", data: 60
      }
      , {
        label: "Series4", data: 90
      }
      , {
        label: "Series5", data: 80
      }
      , {
        label: "Series6", data: 110
      }
    ];

    $(".tilted-pie-chart").each(function(index, item){
      $.plot(item, data, options)
    });


    $(".flat-pie-chart").each(function(index, item){
      function labelFormatter(label, series) {
        return"<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>"+label+"<br/>"+Math.round(series.percent)+"%</div>"
      }
      var options= {
        series: {
          pie: {
            show:!0, radius:1, label: {
              show:!0, radius:1, formatter:labelFormatter, background: {
                opacity: .8
              }
            }
          }
        }
        , legend: {
          show: !1
        }
        , colors:["#99B898", "#FECEA8", "#FF847C", "#E84A5F", "#2A363B", "#6C5B7B"]
      }
        , data=[ {
        label: "Series1", data: 50
      }
        , {
          label: "Series2", data: 70
        }
        , {
          label: "Series3", data: 60
        }
        , {
          label: "Series4", data: 90
        }
        , {
          label: "Series5", data: 80
        }
        , {
          label: "Series6", data: 110
        }
      ];

      $.plot(item, data, options)
    });
  };
  return {
    init: function () {
      runFlotPlugins();
      runFlotCharts();
    }
  };
}();