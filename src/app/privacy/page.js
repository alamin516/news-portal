import PlainLayout from "@/components/master/PlainLayout";
import parse from "html-react-parser";

async function getData(type) {
  return (
    await (await fetch(`${process.env.HOST}/api/policy?type=policy`, { cache: 'no-store' })).json()
  )["data"];
}

const page = async () => {
  const data = await getData();

  return (
    <PlainLayout>
      <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className='card p-4'>
                            {parse(data[0]['long_des'])}
                        </div>
                    </div>
                </div>
            </div>
    </PlainLayout>
  );
};

export default page;
