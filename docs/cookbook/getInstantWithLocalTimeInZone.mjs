/**
 * Get an absolute time corresponding with a calendar date / wall-clock time in
 * a particular time zone, the same as Temporal.TimeZone.getAbsoluteFor() or
 * Temporal.DateTime.inTimeZone(), but with more disambiguation options.
 *
 * As well as the default Temporal disambiguation options 'earlier', 'later',
 * and 'reject', there are additional options possible:
 *
 * - 'earlierLater': Same as what the Moment Timezone and Luxon libraries do;
 *   equivalent to 'earlier' when turning the clock back, and 'later' when
 *   setting the clock forward.
 * - 'clipEarlier': Equivalent to 'earlier' when turning the clock back, and
 *   when setting the clock forward returns the time just before the clock
 *   changes.
 * - 'clipLater': Equivalent to 'later' when turning the clock back, and when
 *   setting the clock forward returns the exact time of the clock change.
 *
 * @param {Temporal.DateTime} dateTime - Calendar date and wall-clock time to
 *   convert
 * @param {Temporal.TimeZone} timeZone - Time zone in which to consider the
 *   wall-clock time
 * @param {string} disambiguation - Disambiguation mode, see description.
 * @returns {Temporal.Absolute} Absolute time in timeZone at the time of the
 *   calendar date and wall-clock time from dateTime
 */
function getInstantWithLocalTimeInZone(dateTime, timeZone, disambiguation = 'earlier') {
  // Handle the built-in modes first
  if (['earlier', 'later', 'reject'].includes(disambiguation)) {
    return timeZone.getAbsoluteFor(dateTime, { disambiguation });
  }

  const possible = timeZone.getPossibleAbsolutesFor(dateTime);

  // Return only possibility if no disambiguation needed
  if (possible.length === 1) return possible[0];

  switch (disambiguation) {
    case 'earlierLater':
      if (possible.length === 0) return timeZone.getAbsoluteFor(dateTime, { disambiguation: 'later' });
      return possible[0];
    case 'clipEarlier':
      if (possible.length === 0) {
        const before = dateTime.inTimeZone(timeZone, { disambiguation: 'earlier' });
        return timeZone
          .getTransitions(before)
          .next()
          .value.minus({ nanoseconds: 1 });
      }
      return possible[0];
    case 'clipLater':
      if (possible.length === 0) {
        const before = dateTime.inTimeZone(timeZone, { disambiguation: 'earlier' });
        return timeZone.getTransitions(before).next().value;
      }
      return possible[possible.length - 1];
  }
  throw new RangeError(`invalid disambiguation ${disambiguation}`);
}

const germany = Temporal.TimeZone.from('Europe/Berlin');
const nonexistentGermanWallTime = Temporal.DateTime.from('2019-03-31T02:45');

const germanResults = {
  earlier: /*     */ '2019-03-31T01:45+01:00[Europe/Berlin]',
  later: /*       */ '2019-03-31T03:45+02:00[Europe/Berlin]',
  earlierLater: /**/ '2019-03-31T03:45+02:00[Europe/Berlin]',
  clipEarlier: /* */ '2019-03-31T01:59:59.999999999+01:00[Europe/Berlin]',
  clipLater: /*   */ '2019-03-31T03:00+02:00[Europe/Berlin]'
};
for (const [disambiguation, result] of Object.entries(germanResults)) {
  assert.equal(
    getInstantWithLocalTimeInZone(nonexistentGermanWallTime, germany, disambiguation).toString(germany),
    result
  );
}

const brazilEast = Temporal.TimeZone.from('America/Sao_Paulo');
const doubleEasternBrazilianWallTime = Temporal.DateTime.from('2019-02-16T23:45');

const brazilianResults = {
  earlier: /*     */ '2019-02-16T23:45-02:00[America/Sao_Paulo]',
  later: /*       */ '2019-02-16T23:45-03:00[America/Sao_Paulo]',
  earlierLater: /**/ '2019-02-16T23:45-02:00[America/Sao_Paulo]',
  clipEarlier: /* */ '2019-02-16T23:45-02:00[America/Sao_Paulo]',
  clipLater: /*   */ '2019-02-16T23:45-03:00[America/Sao_Paulo]'
};
for (const [disambiguation, result] of Object.entries(brazilianResults)) {
  assert.equal(
    getInstantWithLocalTimeInZone(doubleEasternBrazilianWallTime, brazilEast, disambiguation).toString(brazilEast),
    result
  );
}
