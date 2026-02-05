/**
 * Conduit Bending Calculator
 *
 * Bend Types:
 *   1. Stub-up (90°)     — simple 90° bend
 *   2. Offset             — two equal bends to shift conduit laterally
 *   3. Kick               — single shallow-angle bend
 *   4. 3-Bend Saddle      — center bend + two return bends to clear an obstacle
 *   5. 4-Bend Saddle      — two offsets stacked to clear an obstacle
 *
 * Standard offset multipliers & shrink per inch of offset:
 *   10°   → ×6.0,  shrink 1/16"
 *   22.5° → ×2.6,  shrink 3/16"
 *   30°   → ×2.0,  shrink 1/4"
 *   45°   → ×1.4,  shrink 3/8"
 *   60°   → ×1.2,  shrink 1/2"
 *
 * Stub-up deducts (common EMT):
 *   1/2"  → 5"
 *   3/4"  → 6"
 *   1"    → 8"
 *   1-1/4"→ 11"
 */

// ── Offset multiplier / shrink table ──────────────────────────

export const OFFSET_TABLE = [
  { angle: 10,   multiplier: 6.0,  shrinkPerInch: 1 / 16 },
  { angle: 22.5, multiplier: 2.6,  shrinkPerInch: 3 / 16 },
  { angle: 30,   multiplier: 2.0,  shrinkPerInch: 1 / 4 },
  { angle: 45,   multiplier: 1.414, shrinkPerInch: 3 / 8 },
  { angle: 60,   multiplier: 1.155, shrinkPerInch: 1 / 2 },
];

// ── Stub-up deducts by conduit size (EMT) ─────────────────────

export const STUB_DEDUCTS = [
  { size: '1/2"',   deduct: 5 },
  { size: '3/4"',   deduct: 6 },
  { size: '1"',     deduct: 8 },
  { size: '1-1/4"', deduct: 11 },
];

// ── Bend type definitions ─────────────────────────────────────

export const BEND_TYPES = [
  {
    key: 'stub',
    label: 'Stub-up 90°',
    shortLabel: 'Stub 90°',
    description: 'Simple 90° bend',
  },
  {
    key: 'offset',
    label: 'Offset',
    shortLabel: 'Offset',
    description: 'Two bends to shift conduit',
  },
  {
    key: 'kick',
    label: 'Kick',
    shortLabel: 'Kick',
    description: 'Single shallow-angle bend',
  },
  {
    key: 'saddle3',
    label: '3-Bend Saddle',
    shortLabel: '3-Saddle',
    description: 'Center bend + two return bends',
  },
  {
    key: 'saddle4',
    label: '4-Bend Saddle',
    shortLabel: '4-Saddle',
    description: 'Two offsets to clear obstacle',
  },
];

// ── Calculators ───────────────────────────────────────────────

/**
 * Stub-up 90°
 * Input: stubLength (desired stub height), conduitSize
 * Output: mark (distance from end to bend point)
 */
export function calcStub({ stubLength, conduitSize }) {
  const stub = parseFloat(stubLength);
  if (isNaN(stub) || stub <= 0) return { error: 'Enter a valid stub length.' };

  const deductEntry = STUB_DEDUCTS.find((d) => d.size === conduitSize);
  if (!deductEntry) return { error: 'Select a conduit size.' };

  const mark = stub - deductEntry.deduct;
  if (mark <= 0) {
    return { error: `Stub must be longer than ${deductEntry.deduct}" deduct for ${conduitSize} conduit.` };
  }

  return {
    mark: round(mark),
    deduct: deductEntry.deduct,
    stubLength: round(stub),
    conduitSize,
  };
}

/**
 * Offset
 * Input: offsetDepth (lateral shift), bendAngle (from OFFSET_TABLE)
 * Output: distanceBetweenBends, shrinkage, travel
 */
export function calcOffset({ offsetDepth, bendAngle }) {
  const depth = parseFloat(offsetDepth);
  const angle = parseFloat(bendAngle);
  if (isNaN(depth) || depth <= 0) return { error: 'Enter a valid offset depth.' };

  const row = OFFSET_TABLE.find((r) => r.angle === angle);
  if (!row) return { error: 'Select a bend angle.' };

  const distance = depth * row.multiplier;
  const shrinkage = depth * row.shrinkPerInch;
  const travel = distance; // travel between marks along the conduit

  return {
    distanceBetweenBends: round(distance),
    shrinkage: round(shrinkage),
    travel: round(travel),
    offsetDepth: round(depth),
    bendAngle: angle,
    multiplier: row.multiplier,
  };
}

/**
 * Kick (single bend)
 * Input: kickDepth (how far conduit needs to move), kickDistance (run along wall)
 * Output: bendAngle, travel
 */
