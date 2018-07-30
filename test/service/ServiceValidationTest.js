'use strict';

//Import modules
const chai = require('chai');
const expect = chai.expect;
const testData = require('./test_data.json');
const servicefunctions = require('../../src/app.js');

if (testData == null) {
    console.error("Test data not found.");
}

describe('Invalid Input', () => {

    it('Blank array', (done) => {
        var res = servicefunctions.format_weight(testData['improperRequests']['blankArray']['request']);
        expect(res).equals(testData['improperRequests']['blankArray']['response']);
        done();
    });

    it('Blank json', (done) => {
        var res = servicefunctions.format_weight(testData['improperRequests']['blankJson']['request']);
        expect(res).equals(testData['improperRequests']['blankJson']['response']);
        done();
    });

    it('Incorrect schema passed - less than two elements under root', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['oneElementUnderRoot']['request']);
        expect(res).equals(testData['improperRequests']['oneElementUnderRoot']['response']);
        done();

    });

    it('Incorrect schema passed - more than two elements under root', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['threeElementsUnderRoot']['request']);
        expect(res).equals(testData['improperRequests']['threeElementsUnderRoot']['response']);
        done();

    });

    it('Incorrect schema passed - Name missing', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['nameMissing']['request']);
        expect(res).equals(testData['improperRequests']['nameMissing']['response']);
        done();

    });

    it('Incorrect schema passed - Name Type not string', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['nameIsNum']['request']);
        expect(res).equals(testData['improperRequests']['nameIsNum']['response']);
        done();

    });

    it('Incorrect schema passed - Details Missing', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['detailsMissing']['request']);
        expect(res).equals(testData['improperRequests']['detailsMissing']['response']);
        done();

    });

    it('Incorrect schema passed - Details Type not Object', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['detailsIsNum']['request']);
        expect(res).equals(testData['improperRequests']['detailsIsNum']['response']);
        done();

    });

    it('Incorrect schema passed - less than two elements under Details', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['oneElementUnderDetails']['request']);
        expect(res).equals(testData['improperRequests']['oneElementUnderDetails']['response']);
        done();

    });

    it('Incorrect schema passed - more than two elements under Details', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['threeElementsUnderDetails']['request']);
        expect(res).equals(testData['improperRequests']['threeElementsUnderDetails']['response']);
        done();

    });

    it('Incorrect schema passed - Type is missing', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['typeMissing']['request']);
        expect(res).equals(testData['improperRequests']['typeMissing']['response']);
        done();

    });

    it('Incorrect schema passed - Type is invalid', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['typeIsInvalid']['request']);
        expect(res).equals(testData['improperRequests']['typeIsInvalid']['response']);
        done();

    });

    it('Incorrect schema passed - weight is missing', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['weightMissing']['request']);
        expect(res).equals(testData['improperRequests']['weightMissing']['response']);
        done();

    });

    it('Incorrect schema passed - weight is invalid', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['weightIsInvalid']['request']);
        expect(res).equals(testData['improperRequests']['weightIsInvalid']['response']);
        done();

    });

    it('Incorrect schema passed - multiple Records', (done) => {

        var res = servicefunctions.format_weight(testData['improperRequests']['multipleRecords']['request']);
        console.log(res);
        expect(res).equals(testData['improperRequests']['multipleRecords']['response']);
        done();

    });

});
describe('Valid Input', () => {

    it('Single Element passed', (done) => {

        var res = servicefunctions.format_weight(testData['properRequests']['singleElement']['request']);
        expect(res[0].Details.Weight).equals(testData['properRequests']['singleElement']['response']['MinWeight']);
        expect(res[1].Details.Weight).equals(testData['properRequests']['singleElement']['response']['MaxWeight']);
        done();

    });

    it('Multiple Element passed', (done) => {

        var res = servicefunctions.format_weight(testData['properRequests']['multipleElement']['request']);
        expect(res[0].Details.Weight).equals(testData['properRequests']['multipleElement']['response']['MinWeight']);
        expect(res[1].Details.Weight).equals(testData['properRequests']['multipleElement']['response']['MaxWeight']);
        done();

    });

});