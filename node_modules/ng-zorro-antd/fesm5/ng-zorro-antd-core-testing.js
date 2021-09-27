import { __extends, __spread } from 'tslib';
import { EventEmitter, Injectable, NgZone, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * @fileoverview added by tsickle
 * Generated from: event-objects.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates a browser MouseEvent with the specified options.
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @param {?=} button
 * @return {?}
 */
function createMouseEvent(type, x, y, button) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (button === void 0) { button = 0; }
    /** @type {?} */
    var event = document.createEvent('MouseEvent');
    event.initMouseEvent(type, true /* canBubble */, false /* cancelable */, window /* view */, 0 /* detail */, x /* screenX */, y /* screenY */, x /* clientX */, y /* clientY */, false /* ctrlKey */, false /* altKey */, false /* shiftKey */, false /* metaKey */, button /* button */, null /* relatedTarget */);
    // `initMouseEvent` doesn't allow us to pass the `buttons` and
    // defaults it to 0 which looks like a fake event.
    Object.defineProperty(event, 'buttons', { get: (/**
         * @return {?}
         */
        function () { return 1; }) });
    return event;
}
/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 * @param {?} type
 * @param {?=} pageX
 * @param {?=} pageY
 * @return {?}
 */
function createTouchEvent(type, pageX, pageY) {
    if (pageX === void 0) { pageX = 0; }
    if (pageY === void 0) { pageY = 0; }
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    /** @type {?} */
    var event = new UIEvent(type, { detail: 0, view: window });
    /** @type {?} */
    var touchDetails = { pageX: pageX, pageY: pageY, clientX: pageX, clientY: pageY };
    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    Object.defineProperties(event, {
        touches: { value: [touchDetails] },
        targetTouches: { value: [touchDetails] },
        changedTouches: { value: [touchDetails] }
    });
    return event;
}
/**
 * Dispatches a keydown event from an element.
 * @param {?} type
 * @param {?} keyCode
 * @param {?=} target
 * @param {?=} key
 * @param {?=} ctrlKey
 * @param {?=} metaKey
 * @param {?=} shiftKey
 * @return {?}
 */
function createKeyboardEvent(type, keyCode, target, key, ctrlKey, metaKey, shiftKey) {
    /** @type {?} */
    var event = (/** @type {?} */ (document.createEvent('KeyboardEvent')));
    /** @type {?} */
    var originalPreventDefault = event.preventDefault;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    if (event.initKeyEvent) {
        event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
    }
    else {
        event.initKeyboardEvent(type, true, true, window, 0, key, 0, '', false);
    }
    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: (/**
             * @return {?}
             */
            function () { return keyCode; }) },
        key: { get: (/**
             * @return {?}
             */
            function () { return key; }) },
        target: { get: (/**
             * @return {?}
             */
            function () { return target; }) },
        ctrlKey: { get: (/**
             * @return {?}
             */
            function () { return ctrlKey; }) },
        metaKey: { get: (/**
             * @return {?}
             */
            function () { return metaKey; }) },
        shiftKey: { get: (/**
             * @return {?}
             */
            function () { return shiftKey; }) }
    });
    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    // tslint:disable-next-line:typedef
    event.preventDefault = (/**
     * @return {?}
     */
    function () {
        Object.defineProperty(event, 'defaultPrevented', { get: (/**
             * @return {?}
             */
            function () { return true; }), configurable: true });
        // tslint:disable-next-line:no-invalid-this
        return originalPreventDefault.apply(this, arguments);
    });
    return event;
}
/**
 * Creates a fake event object with any desired event type.
 * @param {?} type
 * @param {?=} canBubble
 * @param {?=} cancelable
 * @return {?}
 */
function createFakeEvent(type, canBubble, cancelable) {
    if (canBubble === void 0) { canBubble = true; }
    if (cancelable === void 0) { cancelable = true; }
    /** @type {?} */
    var event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}

/**
 * @fileoverview added by tsickle
 * Generated from: dispatch-events.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Utility to dispatch any event on a Node.
 * @param {?} node
 * @param {?} event
 * @return {?}
 */
function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
/**
 * Shorthand to dispatch a fake event on a specified node.
 * @param {?} node
 * @param {?} type
 * @param {?=} canBubble
 * @return {?}
 */
function dispatchFakeEvent(node, type, canBubble) {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}
/**
 * Shorthand to dispatch a keyboard event with a specified key code.
 * @param {?} node
 * @param {?} type
 * @param {?} keyCode
 * @param {?=} target
 * @return {?}
 */
function dispatchKeyboardEvent(node, type, keyCode, target) {
    return (/** @type {?} */ (dispatchEvent(node, createKeyboardEvent(type, keyCode, target))));
}
/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 * @param {?} node
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @param {?=} event
 * @return {?}
 */
function dispatchMouseEvent(node, type, x, y, event) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (event === void 0) { event = createMouseEvent(type, x, y); }
    return (/** @type {?} */ (dispatchEvent(node, event)));
}
/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 * @param {?} node
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @return {?}
 */
function dispatchTouchEvent(node, type, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    return (/** @type {?} */ (dispatchEvent(node, createTouchEvent(type, x, y))));
}

/**
 * @fileoverview added by tsickle
 * Generated from: type-in-element.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Focuses an input, sets its value and dispatches
 * the `input` event, simulating the user typing.
 * @param {?} value Value to be set on the input.
 * @param {?} element Element onto which to set the value.
 * @return {?}
 */
