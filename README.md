```markdown
## 🎨 2. Setup Frontend (React)

```bash
cd client
npm install
npm run dev
```


## 🔧 3. Setup Backend (Node + Express)

```bash
cd ../server
npm install
```

Create a `.env` file inside `/server` with the following:

```env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```
*Runs the backend on [http://localhost:5000]*
```

