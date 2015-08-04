var colordash = require('./');
var color = require('color');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('colordash', function() {

    describe('basic usage', function() {
        it('should lighten', function() {
            var actual = colordash.lighten('#888', 0.5);
            var expected = '#CCCCCC';
            expect(actual).to.equal(expected);
        });

        it('should darken', function() {
            var actual = colordash.darken('#888', 0.5);
            var expected = '#454545';
            expect(actual).to.equal(expected);
        });

        it('should whiten', function() {
            var actual = colordash.whiten('#888', 0.5);
            var expected = '#A1A1A1';
            expect(actual).to.equal(expected);
        });


    });

    describe('preservation of color speficiation', function() {
        it('should preserve hex', function() {
            var actual = colordash.lighten('#888', 0.5);
            var expected = '#CCCCCC';
            expect(actual).to.equal(expected);
        });

        it('should preserve rgb', function() {
            var actual = colordash.lighten('rgb(100, 100, 100)', 0.5);
            var expected = 'rgb(150, 150, 150)';
            expect(actual).to.equal(expected);
        });

        it('should preserve rgba', function() {
            var actual = colordash.lighten('rgba(100, 100, 100, 0.7)', 0.5);
            var expected = 'rgba(150, 150, 150, 0.7)';
            expect(actual).to.equal(expected);
        });

        it('should preserve hsl', function() {
            var actual = colordash.lighten('hsl(120, 100%, 50%)', 0.5);
            var expected = 'hsl(120, 100%, 75%)';
            expect(actual).to.equal(expected);
        });

        it('should preserve hsla', function() {
            var actual = colordash.lighten('hsla(120, 100%, 50%, 0.5)', 0.5);
            var expected = 'hsla(120, 100%, 75%, 0.5)';
            expect(actual).to.equal(expected);
        });

        it('should should default to rgba if it starts with hex but now has opacity', function() {
            var actual = colordash.clearer('#888', 0.5);
            var expected = 'rgba(136, 136, 136, 0.5)';
            expect(actual).to.equal(expected);
        });

    });

    describe('chain usage', function() {
        it('should chain', function() {
            var actual = colordash('#888').lighten(0.6).darken(0.2).value();
            var expected = '#ADADAD';
            expect(actual).to.equal(expected);
        });

        it('should have immutable intermediary steps', function() {
            var intermediaryValue = colordash('#888').lighten(0.6);

            var darkenValue1 = intermediaryValue.darken(0.2).value();
            var expectedValue1 = '#ADADAD';
            expect(darkenValue1).to.equal(expectedValue1);

            var darkenValue2 = intermediaryValue.darken(0.4).value();
            var expectedValue2 = '#828282';
            expect(darkenValue2).to.equal(expectedValue2);

            var intermediaryExpectedValue = '#D9D9D9';
            expect(intermediaryValue.value()).to.equal(intermediaryExpectedValue);
        });

        it('should not evaluate until value() or valueOf() is called', function() {
            var lightenSpy = sinon.spy(color.prototype, 'lighten');
            var darkenSpy = sinon.spy(color.prototype, 'darken');

            expect(lightenSpy.called).to.be.false;
            expect(darkenSpy.called).to.be.false;

            var colordashWrapper = colordash('#888').lighten(0.6).darken(0.2);
            expect(lightenSpy.called).to.be.false;
            expect(darkenSpy.called).to.be.false;

            colordashWrapper.value();
            expect(lightenSpy.called).to.be.true;
            expect(darkenSpy.called).to.be.true;
        });
    });


});
