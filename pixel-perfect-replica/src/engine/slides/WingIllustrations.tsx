const ring12 = (cx: number, cy: number, r: number) =>
  Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return (
      <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={2.5} fill="#C9A84C" fillOpacity={0.65} />
    );
  });

export function BrainIllustration() {
  const nodes = [
    { x: 80, y: 105 }, { x: 102, y: 148 }, { x: 76, y: 168 }, { x: 113, y: 118 },
    { x: 155, y: 112 }, { x: 172, y: 150 }, { x: 186, y: 120 }, { x: 162, y: 178 },
  ];
  const links = [[0,1],[1,2],[0,3],[3,4],[4,5],[5,6],[5,7],[1,5],[3,5]];
  return (
    <svg viewBox="0 0 260 260" width={260} height={260}>
      <ellipse cx={92} cy={130} rx={74} ry={88} fill="#080D20" fillOpacity={0.88} stroke="#5077EE" strokeOpacity={0.55} strokeWidth={1.5} />
      <ellipse cx={168} cy={130} rx={74} ry={88} fill="#080D20" fillOpacity={0.88} stroke="#5077EE" strokeOpacity={0.55} strokeWidth={1.5} />
      <line x1={130} y1={43} x2={130} y2={217} stroke="#5078DC" strokeWidth={1} strokeDasharray="4 3" strokeOpacity={0.45} />
      {[["M50,120 Q70,100 90,120"],["M45,145 Q70,125 95,145"],["M55,165 Q80,150 100,165"],
        ["M170,120 Q190,100 210,120"],["M165,145 Q190,125 215,145"],["M160,165 Q185,150 205,165"]
      ].map(([d], i) => <path key={i} d={d} stroke="#5077EE" strokeOpacity={0.3} strokeWidth={1} fill="none" />)}
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#5078DC" strokeOpacity={0.38} strokeWidth={0.8} />
      ))}
      {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={3} fill="#7BA7FF" fillOpacity={0.85} />)}
      {ring12(130, 130, 124)}
    </svg>
  );
}

export function OceanIllustration() {
  return (
    <svg viewBox="0 0 260 260" width={260} height={260}>
      <defs>
        <radialGradient id="ogr" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0A2020" />
          <stop offset="100%" stopColor="#020808" />
        </radialGradient>
      </defs>
      <circle cx={130} cy={130} r={120} fill="url(#ogr)" stroke="#3CB4B4" strokeOpacity={0.3} strokeWidth={1} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1={130} y1={130} x2={130 + 115 * Math.cos(a)} y2={130 + 115 * Math.sin(a)} stroke="#3CB4B4" strokeOpacity={0.18} strokeWidth={0.8} />;
      })}
      {[40,60,80,100].map((r, i) => (
        <circle key={i} cx={130} cy={130} r={r} fill="none" stroke="#3CB4B4" strokeOpacity={0.12 + i * 0.04} strokeWidth={0.8} strokeDasharray="3 5" />
      ))}
      {[[90,100],[155,85],[72,155],[180,148],[115,170],[145,110],[100,130],[168,165]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.2} fill="#3CD4D4" fillOpacity={0.5 + (i % 4) * 0.12} />
      ))}
      <circle cx={130} cy={235} r={1.5} fill="white" fillOpacity={0.9} />
      {ring12(130, 130, 124)}
    </svg>
  );
}

export function RuinsIllustration() {
  return (
    <svg viewBox="0 0 260 260" width={260} height={260}>
      <defs>
        <radialGradient id="rgr" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#301800" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#000" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={260} height={260} fill="url(#rgr)" />
      {/* Three columns varying heights */}
      <rect x={60} y={80} width={24} height={145} fill="#1E1408" stroke="#C87840" strokeOpacity={0.4} strokeWidth={1} />
      <rect x={55} y={75} width={34} height={12} fill="#2A1C0A" stroke="#C87840" strokeOpacity={0.45} strokeWidth={1} />
      <rect x={118} y={95} width={24} height={130} fill="#1E1408" stroke="#C87840" strokeOpacity={0.38} strokeWidth={1} />
      <rect x={113} y={90} width={34} height={11} fill="#2A1C0A" stroke="#C87840" strokeOpacity={0.4} strokeWidth={1} />
      {/* Toppled column */}
      <rect x={155} y={148} width={24} height={77} fill="#1A1206" stroke="#C87840" strokeOpacity={0.32} strokeWidth={1} transform="rotate(-12 167 186)" />
      {/* Rubble dots */}
      {[[80,232],[95,228],[112,230],[130,235],[148,228],[165,232],[180,230]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2.5 - i % 2} fill="#3A2A10" fillOpacity={0.7} />
      ))}
      {/* Dashed arc */}
      <path d="M 40,170 Q 130,60 220,170" stroke="#C87840" strokeOpacity={0.25} strokeWidth={1} strokeDasharray="6 4" fill="none" />
      {ring12(130, 130, 124)}
    </svg>
  );
}

