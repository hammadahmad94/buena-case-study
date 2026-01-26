const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const extractDataFromPdf = async (fileBuffer) => {
    try {
        let data;
        if (typeof pdf === 'function') {
            data = await pdf(fileBuffer);
        } else if (typeof pdf.default === 'function') {
            data = await pdf.default(fileBuffer);
        } else {
             throw new Error("pdf-parse library not loaded correctly: " + JSON.stringify(pdf));
        }

        const textText = data.text;
        
        const cleanedText = textText.slice(0, 100000);


        const prompt = `
        You are a real estate data extraction expert. I will give you the text of a "Teilungserklärung" (Declaration of Division).
        Extract the following structure in pure JSON format:
        {
            "name": "Suggest a name for the property (e.g. Street Name + Number)",
            "type": "WEG" (Assume WEG if it mentions "Wohnungseigentum", otherwise "MV"),
            "buildings": [
                {
                    "street": "Street name",
                    "number": "House number",
                    "zip": "Zip code (if found, else null)",
                    "city": "City (if found, else null)",
                    "units": [
                        {
                            "type": "Apartment" (or Office/Parking/etc),
                            "number": "Unit number (e.g. 1, 2, 12a)",
                            "floor": "Floor number (integer, 0 for ground)",
                            "rooms": "Number of rooms (float)",
                            "size": "Size in sqm (float)"
                            "coOwnershipShare": "Share (e.g. 52.12 - float)"
                        }
                    ]
                }
            ]
        }

        Rules:
        1. Return ONLY valid JSON. No markdown formatting (no \`\`\`json).
        2. If you can't find a specific value, return null.
        3. Infer the floor if implied (e.g. "Erdgeschoss" = 0, "1. Obergeschoss" = 1).
        
        Input Text:
        ${cleanedText}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error in AI extraction:", JSON.stringify(error, null, 2));
        if (error.respose) {
             console.error("Gemini Response Error:", await error.response.text());
        }
        throw error; // Re-throw original for better debugging
    }
};

module.exports = {
    extractDataFromPdf
};
