// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.datetime.minus
---*/

function check(value, description) {
  const datetime = Temporal.DateTime.from({ year: 2000, month: 5, day: 2 });
  datetime.constructor = value;
  assert.throws(TypeError, () => datetime.minus({ nanoseconds: 1 }), description);
}

check(null, "null");
check(true, "true");
check("test", "string");
check(Symbol(), "Symbol");
check(7, "number");
check(7n, "bigint");
