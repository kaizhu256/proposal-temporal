// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.datetime.plus
includes: [compareArray.js]
---*/

let called = 0;

class MyDateTime extends Temporal.DateTime {
  constructor(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    ++called;
    assert.compareArray([year, month, day, hour, minute, second, millisecond, microsecond, nanosecond], [275760, 9, 13, 23, 59, 59, 999, 999, 999]);
    super(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  }
}

const instance = MyDateTime.from("+275760-09-13T23:59:59.999999999");
assert.sameValue(called, 1);

const result = instance.plus({ nanoseconds: 1 });
assert.sameValue(called, 2);

assert.throws(RangeError, () => instance.plus({ nanoseconds: 1 }, { "disambiguation": "reject" }));
assert.sameValue(called, 2);
