import { __decorate, __read } from "tslib";
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { alreadyHasAThemeSuffix, getNameAndNamespace, isIconDefinition, warn, withSuffix } from '../utils';
import { IconService } from './icon.service';
var IconDirective = /** @class */ (function () {
    function IconDirective(_iconService, _elementRef, _renderer) {
        this._iconService = _iconService;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    IconDirective.prototype.ngOnChanges = function (changes) {
        if (changes.type || changes.theme || changes.twoToneColor) {
            this._changeIcon();
        }
    };
    /**
     * Render a new icon in the current element. Remove the icon when `type` is falsy.
     */
    IconDirective.prototype._changeIcon = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.type) {
                _this._clearSVGElement();
                resolve(null);
            }
            else {
                _this._iconService.getRenderedContent(_this._parseIconType(_this.type, _this.theme), _this.twoToneColor).subscribe(function (svg) {
                    _this._setSVGElement(svg);
                    resolve(svg);
                });
            }
        });
    };
    /**
     * Parse a icon to the standard form, an `IconDefinition` or a string like 'account-book-fill` (with a theme suffixed).
     * If namespace is specified, ignore theme because it meaningless for users' icons.
     * @param type
     * @param theme
     */
    IconDirective.prototype._parseIconType = function (type, theme) {
        if (isIconDefinition(type)) {
            return type;
        }
        else {
            var _a = __read(getNameAndNamespace(type), 2), name_1 = _a[0], namespace = _a[1];
            if (namespace) {
                return type;
            }
            if (alreadyHasAThemeSuffix(name_1)) {
                if (!!theme) {
                    warn("'type' " + name_1 + " already gets a theme inside so 'theme' " + theme + " would be ignored");
                }
                return name_1;
            }
            else {
                return withSuffix(name_1, theme || this._iconService.defaultTheme);
            }
        }
    };
    IconDirective.prototype._setSVGElement = function (svg) {
        this._clearSVGElement();
        this._renderer.appendChild(this._elementRef.nativeElement, svg);
    };
    IconDirective.prototype._clearSVGElement = function () {
        var el = this._elementRef.nativeElement;
        var children = el.childNodes;
        var length = children.length;
        for (var i = length - 1; i >= 0; i--) {
            var child = children[i];
            if (child.tagName.toLowerCase() === 'svg') {
                this._renderer.removeChild(el, child);
            }
        }
    };
    IconDirective.ctorParameters = function () { return [
        { type: IconService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], IconDirective.prototype, "type", void 0);
    __decorate([
        Input()
    ], IconDirective.prototype, "theme", void 0);
    __decorate([
        Input()
    ], IconDirective.prototype, "twoToneColor", void 0);
    IconDirective = __decorate([
        Directive({
            selector: '[antIcon]'
        })
    ], IconDirective);
    return IconDirective;
}());
export { IconDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50L2ljb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0csT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzdDO0lBS0UsdUJBQXNCLFlBQXlCLEVBQVksV0FBdUIsRUFBWSxTQUFvQjtRQUE1RixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFZLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVksY0FBUyxHQUFULFNBQVMsQ0FBVztJQUFHLENBQUM7SUFFdEgsbUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDekQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ08sbUNBQVcsR0FBckI7UUFBQSxpQkFlQztRQWRDLE9BQU8sSUFBSSxPQUFPLENBQW9CLFVBQUEsT0FBTztZQUMzQyxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRTtnQkFDZCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FDbEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFDMUMsS0FBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO29CQUNiLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxzQ0FBYyxHQUF4QixVQUF5QixJQUE2QixFQUFFLEtBQWdCO1FBQ3RFLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0MsSUFBQSx5Q0FBK0MsRUFBN0MsY0FBSSxFQUFFLGlCQUF1QyxDQUFDO1lBQ3RELElBQUksU0FBUyxFQUFFO2dCQUNiLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxJQUFJLHNCQUFzQixDQUFDLE1BQUksQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLFlBQVUsTUFBSSxnREFBMkMsS0FBSyxzQkFBbUIsQ0FBQyxDQUFDO2lCQUN6RjtnQkFDRCxPQUFPLE1BQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNMLE9BQU8sVUFBVSxDQUFDLE1BQUksRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNsRTtTQUNGO0lBQ0gsQ0FBQztJQUVTLHNDQUFjLEdBQXhCLFVBQXlCLEdBQWU7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVTLHdDQUFnQixHQUExQjtRQUNFLElBQU0sRUFBRSxHQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN2RCxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQy9CLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFFLENBQUMsQ0FBaUIsQ0FBQztZQUMzQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDdkM7U0FDRjtJQUNILENBQUM7O2dCQXBFbUMsV0FBVztnQkFBeUIsVUFBVTtnQkFBdUIsU0FBUzs7SUFKekc7UUFBUixLQUFLLEVBQUU7K0NBQStCO0lBQzlCO1FBQVIsS0FBSyxFQUFFO2dEQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTt1REFBc0I7SUFIbkIsYUFBYTtRQUh6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztTQUN0QixDQUFDO09BQ1csYUFBYSxDQTBFekI7SUFBRCxvQkFBQztDQUFBLEFBMUVELElBMEVDO1NBMUVZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uLCBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhbHJlYWR5SGFzQVRoZW1lU3VmZml4LCBnZXROYW1lQW5kTmFtZXNwYWNlLCBpc0ljb25EZWZpbml0aW9uLCB3YXJuLCB3aXRoU3VmZml4IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgSWNvblNlcnZpY2UgfSBmcm9tICcuL2ljb24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thbnRJY29uXSdcbn0pXG5leHBvcnQgY2xhc3MgSWNvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZyB8IEljb25EZWZpbml0aW9uO1xuICBASW5wdXQoKSB0aGVtZTogVGhlbWVUeXBlO1xuICBASW5wdXQoKSB0d29Ub25lQ29sb3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2ljb25TZXJ2aWNlOiBJY29uU2VydmljZSwgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnR5cGUgfHwgY2hhbmdlcy50aGVtZSB8fCBjaGFuZ2VzLnR3b1RvbmVDb2xvcikge1xuICAgICAgdGhpcy5fY2hhbmdlSWNvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYSBuZXcgaWNvbiBpbiB0aGUgY3VycmVudCBlbGVtZW50LiBSZW1vdmUgdGhlIGljb24gd2hlbiBgdHlwZWAgaXMgZmFsc3kuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NoYW5nZUljb24oKTogUHJvbWlzZTxTVkdFbGVtZW50IHwgbnVsbD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTVkdFbGVtZW50IHwgbnVsbD4ocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoIXRoaXMudHlwZSkge1xuICAgICAgICB0aGlzLl9jbGVhclNWR0VsZW1lbnQoKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ljb25TZXJ2aWNlLmdldFJlbmRlcmVkQ29udGVudChcbiAgICAgICAgICB0aGlzLl9wYXJzZUljb25UeXBlKHRoaXMudHlwZSwgdGhpcy50aGVtZSksXG4gICAgICAgICAgdGhpcy50d29Ub25lQ29sb3JcbiAgICAgICAgKS5zdWJzY3JpYmUoc3ZnID0+IHtcbiAgICAgICAgICB0aGlzLl9zZXRTVkdFbGVtZW50KHN2Zyk7XG4gICAgICAgICAgcmVzb2x2ZShzdmcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBhIGljb24gdG8gdGhlIHN0YW5kYXJkIGZvcm0sIGFuIGBJY29uRGVmaW5pdGlvbmAgb3IgYSBzdHJpbmcgbGlrZSAnYWNjb3VudC1ib29rLWZpbGxgICh3aXRoIGEgdGhlbWUgc3VmZml4ZWQpLlxuICAgKiBJZiBuYW1lc3BhY2UgaXMgc3BlY2lmaWVkLCBpZ25vcmUgdGhlbWUgYmVjYXVzZSBpdCBtZWFuaW5nbGVzcyBmb3IgdXNlcnMnIGljb25zLlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gdGhlbWVcbiAgICovXG4gIHByb3RlY3RlZCBfcGFyc2VJY29uVHlwZSh0eXBlOiBzdHJpbmcgfCBJY29uRGVmaW5pdGlvbiwgdGhlbWU6IFRoZW1lVHlwZSk6IEljb25EZWZpbml0aW9uIHwgc3RyaW5nIHtcbiAgICBpZiAoaXNJY29uRGVmaW5pdGlvbih0eXBlKSkge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IFsgbmFtZSwgbmFtZXNwYWNlIF0gPSBnZXROYW1lQW5kTmFtZXNwYWNlKHR5cGUpO1xuICAgICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cbiAgICAgIGlmIChhbHJlYWR5SGFzQVRoZW1lU3VmZml4KG5hbWUpKSB7XG4gICAgICAgIGlmICghIXRoZW1lKSB7XG4gICAgICAgICAgd2FybihgJ3R5cGUnICR7bmFtZX0gYWxyZWFkeSBnZXRzIGEgdGhlbWUgaW5zaWRlIHNvICd0aGVtZScgJHt0aGVtZX0gd291bGQgYmUgaWdub3JlZGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdpdGhTdWZmaXgobmFtZSwgdGhlbWUgfHwgdGhpcy5faWNvblNlcnZpY2UuZGVmYXVsdFRoZW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3NldFNWR0VsZW1lbnQoc3ZnOiBTVkdFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5fY2xlYXJTVkdFbGVtZW50KCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzdmcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jbGVhclNWR0VsZW1lbnQoKTogdm9pZCB7XG4gICAgY29uc3QgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZWwuY2hpbGROb2RlcztcbiAgICBjb25zdCBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuWyBpIF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3ZnJykge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZChlbCwgY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19