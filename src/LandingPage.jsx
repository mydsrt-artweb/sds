import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

function Sculpture() {
  const group = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float rotationIntensity={0.6} floatIntensity={1}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <torusBufferGeometry args={[1.2, 0.18, 32, 128]} />
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.2}
            color="#7C3AED"
          />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow>
          <torusBufferGeometry args={[0.8, 0.12, 30, 120]} />
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.2}
            color="#06B6D4"
          />
        </mesh>
        <mesh position={[1.6, 0.4, 0.4]}>
          <sphereBufferGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.1}
            color="#F59E0B"
          />
        </mesh>
        <mesh position={[-1.5, -0.2, -0.5]}>
          <sphereBufferGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.1}
            color="#EF4444"
          />
        </mesh>
      </Float>
    </group>
  );
}

function Hero3D() {
  return (
    <div className="w-full h-[60vh] md:h-[72vh] lg:h-[78vh] bg-gradient-to-b from-black/60 via-black/40 to-transparent relative">
      <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Sculpture />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
        />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Visualize your ideas in 3D — fast.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80">
            Modern visuals, interactive components and lightning-fast
            performance. Built for designers and developers.
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthForm({ mode = "login", onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (mode === "login") alert(`Logging in as ${email}`);
    if (mode === "register") alert(`Registering ${name} <${email}>`);
    if (mode === "forgot") alert(`Password reset link sent to ${email}`);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <label className="block">
          <span className="text-sm text-slate-700">Full name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Jane Doe"
          />
        </label>
      )}

      <label className="block">
        <span className="text-sm text-slate-700">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="you@company.com"
        />
      </label>

      {mode !== "forgot" && (
        <label className="block">
          <span className="text-sm text-slate-700">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </label>
      )}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
        >
          {mode === "login"
            ? "Login"
            : mode === "register"
            ? "Create account"
            : "Send reset link"}
        </button>
      </div>
    </form>
  );
}

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  function openAuth(mode = "login") {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center font-bold">
              GLZ
            </div>
            <nav className="hidden md:flex gap-4 items-center text-sm text-white/80">
              <button
                className="hover:underline"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Features
              </button>
              <button
                className="hover:underline"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Pricing
              </button>
              <button
                className="hover:underline"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openAuth("login")}
              className="hidden md:inline-flex px-4 py-2 rounded-md border border-white/10"
            >
              Sign in
            </button>
            <button
              onClick={() => openAuth("register")}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      <div className="h-16" />

      <main>
        <section aria-label="Hero" className="relative overflow-hidden">
          <Hero3D />
        </section>

        <footer className="border-t border-white/5 mt-12 py-8 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} GLZ — Built with WebGL & React
        </footer>
      </main>

      <AnimatePresence>
        {authOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-[min(96vw,540px)] mx-4"
            >
              <div className="backdrop-blur-md bg-black/60 rounded-2xl p-6 border border-white/6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">
                    {authMode === "login"
                      ? "Sign in"
                      : authMode === "register"
                      ? "Create your account"
                      : "Reset password"}
                  </h4>
                  <div className="flex items-center gap-2">
                    {authMode !== "forgot" && (
                      <button
                        onClick={() =>
                          setAuthMode(
                            authMode === "login" ? "register" : "login"
                          )
                        }
                        className="text-sm text-white/70 hover:underline"
                      >
                        {authMode === "login" ? "Register" : "Login"}
                      </button>
                    )}
                    <button
                      onClick={() => setAuthOpen(false)}
                      className="text-white/60"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <AuthForm mode={authMode} onClose={() => setAuthOpen(false)} />
                </div>

                {authMode === "login" && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => setAuthMode("forgot")}
                      className="text-sm text-white/70 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
            <div
              onClick={() => setAuthOpen(false)}
              className="absolute inset-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
      }
