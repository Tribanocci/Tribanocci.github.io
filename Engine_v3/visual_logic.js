/**
 * Generated by Verge3D Puzzles v.4.2.0
 * Sun, 12 Mar 2023 16:47:49 GMT
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */
function createPL() {

// global variables/constants used by puzzles' functions

var LIST_NONE = '<none>';

var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.pickedObject = '';
_pGlob.hoveredObject = '';
_pGlob.mediaElements = {};
_pGlob.loadedFile = '';
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.openedFile = '';
_pGlob.openedFileMeta = {};
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();
_pGlob.intervalTimers = {};
_pGlob.customEvents = new v3d.EventDispatcher();
_pGlob.eventListeners = [];

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;
_pGlob.SET_OBJ_ROT_EPS = 1e-8;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.vec3Tmp3 = new v3d.Vector3();
_pGlob.vec3Tmp4 = new v3d.Vector3();
_pGlob.eulerTmp = new v3d.Euler();
_pGlob.eulerTmp2 = new v3d.Euler();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.colorTmp = new v3d.Color();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();

var PL = {};
// backward compatibility
v3d.PL = v3d.puzzles = PL;

PL.procedures = PL.procedures || {};




PL.execInitPuzzles = function(options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

    // provide the container's id to puzzles that need access to the container
    _initGlob.container = options !== undefined && 'container' in options
            ? options.container : "";

    

    
    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

// app is more conventional than appInstance (used in exec script and app templates)
var app = appInstance;

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}



var assempled, annotations_displayd;

// autoRotateCamera puzzle
function autoRotateCamera(enabled, speed) {

    if (appInstance.controls && appInstance.controls instanceof v3d.OrbitControls) {
        appInstance.controls.autoRotate = enabled;
        appInstance.controls.autoRotateSpeed = speed;
    } else {
        console.error('autorotate camera: Wrong controls type');
    }
}

// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return obj.type !== 'AmbientLight' &&
           obj.name !== '' &&
           !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
           !obj.isAuxClippingMesh;
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = _pGlob !== undefined;
    objFound = runTime ? _pGlob.objCache[objName] : null;

    if (objFound && objFound.name === objName)
        return objFound;

    if (appInstance.scene) {
        appInstance.scene.traverse(function(obj) {
            if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
                objFound = obj;
                if (runTime) {
                    _pGlob.objCache[objName] = objFound;
                }
            }
        });
    }
    return objFound;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc.filter(function(name) {
        return name;
    });
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}

function _checkListenersSame(target0, type0, listener0, optionsOrUseCapture0,
        target1, type1, listener1, optionsOrUseCapture1) {
    const capture0 = Boolean(optionsOrUseCapture0 instanceof Object
            ? optionsOrUseCapture0.capture : optionsOrUseCapture0);
    const capture1 = Boolean(optionsOrUseCapture1 instanceof Object
            ? optionsOrUseCapture1.capture : optionsOrUseCapture1);
    return target0 === target1 && type0 === type1 && listener0 === listener1
            && capture0 === capture1;
}

/**
 * Add the specified event listener to the specified target. This function also
 * stores listener data for easier disposing.
 */
function bindListener(target, type, listener, optionsOrUseCapture) {
    const alreadyExists = _pGlob.eventListeners.some(elem => {
        return _checkListenersSame(elem.target, elem.type, elem.listener,
                elem.optionsOrUseCapture, target, type, listener,
                optionsOrUseCapture);
    });

    if (!alreadyExists) {
        target.addEventListener(type, listener, optionsOrUseCapture);
        _pGlob.eventListeners.push({ target, type, listener, optionsOrUseCapture });
    }
}

