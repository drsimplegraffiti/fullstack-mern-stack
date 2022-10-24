#### Note: You can remove cors errors by either using cors package on the backend or by using proxy on the client side in the package.json file

```json
{
    "proxy": "http://localhost:4000",
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
```

---

In the backend

```js
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### we use normal () because we want to return a template , use { } to return function

#### React context helps us to provide global state to component and we update state by dispatching action

Global context state
