import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { RecoilRoot } from "recoil";

const progress = new ProgressBar({
    size: 3,
    color: "#59FFA0",
    className: "z-50",
    delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const App = ({ Component, pageProps }) => (
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
);

export default App;
