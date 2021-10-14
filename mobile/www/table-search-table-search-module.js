(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["table-search-table-search-module"],{

/***/ "IPXJ":
/*!*****************************************************!*\
  !*** ./src/app/table-search/table-search.module.ts ***!
  \*****************************************************/
/*! exports provided: routes, TableSearchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableSearchModule", function() { return TableSearchModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _table_search_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table-search.component */ "YfZI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [
    {
        path: 'search',
        component: _table_search_component__WEBPACK_IMPORTED_MODULE_1__["TableSearchComponent"],
    },
];
class TableSearchModule {
}
TableSearchModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TableSearchModule });
TableSearchModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function TableSearchModule_Factory(t) { return new (t || TableSearchModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes),]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TableSearchModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=table-search-table-search-module.js.map