// utility function used by the whenClicked, whenHovered and whenDraggedOver puzzles
function initObjectPicking(callback, eventType, mouseDownUseTouchStart, mouseButtons) {

    var elem = appInstance.renderer.domElement;
    bindListener(elem, eventType, pickListener);

    if (eventType == 'mousedown') {

        var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
        bindListener(elem, touchEventName, pickListener);

    } else if (eventType == 'dblclick') {

        var prevTapTime = 0;

        function doubleTapCallback(event) {

            var now = new Date().getTime();
            var timesince = now - prevTapTime;

            if (timesince < 600 && timesince > 0) {

                pickListener(event);
                prevTapTime = 0;
                return;

            }

            prevTapTime = new Date().getTime();
        }

        var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
        bindListener(elem, touchEventName, doubleTapCallback);
    }

    var raycaster = new v3d.Raycaster();

    function pickListener(event) {

        // to handle unload in loadScene puzzle
        if (!appInstance.getCamera())
            return;

        event.preventDefault();

        var xNorm = 0, yNorm = 0;
        if (event instanceof MouseEvent) {
            if (mouseButtons && mouseButtons.indexOf(event.button) == -1)
                return;
            xNorm = event.offsetX / elem.clientWidth;
            yNorm = event.offsetY / elem.clientHeight;
        } else if (event instanceof TouchEvent) {
            var rect = elem.getBoundingClientRect();
            xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
            yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
        }

        _pGlob.screenCoords.x = xNorm * 2 - 1;
        _pGlob.screenCoords.y = -yNorm * 2 + 1;
        raycaster.setFromCamera(_pGlob.screenCoords, appInstance.getCamera(true));
        var objList = [];
        appInstance.scene.traverse(function(obj){objList.push(obj);});
        var intersects = raycaster.intersectObjects(objList, false);
        callback(intersects, event);
    }
}

