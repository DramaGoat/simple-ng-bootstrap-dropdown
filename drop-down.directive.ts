import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropDown]'
})
export class DropDownDirective {

    private safeClassList = ['dropdown-toggle', 'dropdown-item', 'nav-link'];

    constructor(private element: ElementRef) { }

    @HostListener('document:click', ['$event'])
    clickOut(event) {
        if (!this._containsTarget(event.target)) {
            this.removeClass('show');
            return;
        }

        if (!this._isShowing()) {
            this.addClass('show');
            return;
        }

        if (this.safeClassList.some(className => event.target.classList.contains(className))) {
            this.removeClass('show');
            return;
        }
    }

    private _containsTarget(target: any): boolean {
        return this.element.nativeElement.contains(target);
    }

    private _isShowing(): boolean {
        return this.element.nativeElement.classList.contains('show');
    }

    private addClass(className: string) {
        const parent = this.element.nativeElement;
        parent.classList.add(className);
        const child = [].filter.call(this.element.nativeElement.children, (innerElement: any) => {
            return innerElement.classList.contains('dropdown-menu');
        });

        if (child.length) {
            child[0].classList.add(className);
        }
    }

    private removeClass(className: string) {
        const parent = this.element.nativeElement;
        parent.classList.remove(className);
        const child = [].filter.call(this.element.nativeElement.children, (innerElement: any) => {
            return innerElement.classList.contains('dropdown-menu');
        });

        if (child.length) {
            child[0].classList.remove(className);
        }
    }
}
