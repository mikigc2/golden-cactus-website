import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   Animated Simplex-Noise Gradient Background (WebGL)
   Adapted from aum.money's Three.js shader — rewritten in raw WebGL
   to avoid adding Three.js as a dependency.
   ═══════════════════════════════════════════════════════════════════ */

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform float cornerRadius;
uniform float uSeed;
uniform float uZoom;
uniform float uOffsetX;
uniform float uOffsetY;
uniform float grainIntensity;
uniform float grainSize;
uniform float gradientSize;
uniform float gradientSpeed;
uniform float rotateSpeed;

varying vec2 vUv;

const float PI = 3.14159;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
const vec3 shine = vec3(1.0);

const float INV_289 = 0.00346020761;
vec3 mod289(vec3 x) { return x - floor(x * INV_289) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * INV_289) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * INV_289) * 289.0; }
vec4 permute(vec4 x) { return mod289(x * (34.0 * x + 1.0)); }
vec3 permute(vec3 x) { return mod289(x * (34.0 * x + 1.0)); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float simplex_noise(vec3 v) {
  const vec2 C = vec2(0.166666667, 0.333333333);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - 0.5;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  const float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + (floor(b0) * 2.0 + 1.0).xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + (floor(b1) * 2.0 + 1.0).xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float simplex_noise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m * m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g = vec3(a0.x * x0.x + h.x * x0.y, a0.yz * x12.xz + h.yz * x12.yw);
  return 130.0 * dot(m, g);
}

float smoothstep_c(float t) { return t * t * t * (t * (6.0 * t - 15.0) + 10.0); }
float hash(float n) { return fract(sin(n) * 43758.5453123); }
vec2 hash2(float n) { return fract(sin(vec2(n, n + 1.0)) * vec2(43758.5453123, 22578.1459123)); }

float wave_alpha(float dist, float blur_fac) {
  float v = pow(blur_fac, 1.05);
  v = 1.0 - cos((v * PI) * 0.5);
  v = smoothstep_c(v);
  v = clamp(v, 0.008, 1.0) * 500.0;
  return smoothstep_c(clamp(0.5 + dist / v, 0.0, 1.0));
}

float background_noise(float offset, vec2 seedOffset, float L, vec2 halfRes) {
  float invZoom = 1.0 / uZoom;
  float xBase = (900.0 + vUv.x * iResolution.x - halfRes.x) * invZoom * L;
  float yBase = vUv.y * iResolution.y * invZoom * L * 3.7037037;
  float x = xBase + seedOffset.x * L;
  float y = yBase + seedOffset.y * L * 3.7037037;
  float time = (iTime + offset) * 0.1;
  float sum = 0.5;
  sum += simplex_noise(vec3(x * 1.5 + gradientSpeed * 1.1, y * 1.5, time)) * 0.30;
  sum += simplex_noise(vec3(x * 0.9 - gradientSpeed * 0.6, y * 0.765, time)) * 0.25;
  sum += simplex_noise(vec3(x * 0.6 + gradientSpeed * 0.8, y * 0.42, time)) * 0.20;
  return sum;
}

float calc_blur(float offset, vec2 halfRes) {
  float seedVariation = hash(uSeed + offset + 100.0);
  float time = iTime + offset + seedVariation * 50.0;
  float invZoom = 1.0 / uZoom;
  float x = (900.0 + vUv.x * iResolution.x - halfRes.x) * invZoom * 0.0001;
  float bias_t = sin(iTime * 0.261 + seedVariation * 10.0) * 0.5 + 0.5;
  float blur_fac = mix(-0.17, -0.04, bias_t);
  float blurSeedOffset = hash(uSeed + offset + 200.0) * 100.0;
  float timeF = time * 0.03;
  blur_fac += simplex_noise(vec2(x * 0.60 + timeF + blurSeedOffset, time * 0.049)) * 0.5;
  blur_fac += simplex_noise(vec2(x * 1.30 - timeF * 0.8 + blurSeedOffset, time * 0.07)) * 0.4;
  return clamp((blur_fac + 1.0) * 0.5, 0.0, 1.0);
}

mat2 rotate2D(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float roundedRectangleSDF(vec2 p, vec2 center, vec2 size, float radius) {
  vec2 d = abs(p - center) - size + radius;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
}

vec3 calculateMetallicReflection(float waveAlpha, float blur_fac, float dx, float dy, float invZoom) {
  if (waveAlpha < 0.01) return vec3(0.0);
  vec3 normal = normalize(vec3(-dx, -dy, 1.0));
  float specIntensity = pow(max(reflect(vec3(0.0, 0.0, -1.0), normal).z, 0.0), 32.0);
  float reflectionSeedOffset = hash(uSeed + 300.0) * 20.0;
  float noise = simplex_noise(vec2(vUv.x * 10.0 * invZoom + iTime * 0.5 + reflectionSeedOffset, vUv.y * 5.0 * invZoom)) * 0.3;
  specIntensity = clamp(specIntensity + noise, 0.0, 1.0);
  float sharpness = 1.0 - smoothstep(0.1, 0.8, blur_fac);
  float edgeMask = smoothstep(0.1, 0.3, waveAlpha) * (1.0 - smoothstep(0.7, 0.9, waveAlpha));
  return shine * (specIntensity * sharpness * edgeMask * 0.8);
}

float goldBar_alpha(out float wave_y_out, out float blur_fac_out, vec2 halfRes, float invZoom) {
  float barSize = iResolution.x * 2.0;
  vec2 p = vUv * iResolution.xy;
  vec2 fixedCorner = halfRes + vec2(uOffsetX, uOffsetY) * halfRes;
  vec2 rotatedP = rotate2D(-(iTime * rotateSpeed + uSeed * 2.0)) * ((p - fixedCorner) * invZoom);
  vec2 rectCenter = vec2(barSize * 0.5, -barSize * 0.5);
  vec2 rectSize = vec2(barSize * 0.5);
  float dist = roundedRectangleSDF(rotatedP, rectCenter, rectSize, cornerRadius);
  wave_y_out = dist;
  blur_fac_out = calc_blur(0.0, halfRes);
  return wave_alpha(dist, blur_fac_out);
}

vec3 mapColors(float l) {
  return l < 0.5
    ? mix(uColor1, uColor2, smoothstep(0.0, 0.5, l))
    : mix(uColor2, uColor3, smoothstep(0.5, 1.0, l));
}

void main() {
  float L = 0.00012 + 0.0005 * gradientSize;
  vec2 halfRes = iResolution.xy * 0.5;
  float invZoom = 1.0 / uZoom;
  vec2 pixelPos = vUv * iResolution.xy;
  float lightness = background_noise(-192.4, hash2(uSeed - 192.4) * 1000.0, L, halfRes);
  float wave_y_pixel, blur_fac;
  float waveAlpha = goldBar_alpha(wave_y_pixel, blur_fac, halfRes, invZoom);
  if (waveAlpha > 0.01)
    lightness = mix(lightness, background_noise(0.1, hash2(uSeed + 0.1) * 1000.0, L, halfRes), waveAlpha);
  float dx = dFdx(wave_y_pixel);
  float dy = dFdy(wave_y_pixel);
  float derivMag = abs(dx) + abs(dy);
  float sharp = smoothstep(0.0, 20.0, derivMag);
  vec3 highlight = shine * (sharp * 0.4 * waveAlpha);
  vec3 metallicReflection = calculateMetallicReflection(waveAlpha, blur_fac, dx, dy, invZoom);
  float grainSeed = hash(uSeed + 400.0) * 100.0;
  float grain = simplex_noise(pixelPos * grainSize + iTime * 0.5 + grainSeed);
  lightness = clamp(lightness + (grain - 0.5) * grainIntensity * mix(0.08, 0.03, lightness), 0.0, 1.0);
  gl_FragColor = vec4(clamp(mapColors(lightness) + highlight + metallicReflection, 0.0, 1.0), 1.0);
}
`;

/* ── Green-cactus colour palette ── */
const DEFAULT_COLORS = {
  color1: [0.0, 1.0, 0.0],       // #00FF00 — bright green
  color2: [0.04, 0.04, 0.04],    // #0a0a0a — near black
  color3: [0.0, 0.4, 0.08],      // #006614 — dark forest green
};

interface Props {
  style?: React.CSSProperties;
  className?: string;
  colors?: { color1?: number[]; color2?: number[]; color3?: number[] };
  /** 0-1, dims the shader so overlaid text stays readable */
  dimOverlay?: number;
}

export function ShaderBackground({ style, className, colors, dimOverlay = 0.35 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;     // WebGL not supported — fall back to solid bg

    /* ── Compile shaders ── */
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error("Shader error:", gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    /* ── Fullscreen quad ── */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    /* ── Uniforms ── */
    const u = (name: string) => gl.getUniformLocation(prog, name);
    const seed = Math.random();
    const c = { ...DEFAULT_COLORS, ...colors };

    gl.uniform1f(u("uSeed"), seed);
    gl.uniform1f(u("cornerRadius"), 350);
    gl.uniform1f(u("uZoom"), 1);
    gl.uniform1f(u("uOffsetX"), 0.1);
    gl.uniform1f(u("uOffsetY"), 0.05);
    gl.uniform1f(u("grainSize"), 0.5);
    gl.uniform1f(u("grainIntensity"), 0.35);
    gl.uniform1f(u("gradientSize"), 0.01);
    gl.uniform1f(u("gradientSpeed"), 0);
    gl.uniform1f(u("rotateSpeed"), 0.05);
    gl.uniform3fv(u("uColor1"), c.color1!);
    gl.uniform3fv(u("uColor2"), c.color2!);
    gl.uniform3fv(u("uColor3"), c.color3!);

    const uTime = u("iTime");
    const uRes  = u("iResolution");

    /* ── Resize handler ── */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 1.5);   // cap for perf
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Animate ── */
    const t0 = performance.now() / 1000;
    function frame() {
      gl!.uniform1f(uTime, performance.now() / 1000 - t0);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [colors]);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {dimOverlay > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(10,10,10,${dimOverlay})`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

export default ShaderBackground;