export function StoneIllustration() {
  const inner = [0,1,2,3,4,5].map(i => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return { x: 130 + 52 * Math.cos(a), y: 130 + 52 * Math.sin(a) };
  });
  const outer = [0,1,2,3,4,5,6,7,8,9].map(i => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return { x: 130 + 88 * Math.cos(a), y: 130 + 88 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 260 260" width={260} height={260}>
      {outer.map((p, i) => <rect key={i} x={p.x - 7} y={p.y - 5} width={14} height={10} fill="#1A1206" stroke="#A87840" strokeOpacity={0.5} strokeWidth={1} transform={`rotate(${(i/10)*360} ${p.x} ${p.y})`} />)}
      {inner.map((p, i) => <rect key={i} x={p.x - 6} y={p.y - 4} width={12} height={8} fill="#201408" stroke="#A87840" strokeOpacity={0.6} strokeWidth={1} transform={`rotate(${(i/6)*360} ${p.x} ${p.y})`} />)}
      <rect x={122} y={122} width={16} height={16} fill="#2A1C0A" stroke="#C9A84C" strokeOpacity={0.7} strokeWidth={1.5} />
      {/* Compass alignment lines */}
      {[[130,10],[130,250],[10,130],[250,130]].map(([x2,y2],i) => (
        <line key={i} x1={130} y1={130} x2={x2} y2={y2} stroke="#A87840" strokeOpacity={0.15} strokeWidth={0.7} strokeDasharray="4 6" />
      ))}
      <circle cx={130} cy={130} r={4} fill="#C9A84C" fillOpacity={0.6} />
      {ring12(130, 130, 124)}
    </svg>
  );
}

export function CosmosIllustration() {
  return (
    <svg viewBox="0 0 260 260" width={260} height={260}>
      <defs>
        <radialGradient id="cgr" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0EAE0" stopOpacity={0.95} />
          <stop offset="8%" stopColor="#8850C8" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#000" stopOpacity={0} />
        </radialGradient>
      </defs>
      {/* Concentric rings */}
      {[30,55,75,92,108].map((r, i) => (
        <circle key={i} cx={130} cy={130} r={r} fill="none" stroke="#8850C8" strokeOpacity={0.12 + i * 0.06} strokeWidth={0.8} />
      ))}
      {/* Four beam jets */}
      <rect x={126} y={22} width={8} height={85} fill="url(#cgr)" opacity={0.55} rx={4} />
      <rect x={126} y={153} width={8} height={85} fill="url(#cgr)" opacity={0.55} rx={4} transform="rotate(180 130 195.5)" />
      <rect x={22} y={126} width={85} height={8} fill="url(#cgr)" opacity={0.55} rx={4} />
      <rect x={153} y={126} width={85} height={8} fill="url(#cgr)" opacity={0.55} rx={4} transform="rotate(180 195.5 130)" />
      {/* Central star */}
      <circle cx={130} cy={130} r={5} fill="white" fillOpacity={0.95} />
      <circle cx={130} cy={130} r={10} fill="#8850C8" fillOpacity={0.3} />
      {/* Rogue planet */}
      <circle cx={195} cy={188} r={10} fill="#1A0A30" stroke="#8850C8" strokeOpacity={0.4} strokeWidth={1} />
      <ellipse cx={195} cy={188} rx={18} ry={4} fill="none" stroke="#8850C8" strokeOpacity={0.25} strokeWidth={0.8} />
      {ring12(130, 130, 124)}
    </svg>
  );
}

export function PlagueIllustration() {
  const cells = [
    { cx: 100, cy: 120, rx: 28, ry: 22 }, { cx: 162, cy: 118, rx: 24, ry: 28 },
    { cx: 130, cy: 165, rx: 26, ry: 20 }, { cx: 82, cy: 158, rx: 18, ry: 22 },
    { cx: 178, cy: 158, rx: 20, ry: 18 },
  ];
  return (
    <svg viewBox="0 0 260 260" width={260} height={260}>
      <defs>
        <radialGradient id="pgr" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#300808" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#000" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={130} cy={130} r={125} fill="url(#pgr)" />
      {cells.map((c, i) => (
        <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill="#1A0808" fillOpacity={0.75} stroke="#885050" strokeOpacity={0.45} strokeWidth={1.2} />
      ))}
      {[[100,120,162,118],[162,118,130,165],[100,120,82,158],[162,118,178,158],[130,165,82,158]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#885050" strokeOpacity={0.3} strokeWidth={0.8} strokeDasharray="3 3" />
      ))}
      {/* Medical cross */}
      <rect x={124} y={112} width={12} height={36} fill="#885050" fillOpacity={0.5} rx={1} />
      <rect x={112} y={124} width={36} height={12} fill="#885050" fillOpacity={0.5} rx={1} />
      {/* Airborne particles */}
      {[[60,60],[200,55],[55,200],[205,200],[130,40],[40,130],[220,130],[130,220]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={1.5} fill="#885050" fillOpacity={0.45} />
      ))}
      {ring12(130, 130, 124)}
    </svg>
  );
}

export function WingIllustration({ bgType }: { bgType: string }) {
  switch (bgType) {
    case "brain":  return <BrainIllustration />;
    case "ocean":  return <OceanIllustration />;
    case "ruins":  return <RuinsIllustration />;
    case "stone":  return <StoneIllustration />;
    case "cosmos": return <CosmosIllustration />;
    case "plague": return <PlagueIllustration />;
    default:       return <CosmosIllustration />;
  }
}
