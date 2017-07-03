define(function(require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        panelManager = brackets.getModule("view/WorkspaceManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"), 
        AppInit = brackets.getModule("utils/AppInit");

    var QUICKTEMPLATE_EXECUTE = "QuickTemplate";
    var panel;
    var panelHtml     = require("text!panel.html");
    
    function handlePanel() {
        if(panel.isVisible()) {
            panel.hide();
            CommandManager.get(QUICKTEMPLATE_EXECUTE).setChecked(false);
        } else {
            panel.show();
            CommandManager.get(QUICKTEMPLATE_EXECUTE).setChecked(true);
        }
    }

    ExtensionUtils.loadStyleSheet(module, "style.css");
    CommandManager.register("Quick Template", QUICKTEMPLATE_EXECUTE, handlePanel);

    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(QUICKTEMPLATE_EXECUTE, "Ctrl-Alt-Q");
     $(document.createElement('a'))
        .attr('id', 'quick-icon')
        .attr('href', '#')
        .attr('title', QUICKTEMPLATE_EXECUTE)
        .on('click', function () {
            handlePanel();
        })
        .appendTo($('#main-toolbar .buttons'));
    panel = panelManager.createBottomPanel(QUICKTEMPLATE_EXECUTE, $(panelHtml));

});