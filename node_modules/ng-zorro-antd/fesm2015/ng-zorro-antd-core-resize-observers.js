import { Injectable, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { coerceElement } from '@angular/cdk/coercion';
import ResizeObserver from 'resize-observer-polyfill';
import { Observable, Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * Generated from: resize-observers.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 */
class NzResizeObserverFactory {
    /**
     * @param {?} callback
     * @return {?}
     */
    create(callback) {
        return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
    }
}
NzResizeObserverFactory.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NzResizeObserverFactory.ɵprov = ɵɵdefineInjectable({ factory: function NzResizeObserverFactory_Factory() { return new NzResizeObserverFactory(); }, token: NzResizeObserverFactory, providedIn: "root" });
/**
 * An injectable service that allows watching elements for changes to their content.
 */
class NzResizeObserver {
    /**
     * @param {?} nzResizeObserverFactory
     */
    constructor(nzResizeObserverFactory) {
        this.nzResizeObserverFactory = nzResizeObserverFactory;
        /**
         * Keeps track of the existing ResizeObservers so they can be reused.
         */
        this.observedElements = new Map();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.observedElements.forEach((/**
         * @param {?} _
         * @param {?} element
         * @return {?}
         */
        (_, element) => this.cleanupObserver(element)));
    }
    /**
     * @param {?} elementOrRef
     * @return {?}
     */
    observe(elementOrRef) {
        /** @type {?} */
        const element = coerceElement(elementOrRef);
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const stream = this.observeElement(element);
            /** @type {?} */
            const subscription = stream.subscribe(observer);
            return (/**
             * @return {?}
             */
            () => {
                subscription.unsubscribe();
                this.unobserveElement(element);
            });
        }));
    }
    /**
     * Observes the given element by using the existing ResizeObserver if available, or creating a
     * new one if not.
     * @private
     * @param {?} element
     * @return {?}
     */
    observeElement(element) {
        if (!this.observedElements.has(element)) {
            /** @type {?} */
            const stream = new Subject();
            /** @type {?} */
            const observer = this.nzResizeObserverFactory.create((/**
             * @param {?} mutations
             * @return {?}
             */
            mutations => stream.next(mutations)));
            if (observer) {
                observer.observe(element);
            }
            this.observedElements.set(element, { observer, stream, count: 1 });
        }
        else {
            (/** @type {?} */ (this.observedElements.get(element))).count++;
        }
        return (/** @type {?} */ (this.observedElements.get(element))).stream;
    }
    /**
     * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
     * observing this element.
     * @private
     * @param {?} element
     * @return {?}
     */
    unobserveElement(element) {
        if (this.observedElements.has(element)) {
            (/** @type {?} */ (this.observedElements.get(element))).count--;
            if (!(/** @type {?} */ (this.observedElements.get(element))).count) {
                this.cleanupObserver(element);
            }
        }
    }
    /**
     * Clean up the underlying ResizeObserver for the specified element.
     * @private
     * @param {?} element
     * @return {?}
     */
    cleanupObserver(element) {
        if (this.observedElements.has(element)) {
            const { observer, stream } = (/** @type {?} */ (this.observedElements.get(element)));
            if (observer) {
                observer.disconnect();
            }
            stream.complete();
            this.observedElements.delete(element);
        }
    }
}
NzResizeObserver.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
NzResizeObserver.ctorParameters = () => [
    { type: NzResizeObserverFactory }
];
/** @nocollapse */ NzResizeObserver.ɵprov = ɵɵdefineInjectable({ factory: function NzResizeObserver_Factory() { return new NzResizeObserver(ɵɵinject(NzResizeObserverFactory)); }, token: NzResizeObserver, providedIn: "root" });
if (false) {
    /**
     * Keeps track of the existing ResizeObservers so they can be reused.
     * @type {?}
     * @private
     */
    NzResizeObserver.prototype.observedElements;
    /**
     * @type {?}
     * @private
     */
    NzResizeObserver.prototype.nzResizeObserverFactory;
}

/**
 * @fileoverview added by tsickle
 * Generated from: resize-observers.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzResizeObserversModule {
}
NzResizeObserversModule.decorators = [
    { type: NgModule, args: [{
                providers: [NzResizeObserverFactory]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-resize-observers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzResizeObserver, NzResizeObserversModule, NzResizeObserverFactory as ɵa };
//# sourceMappingURL=ng-zorro-antd-core-resize-observers.js.map