export function calcKick({ kickDepth, kickDistance }) {
  const depth = parseFloat(kickDepth);
  const distance = parseFloat(kickDistance);
  if (isNaN(depth) || depth <= 0) return { error: 'Enter a valid kick depth.' };
  if (isNaN(distance) || distance <= 0) return { error: 'Enter a valid kick distance.' };

  const angleRad = Math.atan(depth / distance);
  const angleDeg = angleRad * (180 / Math.PI);
  const travel = Math.sqrt(depth * depth + distance * distance);

  return {
    bendAngle: round(angleDeg),
    travel: round(travel),
    kickDepth: round(depth),
    kickDistance: round(distance),
  };
}

/**
 * 3-Bend Saddle
 * Input: saddleDepth (obstruction height), centerAngle (usually 45°)
 * Output: center mark adjustment, outer bend angles, distance between bends, shrinkage
 *
 * Rule of thumb:
 *   - Center bend = chosen angle (commonly 45°)
 *   - Outer bends = center angle / 2 (commonly 22.5°)
 *   - Distance center-to-outer = depth × multiplier of outer angle
 *   - Shrinkage = depth × shrinkPerInch of center angle
 */
export function calcSaddle3({ saddleDepth, centerAngle }) {
  const depth = parseFloat(saddleDepth);
  const cAngle = parseFloat(centerAngle);
  if (isNaN(depth) || depth <= 0) return { error: 'Enter a valid saddle depth.' };
  if (isNaN(cAngle) || cAngle <= 0) return { error: 'Select a center bend angle.' };

  const outerAngle = cAngle / 2;

  // Find multiplier for the outer angle
  const outerRow = OFFSET_TABLE.find((r) => r.angle === outerAngle);
  const centerRow = OFFSET_TABLE.find((r) => r.angle === cAngle);

  if (!outerRow || !centerRow) {
    return { error: `No data for ${cAngle}° center / ${outerAngle}° outer. Use 22.5°/45°/60° center.` };
  }

  const distCenterToOuter = depth * outerRow.multiplier;
  const shrinkage = depth * centerRow.shrinkPerInch;

  return {
    centerAngle: cAngle,
    outerAngle,
    distCenterToOuter: round(distCenterToOuter),
    totalSpan: round(distCenterToOuter * 2),
    shrinkage: round(shrinkage),
    saddleDepth: round(depth),
  };
}

/**
 * 4-Bend Saddle
 * Input: saddleDepth, saddleWidth (width of obstacle), bendAngle
 * Output: distances between bends, shrinkage
 *
 * A 4-bend saddle is essentially two offsets:
 *   - Bends 1-2 form offset up
 *   - Bends 3-4 form offset down
 *   - Middle section spans the obstacle width
 */
export function calcSaddle4({ saddleDepth, saddleWidth, bendAngle }) {
  const depth = parseFloat(saddleDepth);
  const width = parseFloat(saddleWidth);
  const angle = parseFloat(bendAngle);
  if (isNaN(depth) || depth <= 0) return { error: 'Enter a valid saddle depth.' };
  if (isNaN(width) || width <= 0) return { error: 'Enter a valid obstacle width.' };

  const row = OFFSET_TABLE.find((r) => r.angle === angle);
  if (!row) return { error: 'Select a bend angle.' };

  const offsetDistance = depth * row.multiplier;
  const shrinkagePerOffset = depth * row.shrinkPerInch;
  const totalShrinkage = shrinkagePerOffset * 2;

  return {
    offsetDistance: round(offsetDistance),
    saddleWidth: round(width),
    totalSpan: round(offsetDistance * 2 + width),
    shrinkagePerOffset: round(shrinkagePerOffset),
    totalShrinkage: round(totalShrinkage),
    saddleDepth: round(depth),
    bendAngle: angle,
    multiplier: row.multiplier,
  };
}

// ── Helpers ───────────────────────────────────────────────────

function round(v) {
  return Math.round(v * 1000) / 1000;
}

/**
 * Format a decimal inch value into fractional display
 * e.g. 5.375 → "5-3/8""
 */
export function toFraction(decimal) {
  if (decimal === null || decimal === undefined) return '—';
  const whole = Math.floor(decimal);
  let remainder = decimal - whole;

  // Round to nearest 1/16
  const sixteenths = Math.round(remainder * 16);
  if (sixteenths === 0) return `${whole}"`;
  if (sixteenths === 16) return `${whole + 1}"`;

  // Simplify fraction
  let num = sixteenths;
  let den = 16;
  while (num % 2 === 0 && den % 2 === 0) {
    num /= 2;
    den /= 2;
  }

  if (whole === 0) return `${num}/${den}"`;
  return `${whole}-${num}/${den}"`;
}
