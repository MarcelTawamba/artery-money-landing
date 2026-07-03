"use client";

import { useEffect, useRef } from "react";
import { ArteryMark } from "./Logo";
import { IconBank, IconCard, IconCash, IconCheck } from "./icons";

type Point = { x: number; y: number };
type RailKey = "cash" | "card" | "bank";

type Transaction = {
  rail: RailKey;
  label: string;
  zar: number;
  feePct: number;
  rate: number;
};

const STEP_LABELS = ["Collected", "Fee", "FX conversion", "Net settled"];

const pt = (x: number, y: number): Point => ({ x, y });
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

function cubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

/** Catmull-Rom-ish spline through control points, flattened to a lookup-able polyline. */
function chain(points: Point[]) {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || points[i + 1];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    const steps = 24;
    for (let j = i === 0 ? 0 : 1; j <= steps; j++) {
      out.push(cubic(p1, c1, c2, p2, j / steps));
    }
  }
  const len = [0];
  for (let i = 1; i < out.length; i++) len[i] = len[i - 1] + dist(out[i - 1], out[i]);
  return { pts: out, len, total: len[len.length - 1] || 1 };
}

type FlatPath = ReturnType<typeof chain>;

function at(fp: FlatPath, t: number): Point {
  const d = t * fp.total;
  let lo = 0;
  let hi = fp.len.length - 1;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (fp.len[m] < d) lo = m + 1;
    else hi = m;
  }
  const i = Math.max(1, lo);
  const seg = fp.len[i] - fp.len[i - 1] || 1;
  const k = (d - fp.len[i - 1]) / seg;
  return { x: lerp(fp.pts[i - 1].x, fp.pts[i].x, k), y: lerp(fp.pts[i - 1].y, fp.pts[i].y, k) };
}

const HUB = pt(432, 180);
const SETTLE_NODE = pt(845, 180);

const RAILS: Record<RailKey, FlatPath> = {
  cash: chain([pt(92, 65), pt(180, 78), pt(300, 150), pt(432, 180)]),
  card: chain([pt(92, 180), pt(230, 180), pt(330, 180), pt(432, 180)]),
  bank: chain([pt(92, 295), pt(180, 282), pt(300, 210), pt(432, 180)]),
};
const SETTLE_PATH = chain([pt(432, 180), pt(560, 180), pt(700, 180), pt(845, 180)]);

const TRANSACTIONS: Transaction[] = [
  { rail: "cash", label: "Cash · 90k pts", zar: 1200, feePct: 0.025, rate: 18.7 },
  { rail: "card", label: "Card", zar: 450, feePct: 0.029, rate: 18.72 },
  { rail: "bank", label: "Bank app", zar: 3500, feePct: 0.018, rate: 18.68 },
  { rail: "cash", label: "Cash · 90k pts", zar: 780, feePct: 0.025, rate: 18.71 },
  { rail: "bank", label: "Bank app", zar: 1650, feePct: 0.018, rate: 18.69 },
];

const SEED_TRANSACTIONS: Pick<Transaction, "zar" | "feePct" | "rate">[] = [
  { zar: 920, feePct: 0.025, rate: 18.71 },
  { zar: 2100, feePct: 0.018, rate: 18.69 },
];

const fmtZAR = (n: number) => "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtUSD = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function settle(t: Pick<Transaction, "zar" | "feePct" | "rate">) {
  const fee = t.zar * t.feePct;
  const net = t.zar - fee;
  return { fee, net, usd: net / t.rate };
}

const ease = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

// Cycle phases in seconds, within one full loop.
const PHASE = { rail: [0.22, 1.55], hold: [1.55, 2.85], settle: [2.85, 4.15], lit: [4.15, 4.55] };

const LEDGER_CHECK =
  '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>';

function makeSprite(stops: [number, string][], size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d")!;
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  stops.forEach(([offset, color]) => grad.addColorStop(offset, color));
  g.fillStyle = grad;
  g.beginPath();
  g.arc(r, r, r, 0, Math.PI * 2 + 0.1);
  g.fill();
  return canvas;
}

