// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.datetime.plus
---*/

function CustomError() {}

const datetime = Temporal.DateTime.from({ year: 2000, month: 5, day: 2 });
Object.defineProperty(datetime, "constructor", {
  get() {
    throw new CustomError();
  }
});

assert.throws(CustomError, () => datetime.plus({ nanoseconds: 1 }));
