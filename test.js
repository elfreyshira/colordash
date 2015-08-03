var colordash = require('./');
var color = require('color');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('colordash', function() {

    describe.only('basic usage', function() {
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

    describe('chain usage', function() {
        it('should chain', function() {
            var actual = colordash('#888').lighten(0.6).darken(0.2).value();
            var expected = '#ADADAD';
            expect(actual).to.equal(expected);
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
