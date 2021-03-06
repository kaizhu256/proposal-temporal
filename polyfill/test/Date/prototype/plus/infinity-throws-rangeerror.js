// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Temporal.Date.prototype.plus throws a RangeError if any value in a property bag is Infinity
esid: sec-temporal.date.prototype.plus
---*/

const instance = Temporal.Date.from({ year: 2000, month: 5, day: 2 });

// constrain

assert.throws(RangeError, () => instance.plus({ years: Infinity }, { disambiguation: 'constrain' }));
assert.throws(RangeError, () => instance.plus({ months: Infinity }, { disambiguation: 'constrain' }));
assert.throws(RangeError, () => instance.plus({ days: Infinity }, { disambiguation: 'constrain' }));
assert.throws(RangeError, () => instance.plus({ hours: Infinity }, { disambiguation: 'constrain' }));
assert.throws(RangeError, () => instance.plus({ minutes: Infinity }, { disambiguation: 'constrain' }));
assert.throws(RangeError, () => instance.plus({ seconds: Infinity }, { disambiguation: 'constrain' }));
assert.throws(RangeError, () => instance.plus({ milliseconds: Infinity }, { disambiguation: 'constrain' }));
assert.throws(RangeError, () => instance.plus({ microseconds: Infinity }, { disambiguation: 'constrain' }));
assert.throws(RangeError, () => instance.plus({ nanoseconds: Infinity }, { disambiguation: 'constrain' }));

// reject

assert.throws(RangeError, () => instance.plus({ years: Infinity }, { disambiguation: 'reject' }));
assert.throws(RangeError, () => instance.plus({ months: Infinity }, { disambiguation: 'reject' }));
assert.throws(RangeError, () => instance.plus({ days: Infinity }, { disambiguation: 'reject' }));
assert.throws(RangeError, () => instance.plus({ hours: Infinity }, { disambiguation: 'reject' }));
assert.throws(RangeError, () => instance.plus({ minutes: Infinity }, { disambiguation: 'reject' }));
assert.throws(RangeError, () => instance.plus({ seconds: Infinity }, { disambiguation: 'reject' }));
assert.throws(RangeError, () => instance.plus({ milliseconds: Infinity }, { disambiguation: 'reject' }));
assert.throws(RangeError, () => instance.plus({ microseconds: Infinity }, { disambiguation: 'reject' }));
assert.throws(RangeError, () => instance.plus({ nanoseconds: Infinity }, { disambiguation: 'reject' }));

let calls = 0;
const obj = {
  valueOf() {
    calls++;
    return Infinity;
  }
};

assert.throws(RangeError, () => instance.plus({ years: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 1, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ months: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 2, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ days: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 3, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ hours: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 4, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ minutes: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 5, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ seconds: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 6, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ milliseconds: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 7, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ microseconds: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 8, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ nanoseconds: obj }, { disambiguation: 'constrain' }));
assert.sameValue(calls, 9, "it fails after fetching the primitive value");

assert.throws(RangeError, () => instance.plus({ years: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 10, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ months: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 11, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ days: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 12, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ hours: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 13, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ minutes: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 14, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ seconds: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 15, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ milliseconds: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 16, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ microseconds: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 17, "it fails after fetching the primitive value");
assert.throws(RangeError, () => instance.plus({ nanoseconds: obj }, { disambiguation: 'reject' }));
assert.sameValue(calls, 18, "it fails after fetching the primitive value");
