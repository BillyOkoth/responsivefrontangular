import { __decorate } from "tslib";
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { alreadyHasAThemeSuffix, getNameAndNamespace, isIconDefinition, warn, withSuffix } from '../utils';
import { IconService } from './icon.service';
let IconDirective = class IconDirective {
    constructor(_iconService, _elementRef, _renderer) {
        this._iconService = _iconService;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    ngOnChanges(changes) {
        if (changes.type || changes.theme || changes.twoToneColor) {
            this._changeIcon();
        }
    }
    /**
     * Render a new icon in the current element. Remove the icon when `type` is falsy.
     */
    _changeIcon() {
        return new Promise(resolve => {
            if (!this.type) {
                this._clearSVGElement();
                resolve(null);
            }
            else {
                this._iconService.getRenderedContent(this._parseIconType(this.type, this.theme), this.twoToneColor).subscribe(svg => {
                    this._setSVGElement(svg);
                    resolve(svg);
                });
            }
        });
    }
    /**
     * Parse a icon to the standard form, an `IconDefinition` or a string like 'account-book-fill` (with a theme suffixed).
     * If namespace is specified, ignore theme because it meaningless for users' icons.
     * @param type
     * @param theme
     */
    _parseIconType(type, theme) {
        if (isIconDefinition(type)) {
            return type;
        }
        else {
            const [name, namespace] = getNameAndNamespace(type);
            if (namespace) {
                return type;
            }
            if (alreadyHasAThemeSuffix(name)) {
                if (!!theme) {
                    warn(`'type' ${name} already gets a theme inside so 'theme' ${theme} would be ignored`);
                }
                return name;
            }
            else {
                return withSuffix(name, theme || this._iconService.defaultTheme);
            }
        }
    }
    _setSVGElement(svg) {
        this._clearSVGElement();
        this._renderer.appendChild(this._elementRef.nativeElement, svg);
    }
    _clearSVGElement() {
        const el = this._elementRef.nativeElement;
        const children = el.childNodes;
        const length = children.length;
        for (let i = length - 1; i >= 0; i--) {
            const child = children[i];
            if (child.tagName.toLowerCase() === 'svg') {
                this._renderer.removeChild(el, child);
            }
        }
    }
};
IconDirective.ctorParameters = () => [
    { type: IconService },
    { type: ElementRef },
    { type: Renderer2 }
];
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
export { IconDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50L2ljb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0csT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzdDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFLeEIsWUFBc0IsWUFBeUIsRUFBWSxXQUF1QixFQUFZLFNBQW9CO1FBQTVGLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVksZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBWSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQztJQUV0SCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUN6RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxXQUFXO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQW9CLE9BQU8sQ0FBQyxFQUFFO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUMxQyxJQUFJLENBQUMsWUFBWSxDQUNsQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLGNBQWMsQ0FBQyxJQUE2QixFQUFFLEtBQWdCO1FBQ3RFLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsTUFBTSxDQUFFLElBQUksRUFBRSxTQUFTLENBQUUsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxJQUFJLFNBQVMsRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO29CQUNYLElBQUksQ0FBQyxVQUFVLElBQUksMkNBQTJDLEtBQUssbUJBQW1CLENBQUMsQ0FBQztpQkFDekY7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbEU7U0FDRjtJQUNILENBQUM7SUFFUyxjQUFjLENBQUMsR0FBZTtRQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRVMsZ0JBQWdCO1FBQ3hCLE1BQU0sRUFBRSxHQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN2RCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFFLENBQUMsQ0FBaUIsQ0FBQztZQUMzQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDdkM7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBOztZQXJFcUMsV0FBVztZQUF5QixVQUFVO1lBQXVCLFNBQVM7O0FBSnpHO0lBQVIsS0FBSyxFQUFFOzJDQUErQjtBQUM5QjtJQUFSLEtBQUssRUFBRTs0Q0FBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7bURBQXNCO0FBSG5CLGFBQWE7SUFIekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7S0FDdEIsQ0FBQztHQUNXLGFBQWEsQ0EwRXpCO1NBMUVZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uLCBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhbHJlYWR5SGFzQVRoZW1lU3VmZml4LCBnZXROYW1lQW5kTmFtZXNwYWNlLCBpc0ljb25EZWZpbml0aW9uLCB3YXJuLCB3aXRoU3VmZml4IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgSWNvblNlcnZpY2UgfSBmcm9tICcuL2ljb24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thbnRJY29uXSdcbn0pXG5leHBvcnQgY2xhc3MgSWNvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZyB8IEljb25EZWZpbml0aW9uO1xuICBASW5wdXQoKSB0aGVtZTogVGhlbWVUeXBlO1xuICBASW5wdXQoKSB0d29Ub25lQ29sb3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2ljb25TZXJ2aWNlOiBJY29uU2VydmljZSwgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnR5cGUgfHwgY2hhbmdlcy50aGVtZSB8fCBjaGFuZ2VzLnR3b1RvbmVDb2xvcikge1xuICAgICAgdGhpcy5fY2hhbmdlSWNvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYSBuZXcgaWNvbiBpbiB0aGUgY3VycmVudCBlbGVtZW50LiBSZW1vdmUgdGhlIGljb24gd2hlbiBgdHlwZWAgaXMgZmFsc3kuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NoYW5nZUljb24oKTogUHJvbWlzZTxTVkdFbGVtZW50IHwgbnVsbD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTVkdFbGVtZW50IHwgbnVsbD4ocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoIXRoaXMudHlwZSkge1xuICAgICAgICB0aGlzLl9jbGVhclNWR0VsZW1lbnQoKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ljb25TZXJ2aWNlLmdldFJlbmRlcmVkQ29udGVudChcbiAgICAgICAgICB0aGlzLl9wYXJzZUljb25UeXBlKHRoaXMudHlwZSwgdGhpcy50aGVtZSksXG4gICAgICAgICAgdGhpcy50d29Ub25lQ29sb3JcbiAgICAgICAgKS5zdWJzY3JpYmUoc3ZnID0+IHtcbiAgICAgICAgICB0aGlzLl9zZXRTVkdFbGVtZW50KHN2Zyk7XG4gICAgICAgICAgcmVzb2x2ZShzdmcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBhIGljb24gdG8gdGhlIHN0YW5kYXJkIGZvcm0sIGFuIGBJY29uRGVmaW5pdGlvbmAgb3IgYSBzdHJpbmcgbGlrZSAnYWNjb3VudC1ib29rLWZpbGxgICh3aXRoIGEgdGhlbWUgc3VmZml4ZWQpLlxuICAgKiBJZiBuYW1lc3BhY2UgaXMgc3BlY2lmaWVkLCBpZ25vcmUgdGhlbWUgYmVjYXVzZSBpdCBtZWFuaW5nbGVzcyBmb3IgdXNlcnMnIGljb25zLlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gdGhlbWVcbiAgICovXG4gIHByb3RlY3RlZCBfcGFyc2VJY29uVHlwZSh0eXBlOiBzdHJpbmcgfCBJY29uRGVmaW5pdGlvbiwgdGhlbWU6IFRoZW1lVHlwZSk6IEljb25EZWZpbml0aW9uIHwgc3RyaW5nIHtcbiAgICBpZiAoaXNJY29uRGVmaW5pdGlvbih0eXBlKSkge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IFsgbmFtZSwgbmFtZXNwYWNlIF0gPSBnZXROYW1lQW5kTmFtZXNwYWNlKHR5cGUpO1xuICAgICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cbiAgICAgIGlmIChhbHJlYWR5SGFzQVRoZW1lU3VmZml4KG5hbWUpKSB7XG4gICAgICAgIGlmICghIXRoZW1lKSB7XG4gICAgICAgICAgd2FybihgJ3R5cGUnICR7bmFtZX0gYWxyZWFkeSBnZXRzIGEgdGhlbWUgaW5zaWRlIHNvICd0aGVtZScgJHt0aGVtZX0gd291bGQgYmUgaWdub3JlZGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdpdGhTdWZmaXgobmFtZSwgdGhlbWUgfHwgdGhpcy5faWNvblNlcnZpY2UuZGVmYXVsdFRoZW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3NldFNWR0VsZW1lbnQoc3ZnOiBTVkdFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5fY2xlYXJTVkdFbGVtZW50KCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzdmcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jbGVhclNWR0VsZW1lbnQoKTogdm9pZCB7XG4gICAgY29uc3QgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZWwuY2hpbGROb2RlcztcbiAgICBjb25zdCBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuWyBpIF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3ZnJykge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZChlbCwgY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19