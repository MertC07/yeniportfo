async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY || "TEST_KEY";
  console.log("Testing with API Key:", apiKey.substring(0, 8) + "...");

  const models = [
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro"
  ];

  for (const model of models) {
    try {
      console.log(`\n--- Testing model: ${model} ---`);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: "Merhaba" }]
            }
          ]
        })
      });
      console.log("Status:", res.status);
      const text = await res.text();
      console.log("Response:", text.substring(0, 300));
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
}

testGemini();
