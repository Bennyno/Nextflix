import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import Navbar from "../components/navbar/navbar";
import SectionCards from "../components/card/section-cards";
import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import useRedirectUser from "../utils/redirectUser";

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const poplularVideos = await getPopularVideos();
  return {
    props: {
      disneyVideos: JSON.parse(JSON.stringify(disneyVideos)),
      productivityVideos: JSON.parse(JSON.stringify(productivityVideos)),
      travelVideos: JSON.parse(JSON.stringify(travelVideos)),
      poplularVideos: JSON.parse(JSON.stringify(poplularVideos)),
      watchItAgainVideos: JSON.parse(JSON.stringify(watchItAgainVideos)),
    },
  };
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  poplularVideos,
  watchItAgainVideos = [],
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Navbar username="ben@ben.com" />
        <Banner
          videoId="ctlz0R1tSZE"
          title="Guardians Of The Galaxy"
          subTitle="Awesome Movie"
          imgUrl="/static/guardians.jpg"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={poplularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
