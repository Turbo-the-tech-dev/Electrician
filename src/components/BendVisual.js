import { StyleSheet, Text, View } from 'react-native';

/**
 * Visual conduit bend diagram built with Views + transforms.
 * Each bend type gets its own layout showing the conduit shape
 * with labeled dimensions and angles.
 */

const PIPE = '#546E7A';
const PIPE_W = 6;
const LABEL_COLOR = '#1565C0';
const DIM_COLOR = '#E65100';

export default function BendVisual({ bendType, results }) {
  if (!results) return <Placeholder bendType={bendType} />;

  switch (bendType) {
    case 'stub':
      return <StubVisual r={results} />;
    case 'offset':
      return <OffsetVisual r={results} />;
    case 'kick':
      return <KickVisual r={results} />;
    case 'saddle3':
      return <Saddle3Visual r={results} />;
    case 'saddle4':
      return <Saddle4Visual r={results} />;
    default:
      return <Placeholder bendType={bendType} />;
  }
}

// ── Placeholder (before calculation) ──────────────────────────

function Placeholder({ bendType }) {
  const labels = {
    stub: 'Stub-up 90°',
    offset: 'Offset',
    kick: 'Kick',
    saddle3: '3-Bend Saddle',
    saddle4: '4-Bend Saddle',
  };
  return (
    <View style={styles.container}>
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderIcon}>
          {bendType === 'stub' ? '┗' : bendType === 'offset' ? '╱' : bendType === 'kick' ? '╲' : '╱╲'}
        </Text>
        <Text style={styles.placeholderText}>{labels[bendType] || 'Bend'}</Text>
        <Text style={styles.placeholderHint}>Enter values and calculate to see diagram</Text>
      </View>
    </View>
  );
}

// ── Stub-up 90° ───────────────────────────────────────────────

function StubVisual({ r }) {
  return (
    <View style={styles.container}>
      <View style={styles.diagramArea}>
        {/* Vertical section (the stub) */}
        <View style={[styles.pipeV, { height: 80, bottom: 30, left: 60 }]} />
        {/* Curved corner */}
        <View style={[styles.corner, { bottom: 22, left: 52 }]} />
        {/* Horizontal section */}
        <View style={[styles.pipeH, { width: 120, bottom: 24, left: 68 }]} />

        {/* Stub height label */}
        <View style={[styles.dimLine, { left: 30, bottom: 40 }]}>
          <Text style={styles.dimArrow}>{'↕'}</Text>
          <Text style={styles.dimText}>{r.stubLength}"</Text>
        </View>

        {/* Mark label */}
        <View style={[styles.dimLineH, { bottom: 6, left: 100 }]}>
          <Text style={styles.dimText}>Mark: {r.mark}"</Text>
        </View>

        {/* Deduct label */}
        <View style={[styles.badge, { top: 4, right: 8 }]}>
          <Text style={styles.badgeLabel}>Deduct</Text>
          <Text style={styles.badgeValue}>{r.deduct}"</Text>
        </View>
      </View>
    </View>
  );
}

// ── Offset ────────────────────────────────────────────────────

function OffsetVisual({ r }) {
  const angle = r.bendAngle || 30;
  const rotation = Math.min(angle, 50);

  return (
    <View style={styles.container}>
      <View style={styles.diagramArea}>
        {/* Lower horizontal */}
        <View style={[styles.pipeH, { width: 70, bottom: 24, left: 10 }]} />
        {/* Angled section */}
        <View
          style={[
            styles.pipeH,
            {
              width: 60,
              bottom: 52,
              left: 68,
              transform: [{ rotate: `-${rotation}deg` }],
            },
          ]}
        />
        {/* Upper horizontal */}
        <View style={[styles.pipeH, { width: 70, bottom: 80, left: 110 }]} />

        {/* Depth label */}
        <View style={[styles.dimLine, { right: 20, bottom: 35 }]}>
          <Text style={styles.dimArrow}>{'↕'}</Text>
          <Text style={styles.dimText}>{r.offsetDepth}"</Text>
        </View>

        {/* Distance between bends */}
        <View style={[styles.dimLineH, { bottom: 4, left: 50 }]}>
          <Text style={styles.dimText}>Bends: {r.distanceBetweenBends}"</Text>
        </View>

        {/* Angle + shrink badges */}
        <View style={[styles.badge, { top: 2, left: 8 }]}>
          <Text style={styles.badgeLabel}>{angle}°</Text>
        </View>
        <View style={[styles.badge, { top: 2, right: 8 }]}>
          <Text style={styles.badgeLabel}>Shrink</Text>
          <Text style={styles.badgeValue}>{r.shrinkage}"</Text>
        </View>
      </View>
    </View>
  );
}

// ── Kick ──────────────────────────────────────────────────────

function KickVisual({ r }) {
  const angleClamped = Math.min(r.bendAngle || 15, 45);

  return (
    <View style={styles.container}>
      <View style={styles.diagramArea}>
        {/* Main horizontal run */}
        <View style={[styles.pipeH, { width: 100, bottom: 30, left: 10 }]} />
        {/* Kicked section */}
        <View
          style={[
            styles.pipeH,
            {
              width: 90,
              bottom: 48,
              left: 100,
              transform: [{ rotate: `-${angleClamped}deg` }],
            },
          ]}
        />

        {/* Angle label */}
        <View style={[styles.badge, { top: 4, left: 80 }]}>
          <Text style={styles.badgeLabel}>{r.bendAngle}°</Text>
        </View>

        {/* Depth */}
        <View style={[styles.dimLine, { right: 12, bottom: 30 }]}>
          <Text style={styles.dimArrow}>{'↕'}</Text>
          <Text style={styles.dimText}>{r.kickDepth}"</Text>
        </View>

        {/* Travel */}
        <View style={[styles.dimLineH, { bottom: 4, left: 40 }]}>
          <Text style={styles.dimText}>Travel: {r.travel}"</Text>
        </View>
      </View>
    </View>
  );
}

