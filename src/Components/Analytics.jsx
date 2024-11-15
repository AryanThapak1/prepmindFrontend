import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BASE_URL from "../utils/Constant";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [chartData, setChartData] = useState(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const fetchAnalyticsData = async () => {
    if (!year || !month) {
      setError("Please select both year and month.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/v1/quiz/analytics`,
        { year, month },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );
      const data = response.data;
      console.log(data);

      if (data.success) {
        const quizzes = data.data;

        // Aggregate data by quizID and calculate average percentage
        const aggregatedData = quizzes.reduce((acc, quiz) => {
          if (!acc[quiz.quizID]) {
            acc[quiz.quizID] = { totalPercentage: 0, count: 0 };
          }
          acc[quiz.quizID].totalPercentage += quiz.percentage;
          acc[quiz.quizID].count += 1;
          return acc;
        }, {});

        const labels = Object.keys(aggregatedData);
        const percentages = labels.map(
          (quizID) => aggregatedData[quizID].totalPercentage / aggregatedData[quizID].count
        );

        // Set chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Average Percentage",
              data: percentages,
              backgroundColor: "rgba(75, 192, 192, 0.7)", // Set a color for the bars
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } else {
        setError("No data found for the given month and year.");
      }
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      if (chartData) {
        setChartData(null); // Reset chart data
      }
    };
  }, [chartData]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Quiz Analytics</h2>

      <div className="mb-4 flex justify-center gap-4">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Month</option>
          {months.map((monthObj) => (
            <option key={monthObj.value} value={monthObj.value}>
              {monthObj.label}
            </option>
          ))}
        </select>

        <button
          onClick={fetchAnalyticsData}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Fetch Data
        </button>
      </div>

      {loading && <div className="text-center">Loading...</div>}

      {error && <div className="text-red-500 text-center">{error}</div>}

      {chartData && !loading && !error && (
        <div className="my-4">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `Quiz Analytics for ${months.find((m) => m.value === parseInt(month))
                    ?.label} ${year}`,
                  font: {
                    size: 18,
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100, // Percentage scale from 0 to 100
                  ticks: {
                    stepSize: 10,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Analytics;
