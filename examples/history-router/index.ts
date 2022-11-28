import HistoryRouter from "../../src/history";

const router = new HistoryRouter();
const app = document.getElementById("app") as HTMLElement;

router.on("/", {
  onEnter: async () => {
    app.innerText = "Home page";
  },
});

router.on("/contacts", {
  onEnter: async () => {
    app.innerText = "Contacts page";
  },
});

router.on("/about", {
  onEnter: async () => {
    app.innerText = "About page";
  },
});

router.on("/about/us", {
  onEnter: async () => {
    app.innerText = "About Us page";
  },
});
