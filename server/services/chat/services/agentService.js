// import axios from "axios";

// export const askAgent = async (message) => {
//     try
//     {
//         const { data } = await axios.post(`${process.env.AGENT_SERVICE_URL}/chat`, { message });

//         return data.response;
//     }

//     catch (error)
//     {
//         throw new Error("Agent Service Error");
//     }
// };

import axios from "axios";

export const askAgent = async (message) => {
    try {
        console.log("Sending to agent:", message);

        const { data } = await axios.post(
            `${process.env.AGENT_SERVICE_URL}/chat`,
            { message },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 60000,
            }
        );

        console.log("Agent Response:", data);

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.response;
    } catch (err) {
        console.error("Agent Error:", err.response?.data || err.message);
        throw err;
    }
};
