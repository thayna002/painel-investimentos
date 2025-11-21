// Test bootstrap for Karma + Jasmine
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Provide HttpClient globally for tests (some services expect it)
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
getTestBed().configureTestingModule({
  imports: [HttpClientTestingModule],
  providers: [provideHttpClientTesting()]
});
