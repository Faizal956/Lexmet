import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Gemini AI Packaging OCR & Compliance Analysis Endpoint
  app.post("/api/analyze-packaging", async (req, res) => {
    try {
      const { productName, brand, manufacturer, imageBase64, category } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback realistic simulation if no API key is provided
        return res.json({
          success: true,
          source: "simulation",
          declarations: [
            { declaration: "Manufacturer / Packer", extractedValue: manufacturer || "ABC Foods Pvt. Ltd.", confidence: 98, status: "Passed", boundingBox: { x: 10, y: 15, w: 40, h: 10 } },
            { declaration: "Net Quantity", extractedValue: "5 kg", confidence: 96, status: "Passed", boundingBox: { x: 60, y: 35, w: 30, h: 12 } },
            { declaration: "Maximum Retail Price (MRP)", extractedValue: "₹420 (Incl. of all taxes)", confidence: 99, status: "Passed", boundingBox: { x: 15, y: 65, w: 35, h: 10 } },
            { declaration: "Packed / Month Year", extractedValue: "08/2026", confidence: 94, status: "Passed", boundingBox: { x: 55, y: 70, w: 35, h: 8 } },
            { declaration: "Consumer Care Details", extractedValue: "1800-425-xxxx | support@abcfoods.in", confidence: 89, status: "Review", boundingBox: { x: 20, y: 85, w: 60, h: 10 } }
          ],
          checksPassed: 18,
          potentialIssues: 1,
          needReview: 1,
          findings: [
            {
              id: "F-01",
              title: "Consumer Care Details",
              explanation: "Consumer care helpline text font size is slightly below mandatory 2mm requirement under Legal Metrology Rules.",
              ruleRef: "LM-PC-Consumer-Care",
              confidence: 89,
              status: "Needs Review",
              evidenceBox: { x: 20, y: 85, w: 60, h: 10 }
            }
          ]
        });
      }

      // Initialize GoogleGenAI with server key
      const ai = new GoogleGenAI({ apiKey });
      
      let imagePart = null;
      if (imageBase64) {
        // Remove data URL prefix if present
        const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
        imagePart = {
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg"
          }
        };
      }

      const prompt = `You are a strict Legal Metrology and packaged commodities compliance inspection officer.
Analyze the provided product packaging image and details (Product: ${productName}, Brand: ${brand}, Manufacturer: ${manufacturer}, Category: ${category}).
Check for mandatory Legal Metrology declarations:
1. Manufacturer / Packer Name and Address
2. Net Quantity
3. Maximum Retail Price (MRP incl. of all taxes)
4. Month and Year of Manufacture / Packing / Import
5. Consumer Care / Grievance Redressal details

Return ONLY a valid JSON object with the following structure (no markdown fences, just pure JSON):
{
  "declarations": [
    { "declaration": "Manufacturer / Packer", "extractedValue": "...", "confidence": 95, "status": "Passed" },
    ...
  ],
  "checksPassed": 18,
  "potentialIssues": 1,
  "needReview": 1,
  "findings": [
    {
      "id": "F-01",
      "title": "...",
      "explanation": "...",
      "ruleRef": "LM-00X",
      "confidence": 90,
      "status": "Needs Review"
    }
  ]
}`;

      const contents = imagePart ? [prompt, imagePart] : [prompt];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
      });

      const textResponse = response.text || "{}";
      // Clean up markdown code blocks if any
      const cleanJson = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(cleanJson);

      res.json({
        success: true,
        source: "gemini",
        ...parsedData
      });

    } catch (err: any) {
      console.error("Gemini analysis error:", err);
      // Fallback response if API fails
      res.json({
        success: true,
        source: "fallback_on_error",
        error: err.message,
        declarations: [
          { declaration: "Manufacturer / Packer", extractedValue: "ABC Foods Pvt. Ltd.", confidence: 97, status: "Passed" },
          { declaration: "Net Quantity", extractedValue: "5 kg", confidence: 95, status: "Passed" },
          { declaration: "Maximum Retail Price (MRP)", extractedValue: "₹420", confidence: 98, status: "Passed" },
          { declaration: "Packed Date", extractedValue: "08/2026", confidence: 92, status: "Passed" },
          { declaration: "Consumer Care", extractedValue: "1800-555-0199", confidence: 85, status: "Review" }
        ],
        checksPassed: 18,
        potentialIssues: 2,
        needReview: 1,
        findings: [
          {
            id: "F-01",
            title: "Consumer Care Details",
            explanation: "Consumer care details are partially obscured or font size is below threshold.",
            ruleRef: "LM-PC-Consumer-Care",
            confidence: 85,
            status: "Needs Review"
          }
        ]
      });
    }
  });

  // Vite middleware setup for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Legal Metrology Server running on http://localhost:${PORT}`);
  });
}

startServer();
