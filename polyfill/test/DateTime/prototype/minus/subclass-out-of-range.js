// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.datetime.minus
includes: [compareArray.js]
---*/

let called = 0;

class MyDateTime extends Temporal.DateTime {
  constructor(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    ++called;
    assert.compareArray([year, month, day, hour, minute, second, millisecond, microsecond, nanosecond], [-271821, 4, 19, 0, 0, 0, 0, 0, 1]);
    super(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  }
}

const instance = MyDateTime.from("-271821-04-19T00:00:00.000000001");
assert.sameValue(called, 1);

const result = instance.minus({ nanoseconds: 1 });
assert.sameValue(called, 2);

assert.throws(RangeError, () => instance.minus({ nanoseconds: 1 }, { "disambiguation": "reject" }));
assert.sameValue(called, 2);
