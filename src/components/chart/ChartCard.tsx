import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

type ChartType = 'line' | 'bar';

interface ChartCardProps {
  title: string;
  data: any[];
  dataKey: string;
  xKey: string;
  chartType?: ChartType;
  color?: string;
  height?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  dataKey,
  xKey,
  chartType = 'line',
  color = '#8884d8',
  height = 250,
}) => {
  return (
    <div className="rounded-2xl shadow-md p-4 bg-white m-2">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {chartType === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;