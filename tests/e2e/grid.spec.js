describe('Grid', function () {
    beforeEach(function () {
        browser.get('app/#/');
    });

    it('should should have have level 4', function () {
        var cell = element(by.id('1_1'));

        expect(cell.isPresent()).toBeTruthy();

        cell = element(by.css('.level4'));
        expect(cell.isPresent()).toBeTruthy();
    });
});