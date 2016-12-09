import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('Component: Breadcrumb', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [BreadcrumbComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([BreadcrumbComponent],
      (component: BreadcrumbComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(BreadcrumbComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(BreadcrumbComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-breadcrumb></app-breadcrumb>
  `,
  directives: [BreadcrumbComponent]
})
class BreadcrumbComponentTestController {
}
