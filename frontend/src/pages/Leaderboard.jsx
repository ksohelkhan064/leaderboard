import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHistoryModal from "../components/UserHistoryModal";
import { FaRegUser } from "react-icons/fa6";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const fetchData = async (period) => {
    try {
      if (activeTab === period) {
        const response = await axios.get(
          `https://leaderboard-dhll.onrender.com/api/user/v1/your-${period}-history`
        );
        // console.log(response.data.data)
        const sortedUsers = response.data.data.sort(
          (a, b) => b.totalPointsAwarded - a.totalPointsAwarded
        );
        setLeaderboardData(sortedUsers);
      }
    } catch (error) {
      setErrorMessage("Error fetching leaderboard data");
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  // Function to fetch user history
  const fetchUserHistory = async (username) => {
    try {
      const response = await axios.post(
        `https://leaderboard-dhll.onrender.com/api/user/v1/your-history`,
        { username }
      );
      setUserHistory(response.data.data);
      setSelectedUser(username);
      setModalOpen(true);
    } catch (error) {
      setErrorMessage("Error fetching user history");
    }
  };

  const topUsers = leaderboardData.slice(0, 3);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold">Leaderboard</h1>

      <div className="flex justify-center my-4">
        {["daily", "weekly", "monthly"].map((period) => (
          <button
            key={period}
            className={`px-4 py-2 mx-2 rounded-3xl ${
              activeTab === period ? "bg-orange-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(period)}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Top 3 Users Section */}
      <div className="bg-white/80 shadow-md rounded-lg p-6 mb-6 max-w-[950px] mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center">Top 3 Users</h2>
        <div className="flex justify-between">
          {topUsers.length === 0 ? (
            <p>No data available</p>
          ) : (
            topUsers.map((user, index) => (
              <div key={user._id} className="text-center">
                <p className="text-lg font-bold">{user._id}</p>
                <p className="text-orange-500 font-semibold">
                  Prize: {user.Points}{" "}
                  <span className="text-green-500 font-bold">
                    ₹ {user.totalPoints || user.totalPointsAwarded}
                  </span>
                </p>
                <p className="font-semibold">Rank: {index + 1}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* All Users Table */}
      <div className="bg-white/80 shadow-md rounded-lg p-6 max-w-[950px] mx-auto">
        <h2 className="text-xl font-bold mb-10 text-center">All Users</h2>
        {leaderboardData.length === 0 ? (
          <p className="text-center text-gray-600">No data available</p>
        ) : (
          <table className="min-w-full mx-auto text-center">
            <thead>
              <tr>
                <th></th>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Prize</th>
                <th className="px-4 py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td>
                    <FaRegUser className="inline " />
                  </td>
                  <td
                    className="px-4 py-2 cursor-pointer font-semibold"
                    onClick={() => fetchUserHistory(user._id)}
                  >
                    <div className="flex items-center justify-center">
                      <div className="ml-2">
                        {user._id}
                        <div>Rank: {index + 1}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-orange-500 font-semibold">
                    ₹ {user.totalPoints || user.totalPointsAwarded}
                  </td>
                  <td className="px-4 py-2 font-semibold text-green-500">
                    {user.totalPoints || user.totalPointsAwarded}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal to show user history */}
      <UserHistoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${selectedUser}'s History`}
      >
        {userHistory.length === 0 ? (
          <p>No history available</p>
        ) : (
          <ul>
            {userHistory.map((entry, index) => (
              <li key={index} className="mb-2">
                <div>Date: {entry.date}</div>
                <div>Points Awarded: {entry.pointsAwarded}</div>
              </li>
            ))}
          </ul>
        )}
      </UserHistoryModal>

      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Leaderboard;
