import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound404() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
            <main className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left */}
                <section className="flex flex-col items-start gap-6">
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 shadow-2xl shadow-black/40 transform -rotate-2 border border-white/10">
                        <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg">404</h1>
                        <p className="mt-2 text-lg opacity-90">Trang bạn tìm không tồn tại</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-slate-50">
                            Uh oh — trang thất lạc
                        </h2>
                        <p className="mt-3 text-slate-300">
                            Liên kết có thể đã bị thay đổi hoặc bị xoá. Thử quay lại trang chủ
                            hoặc kiểm tra lại đường dẫn.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-slate-50 font-medium shadow-lg shadow-indigo-900/40 hover:bg-indigo-400 hover:text-white transition"
                            >
                                Về trang chủ
                            </Link>

                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition"
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </section>

                {/* Right SVG */}
                <aside className="flex items-center justify-center">
                    <div className="w-full sm:w-80 md:w-96 bg-slate-900/80 p-6 rounded-2xl shadow-xl shadow-black/50 border border-slate-800">
                        <svg
                            viewBox="0 0 600 400"
                            className="w-full h-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                        >
                            <defs>
                                <linearGradient id="g1" x1="0" x2="1">
                                    <stop offset="0" stopColor="#6366f1" />
                                    <stop offset="1" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>

                            <rect
                                x="0"
                                y="0"
                                width="600"
                                height="400"
                                rx="24"
                                fill="url(#g1)"
                                opacity="0.12"
                            />

                            <g transform="translate(140,100)">
                                <circle cx="160" cy="90" r="64" fill="#020617" opacity="0.95" />
                                <circle cx="160" cy="90" r="56" fill="#0f172a" />
                                <rect
                                    x="208"
                                    y="142"
                                    width="120"
                                    height="14"
                                    rx="7"
                                    transform="rotate(35 208 142)"
                                    fill="#4f46e5"
                                    opacity="0.6"
                                />
                                <text
                                    x="160"
                                    y="100"
                                    fontSize="40"
                                    textAnchor="middle"
                                    fill="#e5e7eb"
                                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                                >
                                    404
                                </text>
                            </g>

                            <g>
                                <rect
                                    x="32"
                                    y="260"
                                    width="120"
                                    height="64"
                                    rx="12"
                                    fill="#020617"
                                    opacity="0.85"
                                />
                                <rect
                                    x="180"
                                    y="240"
                                    width="160"
                                    height="48"
                                    rx="10"
                                    fill="#020617"
                                    opacity="0.8"
                                />
                                <rect
                                    x="360"
                                    y="270"
                                    width="80"
                                    height="38"
                                    rx="8"
                                    fill="#020617"
                                    opacity="0.85"
                                />
                            </g>
                        </svg>
                    </div>
                </aside>
            </main>
        </div>
    );
}
