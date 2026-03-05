const memberStatusLabels = { online: 'Online', busy: 'Đang bận', offline: 'Ngoại tuyến' }

// === COMPONENT ===
const Main = ({ children }) => {
    return (
        <main className=" h-screen flex-1 overflow-hidden bg-slate-50 px-6 py-6 dark:bg-slate-900/60">
            {/* Nội dung không cuộn, tự động co giãn */}
            <section className="h-full grid gap-6 lg:grid-cols-12">
                {/* Card chính chiếm hết không gian còn lại */}
                <article className="flex flex-col h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800 lg:col-span-12">
                    {/* Để children có thể cuộn riêng nếu cần, hoặc không cuộn */}
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Main