// ── 3-Bend Saddle ─────────────────────────────────────────────

function Saddle3Visual({ r }) {
  const rot = Math.min((r.centerAngle || 45) * 0.6, 35);

  return (
    <View style={styles.container}>
      <View style={styles.diagramArea}>
        {/* Left horizontal */}
        <View style={[styles.pipeH, { width: 40, bottom: 24, left: 8 }]} />
        {/* Up slope */}
        <View
          style={[
            styles.pipeH,
            { width: 45, bottom: 42, left: 40, transform: [{ rotate: `-${rot}deg` }] },
          ]}
        />
        {/* Down slope */}
        <View
          style={[
            styles.pipeH,
            { width: 45, bottom: 42, left: 105, transform: [{ rotate: `${rot}deg` }] },
          ]}
        />
        {/* Right horizontal */}
        <View style={[styles.pipeH, { width: 40, bottom: 24, left: 142 }]} />

        {/* Obstacle box */}
        <View style={styles.obstacleBox}>
          <Text style={styles.obstacleText}>Obstacle</Text>
        </View>

        {/* Depth */}
        <View style={[styles.dimLine, { left: 88, top: 2 }]}>
          <Text style={styles.dimArrow}>{'↕'}</Text>
          <Text style={styles.dimText}>{r.saddleDepth}"</Text>
        </View>

        {/* Center angle */}
        <View style={[styles.badge, { top: 2, left: 4 }]}>
          <Text style={styles.badgeLabel}>Center: {r.centerAngle}°</Text>
        </View>

        {/* Spacing */}
        <View style={[styles.dimLineH, { bottom: 4, left: 30 }]}>
          <Text style={styles.dimText}>C→Outer: {r.distCenterToOuter}" | Shrink: {r.shrinkage}"</Text>
        </View>
      </View>
    </View>
  );
}

// ── 4-Bend Saddle ─────────────────────────────────────────────

function Saddle4Visual({ r }) {
  const rot = Math.min((r.bendAngle || 22.5) * 0.8, 30);

  return (
    <View style={styles.container}>
      <View style={styles.diagramArea}>
        {/* Left horizontal */}
        <View style={[styles.pipeH, { width: 25, bottom: 22, left: 4 }]} />
        {/* Rise */}
        <View
          style={[
            styles.pipeH,
            { width: 30, bottom: 36, left: 24, transform: [{ rotate: `-${rot}deg` }] },
          ]}
        />
        {/* Top horizontal */}
        <View style={[styles.pipeH, { width: 50, bottom: 52, left: 52 }]} />
        {/* Fall */}
        <View
          style={[
            styles.pipeH,
            { width: 30, bottom: 36, left: 132, transform: [{ rotate: `${rot}deg` }] },
          ]}
        />
        {/* Right horizontal */}
        <View style={[styles.pipeH, { width: 25, bottom: 22, left: 158 }]} />

        {/* Obstacle box */}
        <View style={[styles.obstacleBox, { width: 40 }]}>
          <Text style={styles.obstacleText}>Obs.</Text>
        </View>

        {/* Depth */}
        <View style={[styles.badge, { top: 2, left: 4 }]}>
          <Text style={styles.badgeLabel}>Depth: {r.saddleDepth}"</Text>
        </View>
        <View style={[styles.badge, { top: 2, right: 4 }]}>
          <Text style={styles.badgeLabel}>{r.bendAngle}°</Text>
        </View>

        {/* Measurements */}
        <View style={[styles.dimLineH, { bottom: 2, left: 10 }]}>
          <Text style={[styles.dimText, { fontSize: 10 }]}>
            Offset: {r.offsetDistance}" | Width: {r.saddleWidth}" | Shrink: {r.totalShrinkage}"
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  diagramArea: {
    height: 130,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
    overflow: 'hidden',
  },
  pipeH: {
    position: 'absolute',
    height: PIPE_W,
    backgroundColor: PIPE,
    borderRadius: PIPE_W / 2,
  },
  pipeV: {
    position: 'absolute',
    width: PIPE_W,
    backgroundColor: PIPE,
    borderRadius: PIPE_W / 2,
  },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderBottomWidth: PIPE_W,
    borderLeftWidth: PIPE_W,
    borderColor: PIPE,
    borderBottomLeftRadius: 14,
  },
  dimLine: {
    position: 'absolute',
    alignItems: 'center',
  },
  dimLineH: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dimArrow: {
    fontSize: 16,
    color: DIM_COLOR,
    fontWeight: '700',
  },
  dimText: {
    fontSize: 11,
    color: DIM_COLOR,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    backgroundColor: 'rgba(21,101,192,0.1)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    gap: 4,
  },
  badgeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: LABEL_COLOR,
  },
  badgeValue: {
    fontSize: 11,
    fontWeight: '700',
    color: DIM_COLOR,
  },
  obstacleBox: {
    position: 'absolute',
    bottom: 18,
    alignSelf: 'center',
    left: '40%',
    width: 30,
    height: 22,
    backgroundColor: '#FFCDD2',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E57373',
    alignItems: 'center',
    justifyContent: 'center',
  },
  obstacleText: {
    fontSize: 7,
    color: '#C62828',
    fontWeight: '700',
  },
  placeholderBox: {
    height: 130,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 36,
    color: '#BDBDBD',
    fontWeight: '300',
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    marginTop: 4,
  },
  placeholderHint: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 2,
  },
});
