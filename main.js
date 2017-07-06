define(function (require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        panelManager = brackets.getModule("view/WorkspaceManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        Dialogs = brackets.getModule("widgets/Dialogs"),
        DefaultDialogs = brackets.getModule("widgets/DefaultDialogs"),
        AppInit = brackets.getModule("utils/AppInit");

    var QUICKTEMPLATE_EXECUTE = "Quick Template";
    var panel;
    var btns = [{
        className: Dialogs.DIALOG_BTN_CLASS_PRIMARY,
        id: "close",
        text: "Close"
    }];

    ExtensionUtils.loadStyleSheet(module, "style.css");

    $(document.createElement('a'))
        .attr('id', 'quick-icon')
        .attr('href', '#')
        .attr('title', QUICKTEMPLATE_EXECUTE)
        .on('click', function () {
            run();
        })
        .appendTo($('#main-toolbar .buttons'));

    function templateHandle(templateContent) {
        try {
            var activeEditor = EditorManager.getActiveEditor();
            activeEditor.document.replaceRange(templateContent, activeEditor.getCursorPos());
        } catch (err) { }
    }

    function getFile(xurl) {
        var defaultExtension = ".html",
            doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);

        MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
        $.get(xurl, function (response) {
            templateHandle(response);
        });
        return new $.Deferred().resolve(doc).promise();
    }

    function templateHandle(templateContent) {
        try {
            var activeEditor = EditorManager.getActiveEditor();
            activeEditor.document.replaceRange(templateContent, activeEditor.getCursorPos());
        } catch (err) { }
    }

    function getFile(xurl) {
        var defaultExtension = ".html",
            doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);

        MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
        $.get(xurl, function (response) {
            templateHandle(response);
        });

        return new $.Deferred().resolve(doc).promise();
    }

    function run() {
        Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, QUICKTEMPLATE_EXECUTE, require("text!panel.html"), btns);
    }
});
