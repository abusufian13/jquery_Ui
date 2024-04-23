$(document).ready(function(){
  //Show the draggable plugin
  $( "#draggable" ).draggable();

  //dragg and dropp
  $( "#dragg" ).draggable();
    $( "#dropp" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });

    //resizable
    $( "#resizable" ).resizable();


    //selectable
    $( "#selectabl" ).selectable();

    //sortable
    $( "#sortable" ).sortable();

    //accordion
    $( "#accordion" ).accordion({
      collapsible: true
    });


    //Autocomplete
    var data = [
      "HTML CSS",
      "js",
      "JQ",
      "Bootstarp",
      "Php",
      "Larable" 
    ];
    $( "#c_name" ).autocomplete({
      source: data
    });


    //Spinner
    var spinner = $( "#spinner" ).spinner();
 
    $( "#disable" ).on( "click", function() {
      if ( spinner.spinner( "option", "disabled" ) ) {
        spinner.spinner( "enable" );
      } else {
        spinner.spinner( "disable" );
      }
    });
    $( "#destroy" ).on( "click", function() {
      if ( spinner.spinner( "instance" ) ) {
        spinner.spinner( "destroy" );
      } else {
        spinner.spinner();
      }
    });
    $( "#getvalue" ).on( "click", function() {
      alert( spinner.spinner( "value" ) );
    });
    $( "#setvalue" ).on( "click", function() {
      spinner.spinner( "value", 5 );
    });
 
    $( "button" ).button();

    //add class
    $( "#butyuo" ).on( "click", function() {
      $( "#effecthu" ).addClass( "newClass", 1000, callback );
    });
 
    function callback() {
      setTimeout(function() {
        $( "#effecthu" ).removeClass( "newClass" );
      }, 1500 );
    }


    //Color Animation
    var state = true;
    $( "#b_dhjg" ).on( "click", function() {
      if ( state ) {
        $( "#effectiop" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
          width: 500
        }, 1000 );
      } else {
        $( "#effectiop" ).animate({
          backgroundColor: "#fff",
          color: "#000",
          width: 240
        }, 1000 );
      }
      state = !state;
    });


    // run the currently selected effect
    function runEffect() {
      // get effect type from
      var selectedEffect = $( "#effectTypes" ).val();
 
      // Most effect types need no options passed by default
      var options = {};
      // some effects have required parameters
      if ( selectedEffect === "scale" ) {
        options = { percent: 50 };
      } else if ( selectedEffect === "transfer" ) {
        options = { to: "#u_hfdh", className: "ui-effects-transfer" };
      } else if ( selectedEffect === "size" ) {
        options = { to: { width: 200, height: 60 } };
      }
 
      // Run the effect
      $( "#effecfkdg" ).effect( selectedEffect, options, 500, callback );
    };
 
    // Callback function to bring a hidden box back
    function callback() {
      setTimeout(function() {
        $( "#effecfkdg" ).removeAttr( "style" ).hide().fadeIn();
      }, 1000 );
    };
 
    // Set effect from select menu value
    $( "#u_hfdh" ).on( "click", function() {
      runEffect();
      return false;
    });

    //Position Class
    function position() {
      $( ".positionable" ).position({
        of: $( "#parent" ),
        my: $( "#my_horizontal" ).val() + " " + $( "#my_vertical" ).val(),
        at: $( "#at_horizontal" ).val() + " " + $( "#at_vertical" ).val(),
        collision: $( "#collision_horizontal" ).val() + " " + $( "#collision_vertical" ).val()
      });
    }
 
    $( ".positionable" ).css( "opacity", 0.5 );
 
    $( "select, input" ).on( "click keyup change", position );
 
    $( "#parent" ).draggable({
      drag: position
    });
 
    position();

    //Widget Factory
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "custom.colorize", {
      // default options
      options: {
        red: 255,
        green: 0,
        blue: 0,
 
        // Callbacks
        change: null,
        random: null
      },
 
      // The constructor
      _create: function() {
        this.element
          // add a class for theming
          .addClass( "custom-colorize" );
 
        this.changer = $( "<button>", {
          text: "change",
          "class": "custom-colorize-changer"
        })
        .appendTo( this.element )
        .button();
 
        // Bind click events on the changer button to the random method
        this._on( this.changer, {
          // _on won't call random when widget is disabled
          click: "random"
        });
        this._refresh();
      },
 
      // Called when created, and later when changing options
      _refresh: function() {
        this.element.css( "background-color", "rgb(" +
          this.options.red +"," +
          this.options.green + "," +
          this.options.blue + ")"
        );
 
        // Trigger a callback/event
        this._trigger( "change" );
      },
 
      // A public method to change the color to a random value
      // can be called directly via .colorize( "random" )
      random: function( event ) {
        var colors = {
          red: Math.floor( Math.random() * 256 ),
          green: Math.floor( Math.random() * 256 ),
          blue: Math.floor( Math.random() * 256 )
        };
 
        // Trigger an event, check if it's canceled
        if ( this._trigger( "random", event, colors ) !== false ) {
          this.option( colors );
        }
      },
 
      // Events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        // remove generated elements
        this.changer.remove();
 
        this.element
          .removeClass( "custom-colorize" )
          .enableSelection()
          .css( "background-color", "transparent" );
      },
 
      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
      },
 
      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        // prevent invalid color values
        if ( /red|green|blue/.test(key) && (value < 0 || value > 255) ) {
          return;
        }
        this._super( key, value );
      }
    });
 
    // Initialize with default options
    $( "#my-widget1" ).colorize();
 
    // Initialize with two customized options
    $( "#my-widget2" ).colorize({
      red: 60,
      blue: 60
    });
 
    // Initialize with custom green value
    // and a random callback to allow only colors with enough green
    $( "#my-widget3" ).colorize( {
      green: 128,
      random: function( event, ui ) {
        return ui.green > 128;
      }
    });
 
    // Click to toggle enabled/disabled
    $( "#disable" ).on( "click", function() {
      // use the custom selector created for each widget to find all instances
      // all instances are toggled together, so we can check the state from the first
      if ( $( ":custom-colorize" ).colorize( "option", "disabled" ) ) {
        $( ":custom-colorize" ).colorize( "enable" );
      } else {
        $( ":custom-colorize" ).colorize( "disable" );
      }
    });
 
    // Click to set options after initialization
    $( "#green" ).on( "click", function() {
      $( ":custom-colorize" ).colorize( "option", {
        red: 64,
        green: 250,
        blue: 8
      });
    });


    //Dialog
    $( "#dialog1" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
 
    $( "#opener1" ).on( "click", function() {
      $( "#dialog1" ).dialog( "open" );
    });


    //Progressbar
    var progressTimer,
      progressbar = $( "#progressbar" ),
      progressLabel = $( ".progress-label" ),
      dialogButtons = [{
        text: "Cancel Download",
        click: closeDownload
      }],
      dialog = $( "#dialog" ).dialog({
        autoOpen: false,
        closeOnEscape: false,
        resizable: false,
        buttons: dialogButtons,
        open: function() {
          progressTimer = setTimeout( progress, 2000 );
        },
        beforeClose: function() {
          downloadButton.button( "option", {
            disabled: false,
            label: "Start Download"
          });
        }
      }),
      downloadButton = $( "#downloadButton" )
        .button()
        .on( "click", function() {
          $( this ).button( "option", {
            disabled: true,
            label: "Downloading..."
          });
          dialog.dialog( "open" );
        });
 
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( "Current Progress: " + progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
        dialog.dialog( "option", "buttons", [{
          text: "Close",
          click: closeDownload
        }]);
        $(".ui-dialog button").last().trigger( "focus" );
      }
    });
 
    function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
 
      progressbar.progressbar( "value", val + Math.floor( Math.random() * 3 ) );
 
      if ( val <= 99 ) {
        progressTimer = setTimeout( progress, 50 );
      }
    }
 
    function closeDownload() {
      clearTimeout( progressTimer );
      dialog
        .dialog( "option", "buttons", dialogButtons )
        .dialog( "close" );
      progressbar.progressbar( "value", false );
      progressLabel
        .text( "Starting download..." );
      downloadButton.trigger( "focus" );
    }
    


    

});