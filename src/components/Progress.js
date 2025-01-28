const fetchProgress = async () => {
  // Set loading state to true before fetching data
  setLoading(true);

  try {
    // Use dynamicUserId, fallback to "ashuc29" if userId is not provided
    const dynamicUserId = userId || "ashuc29";

    // Validate that a valid userId is present
    if (!dynamicUserId) {
      setMessage("User ID is required to fetch progress.");
      setLoading(false);
      return;
    }

    // Make API call to fetch progress data
    const response = await axios.get(
      `https://9emyh9ynxh.execute-api.eu-west-1.amazonaws.com/dev/progress?userId=${dynamicUserId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Log the response for debugging
    console.log("API Response:", response);

    // Check if response contains data
    if (response.status === 200 && response.data) {
      setProgress(response.data); // Update state with progress data
      setMessage(""); // Clear any previous error messages
    } else {
      setMessage("No progress data available."); // Handle case where no data is returned
    }
  } catch (error) {
    // Differentiate between network errors and server-side errors
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Error Response:", error.response);
      setMessage(
        `Error fetching progress: ${
          error.response.data?.error || error.response.statusText
        }`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("No Response:", error.request);
      setMessage("Error: No response from server. Please try again later.");
    } else {
      // Something else happened
      console.error("Request Setup Error:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  } finally {
    // Ensure loading state is reset no matter what
    setLoading(false);
  }
};