export default function SettlementFlow({ cycleSeconds = 5.6 }: { cycleSeconds?: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipRefs = useRef<Record<RailKey, HTMLDivElement | null>>({ cash: null, card: null, bank: null });
  const hubcoreRef = useRef<HTMLDivElement>(null);
  const scardRef = useRef<HTMLDivElement>(null);
  const sbalRef = useRef<HTMLDivElement>(null);
  const totRef = useRef<HTMLSpanElement>(null);
  const railLabelRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ledgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    const ledger = ledgerRef.current;
    const totEl = totRef.current;
    const sbalEl = sbalRef.current;
    const railLabelEl = railLabelRef.current;
    const hubcore = hubcoreRef.current;
    const scard = scardRef.current;
    if (!stage || !svg || !canvas || !ledger || !totEl || !sbalEl || !railLabelEl || !hubcore || !scard) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const GLOW = makeSprite(
      [
        [0, "rgba(255,150,160,.95)"],
        [0.25, "rgba(232,51,74,.8)"],
        [0.55, "rgba(232,51,74,.3)"],
        [1, "rgba(232,51,74,0)"],
      ],
      64,
    );
    const HEAD = makeSprite(
      [
        [0, "rgba(255,255,255,.95)"],
        [0.3, "rgba(255,140,150,.9)"],
        [1, "rgba(255,107,122,0)"],
      ],
      40,
    );
    const TEAL = makeSprite(
      [
        [0, "rgba(210,255,250,.95)"],
        [0.3, "rgba(78,205,196,.85)"],
        [1, "rgba(78,205,196,0)"],
      ],
      90,
    );

    let scale = { x: 1, y: 1 };
    let dpr = 1;
    let raf = 0;
    let t0 = 0;
    let lastT = 99;
    let cur: Transaction | null = null;
    let appended = false;
    let trail: Point[] = [];
    const flashes: { x: number; y: number; t: number }[] = [];
    let txi = 0;
    let seeded = false;

    const sx = (x: number) => x * scale.x;
    const sy = (y: number) => y * scale.y;

    function resize() {
      const r = stage!.getBoundingClientRect();
      if (r.width < 2) return false;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = r.width * dpr;
      canvas!.height = r.height * dpr;
      scale = { x: r.width / 960, y: r.height / 360 };
      return true;
    }

    function paintRails() {
      const railColor = "rgba(232,51,74,.22)";
      const settleColor = "rgba(78,205,196,.30)";
      const d = (fp: FlatPath) => {
        let s = "M" + fp.pts[0].x + " " + fp.pts[0].y;
        for (let i = 1; i < fp.pts.length; i++) s += " L" + fp.pts[i].x + " " + fp.pts[i].y;
        return s;
      };
      svg!.innerHTML =
        (["cash", "card", "bank"] as RailKey[])
          .map((k) => `<path d="${d(RAILS[k])}" fill="none" stroke="${railColor}" stroke-width="2.4" stroke-linecap="round"/>`)
          .join("") +
        `<path d="${d(SETTLE_PATH)}" fill="none" stroke="${settleColor}" stroke-width="2.4" stroke-dasharray="2 7" stroke-linecap="round"/>`;
    }

    function resetSteps() {
      stepRefs.current.forEach((s) => s?.classList.remove("flow-on", "flow-done"));
      valueRefs.current.forEach((v) => {
        if (v) v.textContent = "—";
      });
      pillRefs.current.forEach((p) => p?.classList.remove("flow-ok"));
    }
    const setStep = (i: number, v: string) => {
      stepRefs.current[i]?.classList.add("flow-on");
      if (valueRefs.current[i]) valueRefs.current[i]!.textContent = v;
    };
    const doneStep = (i: number) => stepRefs.current[i]?.classList.add("flow-done");

    // Total is the rolling sum of the (max 5) visible ledger rows — bounded, always reconciles.
    function refreshTotal() {
      let sum = 0;
      [...ledger!.children].forEach((row) => {
        sum += parseFloat((row as HTMLElement).dataset.usd || "0");
      });
      totEl!.textContent = fmtUSD(sum);
      sbalEl!.textContent = fmtUSD(sum);
    }

    function appendLedger(t: Pick<Transaction, "zar" | "rate">, c: { usd: number }) {
      const id = "tx_" + Math.random().toString(36).slice(2, 8);
      const row = document.createElement("div");
      row.className = "flow-lrow flow-fresh";
      row.dataset.usd = String(c.usd);
      row.innerHTML =
        `<div class="flow-lid">${id}</div>` +
        `<div class="flow-lamt">${fmtUSD(c.usd)}</div>` +
        `<div class="flow-lconv">${fmtZAR(t.zar)} · @${t.rate.toFixed(2)}</div>` +
        `<div class="flow-lstat">${LEDGER_CHECK}T+2</div>`;
      ledger!.prepend(row);
      while (ledger!.children.length > 5) ledger!.removeChild(ledger!.lastChild!);
      refreshTotal();
    }

    function seed() {
      if (seeded) return;
      seeded = true;
      SEED_TRANSACTIONS.forEach((t) => appendLedger(t, settle(t)));
      [...ledger!.children].forEach((r) => r.classList.remove("flow-fresh"));
    }

    function newCycle() {
      cur = TRANSACTIONS[txi % TRANSACTIONS.length];
      txi++;
      appended = false;
      trail = [];
      resetSteps();
      (Object.keys(chipRefs.current) as RailKey[]).forEach((k) => chipRefs.current[k]?.classList.remove("flow-hot"));
      chipRefs.current[cur.rail]?.classList.add("flow-hot");
      railLabelEl!.textContent = cur.label;
    }

    function draw(tsec: number, now: number) {
      const c = settle(cur!);
      if (tsec >= PHASE.hold[0]) setStep(0, fmtZAR(cur!.zar));
      if (tsec >= PHASE.hold[0] + 0.28) {
        setStep(1, "−" + fmtZAR(c.fee) + " (" + (cur!.feePct * 100).toFixed(1) + "%)");
        doneStep(0);
      }
      if (tsec >= PHASE.hold[0] + 0.56) {
        setStep(2, "@ " + cur!.rate.toFixed(2));
        doneStep(1);
        pillRefs.current[0]?.classList.add("flow-ok");
      }
      if (tsec >= PHASE.hold[0] + 0.84) {
        setStep(3, fmtUSD(c.usd));
        doneStep(2);
        pillRefs.current[1]?.classList.add("flow-ok");
        pillRefs.current[2]?.classList.add("flow-ok");
      }
      if (tsec >= PHASE.hold[1] - 0.1) doneStep(3);

      hubcore!.classList.toggle("flow-beat", tsec >= PHASE.rail[1] - 0.15 && tsec <= PHASE.hold[1]);

      if (tsec >= PHASE.lit[0]) {
        scard!.classList.add("flow-lit");
        if (!appended) {
          appended = true;
          appendLedger(cur!, c);
          flashes.push({ x: SETTLE_NODE.x, y: SETTLE_NODE.y, t: 0 });
        }
      } else {
        scard!.classList.remove("flow-lit");
      }

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "lighter";

      let pos: Point | null = null;
      let showHead = true;
      let atHub = false;
      if (tsec >= PHASE.rail[0] && tsec < PHASE.rail[1]) {
        pos = at(RAILS[cur!.rail], ease((tsec - PHASE.rail[0]) / (PHASE.rail[1] - PHASE.rail[0])));
      } else if (tsec >= PHASE.rail[1] && tsec < PHASE.settle[0]) {
        pos = HUB;
        atHub = true;
      } else if (tsec >= PHASE.settle[0] && tsec < PHASE.settle[1]) {
        pos = at(SETTLE_PATH, ease((tsec - PHASE.settle[0]) / (PHASE.settle[1] - PHASE.settle[0])));
      } else if (tsec >= PHASE.settle[1]) {
        pos = SETTLE_NODE;
        showHead = tsec < PHASE.lit[1] + 0.2;
      } else {
        showHead = false;
      }

      if (pos && showHead) {
        trail.unshift({ x: pos.x, y: pos.y });
        if (trail.length > 7) trail.pop();
        for (let i = trail.length - 1; i >= 1; i--) {
          const tp = trail[i];
          const a = (1 - i / 8) * 0.4;
          const s = (11 - i) * 1.4;
          ctx!.globalAlpha = a;
          ctx!.drawImage(GLOW, sx(tp.x) - s, sy(tp.y) - s, s * 2, s * 2);
        }
        const pulse = atHub ? 1 + 0.25 * Math.sin(now / 90) : 1;
        const g = 15 * pulse;
        ctx!.globalAlpha = 0.85;
        ctx!.drawImage(GLOW, sx(pos.x) - g, sy(pos.y) - g, g * 2, g * 2);
        ctx!.globalAlpha = 0.95;
        ctx!.drawImage(HEAD, sx(pos.x) - 7, sy(pos.y) - 7, 14, 14);
      }

      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.t += 1 / 60;
        const k = f.t / 0.7;
        if (k >= 1) {
          flashes.splice(i, 1);
          continue;
        }
        const s = 16 + k * 40;
        ctx!.globalAlpha = (1 - k) * 0.9;
        ctx!.drawImage(TEAL, sx(f.x) - s, sy(f.y) - s, s * 2, s * 2);
      }
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";
    }

    function frame(now: number) {
      const tsec = ((now - t0) / 1000) % cycleSeconds;
      if (tsec < lastT) newCycle();
      lastT = tsec;
      if (!cur) newCycle();
      draw(tsec, now);
      raf = requestAnimationFrame(frame);
    }

    function build() {
      if (!resize()) return;
      paintRails();
    }

    function staticState() {
      newCycle();
      const c = settle(cur!);
      setStep(0, fmtZAR(cur!.zar));
      doneStep(0);
      setStep(1, "−" + fmtZAR(c.fee));
      doneStep(1);
      setStep(2, "@ " + cur!.rate.toFixed(2));
      doneStep(2);
      setStep(3, fmtUSD(c.usd));
      doneStep(3);
      pillRefs.current.forEach((p) => p?.classList.add("flow-ok"));
      scard!.classList.add("flow-lit");
      appendLedger(cur!, c);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalAlpha = 0.9;
      ctx!.drawImage(TEAL, sx(SETTLE_NODE.x) - 30, sy(SETTLE_NODE.y) - 30, 60, 60);
    }

    function start() {
      seed();
      if (reduceMotion) {
        build();
        staticState();
        return;
      }
      if (raf) return;
      t0 = performance.now();
      lastT = 99;
      cur = null;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    build();
    start();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 220);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [cycleSeconds]);

  return (
    <div className="flow-wrap">
      <div className="flow">
        <div className="flow-eyebrow">
          Live settlement flow <span className="flow-ill">· illustrative</span>
        </div>
        <div className="flow-stage" ref={stageRef}>
          <svg ref={svgRef} className="flow-rails" viewBox="0 0 960 360" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" />
          <canvas ref={canvasRef} className="flow-canvas" />

          <div className="flow-chip" data-rail="cash" style={{ left: "9.5%", top: "18%" }} ref={(el) => { chipRefs.current.cash = el; }}>
            <div className="flow-ico"><IconCash /></div>
            <div className="flow-ct">
              <span className="flow-ck">Rail</span>
              <span className="flow-cn">Cash · 90k pts</span>
            </div>
          </div>
          <div className="flow-chip" data-rail="card" style={{ left: "9.5%", top: "50%" }} ref={(el) => { chipRefs.current.card = el; }}>
            <div className="flow-ico"><IconCard /></div>
            <div className="flow-ct">
              <span className="flow-ck">Rail</span>
              <span className="flow-cn">Card</span>
            </div>
          </div>
          <div className="flow-chip" data-rail="bank" style={{ left: "9.5%", top: "82%" }} ref={(el) => { chipRefs.current.bank = el; }}>
            <div className="flow-ico"><IconBank /></div>
            <div className="flow-ct">
              <span className="flow-ck">Rail</span>
              <span className="flow-cn">Bank app</span>
            </div>
          </div>

          <div className="flow-hub" style={{ left: "45%", top: "50%" }}>
            <div className="flow-hubcore" ref={hubcoreRef}>
              <ArteryMark width={46} height={46} />
            </div>
            <div className="flow-hublabel">Artery Core</div>
          </div>

          <div className="flow-settle" style={{ left: "88%", top: "50%" }}>
            <div className="flow-scard" ref={scardRef}>
              <div className="flow-sk">Settlement · USDC</div>
              <div className="flow-sbal" ref={sbalRef}>$0.00</div>
              <div className="flow-ssub">Available T+2</div>
            </div>
          </div>
        </div>

        <div className="flow-readouts">
          <div className="flow-ro">
            <div className="flow-ro-h">
              <span>Processing</span>
              <span ref={railLabelRef}>—</span>
            </div>
            {STEP_LABELS.map((label, i) => (
              <div className="flow-step" key={label} ref={(el) => { stepRefs.current[i] = el; }}>
                <div className="flow-sd">
                  <IconCheck width={9} height={9} strokeWidth={4} />
                </div>
                <span className="flow-sl">{label}</span>
                <span className="flow-sv" ref={(el) => { valueRefs.current[i] = el; }}>—</span>
              </div>
            ))}
            <div className="flow-compliance">
              {["KYC", "Sanctions", "AML"].map((label, i) => (
                <span className="flow-cpill" key={label} ref={(el) => { pillRefs.current[i] = el; }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="flow-ro">
            <div className="flow-ro-h">
              <span>Settlement ledger</span>
              <span>
                Settled <span className="flow-tot" ref={totRef}>$0.00</span>
              </span>
            </div>
            <div className="flow-ledger" ref={ledgerRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
