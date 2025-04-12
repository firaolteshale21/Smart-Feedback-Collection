import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  positive: "#4ade80", // green
  neutral: "#facc15", // yellow
  negative: "#f87171", // red
};

function FeedbackSentimentChart({ feedbacks }) {
  const summary = { positive: 0, neutral: 0, negative: 0 };

  feedbacks.forEach((fb) => {
    const score = fb.sentimentScore;
    if (score === null || score === undefined) return;

    if (score >= 0.4) summary.positive++;
    else if (score <= -0.4) summary.negative++;
    else summary.neutral++;
  });

  const data = [
    { name: "Positive", value: summary.positive, color: COLORS.positive },
    { name: "Neutral", value: summary.neutral, color: COLORS.neutral },
    { name: "Negative", value: summary.negative, color: COLORS.negative },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-10">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        📊 Sentiment Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FeedbackSentimentChart;
