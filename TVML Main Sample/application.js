//# sourceURL=application.js

/*
 application.js
 TVML Main Sample
 
 Copyright (c) 2016 Vithorio Polten. All rights reserved.
*/

/*
 * This file provides an example skeletal stub for the server-side implementation 
 * of a TVML application.
 *
 * A javascript file such as this should be provided at the tvBootURL that is 
 * configured in the AppDelegate of the TVML application. Note that  the various 
 * javascript functions here are referenced by name in the AppDelegate. This skeletal 
 * implementation shows the basic entry points that you will want to handle 
 * application lifecycle events.
 */

/**
 * @description The onLaunch callback is invoked after the application JavaScript 
 * has been parsed into a JavaScript context. The handler is passed an object 
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the 
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents 
 * the URL that was used to retrieve the application JavaScript.
 */
App.onLaunch = function(options) {
//    var alert = createAlert("Hello World!", "Welcome to tvOS");
    var main = showMain();
    navigationDocument.pushDocument(main);
}


App.onWillResignActive = function() {

}

App.onDidEnterBackground = function() {

}

App.onWillEnterForeground = function() {
    
}

App.onDidBecomeActive = function() {
    
}

App.onWillTerminate = function() {
    
}


/**
 * This convenience funnction returns an alert template, which can be used to present errors to the user.
 */
var createAlert = function(title, description) {

    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate>
            <title>${title}</title>
            <description>${description}</description>
          </alertTemplate>
        </document>`

    var parser = new DOMParser();

    var alertDoc = parser.parseFromString(alertString, "application/xml");

    return alertDoc
}


var docFromString = function(docString) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(docString, "application/xml");
    return doc
}

var creatForm = function() {
    var formString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
        <formTemplate>
            <banner>
                <description>Informe Dados</description>
            </banner>
            <textField id="text_here">Texto aqui</textField>
            <footer>
                <button>
                    <text>Submit</text>
                </button>
            </footer>
        </formTemplate>
    </document>`
    
    var doc = docFromString(formString);
    doc.addEventListener("select", formCallback, false);
    return doc
}

var showMain = function() {
    var mainString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
    <mainTemplate>
        <background>
            <img aspectFill="true" src="http://static4.fjcdn.com/comments/Why+hello+there+lagiacrus+_3ef0c25763915566f46ec3d9b558a626.jpg" />
        </background>
        <menuBar>
        <section>
            <menuItem id="navigation_sample_one" data-identifier="sample_one">
                <title>SAMPLE 1</title>
            </menuItem>
            <menuItem id="navigation_sample_two" data-identifier="sample_two">
                <title>SAMPLE 2</title>
            </menuItem>
            <menuItem id="navigation_sample_three" data-identifier="sample_three">
                <title>SAMPLE 3</title>
            </menuItem>
        </section>
        </menuBar>
    </mainTemplate>
    </document>`
    
    var doc = docFromString(mainString)
    
    doc.addEventListener("select", menuCallback, false);
    
    return doc
}

var menuCallback = function(event) {
    var ele = event.target
    var identifier = ele.getAttribute("data-identifier")
    
    switch (identifier) {
        case "sample_one":
            var alert = createAlert("Hello World! This is " + identifier, "Welcome to tvOS");
            navigationDocument.pushDocument(alert);
            break;
            
        case "sample_two":
            var form = creatForm();
            navigationDocument.pushDocument(form);
            break;
            
        case "sample_three":
            var alert = createAlert("Sample Three! " + identifier, "Welcome to tvOS");
            navigationDocument.pushDocument(alert);
            break;
            
        default:
            var alert = createAlert("Hello World! " + identifier, "Welcome to tvOS");
            navigationDocument.pushDocument(alert);
    }
}


var formCallback = function(event) {
    var textField = getActiveDocument().getElementById("text_here")
    var keyboard textField.getFeature('Keyboard');
    
    var value = keyboard.text;
    
    var alert = createAlert("Aehoo", "Campo: " + value);
    navigationDocument.pushDocument(alert);
}