const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.type('html').send(`
  <!doctype html>
  <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Valenzos-PC – Documentación API</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;700&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
      <style>
        :root {
          /* Nueva Paleta: Deep Midnight */
          --bg-body: #09090b;       /* Casi negro */
          --bg-card: #121214;       /* Gris muy oscuro */
          --bg-header: rgba(9, 9, 11, 0.85);
          
          --border: #27272a;
          --border-hover: #3f3f46;
          
          --text-main: #a1a1aa;
          --text-bright: #f4f4f5;
          --text-dim: #52525b;
          
          --primary: #818cf8;       /* Indigo suave */
          --primary-dim: rgba(129, 140, 248, 0.1);
          
          --method-get: #38bdf8;
          --method-post: #4ade80;
          --method-put: #fbbf24;
          --method-del: #f87171;
        }

        * { box-sizing: border-box; }
        
        body {
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          background-color: var(--bg-body);
          color: var(--text-main);
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Layout al 75% del ancho */
        .container { 
          width: 75%;
          max-width: 1800px; /* Límite para pantallas ultrawide */
          min-width: 320px;
          margin: 0 auto; 
          padding: 0 20px; 
        }
        
        header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--bg-header);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 24px 0;
          margin-bottom: 60px;
        }
        
        header h1 {
          margin: 0;
          font-size: 1.75rem;
          color: var(--text-bright);
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .badge {
          font-size: 0.75rem;
          background: var(--primary-dim);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 999px;
          font-weight: 600;
          letter-spacing: 0.05em;
          border: 1px solid rgba(129, 140, 248, 0.2);
        }

        main { 
          flex: 1; /* Empuja el footer hacia abajo si hay poco contenido */
          padding-bottom: 80px; 
        }

        /* Estilo de Tarjetas Minimalista */
        section {
          margin-bottom: 80px;
          position: relative;
        }

        h2 { 
          color: var(--text-bright); 
          font-size: 1.5rem; 
          margin: 0 0 24px 0; 
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        h2 svg { width: 24px; height: 24px; color: var(--primary); }

        h3 { 
          color: var(--text-bright); 
          font-size: 1.1rem; 
          margin: 40px 0 16px; 
        }

        p { margin-bottom: 24px; max-width: 80ch; }

        /* Key-Value Grid Estilizado - Ajustado para aprovechar el ancho */
        .kv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Celdas más anchas */
          gap: 24px;
          margin: 32px 0;
        }
        
        .kv-item {
          background: var(--bg-card);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--border);
          transition: transform 0.2s, border-color 0.2s;
        }
        .kv-item:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }
        
        .kv-item strong { 
          display: block; 
          color: var(--text-dim); 
          font-size: 0.75rem; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          margin-bottom: 8px;
        }
        .kv-item span { 
          color: var(--text-bright); 
          font-family: 'Fira Code', monospace; 
          font-size: 1rem; 
        }

        /* Endpoints rediseñados */
        .endpoint-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .endpoint {
          display: grid;
          grid-template-columns: 100px 1fr auto; /* Columna de método un poco más ancha */
          align-items: center;
          background: var(--bg-card);
          padding: 20px 24px;
          border-radius: 8px;
          border: 1px solid var(--border);
          transition: all 0.2s;
        }
        
        .endpoint:hover {
          border-color: var(--primary);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .method {
          font-family: 'Fira Code', monospace;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .get { color: var(--method-get); }
        .post { color: var(--method-post); }
        .put { color: var(--method-put); }
        .del { color: var(--method-del); }

        .path { 
          font-family: 'Fira Code', monospace; 
          color: var(--text-bright); 
          font-size: 1rem;
          margin-left: 16px;
        }
        
        .meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tag-auth {
          font-size: 0.75rem;
          background: #27272a;
          color: #fbbf24;
          padding: 6px 10px;
          border-radius: 4px;
          font-weight: 600;
          border: 1px solid rgba(251, 191, 36, 0.2);
        }

        .desc { font-size: 0.9rem; color: var(--text-dim); }

        /* Code Blocks */
        .code-wrapper {
          position: relative;
          margin-top: 16px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        
        pre {
          background: #000000;
          margin: 0;
          padding: 32px; /* Más padding interno */
          overflow-x: auto;
        }
        
        code { font-family: 'Fira Code', monospace; font-size: 0.95rem; color: #e4e4e7; }
        
        p code { 
          background: var(--bg-card); 
          padding: 2px 6px; 
          border-radius: 4px; 
          color: var(--primary); 
          border: 1px solid var(--border);
          font-size: 0.9em;
        }

        .copy-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: var(--text-bright);
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 0.8rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }
        .copy-btn:hover { background: rgba(255,255,255,0.2); }

        footer { 
          width: 100%;
          text-align: center; 
          color: var(--text-bright); 
          padding: 40px 0; 
          border-top: 1px solid var(--border);
          margin-top: 80px;
          background: var(--bg-body); /* Asegura fondo sólido */
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        @media (max-width: 768px) {
          .container { width: 90%; } /* En móvil usamos más pantalla */
          .endpoint { 
            grid-template-columns: 1fr; 
            gap: 8px;
            padding: 20px;
          }
          .path { margin-left: 0; margin-bottom: 4px; display: block; }
          .meta { flex-wrap: wrap; margin-top: 8px; }
        }
      </style>
    </head>
    <body>
      <header>
        <div class="container">
          <h1>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
            Valenzos-PC 
            <span class="badge">API v1.0</span>
          </h1>
          <p style="margin: 8px 0 0; font-size: 1.05rem; color: var(--text-main);">
            Documentación técnica del Backend RESTful.
          </p>
        </div>
      </header>

      <main class="container">
        
        <section>
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            Configuración & Stack
          </h2>
          <p>Visión general de la infraestructura y variables necesarias para el despliegue.</p>
          
          <div class="kv-grid">
            <div class="kv-item"><strong>Entorno</strong><span>Node.js / Express 5</span></div>
            <div class="kv-item"><strong>Base de Datos</strong><span>MongoDB + Mongoose</span></div>
            <div class="kv-item"><strong>Autenticación</strong><span>JWT (Bearer)</span></div>
            <div class="kv-item"><strong>Puerto Defecto</strong><span>8080</span></div>
          </div>
          
          <h3>Archivo .env</h3>
          <div class="code-wrapper">
            <pre><code id="code-env">PORT=8080
SECRET_KEY=clave_segura_jwt_2024
MONGO_URI=mongodb://localhost:27017/valenzos_pc_db</code></pre>
            <button class="copy-btn" onclick="copyToClipboard('code-env')">Copiar</button>
          </div>
        </section>

        <section>
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Autenticación
          </h2>
          <p>El sistema utiliza tokens JWT. Incluye el token en el header <code>Authorization</code> para acceder a rutas protegidas.</p>
          
          <div class="endpoint-list">
            <div class="endpoint">
              <span class="method post">POST</span>
              <span class="path">/api/auth/login</span>
              <div class="meta"><span class="desc">Generar Token</span></div>
            </div>
            <div class="endpoint">
              <span class="method post">POST</span>
              <span class="path">/api/auth/registro</span>
              <div class="meta"><span class="desc">Nuevo usuario</span></div>
            </div>
          </div>
        </section>

        <section>
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Productos
          </h2>
          <p>Gestión completa del inventario. Las operaciones de escritura requieren rol de administrador.</p>
          
          <div class="endpoint-list">
            <div class="endpoint">
              <span class="method get">GET</span>
              <span class="path">/api/products</span>
              <div class="meta"><span class="desc">Listar todo</span></div>
            </div>
            <div class="endpoint">
              <span class="method get">GET</span>
              <span class="path">/api/products/:id</span>
              <div class="meta"><span class="tag-auth">Token</span></div>
            </div>
            <div class="endpoint">
              <span class="method post">POST</span>
              <span class="path">/api/products</span>
              <div class="meta"><span class="tag-auth">Admin</span></div>
            </div>
            <div class="endpoint">
              <span class="method put">PUT</span>
              <span class="path">/api/products/:id</span>
              <div class="meta"><span class="tag-auth">Admin</span></div>
            </div>
            <div class="endpoint">
              <span class="method del">DELETE</span>
              <span class="path">/api/products/:id</span>
              <div class="meta"><span class="tag-auth">Admin</span></div>
            </div>
          </div>
        </section>

        <section>
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Servicios
          </h2>
          <p>Catálogo de reparaciones y servicios técnicos disponibles.</p>
          
          <div class="endpoint-list">
            <div class="endpoint">
              <span class="method get">GET</span>
              <span class="path">/api/services</span>
              <div class="meta"><span class="desc">Catálogo público</span></div>
            </div>
            <div class="endpoint">
              <span class="method post">POST</span>
              <span class="path">/api/services</span>
              <div class="meta"><span class="tag-auth">Admin</span></div>
            </div>
          </div>
        </section>

        <section>
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
            Guía Rápida (PowerShell)
          </h2>
          
          <h3>Autenticación</h3>
          <div class="code-wrapper">
            <pre><code id="code-login">$body = @{ username="admin"; password="123" } | ConvertTo-Json
$res = Invoke-RestMethod -Method POST -Uri http://localhost:8080/api/auth/login -ContentType 'application/json' -Body $body
$TOKEN = $res.token
Write-Host "🔑 Token: $TOKEN"</code></pre>
            <button class="copy-btn" onclick="copyToClipboard('code-login')">Copiar</button>
          </div>

          <h3>Crear Item (con Token)</h3>
          <div class="code-wrapper">
            <pre><code id="code-create">$payload = @{ title="SSD 1TB"; price=80; iconName="hdd" } | ConvertTo-Json

Invoke-RestMethod -Method POST -Uri http://localhost:8080/api/products -Headers @{ Authorization = "Bearer $TOKEN" } -ContentType 'application/json' -Body $payload</code></pre>
            <button class="copy-btn" onclick="copyToClipboard('code-create')">Copiar</button>
          </div>
        </section>

      </main>

      <footer>
        <div class="container">
          <p>Valenzos-PC System · ${new Date().getFullYear()}</p>
          <p style="font-size: 0.8rem; opacity: 0.6;">Documentación generada automáticamente.</p>
        </div>
      </footer>

      <script>
        function copyToClipboard(elementId) {
          const text = document.getElementById(elementId).innerText;
          navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector(\`button[onclick="copyToClipboard('\${elementId}')"]\`);
            const originalText = btn.innerText;
            btn.innerText = 'Copiado';
            btn.style.background = 'rgba(74, 222, 128, 0.2)';
            btn.style.color = '#4ade80';
            setTimeout(() => {
              btn.innerText = originalText;
              btn.style.background = '';
              btn.style.color = '';
            }, 2000);
          });
        }
      </script>
    </body>
  </html>
  `);
});

module.exports = router;