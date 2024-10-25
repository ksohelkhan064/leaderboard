// Continuing src/pages/Home.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/user/v1/get-users"
      );
      // console.log(response)

      const data = response.data;

      // console.log(user)
      if (response.data.success) {
        // Filter out current user and take top 10
        const filteredFriends = data.data
          .filter((friend) => friend._id !== user.data._id)
          .slice(0, 10);
        // console.log(filteredFriends)
        setFriends(filteredFriends);
      } else {
        setError("Failed to fetch friends");
      }
    } catch (err) {
      setError("An error occurred while fetching friends");
    } finally {
      setLoading(false);
    }
  };

  // console.log(friends);

  const handleClaimPoints = async (username) => {
    try {
      const response = await axios.patch(
        `http://localhost:7000/api/user/v1/claim-points/`,
        { username: username }
      );

      if (response.data.success) {
        toast.success(`Points claimed successfully for ${username}`);
        fetchFriends();
      } else {
        setError("Failed to claim points");
      }
    } catch (err) {
      toast.error("An error occurred while claiming points");
      setError("An error occurred while claiming points");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Friends List</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid gap-4">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {friend.firstName} {friend.lastName}
              </h3>
              <p className="text-gray-600">Points: {friend.Points}</p>
            </div>
            <button
              onClick={() => handleClaimPoints(friend.username)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Claim Points
            </button>
          </div>
        ))}
        {friends.length === 0 && (
          <p className="text-center text-gray-600">No friends found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