function objectsIncludeObj(objNames, testedObjName) {
    if (!testedObjName) return false;

    for (var i = 0; i < objNames.length; i++) {
        if (testedObjName == objNames[i]) {
            return true;
        } else {
            // also check children which are auto-generated for multi-material objects
            var obj = getObjectByName(objNames[i]);
            if (obj && obj.type == "Group") {
                for (var j = 0; j < obj.children.length; j++) {
                    if (testedObjName == obj.children[j].name) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// utility function used by the whenClicked, whenHovered, whenDraggedOver, and raycast puzzles
function getPickedObjectName(obj) {
    // auto-generated from a multi-material object, use parent name instead
    if (obj.isMesh && obj.isMaterialGeneratedMesh && obj.parent) {
        return obj.parent.name;
    } else {
        return obj.name;
    }
}

// whenClicked puzzle
function registerOnClick(objSelector, xRay, doubleClick, mouseButtons, cbDo, cbIfMissedDo) {

    // for AR/VR
    _pGlob.objClickInfo = _pGlob.objClickInfo || [];

    _pGlob.objClickInfo.push({
        objSelector: objSelector,
        callbacks: [cbDo, cbIfMissedDo]
    });

    initObjectPicking(function(intersects, event) {

        var isPicked = false;

        var maxIntersects = xRay ? intersects.length : Math.min(1, intersects.length);

        for (var i = 0; i < maxIntersects; i++) {
            var obj = intersects[i].object;
            var objName = getPickedObjectName(obj);
            var objNames = retrieveObjectNames(objSelector);

            if (objectsIncludeObj(objNames, objName)) {
                // save the object for the pickedObject block
                _pGlob.pickedObject = objName;
                isPicked = true;
                cbDo(event);
            }
        }

        if (!isPicked) {
            _pGlob.pickedObject = '';
            cbIfMissedDo(event);
        }

    }, doubleClick ? 'dblclick' : 'mousedown', false, mouseButtons);
}

// getAnimations puzzle
function getAnimations(objSelector) {
    const objNames = retrieveObjectNames(objSelector);

    const animations = [];
    for (let i = 0; i < objNames.length; i++) {
        const objName = objNames[i];
        if (!objName)
            continue;
        // use objName as animName - for now we have one-to-one match
        const action = v3d.SceneUtils.getAnimationActionByName(appInstance, objName);
        if (action)
            animations.push(objName);
    }
    return animations;
}

/**
 * Get a scene that contains the root of the given action.
 */
function getSceneByAction(action) {
    var root = action.getRoot();
    var scene = root.type == "Scene" ? root : null;
    root.traverseAncestors(function(ancObj) {
        if (ancObj.type == "Scene") {
            scene = ancObj;
        }
    });
    return scene;
}

/**
 * Get the current scene's framerate.
 */
function getSceneAnimFrameRate(scene) {
    if (scene && 'animFrameRate' in scene.userData) {
        return scene.userData.animFrameRate;
    }
    return 24;
}

_pGlob.animMixerCallbacks = [];

var initAnimationMixer = function() {

    function onMixerFinished(e) {
        var cb = _pGlob.animMixerCallbacks;
        var found = [];
        for (var i = 0; i < cb.length; i++) {
            if (cb[i][0] == e.action) {
                cb[i][0] = null; // desactivate
                found.push(cb[i][1]);
            }
        }
        for (var i = 0; i < found.length; i++) {
            found[i]();
        }
    }

    return function initAnimationMixer() {
        if (appInstance.mixer && !appInstance.mixer.hasEventListener('finished', onMixerFinished)) {
            bindListener(appInstance.mixer, 'finished', onMixerFinished);
        }
    };

}();

// animation puzzles
function operateAnimation(operation, animations, from, to, loop, speed, callback, rev) {
    if (!animations)
        return;
    // input can be either single obj or array of objects
    if (typeof animations == "string")
        animations = [animations];

    function processAnimation(animName) {
        var action = v3d.SceneUtils.getAnimationActionByName(appInstance, animName);
        if (!action)
            return;
        switch (operation) {
        case 'PLAY':
            if (!action.isRunning()) {
                action.reset();
                if (loop && (loop != "AUTO"))
                    action.loop = v3d[loop];
                var scene = getSceneByAction(action);
                var frameRate = getSceneAnimFrameRate(scene);

                action.repetitions = Infinity;

                var timeScale = Math.abs(parseFloat(speed));
                if (rev)
                    timeScale *= -1;

                action.timeScale = timeScale;
                action.timeStart = from !== null ? from/frameRate : 0;
                if (to !== null) {
                    action.getClip().duration = to/frameRate;
                } else {
                    action.getClip().resetDuration();
                }
                action.time = timeScale >= 0 ? action.timeStart : action.getClip().duration;

                action.paused = false;
                action.play();

                // push unique callbacks only
                var callbacks = _pGlob.animMixerCallbacks;
                var found = false;

                for (var j = 0; j < callbacks.length; j++)
                    if (callbacks[j][0] == action && callbacks[j][1] == callback)
                        found = true;

                if (!found)
                    _pGlob.animMixerCallbacks.push([action, callback]);
            }
            break;
        case 'STOP':
            action.stop();

            // remove callbacks
            var callbacks = _pGlob.animMixerCallbacks;
            for (var j = 0; j < callbacks.length; j++)
                if (callbacks[j][0] == action) {
                    callbacks.splice(j, 1);
                    j--
                }

            break;
        case 'PAUSE':
            action.paused = true;
            break;
        case 'RESUME':
            action.paused = false;
            break;
        case 'SET_FRAME':
            var scene = getSceneByAction(action);
            var frameRate = getSceneAnimFrameRate(scene);
            action.time = from ? from/frameRate : 0;
            action.play();
            action.paused = true;
            break;
        case 'SET_SPEED':
            var timeScale = parseFloat(speed);
            action.timeScale = rev ? -timeScale : timeScale;
            break;
        }
    }

    for (var i = 0; i < animations.length; i++) {
        var animName = animations[i];
        if (animName)
            processAnimation(animName);
    }

    initAnimationMixer();
}

// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}

// eventHTMLElem puzzle
function eventHTMLElem(eventType, ids, isParent, callback) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;

        bindListener(elem, eventType, callback);
    }
}

// setHTMLElemStyle puzzle
function setHTMLElemStyle(prop, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem || !elem.style)
            continue;
        elem.style[prop] = value;
    }
}

function findUniqueObjectName(name) {
    function objNameUsed(name) {
        return Boolean(getObjectByName(name));
    }
    while (objNameUsed(name)) {
        var r = name.match(/^(.*?)(\d+)$/);
        if (!r) {
            name += "2";
        } else {
            name = r[1] + (parseInt(r[2], 10) + 1);
        }
    }
    return name;
}

// addAnnotation and removeAnnotation puzzles
function handleAnnot(add, annot, objSelector, contents, id, name) {
    var objNames = retrieveObjectNames(objSelector);

    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (!obj)
            continue;
        // check if it already has an annotation and remove it
        for (var j = 0; j < obj.children.length; j++) {
            var child = obj.children[j];
            if (child.type == "Annotation") {
                // delete all childs of annotation
                child.traverse(function(child2) {
                    if (child2.isAnnotation)
                        child2.dispose();
                    });
                obj.remove(child);
            }
        }
        if (add) {
            var aObj = new v3d.Annotation(appInstance.container, annot, contents);
            aObj.name = findUniqueObjectName(name ? name : annot);
            aObj.fadeObscured = _pGlob.fadeAnnotations;
            if (id) {
                aObj.annotation.id = id;
                aObj.annotationDialog.id = id+'_dialog';
            }
            obj.add(aObj);
        }
    }
}


