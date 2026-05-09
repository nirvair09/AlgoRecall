import React, { useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as RechartsTooltip
} from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import useStore from '../store/useStore';
import { BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const { fetchAnalytics } = useStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAnalytics();
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div></div>;
  if (!data) return <div className="text-center py-20 text-slate-400">No data available yet. Start solving problems!</div>;

  const pieData = [
    { name: 'Easy', value: data.difficultyCounts.Easy, color: '#10b981' },
    { name: 'Medium', value: data.difficultyCounts.Medium, color: '#f59e0b' },
    { name: 'Hard', value: data.difficultyCounts.Hard, color: '#ef4444' },
  ].filter(d => d.value > 0);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Visual Mastery</h1>
        <p className="text-slate-400 mt-2">Your progress, quantified.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pattern Radar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary-500/10 rounded-lg text-primary-400">
              <BarChart3 size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Pattern Radar</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Radar
                  name="Mastery"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Difficulty Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.1 }}
          className="glass p-8 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <PieChartIcon size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Difficulty Split</h2>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Activity Heatmap */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-8 rounded-3xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
            <Activity size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Activity Heatmap</h2>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px]">
            <CalendarHeatmap
              startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
              endDate={new Date()}
              values={data.heatmapData}
              classForValue={(value) => {
                if (!value) return 'color-empty';
                return `color-scale-${Math.min(value.count, 4)}`;
              }}
              tooltipDataAttrs={value => {
                return {
                  'data-tip': `${value.date}: ${value.count} reviews`,
                };
              }}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 text-[10px] text-slate-500 uppercase tracking-widest">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-slate-800 rounded-sm"></div>
            <div className="w-3 h-3 bg-primary-900 rounded-sm"></div>
            <div className="w-3 h-3 bg-primary-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-primary-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-primary-300 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </motion.div>

      <style>{`
        .react-calendar-heatmap .color-empty { fill: #1e293b; }
        .react-calendar-heatmap .color-scale-1 { fill: #312e81; }
        .react-calendar-heatmap .color-scale-2 { fill: #4338ca; }
        .react-calendar-heatmap .color-scale-3 { fill: #4f46e5; }
        .react-calendar-heatmap .color-scale-4 { fill: #6366f1; }
        .react-calendar-heatmap rect { rx: 2px; }
      `}</style>
    </div>
  );
};

export default Analytics;
