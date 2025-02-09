export const DashboardCard = ({ title, value, icon, className }) => {
    return (
        <div
            className={`
                rounded-xl border bg-white/50 p-6 backdrop-blur-lg transition-all hover:shadow-lg
                ${className}
            `}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="mt-2 text-3xl font-semibold">{value}</h3>
                </div>
                <div className="rounded-full bg-gray-100 p-3">{icon}</div>
            </div>
        </div>
    );
};
