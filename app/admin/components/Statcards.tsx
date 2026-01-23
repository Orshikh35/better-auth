// components/StatCards.tsx
type Stats = {
    totalChildren: number;
    approved: number;
    pending: number;
    paid: number;
  };
  
  export default function StatCards({ stats }: { stats: Stats }) {
    return (
      <div className="grid grid-cols-4 gap-6">
        <Card title="Нийт хүүхэд" value={stats.totalChildren} />
        <Card title="Баталгаажсан" value={stats.approved} />
        <Card title="Хүлээгдэж буй" value={stats.pending} />
        <Card title="Төлбөр төлсөн" value={stats.paid} />
      </div>
    );
  }
  
  function Card({ title, value }: { title: string; value: number }) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    );
  }
  