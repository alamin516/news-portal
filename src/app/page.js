import PlainLayout from "@/components/master/PlainLayout";
import Hero from "@/components/news/Hero";
import NewsList from "@/components/news/NewsList";
import PopularList from "@/components/news/PopularList";

async function getData() {
  let sliders = (
    await (await fetch(`${process.env.HOST}/api/news/type?type=slider`)).json()
  )["data"];
  let features = (
    await (
      await fetch(`${process.env.HOST}/api/news/type?type=featured`)
    ).json()
  )["data"];
  let popular = (
    await (await fetch(`${process.env.HOST}/api/news/type?type=popular`)).json()
  )["data"];
  let news = (
    await (await fetch(`${process.env.HOST}/api/news/latest`)).json()
  )["data"];
  return {
    sliders: sliders,
    features: features,
    popular: popular,
    news: news,
  };
}

const Home = async () => {
  const data = await getData();

  return (
    <PlainLayout>
      <Hero data={data} />
      <div className="container mt-4">
        <h5>LATEST</h5>
        <hr />
        <div className="row">
          <div className="col-md-9 col-lg-9 col-sm-12 col-12 px-3">
            <NewsList latest={data["news"]} />
          </div>
          <div className="col-md-3 col-lg-3 col-sm-12 col-12 px-3">
            <PopularList popular={data["popular"]} />
          </div>
        </div>
      </div>
    </PlainLayout>
  );
};

export default Home;
