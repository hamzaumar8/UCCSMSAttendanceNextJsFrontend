import Head from "next/head";

const HeadTitle = ({ title }) => (
    <Head>
        <title>
            {process.env.APP_NAME} - {title}
        </title>
    </Head>
);

export default HeadTitle;
