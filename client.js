var config = {
    settings : {
        hasHeaders : true,
        constrainDragToContainer : false,
        reorderEnabled : false,
        selectionEnabled : false,
        popoutWholeStack : false,
        blockedPopoutsThrowError : false,
        closePopoutsOnUnload : false,
        showPopoutIcon : false,
        showMaximiseIcon : false,
        showCloseIcon : false
    },
    content : [ {
        type : 'row',
        content : [ {
            type : 'column',
            content : [ {
                type : 'component',
                componentName : 'codeEditorInput',
                componentState : {
                    label : 'A'
                }
            } ]
        }, {
            type : 'column',
            content : [ {
                type : 'component',
                componentName : 'speech',
                componentState : {
                    label : 'B'
                }
            }, {
                type : 'component',
                componentName : 'StackOverflow',
                componentState : {
                    label : 'C'
                }
            } ]
        } ]
    } ]
};
// end of initial goldenLayout configuration

/*
 * A few things to note about this config: Every item (apart from
 * components) can have children, specified in the content array type can be
 * 'row', 'column', 'stack' or 'component' componentName specifies which
 * component should be created. More about that further down componentState
 * can be any serialisable Object and will be passed to the component
 */

// For more details about the goldenLayout:
// https://www.golden-layout.com/tutorials/getting-started.html
// Instantiating the layout
var myLayout = new GoldenLayout(config); // remove this when adding

// Registering individual components
myLayout.registerComponent('codeEditorInput', function (container) {
    function integrateCodeEditor(container) {
        $.ajax({
            type: 'GET',
            url: 'editor.html'
        })
            .done(function (data, textStatus, jqXHR) {
                container.getElement().html(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                throw 'Code Editor module could not be loaded.';
            });
    }

    integrateCodeEditor(container);
});

// Registering Youtube component
myLayout.registerComponent('speech', function (container) {
    function integrateNotes(container) {
        $.ajax({
            type: 'GET',
            url: 'speech.html'
        })
            .done(function (data, textStatus, jqXHR) {
                container.getElement().html(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                throw 'Notes module could not be loaded.';
            });
        
    }

    integrateNotes(container);
});

myLayout.registerComponent('StackOverflow', function (container) {
    function integrateStackOverflow(container) {
        $.ajax({
            type: 'GET',
            url: 'overflow.html'
        })
            .done(function (data, textStatus, jqXHR) {
                container.getElement().html(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                throw 'Youtube module could not be loaded.';
            });

    }

    integrateStackOverflow(container);
});

myLayout.init();