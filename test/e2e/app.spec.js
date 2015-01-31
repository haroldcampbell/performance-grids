describe('app', function () {
    beforeEach(function () {
        browser.get('app/#/');
    });

    it('should find grid with 7 days', function () {
        var days = element.all(by.css('.days .day'));

        expect(days.count()).toBe(7);
    });

    it('should find 8 hour blocks for each day', function () {
        var days = element.all(by.css('.days .day'));

        days.each(function(day){
            var hours = day.all(by.css('.day .hour'));
            expect(hours.count()).toBe(8);
        })
    });

    it('each day shou have 4 am hour blocks', function () {
        var days = element.all(by.css('.days .day'));

        days.each(function(day){
            var hours = day.all(by.css('.day .day_am'));
            expect(hours.count()).toBe(4);
        })
    });

});

