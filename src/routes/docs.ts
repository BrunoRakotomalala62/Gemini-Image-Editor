import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

router.get("/", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gemini Image API — Documentation</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: #0f0f1a;
      color: #e2e8f0;
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container { max-width: 860px; margin: 0 auto; }

    header {
      text-align: center;
      margin-bottom: 48px;
    }
    header .badge {
      display: inline-block;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 4px 14px;
      border-radius: 999px;
      margin-bottom: 16px;
    }
    header h1 {
      font-size: 2.4rem;
      font-weight: 800;
      background: linear-gradient(135deg, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    header p {
      color: #94a3b8;
      font-size: 1.05rem;
    }

    .card {
      background: #1e1e30;
      border: 1px solid #2d2d45;
      border-radius: 16px;
      padding: 28px 32px;
      margin-bottom: 24px;
    }
    .card h2 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #a5b4fc;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card h2 .icon { font-size: 1.3rem; }

    .endpoint {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #12121f;
      border: 1px solid #2d2d45;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .method {
      background: #22c55e20;
      color: #4ade80;
      font-weight: 700;
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 6px;
      letter-spacing: 1px;
      flex-shrink: 0;
    }
    .path {
      font-family: 'Courier New', monospace;
      font-size: 0.95rem;
      color: #e2e8f0;
      word-break: break-all;
    }

    table { width: 100%; border-collapse: collapse; }
    th {
      text-align: left;
      padding: 10px 14px;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      border-bottom: 1px solid #2d2d45;
    }
    td {
      padding: 12px 14px;
      border-bottom: 1px solid #1a1a2e;
      font-size: 0.9rem;
      vertical-align: top;
    }
    td:first-child {
      font-family: 'Courier New', monospace;
      color: #c084fc;
      white-space: nowrap;
    }
    td.required { color: #f87171; font-size: 0.78rem; font-weight: 600; }
    td.optional { color: #94a3b8; font-size: 0.78rem; }

    .code-block {
      background: #12121f;
      border: 1px solid #2d2d45;
      border-radius: 10px;
      padding: 18px 20px;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      color: #a5b4fc;
      overflow-x: auto;
      white-space: pre;
      margin-top: 12px;
      line-height: 1.7;
    }
    .comment { color: #4a4a6a; }
    .string { color: #86efac; }
    .keyword { color: #f472b6; }
    .url { color: #67e8f9; }

    .response-type {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #0f172a;
      border: 1px solid #2d2d45;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.82rem;
      color: #94a3b8;
      margin-top: 8px;
      margin-right: 8px;
    }
    .response-type .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #4ade80;
      flex-shrink: 0;
    }
    .response-type .dot.blue { background: #60a5fa; }
    .response-type .dot.red { background: #f87171; }

    .try-section label {
      display: block;
      font-size: 0.82rem;
      color: #94a3b8;
      margin-bottom: 6px;
      margin-top: 14px;
    }
    .try-section input, .try-section textarea {
      width: 100%;
      background: #12121f;
      border: 1px solid #2d2d45;
      border-radius: 8px;
      color: #e2e8f0;
      padding: 10px 14px;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .try-section input:focus, .try-section textarea:focus {
      border-color: #6366f1;
    }
    .try-section textarea { resize: vertical; min-height: 60px; }

    .img2-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 14px;
      cursor: pointer;
      user-select: none;
      font-size: 0.88rem;
      color: #94a3b8;
    }
    .img2-toggle input[type=checkbox] { accent-color: #6366f1; width: 16px; height: 16px; cursor: pointer; }
    #img2-section { display: none; }

    .tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .tab {
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #2d2d45;
      background: #12121f;
      color: #64748b;
      transition: all 0.2s;
    }
    .tab.active {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      border-color: transparent;
    }

    .btn {
      margin-top: 16px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      border: none;
      border-radius: 10px;
      padding: 12px 28px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
      width: 100%;
    }
    .btn:hover { opacity: 0.85; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }

    #result-area { margin-top: 20px; display: none; }
    .preview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
    .preview-grid .preview-box { text-align: center; }
    .preview-grid img { width: 100%; border-radius: 8px; border: 1px solid #2d2d45; }
    .preview-grid .lbl { font-size: 0.75rem; color: #64748b; margin-top: 4px; }
    #result-img {
      width: 100%;
      border-radius: 12px;
      border: 1px solid #2d2d45;
      margin-top: 10px;
    }
    #result-text {
      background: #12121f;
      border: 1px solid #2d2d45;
      border-radius: 10px;
      padding: 14px;
      font-size: 0.88rem;
      color: #94a3b8;
      margin-top: 10px;
      white-space: pre-wrap;
      display: none;
    }
    #status-msg {
      font-size: 0.88rem;
      padding: 10px 14px;
      border-radius: 8px;
      margin-top: 12px;
    }
    .status-loading { background: #1e293b; color: #94a3b8; }
    .status-ok { background: #14532d40; color: #4ade80; }
    .status-err { background: #7f1d1d40; color: #f87171; }

    footer {
      text-align: center;
      color: #334155;
      font-size: 0.82rem;
      margin-top: 48px;
    }
  </style>
</head>
<body>
<div class="container">

  <header>
    <div class="badge">⚡ Powered by Gemini 2.5</div>
    <h1>Image Editing API</h1>
    <p>Modifiez ou combinez des images avec un simple prompt en langage naturel</p>
  </header>

  <!-- Endpoints -->
  <div class="card">
    <h2><span class="icon">🔗</span> Endpoints</h2>
    <div class="endpoint">
      <span class="method">GET</span>
      <span class="path">/api/nanobanana?prompt=...&amp;image_url=...&amp;image_url2=...(optionnel)</span>
    </div>
    <div class="endpoint">
      <span class="method">GET</span>
      <span class="path">/api/healthz</span>
    </div>
  </div>

  <!-- Paramètres -->
  <div class="card">
    <h2><span class="icon">📋</span> Paramètres — <code style="font-size:0.9rem;color:#c084fc">/api/nanobanana</code></h2>
    <table>
      <thead>
        <tr>
          <th>Paramètre</th>
          <th>Type</th>
          <th>Requis</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>prompt</td>
          <td>string</td>
          <td class="required">Requis</td>
          <td>Instruction de modification en langage naturel</td>
        </tr>
        <tr>
          <td>image_url</td>
          <td>string</td>
          <td class="required">Requis</td>
          <td>URL de la première image source (JPEG, PNG, WebP)</td>
        </tr>
        <tr>
          <td>image_url2</td>
          <td>string</td>
          <td class="optional">Optionnel</td>
          <td>URL d'une deuxième image — permet de combiner deux images (ex: prendre la personne d'une photo et la mettre dans l'autre)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Réponses -->
  <div class="card">
    <h2><span class="icon">📤</span> Réponses</h2>
    <span class="response-type"><span class="dot"></span>200 — Image binaire (image/png ou image/jpeg)</span>
    <span class="response-type"><span class="dot blue"></span>200 JSON — Texte uniquement si pas d'image générée</span>
    <span class="response-type"><span class="dot red"></span>400 — Paramètres manquants</span>
    <span class="response-type"><span class="dot red"></span>500 — Erreur serveur</span>
  </div>

  <!-- Exemples -->
  <div class="card">
    <h2><span class="icon">💡</span> Exemples d'utilisation</h2>

    <div class="tabs">
      <div class="tab active" onclick="showTab('one')">1 image</div>
      <div class="tab" onclick="showTab('two')">2 images</div>
    </div>

    <div id="tab-one">
      <div class="code-block"><span class="comment"># Changer la couleur des vêtements</span>
<span class="keyword">GET</span> <span class="url">/api/nanobanana</span>?prompt=<span class="string">Changer en rouge tous les vêtements</span>
  &image_url=<span class="string">https://example.com/photo.jpg</span>

<span class="comment"># Ajouter des accessoires</span>
<span class="keyword">GET</span> <span class="url">/api/nanobanana</span>?prompt=<span class="string">Add sunglasses and a red hat</span>
  &image_url=<span class="string">https://example.com/photo.jpg</span></div>
    </div>

    <div id="tab-two" style="display:none">
      <div class="code-block"><span class="comment"># Mettre la personne de photo1 à côté de la personne de photo2</span>
<span class="keyword">GET</span> <span class="url">/api/nanobanana</span>?prompt=<span class="string">Place the person from image 1 next to the person in image 2</span>
  &image_url=<span class="string">https://example.com/personne1.jpg</span>
  &image_url2=<span class="string">https://example.com/personne2.jpg</span>

<span class="comment"># Habiller la personne de photo2 avec les vêtements de photo1</span>
<span class="keyword">GET</span> <span class="url">/api/nanobanana</span>?prompt=<span class="string">Dress the person in image 2 with the outfit shown in image 1</span>
  &image_url=<span class="string">https://example.com/vetements.jpg</span>
  &image_url2=<span class="string">https://example.com/personne.jpg</span></div>
    </div>
  </div>

  <!-- Testeur interactif -->
  <div class="card try-section">
    <h2><span class="icon">🧪</span> Tester en direct</h2>

    <label>Prompt de modification</label>
    <textarea id="inp-prompt" placeholder="Ex: Dress the person in image 2 with the outfit from image 1">Make this dog wear a red party hat and sunglasses</textarea>

    <label>URL de l'image 1</label>
    <input id="inp-url" type="url" placeholder="https://..." value="https://picsum.photos/id/237/400/400" />

    <label class="img2-toggle">
      <input type="checkbox" id="chk-img2" onchange="toggleImg2()" />
      Ajouter une deuxième image (fusion / combinaison)
    </label>

    <div id="img2-section">
      <label style="margin-top:12px">URL de l'image 2</label>
      <input id="inp-url2" type="url" placeholder="https://..." value="" />
    </div>

    <div id="preview-area" style="display:none; margin-top:14px" class="preview-grid">
      <div class="preview-box">
        <img id="prev-img1" src="" alt="Image 1" />
        <div class="lbl">Image 1</div>
      </div>
      <div class="preview-box" id="prev2-wrap" style="display:none">
        <img id="prev-img2" src="" alt="Image 2" />
        <div class="lbl">Image 2</div>
      </div>
    </div>

    <button class="btn" id="btn-test" onclick="runTest()">▶ Envoyer à Gemini</button>

    <div id="status-msg" style="display:none"></div>
    <div id="result-area">
      <img id="result-img" alt="Résultat Gemini" style="display:none" />
      <pre id="result-text"></pre>
    </div>
  </div>

  <footer>Gemini Image Editing API &mdash; Powered by Google Gemini 2.5 Flash Image via Replit AI Integrations</footer>
</div>

<script>
function showTab(tab) {
  document.getElementById('tab-one').style.display = tab === 'one' ? '' : 'none';
  document.getElementById('tab-two').style.display = tab === 'two' ? '' : 'none';
  document.querySelectorAll('.tab').forEach((el, i) => {
    el.classList.toggle('active', (tab === 'one' && i === 0) || (tab === 'two' && i === 1));
  });
}

function toggleImg2() {
  const checked = document.getElementById('chk-img2').checked;
  document.getElementById('img2-section').style.display = checked ? '' : 'none';
  document.getElementById('prev2-wrap').style.display = checked ? '' : 'none';
  if (!checked) {
    document.getElementById('inp-prompt').value = 'Make this dog wear a red party hat and sunglasses';
  } else {
    document.getElementById('inp-prompt').value = 'Dress the person in image 2 with the outfit shown in image 1';
    document.getElementById('inp-url').value = 'https://picsum.photos/id/64/400/400';
    document.getElementById('inp-url2').value = 'https://picsum.photos/id/237/400/400';
    updatePreviews();
  }
}

function updatePreviews() {
  const url1 = document.getElementById('inp-url').value.trim();
  const url2 = document.getElementById('inp-url2').value.trim();
  const hasImg2 = document.getElementById('chk-img2').checked;
  if (url1) {
    document.getElementById('prev-img1').src = url1;
    document.getElementById('preview-area').style.display = '';
  }
  if (hasImg2 && url2) {
    document.getElementById('prev-img2').src = url2;
    document.getElementById('prev2-wrap').style.display = '';
  }
}

document.getElementById('inp-url').addEventListener('change', updatePreviews);
document.getElementById('inp-url2').addEventListener('change', updatePreviews);
updatePreviews();

async function runTest() {
  const url = document.getElementById('inp-url').value.trim();
  const url2 = document.getElementById('inp-url2').value.trim();
  const prompt = document.getElementById('inp-prompt').value.trim();
  const hasImg2 = document.getElementById('chk-img2').checked;
  const btn = document.getElementById('btn-test');
  const statusEl = document.getElementById('status-msg');
  const resultArea = document.getElementById('result-area');
  const resultImg = document.getElementById('result-img');
  const resultText = document.getElementById('result-text');

  if (!url || !prompt) {
    alert("Veuillez remplir l'URL et le prompt.");
    return;
  }
  if (hasImg2 && !url2) {
    alert("Veuillez remplir l'URL de la deuxième image.");
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ Traitement en cours…';
  statusEl.style.display = 'block';
  statusEl.className = 'status-msg status-loading';
  statusEl.textContent = hasImg2
    ? 'Fusion des deux images avec Gemini… cela peut prendre 15 à 40 secondes.'
    : 'Envoi à Gemini… cela peut prendre 10 à 30 secondes.';
  resultArea.style.display = 'none';
  resultImg.style.display = 'none';
  resultText.style.display = 'none';

  try {
    const params = new URLSearchParams({ prompt, image_url: url });
    if (hasImg2 && url2) params.append('image_url2', url2);

    const res = await fetch('/api/nanobanana?' + params.toString());
    const contentType = res.headers.get('content-type') || '';

    if (contentType.startsWith('image/')) {
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      resultImg.src = objectUrl;
      resultImg.style.display = 'block';
      resultArea.style.display = 'block';
      statusEl.className = 'status-msg status-ok';
      statusEl.textContent = '✅ Image générée avec succès !';
    } else {
      const json = await res.json();
      resultText.textContent = JSON.stringify(json, null, 2);
      resultText.style.display = 'block';
      resultArea.style.display = 'block';
      statusEl.className = 'status-msg status-err';
      statusEl.textContent = res.ok
        ? "⚠️ Gemini a retourné du texte (pas d'image)."
        : '❌ Erreur: ' + (json.error || res.status);
    }
  } catch (e) {
    statusEl.className = 'status-msg status-err';
    statusEl.textContent = '❌ Erreur réseau: ' + e.message;
  } finally {
    btn.disabled = false;
    btn.textContent = '▶ Envoyer à Gemini';
  }
}
</script>
</body>
</html>`);
});

export default router;
