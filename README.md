# 📊 FB Grupos Tracker — Miembros Automático

Actualiza diariamente el conteo de miembros de tus grupos de Facebook usando **Apify** y **GitHub Actions**.

---

## ⚙️ Configuración (solo una vez)

### Paso 1 — Crear el repositorio en GitHub
1. Ve a [github.com/new](https://github.com/new)
2. Nombra el repo `fb-grupos-tracker`
3. Ponlo en **Privado**
4. Sube estos archivos

### Paso 2 — Obtener tu token de Apify
1. Regístrate en [apify.com](https://apify.com) (gratis)
2. Ve a **Settings → Integrations → API token**
3. Copia el token

### Paso 3 — Obtener las cookies de Facebook
Las cookies permiten acceder a grupos privados donde ya eres miembro.

1. Instala la extensión **EditThisCookie** en Chrome
   - [Chrome Web Store](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg)
2. Entra a [facebook.com](https://facebook.com) con tu cuenta
3. Haz clic en el ícono de EditThisCookie
4. Haz clic en el botón de **Exportar** (ícono de flecha hacia arriba)
5. Copia todo el JSON que aparece

> ⚠️ Las cookies expiran cada 30-60 días. Deberás renovarlas.

### Paso 4 — Agregar los Secrets en GitHub
1. En tu repo → **Settings → Secrets and variables → Actions**
2. Crea estos dos secrets:

| Secret | Valor |
|---|---|
| `APIFY_TOKEN` | Tu token de Apify |
| `FB_COOKIES` | El JSON de cookies de Facebook |

---

## 🚀 Uso

### Ejecución automática
El workflow corre **todos los días a las 8:00 AM EST** (hora de Miami/Cuba).

### Ejecución manual
1. Ve a la pestaña **Actions** en tu repo
2. Clic en **"Actualizar Miembros de Grupos Facebook"**
3. Clic en **"Run workflow"**

---

## 📁 Archivos generados

Después de cada ejecución, en la carpeta `data/` encontrarás:

| Archivo | Descripción |
|---|---|
| `latest.json` | Resultado más reciente con total de miembros |
| `miembros_YYYY-MM-DD.csv` | CSV del día con todos los grupos |
| `history.json` | Histórico acumulado de todas las ejecuciones |

### Ejemplo de `latest.json`
```json
{
  "fecha": "2026-04-18",
  "total": 1854320,
  "gruposConDatos": 85,
  "grupos": [
    {
      "fecha": "2026-04-18",
      "nombre": "Cubanos en Florida-1",
      "url": "https://www.facebook.com/groups/cubanosenflorida1/",
      "miembros": 67400,
      "estado": "ok"
    }
  ]
}
```

---

## 🔄 Renovar cookies de Facebook

Las cookies expiran. Para renovarlas:
1. Repite el **Paso 3** de la configuración
2. Ve a **Settings → Secrets → FB_COOKIES**
3. Haz clic en **Update** y pega el nuevo JSON

Recomendamos renovarlas **cada 30 días**.

---

## ❓ Solución de problemas

| Problema | Solución |
|---|---|
| `Error: APIFY_TOKEN inválido` | Verifica el secret `APIFY_TOKEN` |
| Grupos devuelven `null` miembros | Renueva las cookies de Facebook |
| Actor falla con error 402 | Tus créditos de Apify se agotaron |
| `sin_datos` en muchos grupos | Las cookies expiraron, renuévalas |