assempled = true;
annotations_displayd = false;

autoRotateCamera(true, -2);
registerOnClick(['ALL_OBJECTS'], false, false, [0,1,2], function() {
  autoRotateCamera(false, 2);
}, function() {});

eventHTMLElem('click', 'disassemply_button', true, function(event) {
  if (assempled == true) {

    operateAnimation('PLAY', getAnimations(['GROUP', 'Rod_Disassemply']), null, null, 'LoopOnce', 1,
            function() {
      assempled = false;
    }, false);

        } else {

    operateAnimation('PLAY', getAnimations(['GROUP', 'Rod_Disassemply']), 0, 70, 'LoopOnce', 1,
            function() {
      assempled = true;
    }, true);

        }
});

eventHTMLElem('click', 'annotation_button', true, function(event) {
  if (annotations_displayd == false) {
    setHTMLElemStyle('display', 'block', ['ring_an', 'slider_an', 'rod_an'], false);
    annotations_displayd = true;
  } else {
    setHTMLElemStyle('display', 'none', ['ring_an', 'slider_an', 'rod_an'], false);
    annotations_displayd = false;
  }
});

handleAnnot(true, 'Διωστήρας', 'rod_annotation', 'Ο διωστήρας μετατρέπει την παλινδρομική κίνηση του εμβόλου σε περιστροφική κίνηση στον στροφαλοφόρο άξιονα', 'rod_an', undefined);
handleAnnot(true, 'Ημικέλυφος', 'ring_annotation', 'Το κέλυφος ασφαλίζει την σύνδεση του Διωστήρα με το κομβίο του ζυγώματος. Εδω φαίνεται το κάτω ημικέλυφος', 'ring_an', undefined);
handleAnnot(true, 'Πέδιλο', 'slider_annotation', 'Το πέδιλο βρίσκεται σε επαφή με τις ευθυντηρίες, επιβάλοντας την κίνηση του ζυγώματος κατά τον κατακόρυφο άξονα', 'slider_an', undefined);
setHTMLElemStyle('display', 'none', ['ring_an', 'slider_an', 'rod_an'], false);



} // end of PL.init function

PL.disposeListeners = function() {
    if (_pGlob) {
        _pGlob.eventListeners.forEach(({ target, type, listener, optionsOrUseCapture }) => {
            target.removeEventListener(type, listener, optionsOrUseCapture);
        });
        _pGlob.eventListeners.length = 0;
    }
}

PL.dispose = function() {
    PL.disposeListeners();
    _pGlob = null;
    // backward compatibility
    delete v3d.PL;
    delete v3d.puzzles;
}



return PL;

}

export { createPL };
