/* Shared visual language for the technical graphics in the design:
   faint grid backdrops, animated dashed connectors, labelled node chains,
   layered system maps, and the closing wave field. All pure SVG/CSS so they
   stay light and theme-consistent, and all animation runs through the
   `dc-flow` / `dc-wave` classes that respect prefers-reduced-motion. */

export function GridBackdrop({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  const stroke = tone === "light" ? "rgba(255,255,255,.06)" : "rgba(20,22,26,.05)";
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 700"
    >
      <defs>
        <pattern id="dc-grid" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M72 0H0v72" fill="none" stroke={stroke} strokeWidth="1" />
        </pattern>
        <radialGradient id="dc-grid-mask" cx="70%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id="dc-grid-mask-m">
          <rect width="1440" height="700" fill="url(#dc-grid-mask)" />
        </mask>
      </defs>
      <rect
        width="1440"
        height="700"
        fill="url(#dc-grid)"
        mask="url(#dc-grid-mask-m)"
        opacity="0.6"
      />
    </svg>
  );
}

type FlowNode = { label: string; sub?: string; accent?: boolean };

export function FlowStrip({
  nodes,
  orientation = "horizontal",
  tone = "light",
  className = "",
}: {
  nodes: FlowNode[];
  orientation?: "horizontal" | "vertical";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const line = dark ? "rgba(90,150,255,.55)" : "rgba(47,109,240,.45)";
  const box = dark ? "rgba(255,255,255,.06)" : "#fff";
  const boxStroke = dark ? "rgba(255,255,255,.16)" : "rgba(20,22,26,.1)";
  const text = dark ? "#fff" : "#14161a";
  const subText = dark ? "rgba(255,255,255,.4)" : "#9aa0ab";
  /* The final node reads as the destination — filled blue on a dark panel,
     charcoal on a light one. */
  const accentFill = dark ? "#2f6df0" : "#16181c";

  if (orientation === "vertical") {
    const rowH = 64;
    const h = nodes.length * rowH;
    return (
      <svg
        aria-hidden
        className={className}
        viewBox={`0 0 300 ${h}`}
        width="100%"
        height={h}
      >
        <path
          d={nodes
            .slice(0, -1)
            .map((_, i) => `M150 ${i * rowH + 44}v${rowH - 44 + 4}`)
            .join(" ")}
          stroke={line}
          strokeWidth="1.4"
          strokeDasharray="4 5"
          fill="none"
          className="dc-flow"
        />
        {nodes.map((n, i) => (
          <g key={n.label} fontFamily="Geist, sans-serif" fontSize="13" fontWeight="500">
            <rect
              x="80"
              y={i * rowH + 4}
              width="140"
              height="40"
              rx="13"
              fill={n.accent ? accentFill : box}
              stroke={n.accent ? "none" : boxStroke}
            />
            <text
              x="150"
              y={i * rowH + 29}
              textAnchor="middle"
              fill={n.accent ? "#fff" : text}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  const count = nodes.length;
  const vw = 900;
  const gap = vw / count;
  const boxW = Math.min(104, gap - 46);
  return (
    <svg
      aria-hidden
      className={className}
      viewBox={`0 0 ${vw} 150`}
      width="100%"
      height="150"
    >
      <path
        d={nodes
          .slice(0, -1)
          .map((_, i) => {
            const x = i * gap + (gap + boxW) / 2 + 4;
            return `M${x} 66h${gap - boxW - 8}`;
          })
          .join(" ")}
        stroke={line}
        strokeWidth="1.6"
        strokeDasharray="6 5"
        fill="none"
        className="dc-flow"
      />
      {nodes.map((n, i) => {
        const x = i * gap + (gap - boxW) / 2;
        return (
          <g key={n.label} fontFamily="Geist, sans-serif" fontSize="13" fontWeight="500">
            <rect
              x={x}
              y="44"
              width={boxW}
              height="44"
              rx="14"
              fill={n.accent ? accentFill : box}
              stroke={n.accent ? "none" : boxStroke}
            />
            <text
              x={x + boxW / 2}
              y="70"
              textAnchor="middle"
              fill={n.accent ? "#fff" : text}
            >
              {n.label}
            </text>
            {n.sub ? (
              <text
                x={x + boxW / 2}
                y="118"
                textAnchor="middle"
                fontFamily="var(--font-mono), monospace"
                fontSize="9"
                letterSpacing="1"
                fill={subText}
              >
                {n.sub}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export function LayeredSystem({
  layers,
  className = "",
}: {
  layers: { name: string; nodes: string[]; accent?: boolean }[];
  className?: string;
}) {
  const rowH = 112;
  const h = layers.length * rowH;
  const contentX = 130;
  const contentW = 660;

  // Centre X of node `j` within a layer that has `n` nodes.
  const nodeCenterX = (n: number, j: number) =>
    n === 1
      ? contentX + contentW / 2
      : contentX + j * (contentW / n) + (contentW / n - 8) / 2;

  // Short connectors sitting in the gap between each pair of rows, aligned to
  // the columns of whichever of the two layers has more nodes.
  const connectors: string[] = [];
  for (let i = 0; i < layers.length - 1; i++) {
    const cols = Math.max(layers[i].nodes.length, layers[i + 1].nodes.length);
    const ref =
      layers[i].nodes.length >= layers[i + 1].nodes.length ? layers[i] : layers[i + 1];
    for (let j = 0; j < cols; j++) {
      const x = nodeCenterX(ref.nodes.length, j);
      connectors.push(`M${x} ${i * rowH + 57}v${rowH - 46 - 6}`);
    }
  }

  return (
    <svg
      aria-hidden
      className={className}
      viewBox={`0 0 860 ${h}`}
      width="100%"
      height={h}
    >
      <g
        fontFamily="var(--font-mono), monospace"
        fontSize="9.5"
        letterSpacing="1.2"
        fill="#b0b5be"
      >
        {layers.map((l, i) => (
          <text key={l.name} x="0" y={i * rowH + 34}>
            {l.name.toUpperCase()}
          </text>
        ))}
      </g>
      <g fontFamily="Geist, sans-serif" fontSize="13" fontWeight="500" fill="#14161a">
        {layers.map((l, i) => {
          const y = i * rowH + 8;
          const single = l.nodes.length === 1;
          const w = single ? contentW : contentW / l.nodes.length - 8;
          return l.nodes.map((node, j) => {
            const x = single ? contentX : contentX + j * (contentW / l.nodes.length);
            return (
              <g key={`${l.name}-${node}`}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height="46"
                  rx="14"
                  fill={l.accent ? "#16181c" : "#fff"}
                  stroke={l.accent ? "none" : "rgba(20,22,26,.1)"}
                />
                <text
                  x={x + w / 2}
                  y={y + 28}
                  textAnchor="middle"
                  fill={l.accent ? "#fff" : "#14161a"}
                >
                  {node}
                </text>
              </g>
            );
          });
        })}
      </g>
      <path
        d={connectors.join(" ")}
        stroke="rgba(47,109,240,.35)"
        strokeWidth="1.3"
        strokeDasharray="4 6"
        fill="none"
        className="dc-flow"
      />
    </svg>
  );
}

export function WaveField({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`dc-wave pointer-events-none absolute inset-x-0 bottom-0 h-[300px] w-[200%] opacity-50 ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 2880 300"
    >
      <path
        d="M0 190 C 240 130, 480 250, 720 190 S 1200 130, 1440 190 S 1920 250, 2160 190 S 2640 130, 2880 190"
        fill="none"
        stroke="rgba(47,109,240,.45)"
        strokeWidth="1.4"
      />
      <path
        d="M0 220 C 240 160, 480 280, 720 220 S 1200 160, 1440 220 S 1920 280, 2160 220 S 2640 160, 2880 220"
        fill="none"
        stroke="rgba(58,190,190,.28)"
        strokeWidth="1.2"
      />
      <path
        d="M0 250 C 240 190, 480 310, 720 250 S 1200 190, 1440 250 S 1920 310, 2160 250 S 2640 190, 2880 250"
        fill="none"
        stroke="rgba(255,255,255,.12)"
        strokeWidth="1"
      />
    </svg>
  );
}