function typeInElement(value, element) {
    element.focus();
    element.value = value;
    dispatchFakeEvent(element, 'input');
}

/**
 * @fileoverview added by tsickle
 * Generated from: wrapped-error-message.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Gets a RegExp used to detect an angular wrapped error message.
 * See https://github.com/angular/angular/issues/8348
 * @param {?} e
 * @return {?}
 */
function wrappedErrorMessage(e) {
    /** @type {?} */
    var escapedMessage = e.message.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    return new RegExp(escapedMessage);
}

/**
 * @fileoverview added by tsickle
 * Generated from: fake-viewport-ruler.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @record
 */
function FakeViewportRect() { }
if (false) {
    /** @type {?} */
    FakeViewportRect.prototype.left;
    /** @type {?} */
    FakeViewportRect.prototype.top;
    /** @type {?} */
    FakeViewportRect.prototype.width;
    /** @type {?} */
    FakeViewportRect.prototype.height;
    /** @type {?} */
    FakeViewportRect.prototype.bottom;
    /** @type {?} */
    FakeViewportRect.prototype.right;
}
/**
 * @record
 */
function FakeViewportSize() { }
if (false) {
    /** @type {?} */
    FakeViewportSize.prototype.width;
    /** @type {?} */
    FakeViewportSize.prototype.height;
}
/**
 * @record
 */
function FakeViewportScrollPosition() { }
if (false) {
    /** @type {?} */
    FakeViewportScrollPosition.prototype.top;
    /** @type {?} */
    FakeViewportScrollPosition.prototype.left;
}
/**
 * \@docs-private
 */
var  /**
 * \@docs-private
 */
FakeViewportRuler = /** @class */ (function () {
    function FakeViewportRuler() {
    }
    /**
     * @return {?}
     */
    FakeViewportRuler.prototype.getViewportRect = /**
     * @return {?}
     */
    function () {
        return {
            left: 0,
            top: 0,
            width: 1014,
            height: 686,
            bottom: 686,
            right: 1014
        };
    };
    /**
     * @return {?}
     */
    FakeViewportRuler.prototype.getViewportSize = /**
     * @return {?}
     */
    function () {
        return { width: 1014, height: 686 };
    };
    /**
     * @return {?}
     */
    FakeViewportRuler.prototype.getViewportScrollPosition = /**
     * @return {?}
     */
    function () {
        return { top: 0, left: 0 };
    };
    return FakeViewportRuler;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: mock-ng-zone.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 * \@docs-private
 */
var MockNgZone = /** @class */ (function (_super) {
    __extends(MockNgZone, _super);
    function MockNgZone() {
        var _this = _super.call(this, { enableLongStackTrace: false }) || this;
        // tslint:disable-next-line:no-any
        _this.onStable = new EventEmitter(false);
        return _this;
    }
    // tslint:disable-next-line:no-any ban-types
    // tslint:disable-next-line:no-any ban-types
    /**
     * @param {?} fn
     * @return {?}
     */
    MockNgZone.prototype.run = 
    // tslint:disable-next-line:no-any ban-types
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return fn();
    };
    // tslint:disable-next-line:ban-types no-any
    // tslint:disable-next-line:ban-types no-any
    /**
     * @param {?} fn
     * @return {?}
     */
    MockNgZone.prototype.runOutsideAngular = 
    // tslint:disable-next-line:ban-types no-any
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return fn();
    };
    /**
     * @return {?}
     */
    MockNgZone.prototype.simulateZoneExit = /**
     * @return {?}
     */
    function () {
        this.onStable.emit(null);
    };
    MockNgZone.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MockNgZone.ctorParameters = function () { return []; };
    return MockNgZone;
}(NgZone));
if (false) {
    /** @type {?} */
    MockNgZone.prototype.onStable;
}

/**
 * @fileoverview added by tsickle
 * Generated from: componet-bed.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function ComponentBed() { }
if (false) {
    /** @type {?} */
    ComponentBed.prototype.bed;
    /** @type {?} */
    ComponentBed.prototype.fixture;
    /** @type {?} */
    ComponentBed.prototype.nativeElement;
    /** @type {?} */
    ComponentBed.prototype.debugElement;
    /** @type {?} */
    ComponentBed.prototype.component;
}
/**
 * @template T
 * @param {?} component
 * @param {?=} options
 * @return {?}
 */
function createComponentBed(component, options) {
    if (options === void 0) { options = {
        providers: [],
        declarations: [],
        imports: []
    }; }
    var imports = options.imports, declarations = options.declarations, providers = options.providers;
    /** @type {?} */
    var config = {
        imports: __spread([NoopAnimationsModule, CommonModule], (imports || [])),
        declarations: __spread([component], (declarations || [])),
        schemas: [NO_ERRORS_SCHEMA],
        providers: providers || []
    };
    /** @type {?} */
    var bed = TestBed.configureTestingModule(config);
    /** @type {?} */
    var fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return {
        bed: bed,
        fixture: fixture,
        nativeElement: fixture.nativeElement,
        debugElement: fixture.debugElement,
        component: fixture.componentInstance
    };
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FakeViewportRuler, MockNgZone, createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent, dispatchEvent, dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent, typeInElement, wrappedErrorMessage, createComponentBed as ɵcreateComponentBed };
//# sourceMappingURL=ng-zorro-antd-core-testing.js.map
