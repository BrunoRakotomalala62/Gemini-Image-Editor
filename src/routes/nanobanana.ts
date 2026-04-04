import { Router, type IRouter, type Request, type Response } from "express";
import { GoogleGenAI, Modality } from "@google/genai";

const router: IRouter = Router();

if (!process.env.AI_INTEGRATIONS_GEMINI_BASE_URL) {
  throw new Error("AI_INTEGRATIONS_GEMINI_BASE_URL must be set.");
}
if (!process.env.AI_INTEGRATIONS_GEMINI_API_KEY) {
  throw new Error("AI_INTEGRATIONS_GEMINI_API_KEY must be set.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

async function downloadImage(url: string): Promise<{ data: Buffer; mimeType: string }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) {
    throw new Error(`Impossible de télécharger l'image: HTTP ${res.status} depuis ${url}`);
  }
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const mimeType = contentType.split(";")[0].trim();
  const arrayBuffer = await res.arrayBuffer();
  return { data: Buffer.from(arrayBuffer), mimeType };
}

router.get("/nanobanana", async (req: Request, res: Response) => {
  const { prompt, image_url, image_url2 } = req.query as {
    prompt?: string;
    image_url?: string;
    image_url2?: string;
  };

  if (!prompt || !image_url) {
    res.status(400).json({
      error: "Paramètres manquants: prompt et image_url sont requis",
      usage: "GET /api/nanobanana?prompt=PROMPT&image_url=URL1&image_url2=URL2(optionnel)",
      exemple_1image:
        "/api/nanobanana?prompt=Changer+en+rouge+les+vêtements&image_url=https://example.com/photo.jpg",
      exemple_2images:
        "/api/nanobanana?prompt=Mettre+le+vêtement+de+la+photo+1+sur+la+personne+de+la+photo+2&image_url=https://example.com/vetement.jpg&image_url2=https://example.com/personne.jpg",
    });
    return;
  }

  try {
    const hasSecondImage = !!image_url2;
    req.log.info({ image_url, image_url2, prompt, hasSecondImage }, "nanobanana: démarrage");

    const [img1, img2] = await Promise.all([
      downloadImage(image_url),
      hasSecondImage ? downloadImage(image_url2!) : Promise.resolve(null),
    ]);

    req.log.info(
      { img1Size: img1.data.length, img2Size: img2?.data.length ?? 0 },
      "Images téléchargées"
    );

    const parts: object[] = [
      { text: prompt },
      {
        inlineData: {
          mimeType: img1.mimeType,
          data: img1.data.toString("base64"),
        },
      },
    ];

    if (img2) {
      parts.push({
        inlineData: {
          mimeType: img2.mimeType,
          data: img2.data.toString("base64"),
        },
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [{ role: "user", parts }],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const candidate = response.candidates?.[0];
    const responseParts = candidate?.content?.parts ?? [];

    const imagePart = responseParts.find(
      (p: { inlineData?: { data?: string; mimeType?: string } }) => p.inlineData?.data
    );
    const textPart = responseParts.find(
      (p: { text?: string }) => typeof p.text === "string" && p.text.length > 0
    );

    req.log.info(
      { hasImage: !!imagePart, hasText: !!textPart },
      "Réponse Gemini reçue"
    );

    if (imagePart?.inlineData?.data) {
      const outMime = imagePart.inlineData.mimeType || "image/png";
      const imgBuffer = Buffer.from(imagePart.inlineData.data, "base64");
      res.setHeader("Content-Type", outMime);
      if (textPart?.text) {
        res.setHeader("X-Gemini-Text", encodeURIComponent(textPart.text));
      }
      res.send(imgBuffer);
      return;
    }

    res.json({
      success: true,
      text: (textPart as { text?: string })?.text ?? "",
      note: "Gemini a retourné du texte uniquement (pas d'image). Reformulez le prompt pour demander explicitement une modification d'image.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    req.log.error({ err: message }, "nanobanana erreur");
    res.status(500).json({ error: message });
  }
});

export default router;
