define(function(require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        panelManager = brackets.getModule("view/WorkspaceManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"), 
        AppInit = brackets.getModule("utils/AppInit");

    var QUICKTHEME_EXECUTE = "quicktheme.execute";
    var panel;
    var panelHtml     = require("text!panel.html");
    
    function handlePanel() {
        if(panel.isVisible()) {
            panel.hide();
            CommandManager.get(QUICKTHEME_EXECUTE).setChecked(false);
        } else {
            panel.show();
            CommandManager.get(QUICKTHEME_EXECUTE).setChecked(true);
        }
    }

    ExtensionUtils.loadStyleSheet(module, "style.css");
    CommandManager.register("Quick Theme", QUICKTHEME_EXECUTE, handlePanel);

    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(QUICKTHEME_EXECUTE, "Ctrl-Alt-Q");

    panel = panelManager.createBottomPanel(QUICKTHEME_EXECUTE, $(panelHtml));

});